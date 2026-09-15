import { expect, test } from "@playwright/test";

const STRESS_ITERATIONS = 5;

async function settleLayout(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;

    await Promise.all(
      Array.from(document.images).map(async (image) => {
        if (!image.complete) {
          await new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }

        if (typeof image.decode === "function") {
          await image.decode().catch(() => undefined);
        }
      }),
    );

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
        await settleLayout(page);

        await expect(page.locator(".brand-home-hero")).toBeVisible();
        await expect(page.locator(".brand-character-card")).toHaveCount(4);

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
