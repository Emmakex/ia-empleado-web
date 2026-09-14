import { expect, test, type Page } from "@playwright/test";

async function tabUntilFocused(page: Page, selector: string, maxTabs = 20) {
  const target = page.locator(selector);
  for (let index = 0; index < maxTabs; index += 1) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement).catch(() => false)) return;
  }
  throw new Error(`Keyboard focus did not reach ${selector} after ${maxTabs} Tab presses`);
}

const keyboardLocales = [
  { route: "/", destination: "/disena-tu-equipo-ia", locale: "es" },
  { route: "/en", destination: "/en/design-your-ai-team", locale: "en" },
] as const;

const validationLocales = [
  {
    route: "/solicitar-demo",
    requiredMessage: "Completa este campo.",
    emailMessage: "Introduce un correo válido.",
  },
  {
    route: "/en/request-demo",
    requiredMessage: "Complete this field.",
    emailMessage: "Enter a valid email address.",
  },
] as const;

test.describe("Phase 8B interaction accessibility", () => {
  for (const scenario of keyboardLocales) {
    test(`${scenario.locale.toUpperCase()} desktop Explore navigation works keyboard-only`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(scenario.route);

      const details = page.locator(".site-nav-explore");
      const summary = details.locator("summary");
      await tabUntilFocused(page, ".site-nav-explore summary");
      await expect(summary).toBeFocused();

      await page.keyboard.press("Enter");
      await expect(details).toHaveJSProperty("open", true);

      const firstMegaLink = details.locator(".site-nav-mega a").first();
      await page.keyboard.press("Tab");
      await expect(firstMegaLink).toBeFocused();
      await expect(firstMegaLink).toHaveAttribute("href", scenario.destination);

      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${scenario.destination}$`));
      await expect(page.locator("main h1")).toBeVisible();
    });
  }

  test("reduced motion keeps the branded hero complete without animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect.poll(() => page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);

    const mist = page.locator(".brand-hero-mist-one");
    const stage = page.locator(".brand-hero-stage");
    await expect(mist).toBeVisible();
    await expect(stage).toBeVisible();

    const motionState = await mist.evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        animationName: styles.animationName,
        animationIterationCount: styles.animationIterationCount,
      };
    });
    expect(motionState.animationName).toBe("none");
    expect(Number.parseFloat(motionState.animationIterationCount) || 1).toBeLessThanOrEqual(1);
    await expect(stage).toHaveCSS("opacity", "1");
  });

  test("prefers-contrast more strengthens informational text", async ({ page }) => {
    await page.emulateMedia({ contrast: "no-preference" });
    await page.goto("/mejora-tu-proceso");

    const label = page.locator(".process-static-outcome span").first();
    await expect(label).toBeVisible();
    const normalColor = await label.evaluate((element) => getComputedStyle(element).color);

    await page.emulateMedia({ contrast: "more" });
    await expect.poll(() => page.evaluate(() => window.matchMedia("(prefers-contrast: more)").matches)).toBe(true);
    const strongerColor = await label.evaluate((element) => getComputedStyle(element).color);

    expect(strongerColor).not.toBe(normalColor);
  });

  test("forced colors preserves a visible keyboard focus indicator", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/");

    await expect.poll(() => page.evaluate(() => window.matchMedia("(forced-colors: active)").matches)).toBe(true);
    await tabUntilFocused(page, ".site-nav-explore summary");

    const summary = page.locator(".site-nav-explore summary");
    await expect(summary).toBeFocused();
    const focusStyle = await summary.evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        style: styles.outlineStyle,
        width: Number.parseFloat(styles.outlineWidth),
      };
    });

    expect(focusStyle.style).not.toBe("none");
    expect(focusStyle.width).toBeGreaterThanOrEqual(2);
  });

  for (const scenario of validationLocales) {
    test(`${scenario.route} exposes persistent accessible validation errors`, async ({ page }) => {
      await page.route("**/api/lead-intake", async (route) => {
        if (route.request().method() === "GET") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ mode: "email", configured: false }),
          });
          return;
        }
        await route.continue();
      });

      await page.goto(scenario.route);

      const name = page.locator('input[name="name"]');
      const email = page.locator('input[name="email"]');
      const need = page.locator('textarea[name="need"]');
      const submit = page.locator("[data-lead-submit]");

      await submit.click();
      await expect(name).toBeFocused();
      await expect(name).toHaveAttribute("aria-invalid", "true");
      await expect(name).toHaveAttribute("aria-describedby", "lead-error-name");
      await expect(page.locator("#lead-error-name")).toHaveText(scenario.requiredMessage);
      await expect(page.locator("#lead-error-name")).toHaveAttribute("role", "alert");

      await name.fill("Ada Lovelace");
      await expect(name).not.toHaveAttribute("aria-invalid", "true");
      await expect(page.locator("#lead-error-name")).toHaveCount(0);

      await need.fill("Quiero validar un flujo accesible de demostración.");
      await email.fill("not-an-email");
      await submit.click();

      await expect(email).toBeFocused();
      await expect(email).toHaveAttribute("aria-invalid", "true");
      await expect(email).toHaveAttribute("aria-describedby", "lead-error-email");
      await expect(page.locator("#lead-error-email")).toHaveText(scenario.emailMessage);

      await email.fill("ada@example.com");
      await expect(email).not.toHaveAttribute("aria-invalid", "true");
      await expect(page.locator("#lead-error-email")).toHaveCount(0);
    });
  }

  test("meaningful composite imagery is labelled while decorative portraits stay silent", async ({ page }) => {
    await page.goto("/");

    const stage = page.locator('.brand-hero-stage[role="img"]');
    await expect(stage).toBeVisible();
    const stageLabel = await stage.getAttribute("aria-label");
    expect(stageLabel?.trim().length ?? 0).toBeGreaterThan(0);

    const stageImages = stage.locator("img");
    expect(await stageImages.count()).toBeGreaterThan(0);
    for (let index = 0; index < await stageImages.count(); index += 1) {
      await expect(stageImages.nth(index)).toHaveAttribute("alt", "");
    }

    const firstEmployee = page.locator(".brand-character-card").first();
    await expect(firstEmployee.locator("img")).toHaveAttribute("alt", "");
    await expect(firstEmployee.locator(".brand-character-name")).not.toHaveText("");
  });
});
