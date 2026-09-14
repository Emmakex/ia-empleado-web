import { expect, test, type Locator, type Page } from "@playwright/test";

type MotionState = {
  animationName: string;
  animationDuration: string;
  opacity: number;
  pointerEvents: string;
};

type LayoutSnapshot = Record<string, { top: number; left: number; width: number; height: number }>;

async function motionState(locator: Locator): Promise<MotionState> {
  return locator.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      animationName: styles.animationName,
      animationDuration: styles.animationDuration,
      opacity: Number.parseFloat(styles.opacity),
      pointerEvents: styles.pointerEvents,
    };
  });
}

async function layoutSnapshot(page: Page): Promise<LayoutSnapshot> {
  return page.evaluate(() => {
    const selectors = [
      ".brand-home-hero .hero-copy",
      ".brand-home-hero .hero-actions",
      ".brand-home-hero .brand-hero-stage",
    ];

    return Object.fromEntries(selectors.map((selector) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`Missing layout target: ${selector}`);
      return [selector, {
        top: element.offsetTop,
        left: element.offsetLeft,
        width: element.offsetWidth,
        height: element.offsetHeight,
      }];
    }));
  });
}

async function assertAnimation(locator: Locator, expectedName: string) {
  await expect(locator).toBeVisible();
  const state = await motionState(locator);
  expect(state.animationName).toContain(expectedName);
}

async function openWithMotion(page: Page, route: string, width = 1440, height = 1000) {
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(route, { waitUntil: "networkidle" });
  await expect.poll(() => page.evaluate(() => window.matchMedia("(prefers-reduced-motion: no-preference)").matches)).toBe(true);
}

test.describe("Phase 8C motion acceptance", () => {
  test("homepage motion keeps core actions immediately available without layout reflow", async ({ page }) => {
    await openWithMotion(page, "/");
    await page.evaluate(() => document.fonts.ready.then(() => true));

    const title = page.locator(".brand-home-hero h1");
    const primaryCta = page.locator(".brand-home-hero .hero-actions .button").first();
    const stage = page.locator(".brand-home-hero .brand-hero-stage");

    await expect(title).toBeVisible();
    await expect(primaryCta).toBeVisible();
    await expect(stage).toBeVisible();

    const titleMotion = await motionState(title);
    const ctaMotion = await motionState(primaryCta.locator(".."));
    const stageMotion = await motionState(stage);

    expect(titleMotion.animationName).toContain("phase8c-home-copy-enter");
    expect(ctaMotion.animationName).toContain("phase8c-home-copy-enter");
    expect(ctaMotion.opacity).toBeGreaterThanOrEqual(0.99);
    expect(ctaMotion.pointerEvents).not.toBe("none");
    expect(stageMotion.animationName).not.toBe("none");

    const before = await layoutSnapshot(page);
    await page.waitForTimeout(900);
    const after = await layoutSnapshot(page);
    expect(after).toEqual(before);
  });

  test("employee, team, department and sector scenes share the active motion vocabulary", async ({ page }) => {
    const scenarios = [
      {
        route: "/empleados-ia/atencion-cliente",
        person: ".brand-role-family-portrait img",
        secondary: ".brand-role-family-flow > span",
        secondaryAnimation: "phase8c-motion-handoff-focus",
      },
      {
        route: "/equipos-ia/ventas",
        person: ".brand-collaboration-portrait img",
        secondary: ".brand-collaboration-hub-ring",
        secondaryAnimation: "brand-motion-orbit",
      },
      {
        route: "/departamentos/atencion-cliente",
        person: ".brand-collaboration-portrait img",
        secondary: ".brand-collaboration-hub-ring",
        secondaryAnimation: "brand-motion-orbit",
      },
      {
        route: "/sectores/ecommerce",
        person: ".brand-sector-art-portrait img",
        secondary: ".brand-sector-art-stage-track > li",
        secondaryAnimation: "phase8c-motion-handoff-focus",
      },
    ] as const;

    for (const scenario of scenarios) {
      await test.step(scenario.route, async () => {
        await openWithMotion(page, scenario.route);
        await assertAnimation(page.locator(scenario.person).first(), "brand-motion-person-drift");
        await assertAnimation(page.locator(scenario.secondary).first(), scenario.secondaryAnimation);
      });
    }
  });

  test("mobile removes continuous person drift and slows ambient coordination", async ({ page }) => {
    const scenarios = [
      {
        route: "/empleados-ia/atencion-cliente",
        person: ".brand-role-family-portrait img",
        ambient: ".brand-role-family-aura",
        expectedDuration: "18s",
      },
      {
        route: "/equipos-ia/ventas",
        person: ".brand-collaboration-portrait img",
        ambient: ".brand-collaboration-hub-ring",
        expectedDuration: "34s",
      },
      {
        route: "/sectores/ecommerce",
        person: ".brand-sector-art-portrait img",
        ambient: ".brand-sector-art-glow.glow-a",
        expectedDuration: "18s",
      },
    ] as const;

    for (const scenario of scenarios) {
      await test.step(scenario.route, async () => {
        await openWithMotion(page, scenario.route, 390, 844);
        const person = page.locator(scenario.person).first();
        const ambient = page.locator(scenario.ambient).first();
        await expect(person).toBeVisible();
        await expect(ambient).toBeAttached();

        const personState = await motionState(person);
        const ambientState = await motionState(ambient);
        expect(personState.animationName).toBe("none");
        expect(ambientState.animationName).not.toBe("none");
        expect(ambientState.animationDuration).toBe(scenario.expectedDuration);
      });
    }
  });

  test("reduced motion disables non-essential animation across internal scene families", async ({ page }) => {
    const scenarios = [
      {
        route: "/empleados-ia/atencion-cliente",
        selectors: [".brand-role-family-portrait img", ".brand-role-family-aura", ".brand-role-family-flow > span"],
      },
      {
        route: "/equipos-ia/ventas",
        selectors: [".brand-collaboration-portrait img", ".brand-collaboration-hub-ring", ".brand-collaboration-glow"],
      },
      {
        route: "/sectores/ecommerce",
        selectors: [".brand-sector-art-portrait img", ".brand-sector-art-glow", ".brand-sector-art-stage-track > li"],
      },
    ] as const;

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const scenario of scenarios) {
      await test.step(scenario.route, async () => {
        await page.goto(scenario.route, { waitUntil: "networkidle" });
        await expect.poll(() => page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);

        for (const selector of scenario.selectors) {
          const locator = page.locator(selector).first();
          await expect(locator).toBeAttached();
          const state = await motionState(locator);
          expect(state.animationName, `${scenario.route}: ${selector} must be static`).toBe("none");
        }
      });
    }
  });
});
