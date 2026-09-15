import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

type Locale = "es" | "en";

type RouteFamily = {
  label: string;
  es: string;
  en: string;
  detailPrefix: { es: string; en: string };
};

const publicOrigin = "https://iaempleado.com";

const criticalRoutes = [
  "/",
  "/en",
  "/empleados-ia",
  "/en/ai-employees",
  "/equipos-ia",
  "/en/ai-teams",
  "/como-trabajan-juntos",
  "/en/see-team-work",
  "/disena-tu-equipo-ia",
  "/en/design-your-ai-team",
  "/mejora-tu-proceso",
  "/en/improve-your-process",
  "/calculadora-roi",
  "/en/roi-calculator",
  "/solicitar-demo",
  "/en/request-demo",
] as const;

const commercialFamilies: RouteFamily[] = [
  { label: "employees", es: "/empleados-ia", en: "/en/ai-employees", detailPrefix: { es: "/empleados-ia/", en: "/en/ai-employees/" } },
  { label: "teams", es: "/equipos-ia", en: "/en/ai-teams", detailPrefix: { es: "/equipos-ia/", en: "/en/ai-teams/" } },
  { label: "comparisons", es: "/comparativas", en: "/en/comparisons", detailPrefix: { es: "/comparativas/", en: "/en/comparisons/" } },
  { label: "sectors", es: "/sectores", en: "/en/sectors", detailPrefix: { es: "/sectores/", en: "/en/sectors/" } },
  { label: "use-cases", es: "/casos-de-uso", en: "/en/use-cases", detailPrefix: { es: "/casos-de-uso/", en: "/en/use-cases/" } },
  { label: "departments", es: "/departamentos", en: "/en/departments", detailPrefix: { es: "/departamentos/", en: "/en/departments/" } },
  { label: "integrations", es: "/integraciones", en: "/en/integrations", detailPrefix: { es: "/integraciones/", en: "/en/integrations/" } },
];

const routeLocale = (route: string): Locale => route === "/en" || route.startsWith("/en/") ? "en" : "es";
const canonicalFor = (route: string) => new URL(route, publicOrigin).toString();
const normalizeUrl = (rawUrl: string) => new URL(rawUrl, publicOrigin).toString();

async function metaContent(page: Page, selector: string, label: string) {
  const locator = page.locator(selector);
  expect(await locator.count(), `${label}: metadata must occur exactly once`).toBe(1);
  const content = (await locator.getAttribute("content"))?.trim();
  expect(content, `${label}: metadata content must be non-empty`).toBeTruthy();
  return content as string;
}

async function linkHref(page: Page, selector: string, label: string) {
  const locator = page.locator(selector);
  expect(await locator.count(), `${label}: link metadata must occur exactly once`).toBe(1);
  const href = (await locator.getAttribute("href"))?.trim();
  expect(href, `${label}: href must be non-empty`).toBeTruthy();
  return href as string;
}

