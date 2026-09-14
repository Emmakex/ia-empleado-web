import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/",
    heading: "Personas, IA y sistemas trabajando como un solo equipo",
  },
  {
    path: "/en",
    heading: "People, AI and systems working as one team",
  },
] as const;

const poster = "/branding/video/home/ia-empleado-brand-story-poster.webp";
const webm = "/branding/video/home/ia-empleado-brand-story.webm";
const mp4 = "/branding/video/home/ia-empleado-brand-story.mp4";

test.describe("Phase 8D homepage video acceptance", () => {
  for (const route of routes) {
    test(`${route.path} exposes the real brand-story package without forced playback`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });

      const section = page.locator('[data-phase8d-video="home-brand-story"]');
      const video = section.locator("video");
      const sources = video.locator("source");

      await expect(section).toBeVisible();
      await expect(section.getByRole("heading", { name: route.heading })).toBeVisible();
      await expect(video).toBeVisible();
      await expect(sources).toHaveCount(2);

      const state = await video.evaluate((element) => ({
        poster: element.getAttribute("poster"),
        preload: element.preload,
        controls: element.controls,
        autoplay: element.autoplay,
        muted: element.muted,
        loop: element.loop,
        playsInline: element.playsInline,
        paused: element.paused,
        width: element.getAttribute("width"),
        height: element.getAttribute("height"),
      }));

      expect(state.poster).toBe(poster);
      expect(state.preload).toBe("none");
      expect(state.controls).toBe(true);
      expect(state.autoplay).toBe(false);
      expect(state.muted).toBe(false);
      expect(state.loop).toBe(false);
      expect(state.playsInline).toBe(true);
      expect(state.paused).toBe(true);
      expect(state.width).toBe("1920");
      expect(state.height).toBe("1080");

      await expect(sources.nth(0)).toHaveAttribute("src", webm);
      await expect(sources.nth(0)).toHaveAttribute("type", "video/webm");
      await expect(sources.nth(1)).toHaveAttribute("src", mp4);
      await expect(sources.nth(1)).toHaveAttribute("type", "video/mp4");
    });
  }

  test("reduced motion keeps the homepage story static until the user chooses playback", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    const surface = page.locator(".brand-video-home-story");
    const video = surface.locator("video");

    await expect.poll(async () => surface.getAttribute("data-reduced-motion")).toBe("true");
    await expect(video).toHaveAttribute("poster", poster);
    await expect(video).toHaveJSProperty("paused", true);

    const before = await surface.locator(".brand-video-frame").boundingBox();
    await page.waitForTimeout(500);
    const after = await surface.locator(".brand-video-frame").boundingBox();

    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(after?.width).toBeCloseTo(before?.width ?? 0, 1);
    expect(after?.height).toBeCloseTo(before?.height ?? 0, 1);
  });
});
