import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/integracion-ia-sistemas-empresariales",
    title: /Integración de IA con sistemas empresariales/i,
    h1: /Integración de IA con sistemas empresariales/i,
  },
  {
    path: "/en/enterprise-ai-systems-integration",
    title: /Enterprise AI integration/i,
    h1: /Enterprise AI integration/i,
  },
  {
    path: "/blog/como-conectar-empleado-ia-crm-erp-email-apis",
    title: /Cómo integrar IA con CRM, ERP y APIs/i,
    h1: /Cómo integrar IA con CRM, ERP, email y APIs/i,
  },
  {
    path: "/en/blog/how-to-connect-ai-employee-to-crm-erp-email-apis",
    title: /How to integrate AI with CRM, ERP and APIs/i,
    h1: /How to integrate AI with CRM, ERP, email and APIs/i,
  },
] as const;

test.describe("Phase 2 Batch 13 enterprise AI integration ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its existing canonical while adopting researched integration intent`, async ({ page }) => {
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

  test("Spanish landing, guide and integration catalog retain distinct connected jobs", async ({ page }) => {
    await page.goto("/integracion-ia-sistemas-empresariales", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/blog/como-conectar-empleado-ia-crm-erp-email-apis"]')).toBeVisible();
    await expect(page.locator('a[href="/integraciones"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/La integración de IA es la conexión controlada/i);

    await page.goto("/blog/como-conectar-empleado-ia-crm-erp-email-apis", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/integracion-ia-sistemas-empresariales"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/la landing de integración de IA conserva la intención de categoría y evaluación/i);
  });

  test("English landing, guide and integration catalog retain distinct connected jobs", async ({ page }) => {
    await page.goto("/en/enterprise-ai-systems-integration", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/blog/how-to-connect-ai-employee-to-crm-erp-email-apis"]')).toBeVisible();
    await expect(page.locator('a[href="/en/integrations"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/Enterprise AI integration is the controlled connection/i);

    await page.goto("/en/blog/how-to-connect-ai-employee-to-crm-erp-email-apis", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/enterprise-ai-systems-integration"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/landing retains category and evaluation intent/i);
  });
});
