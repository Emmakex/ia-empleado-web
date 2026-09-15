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

test("iPhone WebKit emulation renders critical mobile routes without runtime errors or overflow", async ({
  browserName,
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  expect(browserName).toBe("webkit");
  expect(page.viewportSize()).toEqual({ width: 390, height: 844 });
  expect(await page.evaluate(() => navigator.userAgent)).toContain("iPhone");

  for (const route of criticalRoutes) {
    await test.step(route, async () => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} must return success in iPhone WebKit emulation`).toBeTruthy();
      await expect(page.locator("main"), `${route} must render main content`).toBeVisible();
      await expect(page.locator("h1").first(), `${route} must render a visible H1`).toBeVisible();

      const metrics = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      }));
      expect(metrics.scrollWidth, `${route} must not overflow horizontally`).toBeLessThanOrEqual(
        metrics.clientWidth + 1,
      );
      expect(pageErrors.splice(0), `${route} must not emit uncaught page errors`).toEqual([]);
    });
  }
});

test("iPhone WebKit emulation keeps the canonical Home character cards inside the viewport", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator(".brand-home-hero")).toBeVisible();

  const cards = page.locator(".brand-character-card");
  await expect(cards).toHaveCount(4);

  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  for (let index = 0; index < 4; index += 1) {
    const card = cards.nth(index);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card.locator("img").first()).toBeVisible();

    const box = await card.boundingBox();
    expect(box, `canonical card ${index + 1} must have measurable geometry`).not.toBeNull();
    if (box) {
      expect(box.x, `canonical card ${index + 1} must stay inside the left edge`).toBeGreaterThanOrEqual(-1);
      expect(
        box.x + box.width,
        `canonical card ${index + 1} must stay inside the right edge`,
      ).toBeLessThanOrEqual(clientWidth + 1);
      expect(box.width, `canonical card ${index + 1} must not exceed viewport width`).toBeLessThanOrEqual(
        clientWidth,
      );
    }
  }

  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
  }));
  expect(metrics.scrollWidth, "Home must remain overflow-free after loading canonical character art").toBeLessThanOrEqual(
    metrics.clientWidth + 1,
  );
});

test("iPhone WebKit emulation supports touch navigation and the primary mobile CTA handoff", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator(".mobile-menu-toggle");
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.tap();

  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  const cta = dialog.locator(".mobile-menu-cta");
  await expect(cta).toBeVisible();
  await cta.tap();

  await expect(page).toHaveURL(/\/solicitar-demo(?:\?|$)/);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("form").first()).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  expect(pageErrors).toEqual([]);
});
