import fs from "node:fs";
import path from "node:path";

const read = (filePath) => fs.readFileSync(filePath, "utf8");
const requiredFiles = [
  "components/brand-video.tsx",
  "components/home-brand-story.tsx",
  "components/home-page.tsx",
  "app/brand-video.css",
  "branding/VIDEO_SYSTEM.md",
  "branding/HOMEPAGE_BRAND_STORY_STORYBOARD.md",
  "public/branding/video/README.md",
  "public/branding/video/home/ia-empleado-brand-story.webm",
  "public/branding/video/home/ia-empleado-brand-story.mp4",
  "public/branding/video/home/ia-empleado-brand-story-poster.webp",
  "scripts/render-home-brand-story.py",
  ".github/workflows/generate-home-brand-story.yml",
  "tests/phase8d-video.spec.ts",
];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing Phase 8D video-system file: ${filePath}`);
  if (fs.statSync(filePath).size === 0) throw new Error(`Empty Phase 8D video-system file: ${filePath}`);
}

const component = read("components/brand-video.tsx");
const homeStory = read("components/home-brand-story.tsx");
const homePage = read("components/home-page.tsx");
const css = read("app/brand-video.css");
const guide = read("branding/VIDEO_SYSTEM.md");
const storyboard = read("branding/HOMEPAGE_BRAND_STORY_STORYBOARD.md");
const renderer = read("scripts/render-home-brand-story.py");
const generatorWorkflow = read(".github/workflows/generate-home-brand-story.yml");
const phase8dTest = read("tests/phase8d-video.spec.ts");
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");

for (const marker of [
  '"use client"',
  'window.matchMedia("(prefers-reduced-motion: reduce)")',
  'mode = "explainer"',
  'mode === "ambient-loop"',
  'video.play()',
  'video.pause()',
  'type="video/webm"',
  'type="video/mp4"',
  'playsInline',
  'controls={!isAmbientLoop}',
  'kind="captions"',
  'captionsLang',
  'transcriptHref',
  'const preload = shouldPlayAmbientLoop ? "metadata" : "none"',
  'preload={preload}',
]) {
  if (!component.includes(marker)) throw new Error(`BrandVideo component missing contract marker: ${marker}`);
}

for (const marker of [
  '.brand-video-frame',
  '.brand-video-poster',
  '.brand-video-section',
  '.brand-video-home-story',
  '[data-reduced-motion="true"]',
  '@media (prefers-reduced-motion: reduce)',
  '@media (forced-colors: active)',
  'aspect-ratio: 16 / 9',
]) {
  if (!css.includes(marker)) throw new Error(`Brand video stylesheet missing contract marker: ${marker}`);
}

for (const [name, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("brand-video.css")) throw new Error(`${name} layout does not load the Phase 8D video system stylesheet`);
}

for (const phrase of [
  "WebM primary asset",
  "MP4 fallback",
  "poster image",
  "captions for spoken content",
  "transcript for meaningful narration",
  "no autoplay with sound",
  "prefers-reduced-motion",
  "video must not become LCP",
  "Do not add dummy MP4/WebM files",
]) {
  if (!guide.includes(phrase)) throw new Error(`Video system guide missing rule: ${phrase}`);
}

for (const marker of [
  'data-phase8d-video="home-brand-story"',
  'mode="explainer"',
  'poster="/branding/video/home/ia-empleado-brand-story-poster.webp"',
  'webmSrc="/branding/video/home/ia-empleado-brand-story.webm"',
  'mp4Src="/branding/video/home/ia-empleado-brand-story.mp4"',
  'width={1920}',
  'height={1080}',
  'Personas, IA y sistemas trabajando como un solo equipo',
  'People, AI and systems working as one team',
]) {
  if (!homeStory.includes(marker)) throw new Error(`Homepage brand story missing contract marker: ${marker}`);
}

if (!homePage.includes('import { HomeBrandStory } from "./home-brand-story"')) {
  throw new Error("Homepage does not import the Phase 8D brand story section");
}
if (!homePage.includes("<HomeBrandStory locale={locale} />")) {
  throw new Error("Homepage does not render the Phase 8D brand story section");
}

for (const marker of [
  "target duration: 18–22 seconds",
  "canonical characters only: Clara, Alex, Sofía and Javier",
  "human-control checkpoint",
  "The video should be introduced below the initial hero",
]) {
  if (!storyboard.includes(marker)) throw new Error(`Homepage brand-story storyboard missing rule: ${marker}`);
}

for (const marker of [
  'W, H, FPS, DURATION = 1920, 1080, 12, 18.0',
  'clara-customer-support.svg',
  'alex-administrative.svg',
  'sofia-accounting.svg',
  'javier-sales.svg',
  'public/branding/ia-empleado-mark.svg',
  'libx264',
  'libvpx-vp9',
  'ia-empleado-brand-story-poster.webp',
]) {
  if (!renderer.includes(marker)) throw new Error(`Homepage brand-story renderer missing marker: ${marker}`);
}

for (const marker of [
  "Generate Phase 8D Home Brand Story",
  "python scripts/render-home-brand-story.py",
  "node scripts/check-brand-video.mjs",
  "ffprobe",
  "github-actions[bot]",
  "public/branding/video/home/ia-empleado-brand-story.mp4",
]) {
  if (!generatorWorkflow.includes(marker)) throw new Error(`Homepage brand-story workflow missing marker: ${marker}`);
}

for (const marker of [
  'test.describe("Phase 8D homepage video acceptance"',
  'data-phase8d-video="home-brand-story"',
  'expect(state.preload).toBe("none")',
  'expect(state.autoplay).toBe(false)',
  'expect(state.controls).toBe(true)',
  'reducedMotion: "reduce"',
  'data-reduced-motion',
  'boundingBox()',
]) {
  if (!phase8dTest.includes(marker)) throw new Error(`Phase 8D browser acceptance missing marker: ${marker}`);
}

const assetRoot = "public/branding/video";
const listFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(directory, entry.name);
  return entry.isDirectory() ? listFiles(entryPath) : [entryPath.replaceAll("\\", "/")];
});

const assets = listFiles(assetRoot);
const videoAssets = assets.filter((filePath) => /\.(webm|mp4)$/i.test(filePath));

for (const filePath of assets.filter((candidate) => candidate.endsWith(".vtt"))) {
  if (!read(filePath).trimStart().startsWith("WEBVTT")) throw new Error(`Invalid WebVTT caption file: ${filePath}`);
}

for (const filePath of videoAssets) {
  const extension = path.extname(filePath).toLowerCase();
  const base = filePath.slice(0, -extension.length);
  const counterpart = `${base}${extension === ".webm" ? ".mp4" : ".webm"}`;
  const poster = `${base}-poster.webp`;

  if (!fs.existsSync(counterpart)) throw new Error(`Video fallback pair missing for ${filePath}: expected ${counterpart}`);
  if (!fs.existsSync(poster)) throw new Error(`Video poster missing for ${filePath}: expected ${poster}`);

  const bytes = fs.statSync(filePath).size;
  if (bytes < 100 * 1024) throw new Error(`Video is suspiciously small and may be a dummy asset: ${filePath} (${bytes} bytes)`);

  const isLoop = base.includes("-loop");
  const maxBytes = extension === ".webm"
    ? (isLoop ? 2.5 : 6) * 1024 * 1024
    : (isLoop ? 3.5 : 8) * 1024 * 1024;

  if (bytes > maxBytes) {
    throw new Error(`Video exceeds Phase 8D transfer budget: ${filePath} (${bytes} bytes > ${maxBytes} bytes)`);
  }
}

for (const poster of assets.filter((candidate) => candidate.endsWith("-poster.webp"))) {
  const bytes = fs.statSync(poster).size;
  if (bytes < 20 * 1024) throw new Error(`Video poster is suspiciously small and may be a dummy asset: ${poster}`);
  if (bytes > 350 * 1024) throw new Error(`Video poster exceeds 350 KB budget: ${poster}`);
}

const requiredHomeAssets = [
  "public/branding/video/home/ia-empleado-brand-story.webm",
  "public/branding/video/home/ia-empleado-brand-story.mp4",
  "public/branding/video/home/ia-empleado-brand-story-poster.webp",
];
for (const asset of requiredHomeAssets) {
  if (!assets.includes(asset)) throw new Error(`Homepage production video asset is not registered on disk: ${asset}`);
}

console.log(`Brand video contract OK: Phase 8D homepage media is reproducible, integrated in ES/EN, reduced-motion aware and protected by browser acceptance; ${videoAssets.length} production video binaries registered on disk.`);
