import { expect, test, type Page } from "@playwright/test";

type Viewport = { name: string; width: number; height: number };

type RouteFamily = {
  label: string;
  es: string;
  en: string;
  detailPrefix?: { es: string; en: string };
};

const acceptanceViewports: Viewport[] = [
  { name: "320", width: 320, height: 800 },
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

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
];

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
    label: "use cases",
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

async function assertNoHorizontalOverflow(page: Page, label: string) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  const measured = Math.max(metrics.scrollWidth, metrics.bodyScrollWidth);

  if (measured > metrics.clientWidth + 1) {
    const offenders = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            id: element.id,
            className: typeof element.className === "string" ? element.className : "",
            text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
            left: Math.round(rect.left * 10) / 10,
            right: Math.round(rect.right * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
          };
        })
        .filter((item) => item.width > 0 && (item.right > viewportWidth + 1 || item.left < -1))
        .slice(0, 10);
    });
    console.log(`[phase8-overflow] ${label}`, JSON.stringify(offenders, null, 2));
  }

  expect(measured, `${label} must not create horizontal overflow`).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function assertPrimaryLayout(page: Page, label: string) {
  await expect(page.locator("main"), `${label}: main content must render`).toBeVisible();
  await expect(page.locator("h1").first(), `${label}: page must expose a visible H1`).toBeVisible();

  const h1 = await page.locator("h1").first().boundingBox();
  expect(h1, `${label}: H1 must have a rendered box`).not.toBeNull();
  if (h1) {
    expect(h1.x, `${label}: H1 must not be clipped on the left`).toBeGreaterThanOrEqual(-1);
    expect(h1.x + h1.width, `${label}: H1 must not be clipped on the right`).toBeLessThanOrEqual(
      (await page.evaluate(() => document.documentElement.clientWidth)) + 1,
    );
  }

  await assertNoHorizontalOverflow(page, label);
}

async function firstDetailHref(page: Page, indexRoute: string, prefix: string, label: string) {
  const response = await page.goto(indexRoute, { waitUntil: "domcontentloaded" });
  expect(response?.ok(), `${label}: ${indexRoute} must return success`).toBeTruthy();
  await assertPrimaryLayout(page, `${label} index`);

  const links = page.locator(`main a[href^="${prefix}"]`);
  const count = await links.count();
  expect(count, `${label}: index must expose at least one detail link`).toBeGreaterThan(0);
  const href = await links.first().getAttribute("href");
  expect(href, `${label}: representative detail link must have href`).toBeTruthy();
  return href as string;
}

for (const viewport of acceptanceViewports) {
  test(`Phase 8A critical routes reflow at ${viewport.name}px`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of criticalRoutes) {
      await test.step(route, async () => {
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.ok(), `${route} must return success at ${viewport.name}px`).toBeTruthy();
        await assertPrimaryLayout(page, `${route} @ ${viewport.name}px`);
      });
    }
  });
}

for (const viewport of [
  { name: "320", width: 320, height: 800 },
  { name: "1024", width: 1024, height: 900 },
] satisfies Viewport[]) {
  test(`Phase 8A commercial indexes and representative details at ${viewport.name}px`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const family of commercialFamilies) {
      for (const locale of ["es", "en"] as const) {
        await test.step(`${family.label} ${locale}`, async () => {
          const indexRoute = family[locale];
          const prefix = family.detailPrefix?.[locale];
          expect(prefix, `${family.label} must define a ${locale} detail prefix`).toBeTruthy();

          const href = await firstDetailHref(page, indexRoute, prefix as string, `${family.label} ${locale}`);
          const response = await page.goto(href, { waitUntil: "domcontentloaded" });
          expect(response?.ok(), `${href} must return success`).toBeTruthy();
          await assertPrimaryLayout(page, `${href} @ ${viewport.name}px`);
        });
      }
    }
  });
}

test("Phase 8A critical conversion routes survive 200% text scaling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    "/solicitar-demo",
    "/en/request-demo",
    "/disena-tu-equipo-ia",
    "/en/design-your-ai-team",
    "/mejora-tu-proceso",
    "/en/improve-your-process",
  ]) {
    await test.step(route, async () => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} must return success`).toBeTruthy();
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
      await page.waitForTimeout(50);
      await assertPrimaryLayout(page, `${route} @ 200% text scale`);
    });
  }
});
