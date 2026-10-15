import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/automatizacion-gestion-gastos-ia",
    title: /Gestión de gastos de empresa con IA/i,
    h1: /Gestión de gastos con IA/i,
  },
  {
    path: "/en/ai-expense-management-automation",
    title: /Expense management automation with AI/i,
    h1: /Expense management automation with AI/i,
  },
  {
    path: "/blog/como-automatizar-gestion-gastos-ia",
    title: /Nota de gastos: cómo automatizar el proceso con IA/i,
    h1: /Nota de gastos: cómo automatizar captura, aprobación y contabilización/i,
  },
  {
    path: "/en/blog/how-to-automate-expense-management-with-ai",
    title: /Expense management process: how to automate claims with AI/i,
    h1: /Expense management process: how to automate claims and accounting with AI/i,
  },
  {
    path: "/empleados-ia/contabilidad-facturacion",
    title: /IA para Contabilidad/i,
  },
  {
    path: "/en/ai-employees/accounting-billing",
    title: /AI for Accounting/i,
  },
] as const;

test.describe("Phase 2 Batch 09 expense-management ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its own canonical owner`, async ({ page }) => {
      const response = await page.goto(surface.path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(surface.title);
      if ("h1" in surface && surface.h1) await expect(page.locator("h1")).toContainText(surface.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://iaempleado.com${surface.path}`,
      );
    });
  }

  test("expense landing links to its guide and accounting role", async ({ page }) => {
    await page.goto("/automatizacion-gestion-gastos-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-automatizar-gestion-gastos-ia",
    );
    await expect(page.getByRole("link", { name: /Ver IA para Contabilidad y Facturación/ })).toHaveAttribute(
      "href",
      "/empleados-ia/contabilidad-facturacion",
    );
  });

  test("expense guide links back to commercial owner and accounting role", async ({ page }) => {
    await page.goto("/blog/como-automatizar-gestion-gastos-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/automatizacion-gestion-gastos-ia",
    );
    await expect(page.getByRole("link", { name: /Ver IA para Contabilidad/ })).toHaveAttribute(
      "href",
      "/empleados-ia/contabilidad-facturacion",
    );
  });
});
