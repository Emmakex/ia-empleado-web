import { expect, test, type Page } from "@playwright/test";

const canonicalAssetStems = [
  "clara-canonical",
  "alex-canonical",
  "sofia-canonical",
  "javier-canonical",
] as const;

async function assertNoHorizontalOverflow(page: Page, label: string) {
  const geometry = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(
    geometry.scrollWidth,
    `${label}: document must not create horizontal overflow`,
  ).toBeLessThanOrEqual(geometry.clientWidth + 1);
}

async function waitForTeamBuilder(page: Page) {
  const shell = page.locator(".team-builder-shell");
  await expect(shell).toHaveAttribute("data-team-builder-hydrated", "true");
  await expect(shell).toHaveAttribute("aria-busy", "false");
  await expect(page.locator(".builder-choice").first()).toBeEnabled();
}

async function waitForProcessAnalyzer(page: Page) {
  const shell = page.locator(".process-analyzer-shell");
  await expect(shell).toHaveAttribute("data-process-analyzer-hydrated", "true");
  await expect(shell).toHaveAttribute("aria-busy", "false");
  await expect(page.locator(".process-pain-chip").first()).toBeEnabled();
}

test.describe("Phase 8G automated cross-browser foundation", () => {
  test("bilingual public shell loads without page runtime errors", async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));

    for (const route of ["/", "/en"]) {
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.ok(), `${route}: public document must return successfully`).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
      await assertNoHorizontalOverflow(page, route);
    }

    expect(runtimeErrors, "public shell must not raise uncaught page errors").toEqual([]);
  });

  test("Home 768px breakpoint keeps character cards inside the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/", { waitUntil: "networkidle" });
    await assertNoHorizontalOverflow(page, "768px Home boundary");

    const cards = page.locator(".brand-character-card");
    expect(await cards.count(), "Home must expose canonical character cards").toBeGreaterThanOrEqual(4);

    const boxes = await cards.evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width };
    }));

    for (const [index, box] of boxes.entries()) {
      expect(box.width, `character card ${index + 1} must have positive width`).toBeGreaterThan(0);
      expect(box.left, `character card ${index + 1} must not escape left`).toBeGreaterThanOrEqual(-1);
      expect(box.right, `character card ${index + 1} must not escape right`).toBeLessThanOrEqual(769);
    }
  });

  test("interactive tools hydrate before accepting state changes", async ({ page }) => {
    await page.goto("/disena-tu-equipo-ia", { waitUntil: "domcontentloaded" });
    await waitForTeamBuilder(page);
    const builderChoice = page.locator(".builder-choice").first();
    await builderChoice.click();
    await expect(builderChoice).toHaveAttribute("aria-pressed", "true");

    await page.goto("/mejora-tu-proceso", { waitUntil: "domcontentloaded" });
    await waitForProcessAnalyzer(page);
    const painChip = page.locator(".process-pain-chip").first();
    await painChip.click();
    await expect(painChip).toHaveAttribute("aria-pressed", "true");

    await page.goto("/calculadora-roi", { waitUntil: "domcontentloaded" });
    const roiShell = page.locator(".roi-calculator-shell");
    const range = page.locator(".roi-range");
    const number = page.locator(".roi-range-number");
    await expect(roiShell).toHaveAttribute("data-roi-hydrated", "true");
    await expect(range).toBeEnabled();
    await expect(number).toBeEnabled();
    const previous = Number(await range.inputValue());
    await range.focus();
    await page.keyboard.press("ArrowRight");
    await expect(range).toHaveValue(String(previous + 1));
    await expect(number).toHaveValue(String(previous + 1));
  });

  test("conversion form and canonical static identities remain usable", async ({ page }) => {
    await page.goto("/solicitar-demo?intent=demo&source=phase8g-cross-browser", { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-lead-handoff-form]")).toBeVisible();
    await expect(page.getByLabel("Nombre")).toBeVisible();
    await expect(page.getByLabel("Email de contacto")).toHaveAttribute("type", "email");
    await expect(page.getByRole("button", { name: "Preparar correo" })).toBeVisible();
    await assertNoHorizontalOverflow(page, "Spanish conversion form");

    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("video")).toHaveCount(0);
    const portraits = page.locator(".brand-hero-stage .brand-character-node img");
    await expect(portraits).toHaveCount(4);
    const sources = await portraits.evaluateAll((images) => images.map((image) => {
      const element = image as HTMLImageElement;
      return decodeURIComponent(element.currentSrc || element.src || "");
    }));

    for (const stem of canonicalAssetStems) {
      expect(
        sources.some((source) => source.includes(`${stem}.`) && source.includes(".webp")),
        `${stem} must remain the delivered canonical identity`,
      ).toBeTruthy();
    }
  });
});
