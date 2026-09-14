import { expect, test, type Locator, type Page } from "@playwright/test";

const directCapability = {
  mode: "direct",
  configured: true,
  transport: "smtp",
  privacyNoticeUrl: "https://example.com/privacy",
};

async function assertMinimumTarget(locator: Locator, label: string) {
  const count = await locator.count();
  expect(count, `${label}: expected at least one target`).toBeGreaterThan(0);

  let visibleCount = 0;
  for (let index = 0; index < count; index += 1) {
    const item = locator.nth(index);
    if (!(await item.isVisible())) continue;
    visibleCount += 1;
    const box = await item.boundingBox();
    expect(box, `${label} #${index + 1}: target must have geometry`).not.toBeNull();
    if (!box) continue;
    expect(box.width, `${label} #${index + 1}: target width must be >= 44px`).toBeGreaterThanOrEqual(43.5);
    expect(box.height, `${label} #${index + 1}: target height must be >= 44px`).toBeGreaterThanOrEqual(43.5);
  }

  expect(visibleCount, `${label}: expected at least one visible target`).toBeGreaterThan(0);
}

async function assertKeyboardFocusVisible(page: Page, locator: Locator, label: string) {
  await locator.scrollIntoViewIfNeeded();
  await locator.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(locator, `${label}: keyboard navigation must return focus to the control`).toBeFocused();

  const focusStyle = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth) || 0,
      boxShadow: style.boxShadow,
    };
  });

  const hasOutline = focusStyle.outlineStyle !== "none" && focusStyle.outlineWidth >= 2;
  const hasShadow = Boolean(focusStyle.boxShadow && focusStyle.boxShadow !== "none");
  expect(hasOutline || hasShadow, `${label}: focused control must expose a visible focus indicator`).toBeTruthy();
}

async function assertTeamBuilderHydrated(page: Page) {
  const shell = page.locator(".team-builder-shell");
  await expect(shell).toHaveAttribute("data-team-builder-release", "phase8b-hydration-sync");
  await expect(shell).toHaveAttribute("data-team-builder-hydrated", "true");
  await expect(shell).toHaveAttribute("aria-busy", "false");
  await expect(page.locator(".builder-choice").first()).toBeEnabled();
  await expect(page.locator(".builder-preset").first()).toBeEnabled();
}

async function assertProcessAnalyzerHydrated(page: Page) {
  const shell = page.locator(".process-analyzer-shell");
  await expect(shell).toHaveAttribute("data-process-analyzer-release", "phase8b-hydration-sync");
  await expect(shell).toHaveAttribute("data-process-analyzer-hydrated", "true");
  await expect(shell).toHaveAttribute("aria-busy", "false");
  await expect(page.locator(".process-template-option").first()).toBeEnabled();
  await expect(page.locator(".process-pain-chip").first()).toBeEnabled();
  await expect(page.locator(".process-bottleneck-button").first()).toBeEnabled();
}

