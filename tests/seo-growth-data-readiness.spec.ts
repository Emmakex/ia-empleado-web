import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/preparacion-datos-empresa-ia",
    title: /Calidad de datos para IA en empresas/i,
    h1: /Calidad de datos para IA/i,
  },
  {
    path: "/en/enterprise-ai-data-readiness",
    title: /Data readiness for AI/i,
    h1: /Data readiness for AI/i,
  },
  {
    path: "/blog/checklist-preparacion-datos-antes-conectar-ia",
    title: /Cómo mejorar la calidad de los datos antes de usar IA/i,
    h1: /Cómo mejorar la calidad de los datos/i,
  },
  {
    path: "/en/blog/data-readiness-checklist-before-connecting-ai",
    title: /How to prepare data for AI/i,
    h1: /How to prepare data for AI/i,
  },
] as const;

test.describe("Phase 2 Batch 11 data-readiness ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its existing canonical while adopting researched data-quality intent`, async ({ page }) => {
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

  test("Spanish landing and implementation guide remain reciprocal owners", async ({ page }) => {
    await page.goto("/preparacion-datos-empresa-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/blog/checklist-preparacion-datos-antes-conectar-ia"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/fuente de verdad/i);

    await page.goto("/blog/checklist-preparacion-datos-antes-conectar-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/preparacion-datos-empresa-ia"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/preparar y comprobar/i);
  });

  test("English landing and implementation guide remain reciprocal owners", async ({ page }) => {
    await page.goto("/en/enterprise-ai-data-readiness", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/blog/data-readiness-checklist-before-connecting-ai"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/system is authoritative/i);

    await page.goto("/en/blog/data-readiness-checklist-before-connecting-ai", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/enterprise-ai-data-readiness"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/prepare and test the data set/i);
  });
});
