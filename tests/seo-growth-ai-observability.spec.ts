import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/observabilidad-empleados-ia-empresas",
    title: /Observabilidad de IA: monitorización de agentes en producción/i,
    h1: /Observabilidad de IA: controla agentes/i,
  },
  {
    path: "/en/ai-employee-observability-business",
    title: /AI observability for agents in production/i,
    h1: /AI observability: monitor agents/i,
  },
  {
    path: "/blog/como-monitorizar-empleados-ia-produccion",
    title: /Monitoreo de IA: cómo monitorizar agentes en producción/i,
    h1: /Cómo monitorizar agentes IA en producción/i,
  },
  {
    path: "/en/blog/how-to-monitor-ai-employees-in-production",
    title: /AI agent monitoring in production/i,
    h1: /How to monitor AI agents in production/i,
  },
] as const;

test.describe("Phase 2 Batch 15 AI observability ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its existing canonical and optimized search intent`, async ({ page }) => {
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

  test("Spanish observability landing and monitoring guide keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/observabilidad-empleados-ia-empresas", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/La observabilidad de IA es la capacidad de reconstruir y medir/i);
    await expect(page.locator("main")).toContainText(/La gobernanza define responsabilidades y límites/i);
    await expect(page.locator('a[href="/blog/como-monitorizar-empleados-ia-produccion"]')).toBeVisible();

    await page.goto("/blog/como-monitorizar-empleados-ia-produccion", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta guía posee la intención de implementación/i);
    await expect(page.locator('a[href="/observabilidad-empleados-ia-empresas"]')).toBeVisible();
  });

  test("English observability landing and monitoring guide keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/en/ai-employee-observability-business", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/AI observability is the ability to reconstruct and measure/i);
    await expect(page.locator("main")).toContainText(/Governance defines responsibilities and boundaries/i);
    await expect(page.locator('a[href="/en/blog/how-to-monitor-ai-employees-in-production"]')).toBeVisible();

    await page.goto("/en/blog/how-to-monitor-ai-employees-in-production", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent/i);
    await expect(page.locator('a[href="/en/ai-employee-observability-business"]')).toBeVisible();
  });
});
