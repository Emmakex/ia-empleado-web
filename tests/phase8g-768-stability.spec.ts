import { expect, test } from "@playwright/test";

const STRESS_ITERATIONS = 5;

async function settleTargetLayout(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const cards = page.locator(".brand-character-card");
  await expect(cards).toHaveCount(4);

  for (let cardIndex = 0; cardIndex < 4; cardIndex += 1) {
    const card = cards.nth(cardIndex);
    await card.scrollIntoViewIfNeeded();

    const images = card.locator("img");
    const imageCount = await images.count();

    for (let imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
      const image = images.nth(imageIndex);

      await expect
        .poll(
          () => image.evaluate((node) => (node as HTMLImageElement).complete),
          {
            timeout: 8_000,
            message: `card ${cardIndex + 1} image ${imageIndex + 1} must finish loading`,
          },
        )
        .toBe(true);

      await image.evaluate(async (node) => {
        const element = node as HTMLImageElement;
        if (typeof element.decode === "function" && element.naturalWidth > 0) {
          await element.decode().catch(() => undefined);
        }
      });
    }
  }

  await page.evaluate(async () => {
    window.scrollTo(0, 0);
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
}

test("Home 768x1024 remains overflow-free across repeated cold browser contexts", async ({ browser }) => {
  for (let iteration = 1; iteration <= STRESS_ITERATIONS; iteration += 1) {
    await test.step(`cold load ${iteration}/${STRESS_ITERATIONS}`, async () => {
      const context = await browser.newContext({
        viewport: { width: 768, height: 1024 },
        colorScheme: "light",
        locale: "es-ES",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));

      try {
        const response = await page.goto("/", { waitUntil: "networkidle" });
        expect(response?.ok(), `cold load ${iteration} must return success`).toBeTruthy();

        await expect(page.locator(".brand-home-hero")).toBeVisible();
        await settleTargetLayout(page);

        const metrics = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        }));

        const cards = await page.locator(".brand-character-card").evaluateAll((nodes) =>
          nodes.map((node) => {
            const rect = (node as HTMLElement).getBoundingClientRect();
            return {
              left: rect.left,
              right: rect.right,
              width: rect.width,
            };
          }),
        );

        if (metrics.scrollWidth > metrics.clientWidth + 1) {
          console.log(
            `[phase8g-768] overflow on cold load ${iteration}`,
            JSON.stringify({ metrics, cards }, null, 2),
          );
        }

        expect(
          metrics.scrollWidth,
          `cold load ${iteration} must not create horizontal overflow at 768px`,
        ).toBeLessThanOrEqual(metrics.clientWidth + 1);

        for (const [index, card] of cards.entries()) {
          expect(card.left, `card ${index + 1} must stay inside the left edge`).toBeGreaterThanOrEqual(-1);
          expect(card.right, `card ${index + 1} must stay inside the right edge`).toBeLessThanOrEqual(
            metrics.clientWidth + 1,
          );
          expect(card.width, `card ${index + 1} must never exceed the viewport width`).toBeLessThanOrEqual(
            metrics.clientWidth,
          );
        }

        expect(pageErrors, `cold load ${iteration} must not emit uncaught page errors`).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
});
