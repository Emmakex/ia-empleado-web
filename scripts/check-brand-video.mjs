import fs from "node:fs";
import path from "node:path";

const read = (filePath) => fs.readFileSync(filePath, "utf8");
const requiredFiles = [
  "components/brand-video.tsx",
  "app/brand-video.css",
  "branding/VIDEO_SYSTEM.md",
  "public/branding/video/README.md",
];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing Phase 8D video-system file: ${filePath}`);
  if (fs.statSync(filePath).size === 0) throw new Error(`Empty Phase 8D video-system file: ${filePath}`);
}

const component = read("components/brand-video.tsx");
const css = read("app/brand-video.css");
const guide = read("branding/VIDEO_SYSTEM.md");
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
  'transcriptHref',
  'preload={isAmbientLoop ? "metadata" : "none"}',
]) {
  if (!component.includes(marker)) throw new Error(`BrandVideo component missing contract marker: ${marker}`);
}

for (const marker of [
  '.brand-video-frame',
  '.brand-video-poster',
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
  const isLoop = base.includes("-loop");
  const maxBytes = extension === ".webm"
    ? (isLoop ? 2.5 : 6) * 1024 * 1024
    : (isLoop ? 3.5 : 8) * 1024 * 1024;

  if (bytes > maxBytes) {
    throw new Error(`Video exceeds Phase 8D transfer budget: ${filePath} (${bytes} bytes > ${maxBytes} bytes)`);
  }
}

for (const poster of assets.filter((candidate) => candidate.endsWith("-poster.webp"))) {
  const maxPosterBytes = 350 * 1024;
  const bytes = fs.statSync(poster).size;
  if (bytes > maxPosterBytes) throw new Error(`Video poster exceeds 350 KB budget: ${poster}`);
}

console.log(`Brand video contract OK: reusable reduced-motion-aware playback foundation is present; ${videoAssets.length} production video binaries currently registered on disk.`);
