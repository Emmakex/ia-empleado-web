import { expect, test } from "@playwright/test";

type JourneyCase = {
  locale: "es" | "en";
  builderPath: string;
  processPath: string;
  demoPath: string;
};

const journeys: JourneyCase[] = [
  {
    locale: "es",
    builderPath: "/disena-tu-equipo-ia",
    processPath: "/mejora-tu-proceso",
    demoPath: "/solicitar-demo",
  },
  {
    locale: "en",
    builderPath: "/en/design-your-ai-team",
    processPath: "/en/improve-your-process",
    demoPath: "/en/request-demo",
  },
];

function parseHandoffHref(href: string) {
  return new URL(href, "https://iaempleado.com");
}

function expectBoundedShape(url: URL, expectedPath: string, intent: string, source: string) {
  expect(url.pathname).toBe(expectedPath);
  expect(url.searchParams.get("intent")).toBe(intent);
  expect(url.searchParams.get("source")).toBe(source);
  const context = url.searchParams.get("context") ?? "";
  expect(context.length).toBeGreaterThan(0);
  expect(context.length).toBeLessThanOrEqual(160);
  expect(context).not.toMatch(/[\r\n\t]/);
  expect([...url.searchParams.keys()].sort()).toEqual(["context", "intent", "source"]);
  return context;
}

test.describe("Web Phase 7B contextual result handoff", () => {
  for (const journey of journeys) {
    test(`${journey.locale.toUpperCase()} Team Builder carries only bounded catalog context`, async ({ page }) => {
      await page.goto(journey.builderPath);
      await page.locator(".builder-preset").first().click();

      const handoff = page.locator('[data-contextual-result-handoff="team-builder"]');
      await expect(handoff).toBeVisible();
      const href = await handoff.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toContain("mailto:");

      const url = parseHandoffHref(href!);
      const context = expectBoundedShape(url, journey.demoPath, "team", "team-builder");
      expect(context).toMatch(/Sector:/);
      expect(context).toMatch(journey.locale === "es" ? /Equipo:|Roles:/ : /Team:|Roles:/);

      await page.goto(`${url.pathname}${url.search}`);
      const form = page.locator("[data-lead-handoff-form]");
      await expect(form).toHaveAttribute("data-intent", "team");
      await expect(form).toHaveAttribute("data-source", "team-builder");
      await expect(page.locator("[data-lead-context]")).toHaveText(context);
    });

    test(`${journey.locale.toUpperCase()} Process Analyzer carries only bounded predefined result context`, async ({ page }) => {
      await page.goto(journey.processPath);

      const painButtons = page.locator(".process-pain-chip");
      const painCount = await painButtons.count();
      expect(painCount).toBeGreaterThanOrEqual(3);
      const thirdPain = (await painButtons.nth(2).innerText()).trim();
      await painButtons.nth(0).click();
      await painButtons.nth(1).click();
      await painButtons.nth(2).click();
      await page.locator(".process-bottleneck-button").first().click();

      const handoff = page.locator('[data-contextual-result-handoff="process-analyzer"]');
      await expect(handoff).toBeVisible();
      const href = await handoff.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toContain("mailto:");

      const url = parseHandoffHref(href!);
      const context = expectBoundedShape(url, journey.demoPath, "process", "process-analyzer");
      expect(context).not.toContain(thirdPain);
      expect(context).toMatch(journey.locale === "es" ? /1 pasos marcados/ : /1 marked steps/);

      await page.goto(`${url.pathname}${url.search}`);
      const form = page.locator("[data-lead-handoff-form]");
      await expect(form).toHaveAttribute("data-intent", "process");
      await expect(form).toHaveAttribute("data-source", "process-analyzer");
      await expect(page.locator("[data-lead-context]")).toHaveText(context);
    });
  }

  test("mobile result CTA remains usable without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/disena-tu-equipo-ia");
    await page.locator(".builder-preset").first().click();
    await expect(page.locator('[data-contextual-result-handoff="team-builder"]')).toBeVisible();

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });
});
