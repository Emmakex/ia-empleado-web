import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/gobernanza-ia-empresas",
    title: /Gobernanza de IA para empresas/i,
    h1: /Gobernanza de IA para empresas/i,
  },
  {
    path: "/en/enterprise-ai-governance",
    title: /AI governance for business/i,
    h1: /AI governance for business/i,
  },
  {
    path: "/blog/checklist-gobernanza-ia-empresas",
    title: /Cómo implementar gobernanza de IA/i,
    h1: /Cómo implementar gobernanza de IA/i,
  },
  {
    path: "/en/blog/enterprise-ai-governance-checklist",
    title: /AI governance framework/i,
    h1: /AI governance framework/i,
  },
] as const;

test.describe("Phase 2 Batch 12 AI-governance ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its existing canonical while adopting researched governance intent`, async ({ page }) => {
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

  test("Spanish governance landing and implementation guide remain reciprocal owners", async ({ page }) => {
    await page.goto("/gobernanza-ia-empresas", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/blog/checklist-gobernanza-ia-empresas"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/responsabilidades, permisos, políticas, controles y evidencias/i);

    await page.goto("/blog/checklist-gobernanza-ia-empresas", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/gobernanza-ia-empresas"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/Esta guía posee la intención de implementación/i);
  });

  test("English governance landing and framework guide remain reciprocal owners", async ({ page }) => {
    await page.goto("/en/enterprise-ai-governance", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/blog/enterprise-ai-governance-checklist"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/responsibilities, permissions, policies, controls and evidence/i);

    await page.goto("/en/blog/enterprise-ai-governance-checklist", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/enterprise-ai-governance"]')).toBeVisible();
    await expect(page.locator("main")).toContainText(/This guide owns framework and implementation intent/i);
  });
});
