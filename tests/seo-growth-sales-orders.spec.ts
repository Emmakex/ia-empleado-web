import { expect, test } from "@playwright/test";

const surfaces = [
  { path: "/empleados-ia/comercial-sdr", title: /Agente IA para Ventas y SDR/i },
  { path: "/en/ai-employees/sales-sdr", title: /AI SDR and Sales Agent/i },
  { path: "/automatizacion-pedidos-ventas-ia-erp", title: /Automatización de pedidos/i },
  { path: "/en/ai-sales-order-processing-automation-erp", title: /sales order/i },
  { path: "/blog/como-automatizar-procesamiento-pedidos-b2b-ia", title: /Cómo automatizar pedidos B2B/i },
  { path: "/en/blog/how-to-automate-b2b-sales-order-processing-ai", title: /How to automate B2B sales order processing/i },
  { path: "/casos-de-uso/incidencias-pedidos", title: /Control de pedidos e incidencias con IA/i },
  { path: "/en/use-cases/order-exception", title: /Order exception management with AI/i },
] as const;

test.describe("Phase 2 Batch 06 sales-order ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its own canonical`, async ({ page }) => {
      const response = await page.goto(surface.path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(surface.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://iaempleado.com${surface.path}`,
      );
    });
  }

  test("sales-order landing connects the process to the guide, sales role and order-exception use case", async ({ page }) => {
    await page.goto("/automatizacion-pedidos-ventas-ia-erp", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-automatizar-procesamiento-pedidos-b2b-ia",
    );
    await expect(page.getByRole("link", { name: /Ver Agente IA para Ventas y SDR/ })).toHaveAttribute(
      "href",
      "/empleados-ia/comercial-sdr",
    );
    await expect(page.getByRole("link", { name: /Ver incidencias de pedidos/ })).toHaveAttribute(
      "href",
      "/casos-de-uso/incidencias-pedidos",
    );
  });

  test("sales-order how-to guide links back to the commercial owner and distinct product surfaces", async ({ page }) => {
    await page.goto("/blog/como-automatizar-procesamiento-pedidos-b2b-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/automatizacion-pedidos-ventas-ia-erp",
    );
    await expect(page.getByRole("link", { name: /Ver Agente IA para Ventas/ })).toHaveAttribute(
      "href",
      "/empleados-ia/comercial-sdr",
    );
    await expect(page.getByRole("link", { name: /Ver incidencias de pedidos/ })).toHaveAttribute(
      "href",
      "/casos-de-uso/incidencias-pedidos",
    );
  });
});
