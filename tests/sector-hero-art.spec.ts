import { expect, test, type Locator } from "@playwright/test";
import type { Locale } from "../lib/i18n";
import { sectorDetailPath, sectorRecords, type SectorKey } from "../lib/sector-use-cases";

type Box = { x: number; y: number; width: number; height: number };
type SectorRoute = { route: string; sectorKey: SectorKey };

async function requiredBox(locator: Locator, label: string): Promise<Box> {
  const box = await locator.boundingBox();
  expect(box, `${label} must have a rendered box`).not.toBeNull();
  return box as Box;
}

function isContained(parent: Box, child: Box, tolerance = 1) {
  return (
    child.x >= parent.x - tolerance &&
    child.y >= parent.y - tolerance &&
    child.x + child.width <= parent.x + parent.width + tolerance &&
    child.y + child.height <= parent.y + parent.height + tolerance
  );
}

function routesFor(locale: Locale): SectorRoute[] {
  return sectorRecords.map((sector) => ({
    route: sectorDetailPath(sector.key, locale),
    sectorKey: sector.key,
  }));
}

const allRoutes = (["es", "en"] as Locale[]).flatMap(routesFor);
const spanishRoutes = routesFor("es");
const allowedMotifs = new Set(["conversation", "operations", "ledger", "pipeline"]);

for (const item of allRoutes) {
  test(`desktop sector hero art is structured and contained on ${item.route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1648, height: 1000 });
    await page.goto(item.route, { waitUntil: "networkidle" });

    const art = page.locator(".brand-sector-hero-art").first();
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("data-sector-art", item.sectorKey);

    const artBox = await requiredBox(art, `${item.route}: sector hero art`);
    const signature = art.locator(`.brand-sector-art-signature[data-sector-signature="${item.sectorKey}"]`);
    await expect(signature).toBeVisible();
    const signatureBox = await requiredBox(signature, `${item.route}: sector signature`);
    expect(isContained(artBox, signatureBox), `${item.route}: sector signature must remain inside hero art`).toBeTruthy();

    const people = art.locator(".brand-sector-art-person");
    const peopleCount = await people.count();
    expect(peopleCount, `${item.route}: sector hero must render canonical participants`).toBeGreaterThan(0);
    expect(peopleCount, `${item.route}: sector hero renders at most three canonical participants`).toBeLessThanOrEqual(3);

    for (let index = 0; index < peopleCount; index += 1) {
      const person = people.nth(index);
      const personBox = await requiredBox(person, `${item.route}: canonical participant ${index + 1}`);
      expect(isContained(artBox, personBox), `${item.route}: canonical participant ${index + 1} must remain inside hero art`).toBeTruthy();
      const motif = await person.getAttribute("data-role-motif");
      expect(motif && allowedMotifs.has(motif), `${item.route}: participant ${index + 1} must expose a Phase 2A motif`).toBeTruthy();
    }

    const stages = art.locator(".brand-sector-art-stage-track li");
    expect(await stages.count(), `${item.route}: sector signature must expose four operating stages`).toBe(4);

    for (const [selector, label] of [
      [".brand-sector-art-systems", "systems"],
      [".brand-sector-art-human", "human control"],
    ] as const) {
      const locator = art.locator(selector);
      await expect(locator).toBeVisible();
      const box = await requiredBox(locator, `${item.route}: ${label}`);
      expect(isContained(artBox, box, 2), `${item.route}: ${label} must remain inside hero art`).toBeTruthy();
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${item.route}: desktop must not create horizontal page overflow`).toBeLessThanOrEqual(1);
  });
}

for (const item of spanishRoutes) {
  test(`mobile sector hero art reflows on ${item.route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(item.route, { waitUntil: "networkidle" });

    const art = page.locator(".brand-sector-hero-art").first();
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("data-sector-art", item.sectorKey);
    await expect(art.locator(`.brand-sector-art-signature[data-sector-signature="${item.sectorKey}"]`)).toBeVisible();
    await expect(art.locator(".brand-sector-art-systems")).toBeVisible();
    await expect(art.locator(".brand-sector-art-human")).toBeVisible();
    expect(await art.locator(".brand-sector-art-stage-track li").count()).toBe(4);

    const artBox = await requiredBox(art, `${item.route}: mobile sector hero art`);
    for (const selector of [
      ".brand-sector-art-person",
      ".brand-sector-art-signature",
      ".brand-sector-art-stage-track",
      ".brand-sector-art-systems",
      ".brand-sector-art-human",
    ]) {
      const locators = art.locator(selector);
      for (let index = 0; index < await locators.count(); index += 1) {
        const child = await requiredBox(locators.nth(index), `${item.route}: mobile ${selector} ${index + 1}`);
        expect(isContained(artBox, child, 2), `${item.route}: ${selector} ${index + 1} must remain inside mobile hero art`).toBeTruthy();
      }
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${item.route}: mobile must not create horizontal page overflow`).toBeLessThanOrEqual(1);
  });
}
