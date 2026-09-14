import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

type Locale = "es" | "en";

type RouteFamily = {
  label: string;
  es: string;
  en: string;
  detailPrefix: { es: string; en: string };
};

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
  {
    label: "employees",
    es: "/empleados-ia",
    en: "/en/ai-employees",
    detailPrefix: { es: "/empleados-ia/", en: "/en/ai-employees/" },
  },
  {
    label: "teams",
    es: "/equipos-ia",
    en: "/en/ai-teams",
    detailPrefix: { es: "/equipos-ia/", en: "/en/ai-teams/" },
  },
  {
    label: "comparisons",
    es: "/comparativas",
    en: "/en/comparisons",
    detailPrefix: { es: "/comparativas/", en: "/en/comparisons/" },
  },
  {
    label: "sectors",
    es: "/sectores",
    en: "/en/sectors",
    detailPrefix: { es: "/sectores/", en: "/en/sectors/" },
  },
  {
    label: "use-cases",
    es: "/casos-de-uso",
    en: "/en/use-cases",
    detailPrefix: { es: "/casos-de-uso/", en: "/en/use-cases/" },
  },
  {
    label: "departments",
    es: "/departamentos",
    en: "/en/departments",
    detailPrefix: { es: "/departamentos/", en: "/en/departments/" },
  },
  {
    label: "integrations",
    es: "/integraciones",
    en: "/en/integrations",
    detailPrefix: { es: "/integraciones/", en: "/en/integrations/" },
  },
];

const routeLocale = (route: string): Locale => route === "/en" || route.startsWith("/en/") ? "en" : "es";

async function assertPageSemantics(page: Page, route: string, locale: Locale) {
  const response = await page.goto(route, { waitUntil: "networkidle" });
  expect(response?.ok(), `${route}: route must return a successful response`).toBeTruthy();
  await expect(page.locator("html"), `${route}: document language must match route locale`).toHaveAttribute("lang", locale);
  await expect(page.locator("main"), `${route}: main landmark must render`).toBeVisible();

  const visibleH1 = page.locator("h1:visible");
  expect(await visibleH1.count(), `${route}: page must expose exactly one visible H1`).toBe(1);
}

async function assertAxeBlockingFree(page: Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const blocking = results.violations.filter((violation) =>
    violation.impact === "critical" || violation.impact === "serious",
  );

  expect(
    blocking.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      helpUrl: violation.helpUrl,
      targets: violation.nodes.slice(0, 5).map((node) => node.target),
    })),
    `${label}: no critical/serious WCAG violations`,
  ).toEqual([]);
}

async function firstDetailHref(page: Page, indexRoute: string, prefix: string, label: string) {
  await assertPageSemantics(page, indexRoute, routeLocale(indexRoute));
  const links = page.locator(`main a[href^="${prefix}"]`);
  expect(await links.count(), `${label}: index must expose at least one detail link`).toBeGreaterThan(0);
  const href = await links.first().getAttribute("href");
  expect(href, `${label}: representative detail link must have href`).toBeTruthy();
  return href as string;
}

test.describe("Phase 8B accessibility matrix", () => {
  for (const route of criticalRoutes) {
    test(`critical route ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await assertPageSemantics(page, route, routeLocale(route));
      await assertAxeBlockingFree(page, route);
    });
  }

  for (const family of commercialFamilies) {
    for (const locale of ["es", "en"] as const) {
      test(`${family.label} ${locale} index + representative detail`, async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 900 });
        const indexRoute = family[locale];
        const href = await firstDetailHref(page, indexRoute, family.detailPrefix[locale], `${family.label} ${locale}`);

        await assertAxeBlockingFree(page, `${family.label} ${locale} index`);
        await assertPageSemantics(page, href, locale);
        await assertAxeBlockingFree(page, href);
      });
    }
  }
});
