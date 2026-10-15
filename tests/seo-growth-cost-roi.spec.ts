import { expect, test } from "@playwright/test";

const consolidatedArticles = [
  ["/blog/cuanto-cuesta-implementar-empleado-ia", "/coste-empleado-ia"],
  ["/en/blog/how-much-does-an-ai-employee-cost", "/en/ai-employee-cost"],
  ["/blog/como-calcular-roi-empleado-ia", "/calculadora-roi"],
  ["/en/blog/how-to-calculate-ai-employee-roi", "/en/roi-calculator"],
] as const;

test.describe("Phase 2 Batch 03 cost and ROI consolidation", () => {
  for (const [source, destination] of consolidatedArticles) {
    test(`${source} permanently redirects to ${destination}`, async ({ request }) => {
      const response = await request.get(source, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      const location = response.headers().location;
      expect(location).toBeTruthy();
      expect(new URL(location!, "https://iaempleado.com").pathname).toBe(destination);
    });
  }

  test("consolidated support articles are removed from the Growth sitemap", async ({ request }) => {
    const response = await request.get("/growth-sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();

    for (const [source] of consolidatedArticles) {
      expect(xml).not.toContain(source);
    }

    expect(xml).toContain("/coste-empleado-ia");
    expect(xml).toContain("/en/ai-employee-cost");
    expect(xml).toContain("/roi-empleado-ia");
    expect(xml).toContain("/en/ai-employee-roi");
  });

  test("Spanish cost and ROI owners expose the contextual ROI-calculator handoff", async ({ page }) => {
    await page.goto("/coste-empleado-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Calcular un escenario de ROI/ })).toHaveAttribute("href", "/calculadora-roi");

    await page.goto("/roi-empleado-ia", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Calcular un escenario de ROI/ })).toHaveAttribute("href", "/calculadora-roi");
  });

  test("English cost and ROI owners expose the contextual ROI-calculator handoff", async ({ page }) => {
    await page.goto("/en/ai-employee-cost", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Calculate an ROI scenario/ })).toHaveAttribute("href", "/en/roi-calculator");

    await page.goto("/en/ai-employee-roi", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Calculate an ROI scenario/ })).toHaveAttribute("href", "/en/roi-calculator");
  });

  test("ROI calculator links back to cost and ROI evaluation owners in Spanish", async ({ page }) => {
    await page.goto("/calculadora-roi", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Entender cómo evaluar el ROI de IA/ })).toHaveAttribute("href", "/roi-empleado-ia");
    await expect(page.getByRole("link", { name: /Revisar el coste total de implantación/ })).toHaveAttribute("href", "/coste-empleado-ia");
  });

  test("ROI calculator links back to cost and ROI evaluation owners in English", async ({ page }) => {
    await page.goto("/en/roi-calculator", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Understand how to evaluate AI ROI/ })).toHaveAttribute("href", "/en/ai-employee-roi");
    await expect(page.getByRole("link", { name: /Review total implementation cost/ })).toHaveAttribute("href", "/en/ai-employee-cost");
  });
});
