import { expect, test } from "@playwright/test";

const criticalRoutes = [
  "/",
  "/en",
  "/empleados-ia",
  "/en/ai-employees",
  "/disena-tu-equipo-ia",
  "/en/design-your-ai-team",
  "/calculadora-roi",
  "/en/roi-calculator",
  "/solicitar-demo",
  "/en/request-demo",
];

test("Firefox renders critical ES/EN commercial routes without page errors", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const route of criticalRoutes) {
    await test.step(route, async () => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} must return success in Firefox`).toBeTruthy();
      await expect(page.locator("main"), `${route} must render main content`).toBeVisible();
      await expect(page.locator("h1").first(), `${route} must render a visible H1`).toBeVisible();
      expect(pageErrors.splice(0), `${route} must not emit uncaught page errors`).toEqual([]);
    });
  }
});

test("Firefox keeps Home stable at the Phase 8G 768px entry-risk viewport", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator(".brand-home-hero")).toBeVisible();

  const metrics = await page.evaluate(() => ({
    scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.scrollWidth, "Home must not overflow horizontally at 768px in Firefox").toBeLessThanOrEqual(
    metrics.clientWidth + 1,
  );

  const h1 = await page.locator(".brand-home-hero h1").boundingBox();
  expect(h1).not.toBeNull();
  if (h1) {
    expect(h1.x).toBeGreaterThanOrEqual(-1);
    expect(h1.x + h1.width).toBeLessThanOrEqual(metrics.clientWidth + 1);
  }
});

test("Firefox mobile navigation traps and restores keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator(".mobile-menu-toggle");
  await expect(toggle).toBeVisible();
  await toggle.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const firstLink = dialog.locator("a").first();
  const lastLink = dialog.locator("a").last();
  await expect(firstLink).toBeFocused();

  await lastLink.focus();
  await page.keyboard.press("Tab");
  await expect(firstLink).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
});
