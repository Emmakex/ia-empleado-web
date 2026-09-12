import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

type Box = { x: number; y: number; width: number; height: number };

async function requiredBox(locator: Locator, label: string): Promise<Box> {
  const box = await locator.boundingBox();
  expect(box, `${label} must have a rendered box`).not.toBeNull();
  return box as Box;
}

async function assertNoHorizontalOverflow(page: Page, label: string) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  expect(
    Math.max(metrics.scrollWidth, metrics.bodyScrollWidth),
    `${label} must not create horizontal page overflow`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function assertMobileHeroGeometry(page: Page, label: string) {
  const stage = await requiredBox(page.locator(".brand-hero-stage"), `${label}: hero stage`);
  const first = await requiredBox(page.locator(".brand-character-node-1"), `${label}: Clara`);
  const second = await requiredBox(page.locator(".brand-character-node-2"), `${label}: Alex`);
  const core = await requiredBox(page.locator(".brand-hero-core"), `${label}: IA core`);
  const third = await requiredBox(page.locator(".brand-character-node-3"), `${label}: Sofía`);
  const fourth = await requiredBox(page.locator(".brand-character-node-4"), `${label}: Javier`);
  const approval = await requiredBox(page.locator(".brand-hero-approval"), `${label}: human approval`);
  const systems = await requiredBox(page.locator(".brand-hero-systems"), `${label}: systems`);

  const topRowBottom = Math.max(first.y + first.height, second.y + second.height);
  const bottomRowTop = Math.min(third.y, fourth.y);
  const bottomRowBottom = Math.max(third.y + third.height, fourth.y + fourth.height);
  const coreBottom = core.y + core.height;
  const approvalBottom = approval.y + approval.height;
  const minimumGap = 6;

  expect(core.y, `${label}: core must sit below Clara/Alex`).toBeGreaterThanOrEqual(topRowBottom + minimumGap);
  expect(bottomRowTop, `${label}: Sofía/Javier must sit below the core`).toBeGreaterThanOrEqual(coreBottom + minimumGap);
  expect(approval.y, `${label}: approval must sit below the second row`).toBeGreaterThanOrEqual(bottomRowBottom + minimumGap);
  expect(systems.y, `${label}: systems must sit below approval`).toBeGreaterThanOrEqual(approvalBottom + minimumGap);

  for (const [name, box] of [
    ["Clara", first],
    ["Alex", second],
    ["core", core],
    ["Sofía", third],
    ["Javier", fourth],
    ["approval", approval],
    ["systems", systems],
  ] as const) {
    expect(box.x, `${label}: ${name} must remain inside the stage`).toBeGreaterThanOrEqual(stage.x - 1);
    expect(box.x + box.width, `${label}: ${name} must remain inside the stage`).toBeLessThanOrEqual(stage.x + stage.width + 1);
  }

  const labelFontSizes = await page.locator(".brand-character-label span").evaluateAll((nodes) =>
    nodes.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
  );
  expect(Math.min(...labelFontSizes), `${label}: role labels must remain readable`).toBeGreaterThanOrEqual(12);

  const actionHeights = await page.locator(".brand-home-hero .hero-actions .button").evaluateAll((nodes) =>
    nodes.map((node) => (node as HTMLElement).getBoundingClientRect().height),
  );
  expect(Math.min(...actionHeights), `${label}: hero CTAs must meet the mobile target-size floor`).toBeGreaterThanOrEqual(44);
}

const mobileMatrix = [
  { name: "320", width: 320, height: 800 },
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
];

for (const viewport of mobileMatrix) {
  test(`home mobile geometry ${viewport.name}px`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await assertNoHorizontalOverflow(page, `${viewport.name}px home`);

    if (viewport.width <= 760) {
      await assertMobileHeroGeometry(page, `${viewport.name}px home`);
    }
  });
}

test("200% text scaling keeps the mobile hero usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await page.waitForTimeout(50);

  await assertNoHorizontalOverflow(page, "390px home at 200% text scale");
  await assertMobileHeroGeometry(page, "390px home at 200% text scale");
});

test("mobile navigation traps focus and restores it on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator(".mobile-menu-toggle");
  await toggle.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const firstLink = dialog.locator("a").first();
  const lastLink = dialog.locator("a").last();
  await expect(firstLink).toBeFocused();

  await lastLink.focus();
  await page.keyboard.press("Tab");
  await expect(firstLink).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(lastLink).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
});

const smokeRoutes = [
  "/",
  "/empleados-ia",
  "/empleados-ia/atencion-cliente",
  "/equipos-ia",
  "/equipos-ia/ecommerce",
  "/como-trabajan-juntos",
  "/disena-tu-equipo-ia",
  "/mejora-tu-proceso",
  "/calculadora-roi",
  "/sectores",
  "/casos-de-uso",
  "/departamentos",
  "/integraciones",
  "/comparativas",
  "/en",
];

test("commercial route matrix has no horizontal overflow at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of smokeRoutes) {
    await test.step(route, async () => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} must return a successful response`).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      await assertNoHorizontalOverflow(page, route);
    });
  }
});

for (const route of ["/", "/disena-tu-equipo-ia", "/como-trabajan-juntos", "/en"]) {
  test(`critical/serious axe audit ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      violation.impact === "critical" || violation.impact === "serious",
    );

    expect(
      blocking.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        targets: violation.nodes.slice(0, 4).map((node) => node.target),
      })),
      `${route} must have no critical/serious WCAG violations`,
    ).toEqual([]);
  });
}
