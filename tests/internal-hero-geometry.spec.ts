import { expect, test, type Locator } from "@playwright/test";

type Box = { x: number; y: number; width: number; height: number };

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

function isContained(inner: Box, outer: Box, tolerance = 1) {
  return (
    inner.x >= outer.x - tolerance &&
    inner.y >= outer.y - tolerance &&
    inner.x + inner.width <= outer.x + outer.width + tolerance &&
    inner.y + inner.height <= outer.y + outer.height + tolerance
  );
}

const desktopHeroRoutes = [
  {
    route: "/equipos-ia",
    left: ".team-index-hero-grid > :first-child",
    right: ".brand-team-hero-art",
  },
  {
    route: "/comparativas",
    left: ".comparison-hero-grid > :first-child",
    right: ".comparison-hero-side",
  },
  {
    route: "/sectores",
    left: ".sector-hero-grid > :first-child",
    right: ".brand-sector-overview",
  },
  {
    route: "/casos-de-uso",
    left: ".sector-hero-grid > :first-child",
    right: ".brand-sector-overview",
  },
];

test("desktop internal hero columns start on the same visual row", async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 1000 });

  for (const item of desktopHeroRoutes) {
    await test.step(item.route, async () => {
      await page.goto(item.route, { waitUntil: "networkidle" });
      const left = await requiredBox(page.locator(item.left), `${item.route}: copy column`);
      const right = await requiredBox(page.locator(item.right), `${item.route}: visual column`);
      expect(
        Math.abs(left.y - right.y),
        `${item.route}: a taller visual must not vertically center the copy and create dead space`,
      ).toBeLessThanOrEqual(4);
    });
  }
});

for (const viewport of [
  { label: "desktop", width: 1648, height: 1000, gap: 4 },
  { label: "mobile", width: 390, height: 844, gap: 2 },
]) {
  test(`homepage hero status rails remain collision-free on ${viewport.label}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "networkidle" });

    const stageLocator = page.locator(".brand-home-hero .brand-hero-stage");
    const stage = await requiredBox(stageLocator, `${viewport.label}: home hero stage`);
    const task = await requiredBox(stageLocator.locator(".brand-hero-task"), `${viewport.label}: task rail`);
    const approval = await requiredBox(stageLocator.locator(".brand-hero-approval"), `${viewport.label}: approval rail`);
    const footer = await requiredBox(stageLocator.locator(".brand-hero-footer"), `${viewport.label}: footer rail`);
    const caption = await requiredBox(stageLocator.locator(".brand-hero-caption"), `${viewport.label}: footer caption`);
    const systems = await requiredBox(stageLocator.locator(".brand-hero-systems"), `${viewport.label}: system chips`);
    const nodes = stageLocator.locator(".brand-character-node");

    expect(await nodes.count(), `${viewport.label}: all four canonical character cards must render`).toBe(4);

    for (const [label, box] of [
      ["task", task],
      ["approval", approval],
      ["footer", footer],
      ["caption", caption],
      ["systems", systems],
    ] as const) {
      expect(isContained(box, stage), `${viewport.label}: ${label} must stay inside the hero panel`).toBeTruthy();
    }

    for (let index = 0; index < 2; index += 1) {
      const topNode = await requiredBox(nodes.nth(index), `${viewport.label}: top character ${index + 1}`);
      expect(
        areSeparated(task, topNode, viewport.gap),
        `${viewport.label}: task rail must not touch top character ${index + 1}`,
      ).toBeTruthy();
    }

    for (let index = 2; index < 4; index += 1) {
      const lowerNode = await requiredBox(nodes.nth(index), `${viewport.label}: lower character ${index + 1}`);
      expect(
        areSeparated(approval, lowerNode, viewport.gap),
        `${viewport.label}: approval rail must not cover lower character ${index + 1}`,
      ).toBeTruthy();
    }

    expect(
      areSeparated(approval, footer, viewport.gap),
      `${viewport.label}: approval rail must stay above the footer rail`,
    ).toBeTruthy();
    expect(
      areSeparated(caption, systems, viewport.gap),
      `${viewport.label}: workflow caption and system chips must not overlap`,
    ).toBeTruthy();
  });
}

test("employee catalog portraits keep a dedicated label footer", async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 1000 });
  await page.goto("/empleados-ia", { waitUntil: "networkidle" });

  const geometry = await page.locator(".brand-catalog-person").evaluateAll((cards) =>
    cards.map((card) => {
      const image = card.querySelector("img")?.getBoundingClientRect();
      const label = card.querySelector(":scope > span")?.getBoundingClientRect();
      return image && label
        ? { imageBottom: image.bottom, labelTop: label.top }
        : null;
    }).filter(Boolean),
  );

  expect(geometry.length, "all four catalog portraits must expose measurable image/label geometry").toBe(4);
  for (const [index, item] of geometry.entries()) {
    if (!item) continue;
    expect(
      item.imageBottom,
      `catalog portrait ${index + 1}: image must end before its name/role footer`,
    ).toBeLessThanOrEqual(item.labelTop - 4);
  }
});

test("team hero core no longer covers the definition heading", async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 1000 });
  await page.goto("/equipos-ia", { waitUntil: "networkidle" });

  const core = await requiredBox(page.locator(".brand-team-hero-core"), "team hero core");
  const heading = await requiredBox(page.locator(".brand-team-definition-card h2"), "team definition heading");

  expect(core.y + core.height, "team core may dock into the card but must finish before its heading").toBeLessThanOrEqual(heading.y - 6);
});

for (const route of ["/sectores", "/casos-de-uso"]) {
  test(`shared context artwork has a collision-free core on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1648, height: 1000 });
    await page.goto(route, { waitUntil: "networkidle" });

    const scene = page.locator(".brand-context-scene").first();
    const core = await requiredBox(scene.locator(".brand-context-core"), `${route}: context core`);
    const people = scene.locator(".brand-context-person");
    const count = await people.count();
    expect(count, `${route}: four canonical people must render in the overview`).toBe(4);

    for (let index = 0; index < count; index += 1) {
      const person = await requiredBox(people.nth(index), `${route}: person ${index + 1}`);
      expect(
        areSeparated(core, person, 3),
        `${route}: core must not cover person card ${index + 1}`,
      ).toBeTruthy();
    }
  });
}

test("comparison employee portraits remain inside their side card", async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 1000 });
  await page.goto("/comparativas", { waitUntil: "networkidle" });

  const scene = page.locator(".brand-comparison-scene").first();
  const side = await requiredBox(scene.locator(".brand-comparison-employee"), "comparison employee side");
  const portraits = scene.locator(".brand-comparison-portrait");
  const count = await portraits.count();
  expect(count, "comparison scene must render four employee portraits").toBe(4);

  for (let index = 0; index < count; index += 1) {
    const portrait = await requiredBox(portraits.nth(index), `comparison portrait ${index + 1}`);
    expect(portrait.x, `portrait ${index + 1} must stay inside the employee card on the left`).toBeGreaterThanOrEqual(side.x - 1);
    expect(
      portrait.x + portrait.width,
      `portrait ${index + 1} must stay inside the employee card on the right`,
    ).toBeLessThanOrEqual(side.x + side.width + 1);
  }
});
