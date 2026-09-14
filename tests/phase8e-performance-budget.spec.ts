import { expect, test } from "@playwright/test";
import budgets from "../config/performance-budgets.json";

type Phase8eMetrics = {
  cls: number;
  lcpMs: number;
  longTaskMaxMs: number;
  ttfbMs: number;
  totalTransferBytes: number;
  jsTransferBytes: number;
  cssTransferBytes: number;
  imageTransferBytes: number;
  thirdPartyRequests: number;
  brokenImages: number;
  belowFoldNotLazy: number;
  fontsStatus: FontFaceSetLoadStatus;
};

const productionBaseUrl = process.env.PRODUCTION_BASE_URL;

async function installPerformanceObservers(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const state = { cls: 0, lcpMs: 0, longTaskMaxMs: 0 };
    (window as typeof window & { __phase8eMetrics?: typeof state }).__phase8eMetrics = state;

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) state.lcpMs = Math.max(state.lcpMs, entry.startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Browser does not expose LCP observer support.
    }

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
          if (!shift.hadRecentInput) state.cls += shift.value ?? 0;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      // Browser does not expose layout-shift observer support.
    }

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) state.longTaskMaxMs = Math.max(state.longTaskMaxMs, entry.duration);
      }).observe({ type: "longtask", buffered: true });
    } catch {
      // Long Tasks is a lab responsiveness proxy and may be unavailable in some browsers.
    }
  });
}

test.describe("Phase 8E production performance budget", () => {
  test.skip(!productionBaseUrl, "Phase 8E numeric budgets run only against the deployed production origin.");

  for (const route of budgets.routes) {
    test(`${route} stays inside the initial production budget`, async ({ page }) => {
      await installPerformanceObservers(page);

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} must respond successfully before performance measurement`).toBeTruthy();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(750);

      const metrics = await page.evaluate(async (): Promise<Phase8eMetrics> => {
        await document.fonts.ready;

        const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        const state = (window as typeof window & {
          __phase8eMetrics?: { cls: number; lcpMs: number; longTaskMaxMs: number };
        }).__phase8eMetrics ?? { cls: 0, lcpMs: 0, longTaskMaxMs: 0 };

        const resourceBytes = (entry: PerformanceResourceTiming) => entry.transferSize || entry.encodedBodySize || 0;
        const navigationBytes = nav ? nav.transferSize || nav.encodedBodySize || 0 : 0;
        const sameOrigin = location.origin;

        const thirdPartyRequests = resources.filter((entry) => {
          try {
            return new URL(entry.name).origin !== sameOrigin;
          } catch {
            return false;
          }
        }).length;

        const images = Array.from(document.images);
        const brokenImages = images.filter((image) => image.complete && image.naturalWidth === 0).length;
        const belowFoldNotLazy = images.filter((image) => {
          const documentTop = image.getBoundingClientRect().top + window.scrollY;
          return documentTop > window.innerHeight * 1.5 && image.loading !== "lazy";
        }).length;

        return {
          cls: state.cls,
          lcpMs: state.lcpMs,
          longTaskMaxMs: state.longTaskMaxMs,
          ttfbMs: nav ? nav.responseStart - nav.requestStart : Number.POSITIVE_INFINITY,
          totalTransferBytes: navigationBytes + resources.reduce((total, entry) => total + resourceBytes(entry), 0),
          jsTransferBytes: resources
            .filter((entry) => entry.initiatorType === "script")
            .reduce((total, entry) => total + resourceBytes(entry), 0),
          cssTransferBytes: resources
            .filter((entry) => entry.initiatorType === "link" && /\.css(?:\?|$)/.test(entry.name))
            .reduce((total, entry) => total + resourceBytes(entry), 0),
          imageTransferBytes: resources
            .filter((entry) => entry.initiatorType === "img")
            .reduce((total, entry) => total + resourceBytes(entry), 0),
          thirdPartyRequests,
          brokenImages,
          belowFoldNotLazy,
          fontsStatus: document.fonts.status,
        };
      });

      console.log(`PHASE8E_METRICS ${JSON.stringify({ route, ...metrics })}`);

      expect(metrics.lcpMs, `${route} LCP`).toBeGreaterThan(0);
      expect(metrics.lcpMs, `${route} LCP`).toBeLessThanOrEqual(budgets.production.lcpMs);
      expect(metrics.cls, `${route} CLS`).toBeLessThanOrEqual(budgets.production.cls);
      expect(metrics.longTaskMaxMs, `${route} long-task responsiveness proxy`).toBeLessThanOrEqual(budgets.production.longTaskMaxMs);
      expect(metrics.ttfbMs, `${route} TTFB/server response`).toBeLessThanOrEqual(budgets.production.ttfbMs);
      expect(metrics.totalTransferBytes, `${route} total transfer`).toBeLessThanOrEqual(budgets.production.totalTransferBytes);
      expect(metrics.jsTransferBytes, `${route} JS transfer`).toBeLessThanOrEqual(budgets.production.jsTransferBytes);
      expect(metrics.cssTransferBytes, `${route} CSS transfer`).toBeLessThanOrEqual(budgets.production.cssTransferBytes);
      expect(metrics.imageTransferBytes, `${route} image transfer`).toBeLessThanOrEqual(budgets.production.imageTransferBytes);
      expect(metrics.thirdPartyRequests, `${route} third-party requests`).toBeLessThanOrEqual(budgets.production.thirdPartyRequests);
      expect(metrics.brokenImages, `${route} broken images`).toBe(0);
      expect(metrics.belowFoldNotLazy, `${route} below-fold eager images`).toBe(0);
      expect(metrics.fontsStatus, `${route} font loading`).toBe("loaded");
    });
  }

  test("canonical static media has a reusable cache policy and bounded payload", async ({ request }) => {
    const response = await request.get(budgets.staticMedia.asset);
    expect(response.ok()).toBeTruthy();

    const body = await response.body();
    const cacheControl = response.headers()["cache-control"] ?? "";

    console.log(`PHASE8E_STATIC_ASSET ${JSON.stringify({
      asset: budgets.staticMedia.asset,
      bytes: body.byteLength,
      cacheControl,
    })}`);

    expect(body.byteLength, "canonical static media payload").toBeLessThanOrEqual(budgets.staticMedia.maxEncodedBytes);
    expect(cacheControl.toLowerCase(), "static media must not disable caching").not.toContain("no-store");
    expect(cacheControl, "static media should expose an explicit reusable cache policy").toMatch(/(?:max-age|s-maxage|public|immutable)/i);
  });
});