async function assertSocialPreview(request: APIRequestContext, rawUrl: string, label: string) {
  const url = new URL(rawUrl);
  expect(url.origin, `${label}: social preview must use the canonical public origin`).toBe(publicOrigin);
  expect(url.pathname, `${label}: social preview must use the governed brand-preview renderer`).toMatch(/^\/brand-preview\/(es|en)\//);

  const response = await request.get(url.pathname);
  expect(response.ok(), `${label}: social preview renderer must respond successfully`).toBeTruthy();
  expect(response.headers()["content-type"] ?? "", `${label}: preview must be an image`).toMatch(/^image\//);
}

async function assertPublicSeo(page: Page, route: string, locale: Locale) {
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  expect(response?.ok(), `${route}: route must return a successful response`).toBeTruthy();
  await expect(page.locator("html"), `${route}: document language must match route locale`).toHaveAttribute("lang", locale);

  const title = (await page.title()).trim();
  expect(title.length, `${route}: title must be meaningful`).toBeGreaterThan(12);
  const description = await metaContent(page, 'meta[name="description"]', `${route} description`);
  expect(description.length, `${route}: description must be meaningful`).toBeGreaterThan(40);

  const canonical = await linkHref(page, 'link[rel="canonical"]', `${route} canonical`);
  expect(normalizeUrl(canonical), `${route}: canonical must point to the current public route`).toBe(normalizeUrl(canonicalFor(route)));

  const esAlternate = await linkHref(page, 'link[rel="alternate"][hreflang="es-ES"]', `${route} es-ES alternate`);
  const enAlternate = await linkHref(page, 'link[rel="alternate"][hreflang="en"]', `${route} EN alternate`);
  const defaultAlternate = await linkHref(page, 'link[rel="alternate"][hreflang="x-default"]', `${route} x-default alternate`);
  expect(normalizeUrl(defaultAlternate), `${route}: x-default must resolve to the Spanish route`).toBe(normalizeUrl(esAlternate));
  expect(normalizeUrl(locale === "es" ? esAlternate : enAlternate), `${route}: locale alternate must match canonical`).toBe(normalizeUrl(canonical));
  expect(normalizeUrl(locale === "es" ? enAlternate : esAlternate), `${route}: translated alternate must not self-canonicalize`).not.toBe(normalizeUrl(canonical));

  const robots = await metaContent(page, 'meta[name="robots"]', `${route} robots`);
  expect(robots.toLowerCase(), `${route}: public route must remain indexable`).not.toContain("noindex");

  const ogTitle = await metaContent(page, 'meta[property="og:title"]', `${route} og:title`);
  const ogDescription = await metaContent(page, 'meta[property="og:description"]', `${route} og:description`);
  const ogUrl = await metaContent(page, 'meta[property="og:url"]', `${route} og:url`);
  const ogImage = await metaContent(page, 'meta[property="og:image"]', `${route} og:image`);
  expect(ogTitle.length, `${route}: Open Graph title must be meaningful`).toBeGreaterThan(12);
  expect(ogDescription.length, `${route}: Open Graph description must be meaningful`).toBeGreaterThan(40);
  expect(normalizeUrl(ogUrl), `${route}: Open Graph URL must match canonical`).toBe(normalizeUrl(canonical));
  await assertSocialPreview(page.request, ogImage, `${route} Open Graph image`);

  const twitterCard = await metaContent(page, 'meta[name="twitter:card"]', `${route} twitter:card`);
  const twitterTitle = await metaContent(page, 'meta[name="twitter:title"]', `${route} twitter:title`);
  const twitterDescription = await metaContent(page, 'meta[name="twitter:description"]', `${route} twitter:description`);
  const twitterImage = await metaContent(page, 'meta[name="twitter:image"]', `${route} twitter:image`);
  expect(twitterCard, `${route}: Twitter card must use a large branded preview`).toBe("summary_large_image");
  expect(twitterTitle.length, `${route}: Twitter title must be meaningful`).toBeGreaterThan(12);
  expect(twitterDescription.length, `${route}: Twitter description must be meaningful`).toBeGreaterThan(40);
  await assertSocialPreview(page.request, twitterImage, `${route} Twitter image`);

  console.log("PHASE8F_SEO_ROUTE", JSON.stringify({
    route,
    locale,
    title,
    description,
    canonical,
    alternates: { es: esAlternate, en: enAlternate, xDefault: defaultAlternate },
    ogImage,
    twitterImage,
  }));
}

async function firstDetailHref(page: Page, indexRoute: string, prefix: string, label: string) {
  const response = await page.goto(indexRoute, { waitUntil: "domcontentloaded" });
  expect(response?.ok(), `${label}: index must return successfully`).toBeTruthy();
  const links = page.locator(`main a[href^="${prefix}"]`);
  expect(await links.count(), `${label}: index must expose at least one detail link`).toBeGreaterThan(0);
  const href = await links.first().getAttribute("href");
  expect(href, `${label}: representative detail link must have href`).toBeTruthy();
  return href as string;
}

test.describe("Phase 8F runtime SEO matrix", () => {
  for (const route of criticalRoutes) {
    test(`critical route ${route}`, async ({ page }) => {
      await assertPublicSeo(page, route, routeLocale(route));
    });
  }

  for (const family of commercialFamilies) {
    for (const locale of ["es", "en"] as const) {
      test(`${family.label} ${locale} index + representative detail`, async ({ page }) => {
        const indexRoute = family[locale];
        await assertPublicSeo(page, indexRoute, locale);
        const detailRoute = await firstDetailHref(page, indexRoute, family.detailPrefix[locale], `${family.label} ${locale}`);
        await assertPublicSeo(page, detailRoute, locale);
      });
    }
  }

  test("sitemap and robots expose the public matrix without internal renderers", async ({ request }) => {
    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.ok(), "sitemap.xml must respond successfully").toBeTruthy();
    expect(sitemapResponse.headers()["content-type"] ?? "", "sitemap.xml must be XML").toContain("xml");
    const sitemap = await sitemapResponse.text();

    for (const route of criticalRoutes) {
      expect(sitemap, `sitemap must contain ${route}`).toContain(`<loc>${canonicalFor(route)}</loc>`);
    }
    for (const family of commercialFamilies) {
      expect(sitemap, `sitemap must contain ${family.es}`).toContain(`<loc>${canonicalFor(family.es)}</loc>`);
      expect(sitemap, `sitemap must contain ${family.en}`).toContain(`<loc>${canonicalFor(family.en)}</loc>`);
      expect(sitemap, `sitemap must contain an ES ${family.label} detail`).toContain(`<loc>${publicOrigin}${family.detailPrefix.es}`);
      expect(sitemap, `sitemap must contain an EN ${family.label} detail`).toContain(`<loc>${publicOrigin}${family.detailPrefix.en}`);
    }
    expect(sitemap, "internal brand-preview routes must not enter the sitemap").not.toContain("/brand-preview/");
    expect(sitemap, "internal brand-campaign routes must not enter the sitemap").not.toContain("/brand-campaign/");
    expect(sitemap, "API routes must not enter the sitemap").not.toContain("/api/");

    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.ok(), "robots.txt must respond successfully").toBeTruthy();
    const robots = await robotsResponse.text();
    expect(robots).toContain("User-Agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${publicOrigin}/sitemap.xml`);
  });

  test("internal renderers and API expose explicit noindex response policy", async ({ request }) => {
    for (const endpoint of [
      "/brand-preview/es/home",
      "/brand-campaign/es/landscape/home",
      "/api/lead-intake",
    ]) {
      const response = await request.get(endpoint);
      expect(response.ok(), `${endpoint}: internal endpoint must remain reachable`).toBeTruthy();
      const robots = response.headers()["x-robots-tag"] ?? "";
      expect(robots.toLowerCase(), `${endpoint}: internal endpoint must explicitly opt out of search indexing`).toContain("noindex");
      console.log("PHASE8F_INTERNAL_INDEX_POLICY", JSON.stringify({ endpoint, xRobotsTag: robots }));
    }
  });

  test("not-found responses are 404 and explicitly non-indexable", async ({ page }) => {
    const route = "/phase8f-intentional-not-found-route";
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), "unknown public route must return 404").toBe(404);
    const robots = await metaContent(page, 'meta[name="robots"]', `${route} robots`);
    expect(robots.toLowerCase(), "404 document must be noindex").toContain("noindex");
  });
});
