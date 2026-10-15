import { expect, test } from "@playwright/test";

const publicOrigin = "https://iaempleado.com";

const definitionRoutes = [
  {
    legacy: "/blog/que-es-un-empleado-ia-y-como-se-diferencia-de-un-chatbot",
    current: "/blog/que-es-un-agente-ia",
    title: /Qué es un agente IA/i,
    comparison: "/comparativas/chatbot",
  },
  {
    legacy: "/en/blog/what-is-an-ai-employee-and-how-is-it-different-from-a-chatbot",
    current: "/en/blog/what-is-an-ai-agent",
    title: /What is an AI agent/i,
    comparison: "/en/comparisons/chatbot",
  },
] as const;

test.describe("Phase 2 definition article repositioning", () => {
  for (const route of definitionRoutes) {
    test(`${route.legacy} permanently redirects to the repositioned article`, async ({ request }) => {
      const response = await request.get(route.legacy, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      const location = response.headers().location;
      expect(location).toBeTruthy();
      expect(new URL(location!, publicOrigin).pathname).toBe(route.current);
    });

    test(`${route.current} owns the informational definition intent`, async ({ page }) => {
      const response = await page.goto(route.current, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("h1")).toContainText(route.title);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(new URL(canonical!, publicOrigin).pathname).toBe(route.current);
      await expect(page.locator(`a[href="${route.comparison}"]`)).toBeVisible();
    });
  }

  test("Growth sitemap exposes the repositioned article and not the legacy slugs", async ({ request }) => {
    const response = await request.get("/growth-sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();

    for (const route of definitionRoutes) {
      expect(xml).toContain(route.current);
      expect(xml).not.toContain(route.legacy);
    }
  });
});

test.describe("Customer service role and process ownership", () => {
  test("Spanish process landing links to the canonical customer-support role", async ({ page }) => {
    await page.goto("/automatizacion-atencion-cliente-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/empleados-ia/atencion-cliente"]')).toBeVisible();
  });

  test("English process landing links to the canonical customer-support role", async ({ page }) => {
    await page.goto("/en/ai-customer-service-automation", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/ai-employees/customer-support"]')).toBeVisible();
  });

  test("Spanish role links back to the process landing and support guide", async ({ page }) => {
    await page.goto("/empleados-ia/atencion-cliente", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/automatizacion-atencion-cliente-ia"]')).toBeVisible();
    await expect(page.locator('a[href="/blog/como-automatizar-atencion-al-cliente-con-ia-sin-perder-control-humano"]')).toBeVisible();
  });

  test("English role links back to the process landing and support guide", async ({ page }) => {
    await page.goto("/en/ai-employees/customer-support", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/en/ai-customer-service-automation"]')).toBeVisible();
    await expect(page.locator('a[href="/en/blog/how-to-automate-customer-service-with-ai-without-losing-human-control"]')).toBeVisible();
  });
});
