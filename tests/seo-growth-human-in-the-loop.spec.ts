import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/automatizacion-ia-supervision-humana-empresas",
    title: /Human in the loop \(HITL\): supervisión humana en IA/i,
    h1: /Human in the loop \(HITL\) para IA/i,
  },
  {
    path: "/en/human-in-the-loop-ai-automation-business",
    title: /Human-in-the-loop AI \(HITL\)/i,
    h1: /Human-in-the-loop AI \(HITL\)/i,
  },
  {
    path: "/blog/como-disenar-flujos-aprobacion-empleados-ia",
    title: /Cómo diseñar un flujo de aprobación para IA/i,
    h1: /Cómo diseñar un flujo de aprobación para IA/i,
  },
  {
    path: "/en/blog/how-to-design-approval-workflows-for-ai-employees",
    title: /AI approval workflow/i,
    h1: /How to design an AI approval workflow/i,
  },
] as const;

test.describe("Phase 2 Batch 14 human-in-the-loop ownership", () => {
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

  test("Spanish HITL landing and approval guide keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/automatizacion-ia-supervision-humana-empresas", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Human in the loop \(HITL\) es un patrón de automatización/i);
    await expect(page.locator("main")).toContainText(/HITL no sustituye la gobernanza de IA/i);
    await expect(page.locator('a[href="/blog/como-disenar-flujos-aprobacion-empleados-ia"]')).toBeVisible();

    await page.goto("/blog/como-disenar-flujos-aprobacion-empleados-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta guía posee la intención de implementación sobre flujos de aprobación/i);
    await expect(page.locator('a[href="/automatizacion-ia-supervision-humana-empresas"]')).toBeVisible();
  });

  test("English HITL landing and approval guide keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/en/human-in-the-loop-ai-automation-business", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Human-in-the-loop AI \(HITL\) is an automation pattern/i);
    await expect(page.locator("main")).toContainText(/HITL does not replace AI governance/i);
    await expect(page.locator('a[href="/en/blog/how-to-design-approval-workflows-for-ai-employees"]')).toBeVisible();

    await page.goto("/en/blog/how-to-design-approval-workflows-for-ai-employees", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent for approval workflows/i);
    await expect(page.locator('a[href="/en/human-in-the-loop-ai-automation-business"]')).toBeVisible();
  });
});
