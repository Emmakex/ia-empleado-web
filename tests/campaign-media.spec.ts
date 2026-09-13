import { expect, test } from "@playwright/test";
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

async function imageDimensions(page: import("@playwright/test").Page, path: string) {
  await page.setContent(`<img id="campaign" src="${path}" alt="" />`);
  const image = page.locator("#campaign");
  await expect(image).toBeVisible();
  await expect.poll(async () => image.evaluate((node: HTMLImageElement) => node.complete)).toBeTruthy();
  const result = await image.evaluate((node: HTMLImageElement) => ({
    naturalWidth: node.naturalWidth,
    naturalHeight: node.naturalHeight,
  }));
  expect(result.naturalWidth).toBeGreaterThan(0);
  expect(result.naturalHeight).toBeGreaterThan(0);
  return result;
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
