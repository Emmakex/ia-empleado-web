import { expect, test } from "@playwright/test";

const legalRoutes = [
  {
    route: "/aviso-legal",
    title: "Aviso legal",
    canonical: "/aviso-legal",
    alternate: "/en/legal-notice",
  },
  {
    route: "/politica-de-privacidad",
    title: "Política de privacidad",
    canonical: "/politica-de-privacidad",
    alternate: "/en/privacy-policy",
  },
  {
    route: "/en/legal-notice",
    title: "Legal notice",
    canonical: "/en/legal-notice",
    alternate: "/aviso-legal",
  },
  {
    route: "/en/privacy-policy",
    title: "Privacy policy",
    canonical: "/en/privacy-policy",
    alternate: "/politica-de-privacidad",
  },
] as const;

test("Phase 8H publishes complete bilingual legal and privacy surfaces", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const entry of legalRoutes) {
    await test.step(entry.route, async () => {
      const response = await page.goto(entry.route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${entry.route} must return success`).toBeTruthy();
      await expect(page.getByRole("heading", { level: 1, name: entry.title })).toBeVisible();
      await expect(page.getByText("Eduardo Jose Yauri Luna", { exact: false }).first()).toBeVisible();
      await expect(page.getByText("60281451S", { exact: false }).first()).toBeVisible();
      await expect(page.getByText("Reina Amalia 8, 4 2, Barcelona, España", { exact: false }).first()).toBeVisible();
      await expect(page.getByText("info@iaempleado.com", { exact: false }).first()).toBeVisible();
      await expect(page.locator("[data-legal-identity-incomplete]")).toHaveCount(0);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", new RegExp(`${entry.canonical.replaceAll("/", "\\/")}$`));

      const alternateLinks = page.locator('link[rel="alternate"][hreflang]');
      const hrefs = await alternateLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
      expect(hrefs.some((href) => href.endsWith(entry.alternate)), `${entry.route} must expose its language alternate`).toBeTruthy();

      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots?.toLowerCase() ?? "").not.toContain("noindex");
      expect(pageErrors.splice(0), `${entry.route} must not emit uncaught page errors`).toEqual([]);
    });
  }
});

test("Phase 8H footer exposes real legal destinations in ES and EN", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const esFooter = page.locator("footer");
  await expect(esFooter.getByRole("link", { name: "Política de privacidad" })).toHaveAttribute("href", "/politica-de-privacidad");
  await expect(esFooter.getByRole("link", { name: "Aviso legal" })).toHaveAttribute("href", "/aviso-legal");

  await page.goto("/en", { waitUntil: "domcontentloaded" });
  const enFooter = page.locator("footer");
  await expect(enFooter.getByRole("link", { name: "Privacy policy" })).toHaveAttribute("href", "/en/privacy-policy");
  await expect(enFooter.getByRole("link", { name: "Legal notice" })).toHaveAttribute("href", "/en/legal-notice");
});
