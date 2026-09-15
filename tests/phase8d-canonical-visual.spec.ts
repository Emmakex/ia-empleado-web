import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const routes = ["/", "/en"] as const;
const canonicalAssetStems = [
  "clara-canonical",
  "alex-canonical",
  "sofia-canonical",
  "javier-canonical",
] as const;

const listFiles = (directory: string): string[] => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(directory, entry.name);
  return entry.isDirectory() ? listFiles(entryPath) : [entryPath.replaceAll("\\", "/")];
});

test.describe("Phase 8D canonical visual fidelity", () => {
  test("public build does not ship generated website video binaries", async () => {
    const generatedVideo = listFiles("public").filter((filePath) => /\.(mp4|webm)$/i.test(filePath));
    expect(generatedVideo).toEqual([]);
  });

  for (const route of routes) {
    test(`${route} keeps the canonical hero identities and contains no video surface`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      await expect(page.locator("video")).toHaveCount(0);

      const hero = page.locator(".brand-hero-stage");
      await expect(hero).toBeVisible();

      const portraits = hero.locator(".brand-character-node img");
      await expect(portraits).toHaveCount(4);

      const sources = await portraits.evaluateAll((images) => images.map((image) => {
        const element = image as HTMLImageElement;
        return decodeURIComponent(element.currentSrc || element.src || "");
      }));
      for (const stem of canonicalAssetStems) {
        expect(sources.some((source) => source.includes("/_next/static/media/") && source.includes(`${stem}.`) && source.includes(".webp"))).toBe(true);
      }
    });
  }

  test("reduced motion keeps canonical static content available without introducing video", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.locator(".brand-hero-stage")).toBeVisible();
    await expect(page.locator(".brand-character-node img")).toHaveCount(4);
  });
});
