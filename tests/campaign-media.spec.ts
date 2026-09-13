import { expect, test, type Page } from "@playwright/test";
import type { Locale } from "../lib/i18n";
import { brandCampaignUrl, type BrandCampaignFormat } from "../lib/brand-campaign-media";

const formats: Array<{ format: BrandCampaignFormat; width: number; height: number }> = [
  { format: "landscape", width: 1600, height: 900 },
  { format: "square", width: 1080, height: 1080 },
  { format: "portrait", width: 1080, height: 1350 },
  { format: "story", width: 1080, height: 1920 },
];

function campaignPath(locale: Locale, format: BrandCampaignFormat, surface: "home" | "roi") {
  return new URL(brandCampaignUrl(locale, format, surface)).pathname;
}

async function imageDimensions(page: Page, path: string) {
  // `page.setContent()` alone lives on about:blank, where a root-relative image
  // cannot resolve against Playwright's configured baseURL. Anchor the document
  // to the active origin first so this helper works in both local CI and the
  // production-verification configuration.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const url = new URL(path, page.url()).toString();

  const response = await page.request.get(url);
  expect(response.status(), `${path} should return HTTP 200`).toBe(200);
  expect(response.headers()["content-type"] ?? "", `${path} should return PNG campaign media`).toContain("image/png");

  await page.setContent(`<img id="campaign" src="${url}" alt="" />`);
  const image = page.locator("#campaign");

  await expect.poll(
    async () => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0 && node.naturalHeight > 0),
    { timeout: 15_000, message: `${path} should load as a non-zero image` },
  ).toBeTruthy();

  return image.evaluate((node: HTMLImageElement) => ({
    naturalWidth: node.naturalWidth,
    naturalHeight: node.naturalHeight,
  }));
}

for (const locale of ["es", "en"] as Locale[]) {
  for (const item of formats) {
    test(`${locale} ${item.format} campaign media renders at canonical dimensions`, async ({ page }) => {
      const dimensions = await imageDimensions(page, campaignPath(locale, item.format, "home"));
      expect(dimensions.naturalWidth).toBe(item.width);
      expect(dimensions.naturalHeight).toBe(item.height);
    });
  }
}

test("ROI campaign media renders without requiring a character composition", async ({ page }) => {
  const dimensions = await imageDimensions(page, campaignPath("es", "square", "roi"));
  expect(dimensions.naturalWidth).toBe(1080);
  expect(dimensions.naturalHeight).toBe(1080);
});

test("campaign route rejects unknown formats and surfaces with 404", async ({ request }) => {
  const badFormat = await request.get("/brand-campaign/es/banner/home");
  expect(badFormat.status()).toBe(404);

  const badSurface = await request.get("/brand-campaign/es/square/not-a-surface");
  expect(badSurface.status()).toBe(404);
});
