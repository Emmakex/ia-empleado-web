import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/despliegue-privado-empleado-ia",
    title: /IA privada para empresas/i,
    h1: /IA privada para empresas/i,
  },
  {
    path: "/en/private-ai-employee-deployment",
    title: /Private AI for business/i,
    h1: /Private AI for business/i,
  },
  {
    path: "/blog/como-desplegar-empleado-ia-infraestructura-privada",
    title: /IA local y on-premise/i,
    h1: /IA local, privada y on-premise/i,
  },
  {
    path: "/en/blog/how-to-deploy-ai-employee-in-private-infrastructure",
    title: /Self-hosted AI and on-premise/i,
    h1: /Self-hosted and on-premise AI/i,
  },
  {
    path: "/automatizacion-procesos-empresariales-ia",
    title: /Automatización de procesos con IA/i,
    h1: /Automatización de procesos con IA/i,
  },
  {
    path: "/en/ai-business-process-automation",
    title: /Business process automation with AI/i,
    h1: /Business process automation with AI/i,
  },
] as const;

test.describe("Phase 2 Batch 04 private AI and process automation ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its canonical URL while adopting market-language ownership`, async ({ page }) => {
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

  test("private deployment landing and guide remain reciprocal owners in Spanish", async ({ page }) => {
    await page.goto("/despliegue-privado-empleado-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-desplegar-empleado-ia-infraestructura-privada",
    );

    await page.goto("/blog/como-desplegar-empleado-ia-infraestructura-privada", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/despliegue-privado-empleado-ia",
    );
  });

  test("process automation keeps the process analyzer handoff", async ({ page }) => {
    await page.goto("/automatizacion-procesos-empresariales-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Analizar un proceso/ })).toHaveAttribute("href", "/mejora-tu-proceso");

    await page.goto("/en/ai-business-process-automation", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Analyse a process/ })).toHaveAttribute("href", "/en/improve-your-process");
  });

  test("the first-process guide remains a distinct informational support owner", async ({ page }) => {
    await page.goto("/blog/como-elegir-primer-proceso-automatizar-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Cómo automatizar procesos con IA/i);
    await expect(page.getByRole("link", { name: /Analizar proceso/ })).toHaveAttribute("href", "/mejora-tu-proceso");

    await page.goto("/en/blog/how-to-choose-first-process-to-automate-with-ai", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/How to automate business processes with AI/i);
    await expect(page.getByRole("link", { name: /Analyse process/ })).toHaveAttribute("href", "/en/improve-your-process");
  });
});
