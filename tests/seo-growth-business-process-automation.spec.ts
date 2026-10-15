import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/automatizacion-procesos-empresariales-ia",
    title: /Automatización de procesos con IA para empresas/i,
    h1: /Automatización de procesos con IA/i,
  },
  {
    path: "/en/ai-business-process-automation",
    title: /Business process automation with AI/i,
    h1: /Business process automation with AI/i,
  },
  {
    path: "/blog/como-elegir-primer-proceso-automatizar-ia",
    title: /Cómo automatizar procesos con IA/i,
    h1: /Cómo automatizar procesos con IA/i,
  },
  {
    path: "/en/blog/how-to-choose-first-process-to-automate-with-ai",
    title: /How to automate business processes with AI/i,
    h1: /How to automate business processes with AI/i,
  },
] as const;

test.describe("Phase 2 Batch 10 business-process automation ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its own canonical owner`, async ({ page }) => {
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

  test("commercial process-automation owner links to guide and Process Analyzer", async ({ page }) => {
    await page.goto("/automatizacion-procesos-empresariales-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-elegir-primer-proceso-automatizar-ia",
    );
    await expect(page.getByRole("link", { name: /Analizar un proceso/ })).toHaveAttribute(
      "href",
      "/mejora-tu-proceso",
    );
  });

  test("how-to guide links back to category owner and Process Analyzer", async ({ page }) => {
    await page.goto("/blog/como-elegir-primer-proceso-automatizar-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/automatizacion-procesos-empresariales-ia",
    );
    await expect(page.getByRole("link", { name: /Analizar proceso/ })).toHaveAttribute(
      "href",
      "/mejora-tu-proceso",
    );
  });
});
