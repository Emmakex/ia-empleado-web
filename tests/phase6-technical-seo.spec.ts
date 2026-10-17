import { expect, test } from "@playwright/test";

const publicOrigin = "https://iaempleado.com";

test.describe("Phase 6 technical SEO/GEO closure", () => {
  test("Growth sitemap publishes reciprocal ES/EN and x-default alternates", async ({ request }) => {
    const response = await request.get("/growth-sitemap.xml");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"] ?? "").toContain("xml");

    const sitemap = await response.text();
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(sitemap).toContain('hreflang="es-ES"');
    expect(sitemap).toContain('hreflang="en"');
    expect(sitemap).toContain('hreflang="x-default"');
    expect(sitemap).toContain(`href="${publicOrigin}/blog"`);
    expect(sitemap).toContain(`href="${publicOrigin}/en/blog"`);
    expect(sitemap).not.toContain("/brand-preview/");
    expect(sitemap).not.toContain("/brand-campaign/");
    expect(sitemap).not.toContain("/api/");
  });

  test("llms.txt exposes only governed public discovery surfaces", async ({ request }) => {
    const response = await request.get("/llms.txt");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"] ?? "").toContain("text/plain");
    expect((response.headers()["x-robots-tag"] ?? "").toLowerCase()).toContain("noindex");

    const body = await response.text();
    expect(body).toContain("# IA Empleado");
    expect(body).toContain(`${publicOrigin}/sitemap.xml`);
    expect(body).toContain(`${publicOrigin}/growth-sitemap.xml`);
    expect(body).toContain(`${publicOrigin}/empleados-ia`);
    expect(body).toContain(`${publicOrigin}/en/ai-employees`);
    expect(body).toContain("Spanish is the x-default locale");
    expect(body).not.toContain("/brand-preview/");
    expect(body).not.toContain("/brand-campaign/");
    expect(body).not.toContain("/api/");
  });
});
