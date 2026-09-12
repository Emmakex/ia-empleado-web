import { expect, test, type Page } from "@playwright/test";

async function scrollDeep(page: Page) {
  await page.evaluate(() => window.scrollTo(0, Math.max(900, document.body.scrollHeight)));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
}

async function expectAtPageTop(page: Page, label: string) {
  await expect.poll(
    () => page.evaluate(() => window.scrollY),
    { message: `${label} must land at the top of the destination route` },
  ).toBeLessThanOrEqual(4);
}

const internalHeroRoutes = [
  "/empleados-ia",
  "/equipos-ia",
  "/como-trabajan-juntos",
  "/disena-tu-equipo-ia",
  "/mejora-tu-proceso",
  "/calculadora-roi",
  "/comparativas",
  "/sectores",
  "/casos-de-uso",
  "/departamentos",
  "/integraciones",
];

test("internal desktop heroes use a bounded heading scale", async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 900 });

  for (const route of internalHeroRoutes) {
    await test.step(route, async () => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} must load successfully`).toBeTruthy();

      const heading = page.locator("main#contenido > section:first-child h1").first();
      await expect(heading, `${route} must expose its primary H1 in the first hero`).toBeVisible();

      const metrics = await heading.evaluate((node) => ({
        fontSize: Number.parseFloat(getComputedStyle(node).fontSize),
        lineHeight: Number.parseFloat(getComputedStyle(node).lineHeight),
        width: (node as HTMLElement).getBoundingClientRect().width,
      }));

      expect(metrics.fontSize, `${route} H1 must not dominate desktop`).toBeLessThanOrEqual(76);
      expect(metrics.fontSize, `${route} H1 must remain prominent`).toBeGreaterThanOrEqual(42);
      expect(metrics.lineHeight, `${route} H1 must keep readable line rhythm`).toBeGreaterThanOrEqual(metrics.fontSize * 0.98);
      expect(metrics.width, `${route} H1 must stay inside the content column`).toBeLessThanOrEqual(900);
    });
  }
});

test("internal mobile heroes keep titles compact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/empleados-ia", "/equipos-ia", "/como-trabajan-juntos", "/mejora-tu-proceso"]) {
    await test.step(route, async () => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const heading = page.locator("main#contenido > section:first-child h1").first();
      await expect(heading).toBeVisible();
      const fontSize = await heading.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
      expect(fontSize, `${route} mobile H1 must remain compact`).toBeLessThanOrEqual(40);
    });
  }
});

test("desktop menu route navigation always opens the destination at the top", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await scrollDeep(page);

  await page.locator('.main-nav a[href="/empleados-ia"]').click();
  await page.waitForURL(/\/empleados-ia$/);
  await expectAtPageTop(page, "desktop direct navigation");

  await scrollDeep(page);
  await page.locator(".site-nav-explore summary").click();
  await page.locator('.site-nav-mega a[href="/mejora-tu-proceso"]').click();
  await page.waitForURL(/\/mejora-tu-proceso$/);
  await expectAtPageTop(page, "desktop Explore navigation");
});

test("mobile menu route navigation always opens the destination at the top", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/equipos-ia", { waitUntil: "networkidle" });
  await scrollDeep(page);

  await page.locator(".mobile-menu-toggle").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.locator('a[href="/sectores"]').click();
  await page.waitForURL(/\/sectores$/);
  await expectAtPageTop(page, "mobile menu navigation");
});

test("intentional hash navigation still lands on its section", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/empleados-ia", { waitUntil: "networkidle" });

  await page.locator(".site-nav-explore summary").click();
  await page.locator('.site-nav-mega a[href="/#seguridad"]').click();
  await page.waitForURL(/\/#seguridad$/);

  await expect(page.locator("#seguridad")).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
});
