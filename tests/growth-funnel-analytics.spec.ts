import { expect, test } from "@playwright/test";

const LANDING_KEY = "ai-accounts-receivable-automation";
const LANDING_PATH = "/automatizacion-cuentas-por-cobrar-ia";

test("Growth funnel keeps landing and CTA attribution through the demo handoff", async ({ page }) => {
  await page.goto(LANDING_PATH);

  await page.waitForFunction(({ key }) => {
    const dataLayer = (window as typeof window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer || [];
    return dataLayer.some((event) => (
      event.event === "ia_growth_funnel"
      && event.event_name === "growth_landing_view"
      && event.growth_landing_key === key
      && event.growth_stage === "hero"
    ));
  }, { key: LANDING_KEY });

  const landingEvents = await page.evaluate(() => (
    (window as typeof window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer || []
  ));
  expect(landingEvents).toEqual(expect.arrayContaining([
    expect.objectContaining({
      event: "ia_growth_funnel",
      event_name: "growth_landing_view",
      growth_landing_key: LANDING_KEY,
      growth_canonical_path: LANDING_PATH,
      growth_stage: "hero",
      growth_target: "landing",
    }),
  ]));

  const heroDemo = page.locator(".sector-hero .hero-actions a").filter({ hasText: /Ver cómo aplicarlo|See how it fits/i }).first();
  await expect(heroDemo).toHaveAttribute("href", new RegExp(`source=seo-landing%3A${LANDING_KEY}%3Ahero`));
  await heroDemo.click();

  await expect(page).toHaveURL(new RegExp(`/solicitar-demo\\?.*source=seo-landing%3A${LANDING_KEY}%3Ahero`));

  await page.waitForFunction(({ key }) => {
    const dataLayer = (window as typeof window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer || [];
    return dataLayer.some((event) => (
      event.event === "ia_growth_funnel"
      && event.event_name === "growth_demo_form_view"
      && event.growth_landing_key === key
      && event.growth_stage === "demo"
    ));
  }, { key: LANDING_KEY });

  const demoEvents = await page.evaluate(() => (
    (window as typeof window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer || []
  ));
  expect(demoEvents).toEqual(expect.arrayContaining([
    expect.objectContaining({
      event: "ia_growth_funnel",
      event_name: "growth_cta_click",
      growth_landing_key: LANDING_KEY,
      growth_stage: "hero",
      growth_target: "demo",
    }),
    expect.objectContaining({
      event: "ia_growth_funnel",
      event_name: "growth_demo_form_view",
      growth_landing_key: LANDING_KEY,
      growth_canonical_path: LANDING_PATH,
      growth_stage: "demo",
      growth_target: "demo",
      growth_source: `seo-landing:${LANDING_KEY}:hero`,
    }),
  ]));
});