test.describe("Phase 8A interaction UX", () => {
  test("commercial tools expose 44px touch targets at mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/disena-tu-equipo-ia", { waitUntil: "domcontentloaded" });
    await assertTeamBuilderHydrated(page);
    await assertMinimumTarget(page.locator(".builder-preset"), "Team Builder presets");
    await assertMinimumTarget(page.locator(".builder-choice"), "Team Builder choices");
    await page.locator(".builder-preset").first().click();
    await assertMinimumTarget(page.locator(".builder-reference-team a, .builder-role-link"), "Team Builder result links");

    await page.goto("/mejora-tu-proceso", { waitUntil: "domcontentloaded" });
    await assertProcessAnalyzerHydrated(page);
    await assertMinimumTarget(page.locator(".process-template-option"), "Process templates");
    await assertMinimumTarget(page.locator(".process-pain-chip"), "Process pain chips");
    await assertMinimumTarget(page.locator(".process-bottleneck-button"), "Process bottleneck controls");
    await assertMinimumTarget(page.locator(".process-step-employees a, .process-summary-chips a"), "Process employee links");

    await page.goto("/calculadora-roi", { waitUntil: "domcontentloaded" });
    await assertMinimumTarget(page.locator(".roi-field input, .roi-field select"), "ROI inputs");

    await page.route("**/api/lead-intake", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(directCapability) });
        return;
      }
      await route.continue();
    });
    await page.goto("/solicitar-demo?intent=demo&source=phase8-touch", { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-lead-handoff-form]")).toHaveAttribute("data-lead-intake-mode", "direct");
    await assertMinimumTarget(
      page.locator('.lead-handoff-form input:not([type="checkbox"]):not([name="website"]), .lead-handoff-form textarea'),
      "Lead form fields",
    );
    await assertMinimumTarget(page.locator(".lead-handoff-consent"), "Lead consent target");
    await assertMinimumTarget(page.locator("[data-lead-submit]"), "Lead submit target");
  });

  test("pressed states, keyboard focus and ROI feedback remain explicit", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/disena-tu-equipo-ia", { waitUntil: "domcontentloaded" });
    await assertTeamBuilderHydrated(page);
    const builderChoice = page.locator(".builder-choice").first();
    await builderChoice.click();
    await expect(builderChoice).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".builder-clear")).toBeEnabled();
    await assertKeyboardFocusVisible(page, page.locator(".builder-choice").nth(1), "Team Builder choice");

    await page.goto("/mejora-tu-proceso", { waitUntil: "domcontentloaded" });
    await assertProcessAnalyzerHydrated(page);
    const painChip = page.locator(".process-pain-chip").first();
    await painChip.click();
    await expect(painChip).toHaveAttribute("aria-pressed", "true");
    await assertKeyboardFocusVisible(page, painChip, "Process pain chip");

    const bottleneck = page.locator(".process-bottleneck-button").first();
    await bottleneck.click();
    await expect(bottleneck).toHaveAttribute("aria-pressed", "true");
    await assertKeyboardFocusVisible(page, bottleneck, "Process bottleneck control");

    await page.goto("/calculadora-roi", { waitUntil: "domcontentloaded" });
    const roiShell = page.locator(".roi-calculator-shell");
    const range = page.locator(".roi-range");
    const rangeNumber = page.locator(".roi-range-number");
    await expect(roiShell).toHaveAttribute("data-roi-release", "phase8a-roi-hydration-sync");
    await expect(roiShell).toHaveAttribute("data-roi-hydrated", "true");
    await expect(roiShell).toHaveAttribute("aria-busy", "false");
    await expect(range).toBeEnabled();
    await expect(rangeNumber).toBeEnabled();
    await expect(range).toHaveValue("30");
    await range.focus();
    await page.keyboard.press("ArrowRight");
    await expect(range).toHaveValue("31");
    await expect(rangeNumber).toHaveValue("31");
    await assertKeyboardFocusVisible(page, rangeNumber, "ROI numeric control");
  });

  test("sticky header never covers tool anchors", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const target of [
      { route: "/disena-tu-equipo-ia", hash: "#team-builder" },
      { route: "/mejora-tu-proceso", hash: "#analizador-proceso" },
    ]) {
      await test.step(`${target.route}${target.hash}`, async () => {
        await page.goto(target.route, { waitUntil: "domcontentloaded" });
        await page.locator(`a[href="${target.hash}"]`).first().click();
        await page.waitForFunction((hash) => window.location.hash === hash, target.hash);
        await page.waitForTimeout(650);

        const geometry = await page.evaluate((hash) => {
          const element = document.querySelector<HTMLElement>(hash);
          const header = document.querySelector<HTMLElement>(".site-header");
          if (!element || !header) return null;
          return {
            targetTop: element.getBoundingClientRect().top,
            headerBottom: header.getBoundingClientRect().bottom,
          };
        }, target.hash);

        expect(geometry, `${target.hash}: target and header must exist`).not.toBeNull();
        if (!geometry) return;
        expect(geometry.targetTop, `${target.hash}: anchored section must clear sticky header`).toBeGreaterThanOrEqual(
          geometry.headerBottom - 1,
        );
      });
    }
  });

  test("lead validation blocks invalid submit and loading locks the payload", async ({ page }) => {
    let postCount = 0;
    let releasePost!: () => void;
    const holdPost = new Promise<void>((resolve) => {
      releasePost = resolve;
    });

    await page.route("**/api/lead-intake", async (route) => {
      const request = route.request();
      if (request.method() === "GET") {
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(directCapability) });
        return;
      }

      postCount += 1;
      await holdPost;
      await route.fulfill({
        status: 202,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, status: "accepted", leadId: "lead_phase8" }),
      });
    });

    await page.goto("/solicitar-demo?intent=team&source=phase8-form", { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-lead-handoff-form]")).toHaveAttribute("data-lead-intake-mode", "direct");

    const name = page.getByLabel("Nombre");
    const email = page.getByLabel("Email de contacto");
    const need = page.getByLabel("¿Qué proceso, equipo o necesidad quieres evaluar?");
    const consent = page.getByRole("checkbox");
    const submit = page.locator("[data-lead-submit]");
    const form = page.locator(".lead-handoff-form");

    await submit.click();
    await expect(name).toBeFocused();
    expect(await name.evaluate((element) => element.matches(":invalid"))).toBeTruthy();
    expect(postCount).toBe(0);

    await name.fill("Ana Pérez");
    await email.fill("ana@example.com");
    await need.fill("Revisar un proceso comercial con control humano");
    await consent.check();
    await submit.click();

    await expect(form).toHaveAttribute("aria-busy", "true");
    await expect(submit).toBeDisabled();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(name).toBeDisabled();
    await expect(page.getByRole("status")).toContainText(/enviando/i);
    expect(postCount).toBe(1);

    releasePost();
    await expect(page.locator("[data-lead-intake-success]")).toContainText("Solicitud recibida");
    await expect(form).toHaveAttribute("aria-busy", "false");
  });
});
