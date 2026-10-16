import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/piloto-empleado-ia-empresa",
    title: /Piloto de IA para empresas: valida antes de escalar/i,
    h1: /Piloto de IA para empresas: valida valor/i,
  },
  {
    path: "/en/ai-employee-pilot-business",
    title: /AI pilot for business: validate before scaling/i,
    h1: /AI pilot for business: validate value/i,
  },
  {
    path: "/blog/como-lanzar-piloto-empleado-ia-empresa",
    title: /Cómo lanzar un proyecto piloto de IA en una empresa/i,
    h1: /Cómo lanzar un proyecto piloto de IA/i,
  },
  {
    path: "/en/blog/how-to-run-ai-employee-pilot-business",
    title: /How to run an AI pilot project in a business/i,
    h1: /How to run an AI pilot project/i,
  },
] as const;

test.describe("Phase 2 Batch 17 AI pilot ownership", () => {
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

  test("Spanish pilot landing and project guide keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/piloto-empleado-ia-empresa", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Un piloto de IA empresarial es una prueba controlada/i);
    await expect(page.locator("main")).toContainText(/No es una demo aislada ni un despliegue completo/i);
    await expect(page.locator('a[href="/blog/como-lanzar-piloto-empleado-ia-empresa"]')).toBeVisible();

    await page.goto("/blog/como-lanzar-piloto-empleado-ia-empresa", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta guía posee la intención de implementación/i);
    await expect(page.locator('a[href="/piloto-empleado-ia-empresa"]')).toBeVisible();
  });

  test("English pilot landing and project guide keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/en/ai-employee-pilot-business", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/A business AI pilot is a controlled test/i);
    await expect(page.locator("main")).toContainText(/neither an isolated demo nor a full deployment/i);
    await expect(page.locator('a[href="/en/blog/how-to-run-ai-employee-pilot-business"]')).toBeVisible();

    await page.goto("/en/blog/how-to-run-ai-employee-pilot-business", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent/i);
    await expect(page.locator('a[href="/en/ai-employee-pilot-business"]')).toBeVisible();
  });
});
