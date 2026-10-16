import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/respuesta-incidentes-empleados-ia-empresas",
    title: /Respuesta a incidentes de IA: contención y recuperación/i,
    h1: /Respuesta a incidentes de IA: contener, recuperar y aprender/i,
  },
  {
    path: "/en/ai-employee-incident-response-business",
    title: /AI incident response: containment and recovery/i,
    h1: /AI incident response: contain, recover and learn/i,
  },
  {
    path: "/blog/playbook-respuesta-incidentes-empleados-ia",
    title: /Plan de respuesta a incidentes de IA: playbook práctico/i,
    h1: /Cómo crear un plan de respuesta a incidentes de IA/i,
  },
  {
    path: "/en/blog/ai-employee-incident-response-playbook",
    title: /Incident response playbook for AI systems/i,
    h1: /How to build an incident response playbook for AI systems/i,
  },
] as const;

test.describe("Phase 2 Batch 16 AI incident-response ownership", () => {
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

  test("Spanish incident-response landing and playbook keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/respuesta-incidentes-empleados-ia-empresas", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/La respuesta a incidentes de IA es el proceso coordinado/i);
    await expect(page.locator("main")).toContainText(/La observabilidad detecta y explica señales/i);
    await expect(page.locator('a[href="/blog/playbook-respuesta-incidentes-empleados-ia"]')).toBeVisible();

    await page.goto("/blog/playbook-respuesta-incidentes-empleados-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta guía posee la intención de implementación/i);
    await expect(page.locator('a[href="/respuesta-incidentes-empleados-ia-empresas"]')).toBeVisible();
  });

  test("English incident-response landing and playbook keep distinct reciprocal jobs", async ({ page }) => {
    await page.goto("/en/ai-employee-incident-response-business", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/AI incident response is the coordinated process/i);
    await expect(page.locator("main")).toContainText(/Observability detects and explains signals/i);
    await expect(page.locator('a[href="/en/blog/ai-employee-incident-response-playbook"]')).toBeVisible();

    await page.goto("/en/blog/ai-employee-incident-response-playbook", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent/i);
    await expect(page.locator('a[href="/en/ai-employee-incident-response-business"]')).toBeVisible();
  });
});
