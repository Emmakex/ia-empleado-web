import { expect, test } from "@playwright/test";

const surfaces = [
  ["/sectores", /IA por sectores/, /IA por sectores/],
  ["/en/sectors", /AI by industry/, /AI by industry/],
  ["/sectores/ecommerce", /IA para ecommerce/, /IA para ecommerce/],
  ["/en/sectors/ecommerce", /AI for ecommerce/, /AI for ecommerce/],
  ["/sectores/turismo", /IA para turismo/, /IA para turismo/],
  ["/en/sectors/travel", /AI for travel/, /AI for travel/],
  ["/sectores/servicios-profesionales", /IA para servicios profesionales/, /IA para servicios profesionales/],
  ["/en/sectors/professional-services", /AI for professional services/, /AI for professional services/],
  ["/sectores/ventas", /IA para ventas B2B/, /IA para ventas B2B/],
  ["/en/sectors/sales", /AI for B2B sales/, /AI for B2B sales/],
] as const;

test.describe("Phase 3 Batch 01 sector ownership", () => {
  for (const [path, title, h1] of surfaces) {
    test(`${path} exposes the audited sector intent`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(title);
      await expect(page.locator("h1")).toContainText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://iaempleado.com${path}`);
    });
  }

  test("ecommerce sector stays separate from ecommerce automation", async ({ page }) => {
    await page.goto("/sectores/ecommerce", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/modelo operativo completo, sus sistemas, riesgos y handoffs/i);
    await page.goto("/automatizacion-ecommerce-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Automatización ecommerce con IA/i);
  });

  test("travel sector stays separate from booking automation", async ({ page }) => {
    await page.goto("/sectores/turismo", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/automatización de reservas conserva su propia intención de proceso/i);
    await page.goto("/automatizacion-turismo-reservas-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Automatización de reservas con IA/i);
  });

  test("B2B sales sector stays separate from broad sales automation", async ({ page }) => {
    await page.goto("/sectores/ventas", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/landing de automatización de ventas conserva la intención general del proceso/i);
    await page.goto("/automatizacion-ventas-sdr-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Automatización de ventas con IA/i);
  });
});
