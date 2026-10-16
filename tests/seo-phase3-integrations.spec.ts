import { expect, test } from "@playwright/test";

const surfaces = [
  ["/integraciones/crm", /Integración CRM con IA/, /Integración CRM con IA: conecta agentes/],
  ["/en/integrations/crm", /CRM integration with AI/, /CRM integration with AI: connect agents/],
  ["/integraciones/erp", /Integración ERP con IA/, /Integración ERP con IA: conecta agentes/],
  ["/en/integrations/erp", /ERP integration with AI/, /ERP integration with AI: connect agents/],
  ["/integraciones/correo-email", /Integración de email con IA/, /Integración de email con IA: separa leer/],
  ["/en/integrations/email", /Email integration with AI/, /Email integration with AI: separate reading/],
  ["/integraciones/calendario", /Integración de calendario con IA/, /Integración de calendario con IA: disponibilidad real/],
  ["/en/integrations/calendar", /Calendar integration with AI/, /Calendar integration with AI: real availability/],
  ["/integraciones/ecommerce", /Integración ecommerce con IA/, /Integración ecommerce con IA: conecta pedidos/],
  ["/en/integrations/ecommerce", /Ecommerce integration with AI/, /Ecommerce integration with AI: connect orders/],
  ["/integraciones/ticketing", /Integración ticketing con IA/, /Integración ticketing con IA: conserva estado/],
  ["/en/integrations/ticketing", /Ticketing integration with AI/, /Ticketing integration with AI: preserve state/],
  ["/integraciones/gestion-documental", /Integración de gestión documental con IA/, /Integración de gestión documental con IA: automatiza sobre documentos/],
  ["/en/integrations/document-management", /Document management integration with AI/, /Document management integration with AI: automate around documents/],
] as const;

test.describe("Phase 3 integration SEO/GEO ownership", () => {
  test("integration hubs render their audited system-category job", async ({ page }) => {
    let response = await page.goto("/integraciones", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/Integraciones para agentes IA/i);
    await expect(page.locator("h1")).toContainText(/Integraciones para agentes IA/i);
    await expect(page.getByText(/no compite con la landing de integración empresarial/i)).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://iaempleado.com/integraciones");

    response = await page.goto("/en/integrations", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/AI agent integrations/i);
    await expect(page.locator("h1")).toContainText(/AI agent integrations/i);
    await expect(page.getByText(/does not compete with the enterprise integration landing/i)).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://iaempleado.com/en/integrations");
  });

  for (const [path, title, h1] of surfaces) {
    test(`${path} owns a distinct integration query`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(title);
      await expect(page.locator("h1")).toContainText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://iaempleado.com${path}`);
      await expect(page.locator(".organization-short-answer")).toBeVisible();
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(3);
    });
  }

  test("CRM ERP email and ecommerce keep integration separate from process automation", async ({ page }) => {
    const esPaths = [
      ["/integraciones/crm", /no equivale a automatizar por sí solo/i],
      ["/integraciones/erp", /no implica permiso general/i],
      ["/integraciones/correo-email", /qué puede leer, redactar y enviar/i],
      ["/integraciones/ecommerce", /no significa automatizar ciegamente/i],
    ] as const;

    for (const [path, boundary] of esPaths) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator(".organization-short-answer")).toContainText(boundary);
    }
  });
});
