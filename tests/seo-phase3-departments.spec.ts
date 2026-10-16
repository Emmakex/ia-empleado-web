import { expect, test } from "@playwright/test";

const surfaces = [
  { path: "/departamentos", title: /IA por departamentos/i, h1: /IA por departamentos/i },
  { path: "/en/departments", title: /AI by department/i, h1: /AI by department/i },
  { path: "/departamentos/atencion-cliente", title: /Equipo de Atención al Cliente con IA/i, h1: /equipo de Atención al Cliente aumentado por IA/i },
  { path: "/en/departments/customer-support", title: /AI-augmented Customer Service Team/i, h1: /AI-augmented Customer Service team/i },
  { path: "/departamentos/administracion", title: /Departamento de Administración con IA/i, h1: /departamento de Administración con IA/i },
  { path: "/en/departments/administration", title: /AI-augmented Administration Team/i, h1: /AI-augmented Administration team/i },
  { path: "/departamentos/contabilidad-facturacion", title: /Departamento de Contabilidad con IA/i, h1: /departamento de Contabilidad con IA/i },
  { path: "/en/departments/accounting-billing", title: /AI-augmented Accounting Team/i, h1: /AI-augmented Accounting team/i },
  { path: "/departamentos/ventas", title: /Equipo de Ventas con IA/i, h1: /equipo de Ventas con IA/i },
  { path: "/en/departments/sales", title: /AI for Sales Teams/i, h1: /AI for sales teams/i },
  { path: "/departamentos/operaciones-ecommerce", title: /Operaciones Ecommerce con IA/i, h1: /Operaciones Ecommerce con IA/i },
  { path: "/en/departments/ecommerce-operations", title: /AI Ecommerce Operations/i, h1: /AI Ecommerce Operations/i },
  { path: "/departamentos/turismo-reservas", title: /Operaciones de Reservas con IA/i, h1: /Operaciones de Reservas con IA/i },
  { path: "/en/departments/travel-reservations", title: /AI Travel Operations/i, h1: /AI Travel Operations/i },
] as const;

test.describe("Phase 3 department ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} has audited metadata, H1 and canonical`, async ({ page }) => {
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

  test("department hub states the organizational boundary in Spanish", async ({ page }) => {
    await page.goto("/departamentos", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/intención organizativa/i)).toBeVisible();
    await expect(page.getByText(/Empleados IA siguen siendo propietarias de roles/i)).toBeVisible();
  });

  test("ecommerce operations does not claim the ecommerce-sector owner", async ({ page }) => {
    await page.goto("/departamentos/operaciones-ecommerce", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/IA para ecommerce pertenece al sector/i)).toBeVisible();
    await expect(page.getByText(/automatización ecommerce pertenece al proceso/i)).toBeVisible();
  });

  test("sales department keeps role and process owners separate", async ({ page }) => {
    await page.goto("/departamentos/ventas", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/Ventas\/SDR IA y automatización de ventas mantienen sus intenciones de rol y proceso/i)).toBeVisible();
  });
});
