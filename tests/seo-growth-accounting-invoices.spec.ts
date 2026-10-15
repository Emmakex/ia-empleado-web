import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/empleados-ia/contabilidad-facturacion",
    title: /IA para Contabilidad y Facturación/i,
    h1: /Facturación y contabilidad operativa/i,
  },
  {
    path: "/en/ai-employees/accounting-billing",
    title: /AI for Accounting and Billing/i,
    h1: /Operational accounting and billing/i,
  },
  {
    path: "/automatizacion-facturacion-contabilidad-ia",
    title: /Automatización contable con IA/i,
    h1: /Automatización contable con IA/i,
  },
  {
    path: "/en/ai-invoicing-accounting-automation",
    title: /Accounting automation with AI/i,
    h1: /Accounting automation with AI/i,
  },
  {
    path: "/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana",
    title: /Cómo automatizar contabilidad con IA/i,
    h1: /Cómo automatizar contabilidad con IA/i,
  },
  {
    path: "/en/blog/how-to-automate-invoicing-and-accounting-with-ai-and-human-review",
    title: /How to automate accounting with AI/i,
    h1: /How to automate accounting with AI/i,
  },
  {
    path: "/casos-de-uso/validacion-facturas",
    title: /validación de facturas/i,
    h1: /Automatiza la preparación y los controles repetitivos/i,
  },
  {
    path: "/en/use-cases/invoice-validation",
    title: /invoice validation/i,
    h1: /Automate repetitive preparation and checks/i,
  },
] as const;

test.describe("Phase 2 Batch 05 accounting and invoice ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps a distinct canonical owner`, async ({ page }) => {
      const response = await page.goto(surface.path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(surface.title);
      await expect(page.locator("h1")).toContainText(surface.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://iaempleado.com${surface.path}`,
      );
    });
  }

  test("accounting automation landing links to the role, invoice use case and how-to guide", async ({ page }) => {
    await page.goto("/automatizacion-facturacion-contabilidad-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver IA para Contabilidad y Facturación/ })).toHaveAttribute(
      "href",
      "/empleados-ia/contabilidad-facturacion",
    );
    await expect(page.getByRole("link", { name: /Ver validación de facturas/ })).toHaveAttribute(
      "href",
      "/casos-de-uso/validacion-facturas",
    );
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana",
    );
  });

  test("accounting how-to guide links back to the commercial owner and product surfaces", async ({ page }) => {
    await page.goto("/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/automatizacion-facturacion-contabilidad-ia",
    );
    await expect(page.getByRole("link", { name: /Ver IA para Contabilidad/ })).toHaveAttribute(
      "href",
      "/empleados-ia/contabilidad-facturacion",
    );
    await expect(page.getByRole("link", { name: /Ver validación de facturas/ })).toHaveAttribute(
      "href",
      "/casos-de-uso/validacion-facturas",
    );
  });
});
