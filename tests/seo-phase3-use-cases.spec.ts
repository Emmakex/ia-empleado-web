import { expect, test } from "@playwright/test";

const surfaces = [
  ["/casos-de-uso", /Casos de uso IA/i, /Casos de uso de IA/i],
  ["/en/use-cases", /AI use cases/i, /AI use cases/i],
  ["/casos-de-uso/incidencia-cliente", /Gestión de reclamaciones/i, /Resuelve incidencias de clientes/i],
  ["/en/use-cases/customer-issue", /Customer issue resolution/i, /Resolve customer issues/i],
  ["/casos-de-uso/validacion-facturas", /Validación de facturas/i, /Validación de facturas/i],
  ["/en/use-cases/invoice-validation", /Invoice validation/i, /Invoice validation/i],
  ["/casos-de-uso/seguimiento-comercial", /Seguimiento de leads/i, /Seguimiento de leads/i],
  ["/en/use-cases/sales-follow-up", /Sales follow up/i, /Sales follow up/i],
  ["/casos-de-uso/incidencias-pedidos", /Control de pedidos/i, /Control de pedidos/i],
  ["/en/use-cases/order-exception", /Order exception management/i, /Order exception management/i],
  ["/casos-de-uso/reservas-viajes", /Gestión de reservas/i, /Gestión de reservas/i],
  ["/en/use-cases/travel-booking", /Travel booking management/i, /Travel booking management/i],
  ["/casos-de-uso/documentacion-administrativa", /Automatización documental/i, /Automatización documental/i],
  ["/en/use-cases/administrative-documentation", /Document workflow automation/i, /Document workflow automation/i],
] as const;

test.describe("Phase 3 Batch 02 use-case ownership", () => {
  for (const [path, title, h1] of surfaces) {
    test(`${path} exposes the audited use-case intent`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(title);
      await expect(page.locator("h1")).toContainText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://iaempleado.com${path}`);
    });
  }

  test("customer issue use case stays separate from broad customer-service automation", async ({ page }) => {
    await page.goto("/casos-de-uso/incidencia-cliente", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/landing de atención al cliente conserva la intención amplia de automatización/i);
    await page.goto("/automatizacion-atencion-cliente-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/automatiza/i);
  });

  test("sales follow-up stays separate from sales automation", async ({ page }) => {
    await page.goto("/casos-de-uso/seguimiento-comercial", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/landing de automatización de ventas conserva la intención general del proceso/i);
    await page.goto("/automatizacion-ventas-sdr-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Automatización de ventas con IA/i);
  });

  test("travel booking stays separate from booking automation and travel industry context", async ({ page }) => {
    await page.goto("/casos-de-uso/reservas-viajes", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/landing de automatización de reservas conserva la intención comercial/i);
    await page.goto("/automatizacion-turismo-reservas-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Automatización de reservas con IA/i);
    await page.goto("/sectores/turismo", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/IA para turismo/i);
  });

  test("document workflow use case preserves document-management integration ownership", async ({ page }) => {
    await page.goto("/casos-de-uso/documentacion-administrativa", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/integración de gestión documental conserva la intención de acceso\/conector al sistema/i);
  });
});
