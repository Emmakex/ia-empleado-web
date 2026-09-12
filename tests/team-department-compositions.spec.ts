import { expect, test, type Locator } from "@playwright/test";
import { departmentDetailPath, departmentRecords } from "../lib/organization-map";
import { getTeamRecords, teamDetailPath } from "../lib/team-content-engine";
import type { Locale } from "../lib/i18n";

type Box = { x: number; y: number; width: number; height: number };
type CompositionRoute = { route: string; variant: "team" | "department"; context: string };

async function requiredBox(locator: Locator, label: string): Promise<Box> {
  const box = await locator.boundingBox();
  expect(box, `${label} must have a rendered box`).not.toBeNull();
  return box as Box;
}

function areSeparated(a: Box, b: Box, gap = 0) {
  return (
    a.x + a.width + gap <= b.x ||
    b.x + b.width + gap <= a.x ||
    a.y + a.height + gap <= b.y ||
    b.y + b.height + gap <= a.y
  );
}

function isContained(parent: Box, child: Box, tolerance = 1) {
  return (
    child.x >= parent.x - tolerance &&
    child.y >= parent.y - tolerance &&
    child.x + child.width <= parent.x + parent.width + tolerance &&
    child.y + child.height <= parent.y + parent.height + tolerance
  );
}

function routesFor(locale: Locale): CompositionRoute[] {
  const teams = getTeamRecords().map((team) => ({
    route: teamDetailPath(team.key, locale),
    variant: "team" as const,
    context: team.key,
  }));
  const departments = departmentRecords.map((department) => ({
    route: departmentDetailPath(department.key, locale),
    variant: "department" as const,
    context: department.key,
  }));
  return [...teams, ...departments];
}

const allRoutes = (["es", "en"] as Locale[]).flatMap(routesFor);
const spanishRoutes = routesFor("es");
const allowedMotifs = new Set(["conversation", "operations", "ledger", "pipeline", "catalog"]);

for (const item of allRoutes) {
  test(`desktop collaboration composition is collision-free on ${item.route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1648, height: 1000 });
    await page.goto(item.route, { waitUntil: "networkidle" });

    const scene = page.locator(".brand-collaboration-composition").first();
    await expect(scene).toHaveAttribute("data-collaboration-variant", item.variant);
    await expect(scene).toHaveAttribute("data-collaboration-context", item.context);

    const sceneBox = await requiredBox(scene, `${item.route}: collaboration scene`);
    const hub = scene.locator(".brand-collaboration-hub");
    const hubBox = await requiredBox(hub, `${item.route}: handoff hub`);
    expect(isContained(sceneBox, hubBox), `${item.route}: handoff hub must stay inside the scene`).toBeTruthy();

    const participants = scene.locator(".brand-collaboration-participant");
    const participantCount = await participants.count();
    expect(participantCount, `${item.route}: composition must render participants`).toBeGreaterThan(0);
    expect(participantCount, `${item.route}: composition renders at most four visible participants`).toBeLessThanOrEqual(4);

    for (let index = 0; index < participantCount; index += 1) {
      const participant = participants.nth(index);
      const participantBox = await requiredBox(participant, `${item.route}: participant ${index + 1}`);
      expect(isContained(sceneBox, participantBox), `${item.route}: participant ${index + 1} must remain inside the scene`).toBeTruthy();
      expect(areSeparated(hubBox, participantBox, 4), `${item.route}: handoff hub must not cover participant ${index + 1}`).toBeTruthy();

      const motif = await participant.getAttribute("data-role-motif");
      expect(motif && allowedMotifs.has(motif), `${item.route}: participant ${index + 1} must expose a known role motif`).toBeTruthy();
    }

    for (const [selector, label] of [
      [".brand-collaboration-systems", "shared systems"],
      [".brand-collaboration-human", "human control"],
    ] as const) {
      const box = await requiredBox(scene.locator(selector), `${item.route}: ${label}`);
      expect(isContained(sceneBox, box), `${item.route}: ${label} must remain inside the scene`).toBeTruthy();
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${item.route}: desktop must not create horizontal page overflow`).toBeLessThanOrEqual(1);
  });
}

for (const item of spanishRoutes) {
  test(`mobile collaboration composition reflows on ${item.route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(item.route, { waitUntil: "networkidle" });

    const scene = page.locator(".brand-collaboration-composition").first();
    await expect(scene).toBeVisible();
    await expect(scene).toHaveAttribute("data-collaboration-variant", item.variant);

    const participants = scene.locator(".brand-collaboration-participant");
    expect(await participants.count(), `${item.route}: mobile composition must keep its participants`).toBeGreaterThan(0);
    await expect(scene.locator(".brand-collaboration-hub")).toBeVisible();
    await expect(scene.locator(".brand-collaboration-systems")).toBeVisible();
    await expect(scene.locator(".brand-collaboration-human")).toBeVisible();

    const sceneBox = await requiredBox(scene, `${item.route}: mobile collaboration scene`);
    for (const selector of [
      ".brand-collaboration-participant",
      ".brand-collaboration-hub",
      ".brand-collaboration-systems",
      ".brand-collaboration-human",
    ]) {
      const locators = scene.locator(selector);
      for (let index = 0; index < await locators.count(); index += 1) {
        const child = await requiredBox(locators.nth(index), `${item.route}: mobile ${selector} ${index + 1}`);
        expect(isContained(sceneBox, child, 2), `${item.route}: ${selector} ${index + 1} must remain inside the mobile scene`).toBeTruthy();
      }
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${item.route}: mobile must not create horizontal page overflow`).toBeLessThanOrEqual(1);
  });
}
