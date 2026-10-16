import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/automatizacion-onboarding-empleados-ia",
    title: /Onboarding de empleados con IA/i,
    h1: /Onboarding de empleados con IA/i,
  },
  {
    path: "/en/ai-employee-onboarding-automation",
    title: /Employee onboarding automation with AI/i,
    h1: /Employee onboarding automation with AI/i,
  },
  {
    path: "/blog/como-automatizar-onboarding-empleados-ia",
    title: /Proceso de onboarding/i,
    h1: /Proceso de onboarding de empleados/i,
  },
  {
    path: "/en/blog/how-to-automate-employee-onboarding-with-ai",
    title: /Employee onboarding process/i,
    h1: /Employee onboarding process/i,
  },
  {
    path: "/empleados-ia/administrativo",
    title: /Agente IA Administrativo/i,
  },
  {
    path: "/en/ai-employees/administrative",
    title: /AI Administrative Assistant/i,
  },
  {
    path: "/casos-de-uso/documentacion-administrativa",
    title: /Automatización documental con IA/i,
  },
  {
    path: "/en/use-cases/administrative-documentation",
    title: /Document workflow automation with AI/i,
  },
] as const;

test.describe("Phase 2 Batch 07 employee onboarding ownership", () => {
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

  test("onboarding landing connects the commercial process to its guide and supporting administrative surfaces", async ({ page }) => {
    await page.goto("/automatizacion-onboarding-empleados-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Leer la guía/ })).toHaveAttribute(
      "href",
      "/blog/como-automatizar-onboarding-empleados-ia",
    );
    await expect(page.getByRole("link", { name: /Ver Agente IA Administrativo/ })).toHaveAttribute(
      "href",
      "/empleados-ia/administrativo",
    );
    await expect(page.getByRole("link", { name: /Ver gestión documental administrativa/ })).toHaveAttribute(
      "href",
      "/casos-de-uso/documentacion-administrativa",
    );
  });

  test("onboarding guide links back to the commercial owner while keeping administrative support distinct", async ({ page }) => {
    await page.goto("/blog/como-automatizar-onboarding-empleados-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Ver solución/ })).toHaveAttribute(
      "href",
      "/automatizacion-onboarding-empleados-ia",
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
