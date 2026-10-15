import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/automatizacion-vacaciones-ausencias-ia",
    title: /Gestión de vacaciones y ausencias con IA/i,
    h1: /Gestión de vacaciones y ausencias con IA/i,
  },
  {
    path: "/en/ai-leave-management-automation",
    title: /Leave management with AI/i,
    h1: /Leave management with AI/i,
  },
  {
    path: "/blog/como-automatizar-vacaciones-ausencias-ia",
    title: /Cómo planificar vacaciones y gestionar ausencias/i,
    h1: /Cómo planificar vacaciones y gestionar ausencias/i,
  },
  {
    path: "/en/blog/how-to-automate-leave-management-with-ai",
    title: /How to manage employee absence and leave with AI/i,
    h1: /How to manage employee absence and leave with AI/i,
  },
  {
    path: "/empleados-ia/administrativo",
    title: /Agente IA Administrativo/i,
  },
  {
    path: "/en/ai-employees/administrative",
    title: /AI Administrative Assistant/i,
  },
] as const;

test.describe("Phase 2 Batch 08 leave-management ownership", () => {
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

  test("leave landing links to its guide and the supporting administrative role", async ({ page }) => {
    await page.goto("/automatizacion-vacaciones-ausencias-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-automatizar-vacaciones-ausencias-ia",
    );
    await expect(page.getByRole("link", { name: /Ver Agente IA Administrativo/ })).toHaveAttribute(
      "href",
      "/empleados-ia/administrativo",
    );
  });

  test("leave guide links back to the commercial owner and bounded administrative support", async ({ page }) => {
    await page.goto("/blog/como-automatizar-vacaciones-ausencias-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/automatizacion-vacaciones-ausencias-ia",
    );
    await expect(page.getByRole("link", { name: /Ver Agente IA Administrativo/ })).toHaveAttribute(
      "href",
      "/empleados-ia/administrativo",
    );
    await expect(page.getByRole("link", { name: /Ver gestión documental/ })).toHaveAttribute(
      "href",
      "/casos-de-uso/documentacion-administrativa",
    );
  });
});
