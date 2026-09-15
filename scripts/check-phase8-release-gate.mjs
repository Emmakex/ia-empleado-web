import fs from "node:fs";
import path from "node:path";

const files = {
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  production: ".github/workflows/production-verify.yml",
  docs: "docs/PHASE_8_WEB_FINALIZATION.md",
  canonicalDecision: "docs/PHASE_8D_CANONICAL_VISUAL_FIDELITY.md",
  responsive: "tests/phase8-responsive-matrix.spec.ts",
  interaction: "tests/phase8-interaction-ux.spec.ts",
  accessibility: "tests/phase8b-accessibility.spec.ts",
  accessibilityInteraction: "tests/phase8b-interaction-accessibility.spec.ts",
  motion: "tests/phase8c-motion.spec.ts",
  canonicalVisual: "tests/phase8d-canonical-visual.spec.ts",
  performance: "tests/phase8e-performance-budget.spec.ts",
  seoRuntime: "tests/phase8f-seo-runtime.spec.ts",
  lighthouseConfig: "config/lighthouse-launch.json",
  lighthouseRunner: "scripts/run-phase8e-lighthouse.mjs",
  lighthouseContract: "scripts/check-phase8e-lighthouse.mjs",
  roi: "components/roi-estimator.tsx",
  teamBuilder: "components/team-builder.tsx",
  processAnalyzer: "components/process-analyzer.tsx",
  homePage: "components/home-page.tsx",
  brandCharacters: "lib/brand-characters.ts",
  brandCharacterImage: "components/brand-character-image.tsx",
  header: "components/site-header.tsx",
};

for (const filePath of Object.values(files)) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing Web Phase 8 release-gate file: ${filePath}`);
  if (fs.statSync(filePath).size === 0) throw new Error(`Empty Web Phase 8 release-gate file: ${filePath}`);
}

const read = (filePath) => fs.readFileSync(filePath, "utf8");
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const production = read(files.production);
const docs = read(files.docs);
const canonicalDecision = read(files.canonicalDecision);
const interaction = read(files.interaction);
const accessibility = read(files.accessibility);
const accessibilityInteraction = read(files.accessibilityInteraction);
const motion = read(files.motion);
const canonicalVisual = read(files.canonicalVisual);
const performance = read(files.performance);
const seoRuntime = read(files.seoRuntime);
const lighthouseConfig = read(files.lighthouseConfig);
const lighthouseRunner = read(files.lighthouseRunner);
const lighthouseContract = read(files.lighthouseContract);
const roi = read(files.roi);
const teamBuilder = read(files.teamBuilder);
const processAnalyzer = read(files.processAnalyzer);
const homePage = read(files.homePage);
const brandCharacters = read(files.brandCharacters);
const brandCharacterImage = read(files.brandCharacterImage);
const header = read(files.header);

const marker = "web-phase-8f-runtime-seo";
const metadataMarker = `"ia-web-release": "${marker}"`;

if (!esLayout.includes(metadataMarker) || !enLayout.includes(metadataMarker)) {
  throw new Error(`ES/EN layouts are not marked for the active Web Phase 8F release: ${marker}`);
}

if (!production.includes(`EXPECTED_RELEASE: ${marker}`)) {
  throw new Error(`Production verification is not waiting for the active Web Phase 8F release: ${marker}`);
}

for (const testPath of [
  "tests/phase8-responsive-matrix.spec.ts",
  "tests/phase8-interaction-ux.spec.ts",
  "tests/phase8b-accessibility.spec.ts",
  "tests/phase8b-interaction-accessibility.spec.ts",
  "tests/phase8c-motion.spec.ts",
  "tests/phase8d-canonical-visual.spec.ts",
  "tests/phase8e-performance-budget.spec.ts",
  "tests/phase8f-seo-runtime.spec.ts",
]) {
  if (!production.includes(testPath)) {
    throw new Error(`Production verification is missing required Phase 8 browser coverage: ${testPath}`);
  }
}

for (const phrase of [
  "npm run qa:lighthouse:production",
  "phase8e-lighthouse-reports",
  ".artifacts/lighthouse/",
]) {
  if (!production.includes(phrase)) throw new Error(`Production verification is missing Lighthouse launch coverage: ${phrase}`);
}

for (const phrase of [
  '"performance": 0.9',
  '"accessibility": 0.95',
  '"best-practices": 0.95',
  '"seo": 0.95',
  '"version": "13.4.1"',
]) {
  if (!lighthouseConfig.includes(phrase)) throw new Error(`Lighthouse launch configuration missing phrase: ${phrase}`);
}
for (const phrase of ["PHASE8E_LIGHTHOUSE", "LIGHTHOUSE_THRESHOLD_FAILURE", "LIGHTHOUSE_EXECUTION_FAILURE"]) {
  if (!lighthouseRunner.includes(phrase)) throw new Error(`Lighthouse runner diagnostics missing phrase: ${phrase}`);
}
if (!lighthouseContract.includes("Phase 8E Lighthouse launch contract OK")) {
  throw new Error("Dedicated Phase 8E Lighthouse static contract is missing its success signature");
}

// Phase 8A ROI hydration remains a permanent regression gate after later markers advance.
for (const phrase of [
  'data-roi-hydrated={isHydrated ? "true" : "false"}',
  'disabled={!isHydrated}',
  'data-roi-release="phase8a-roi-hydration-sync"',
]) {
  if (!roi.includes(phrase)) throw new Error(`ROI hydration regression contract missing phrase: ${phrase}`);
}

for (const phrase of [
  'toHaveAttribute("data-roi-hydrated", "true")',
  'toHaveValue("31")',
  'toHaveAttribute("data-team-builder-hydrated", "true")',
  'toHaveAttribute("data-process-analyzer-hydrated", "true")',
]) {
  if (!interaction.includes(phrase)) throw new Error(`Phase 8 interaction hydration regression coverage missing phrase: ${phrase}`);
}

for (const [name, source, phrases] of [
  ["Team Builder", teamBuilder, [
    'data-team-builder-hydrated={isHydrated ? "true" : "false"}',
    'data-team-builder-release="phase8b-hydration-sync"',
    "disabled={!isHydrated}",
  ]],
  ["Process Analyzer", processAnalyzer, [
    'data-process-analyzer-hydrated={isHydrated ? "true" : "false"}',
    'data-process-analyzer-release="phase8b-hydration-sync"',
    "disabled={!isHydrated}",
  ]],
]) {
  for (const phrase of phrases) {
    if (!source.includes(phrase)) throw new Error(`${name} hydration release contract missing phrase: ${phrase}`);
  }
}

for (const phrase of [
  'test.describe("Phase 8B accessibility matrix"',
  "assertAxeBlockingFree",
  '"wcag22aa"',
]) {
  if (!accessibility.includes(phrase)) throw new Error(`Phase 8B Axe/semantic gate missing phrase: ${phrase}`);
}

for (const phrase of [
  'test.describe("Phase 8B interaction accessibility"',
  "works keyboard-only",
  "language switch exposes hreflang",
  "prefers-reduced-motion: reduce",
  "prefers-contrast: more",
  "forced-colors: active",
  "persistent accessible validation errors",
  "meaningful composite imagery is labelled",
]) {
  if (!accessibilityInteraction.includes(phrase)) {
    throw new Error(`Phase 8B interaction/preference gate missing phrase: ${phrase}`);
  }
}

for (const phrase of [
  'test.describe("Phase 8C motion acceptance"',
  "phase8c-home-copy-enter",
  "mobile removes continuous person drift and slows ambient coordination",
  "reduced motion disables non-essential animation across internal scene families",
]) {
  if (!motion.includes(phrase)) {
    throw new Error(`Phase 8C motion production gate missing phrase: ${phrase}`);
  }
}

for (const phrase of [
  'test.describe("Phase 8D canonical visual fidelity"',
  'locator("video")',
  "clara-canonical",
  "alex-canonical",
  "sofia-canonical",
  "javier-canonical",
  "/_next/static/media/",
  'reducedMotion: "reduce"',
]) {
  if (!canonicalVisual.includes(phrase)) {
    throw new Error(`Phase 8D canonical visual gate missing phrase: ${phrase}`);
  }
}

for (const phrase of [
  'test.describe("Phase 8E production performance budget"',
  "PHASE8E_METRICS",
  "PHASE8E_STATIC_ASSET",
  "belowFoldEagerImages",
  "browserUrl",
  "reusableCacheSeconds",
]) {
  if (!performance.includes(phrase)) {
    throw new Error(`Phase 8E performance production gate missing phrase: ${phrase}`);
  }
}

for (const phrase of [
  'test.describe("Phase 8F runtime SEO matrix"',
  "PHASE8F_SEO_ROUTE",
  "PHASE8F_INTERNAL_INDEX_POLICY",
  "not-found responses are 404 and explicitly non-indexable",
]) {
  if (!seoRuntime.includes(phrase)) {
    throw new Error(`Phase 8F SEO production gate missing phrase: ${phrase}`);
  }
}

for (const phrase of [
  "video experiment rejected",
  "canonical WebP",
  "CSS/SVG motion",
  "web-phase-8d-canonical-visuals",
]) {
  if (!canonicalDecision.includes(phrase)) {
    throw new Error(`Phase 8D canonical visual decision missing phrase: ${phrase}`);
  }
}

const forbiddenVideoFiles = [
  "components/brand-video.tsx",
  "components/home-brand-story.tsx",
  "app/brand-video.css",
  "scripts/check-brand-video.mjs",
  "scripts/render-home-brand-story.py",
  ".github/workflows/generate-home-brand-story.yml",
  "tests/phase8d-video.spec.ts",
];
for (const forbidden of forbiddenVideoFiles) {
  if (fs.existsSync(forbidden)) throw new Error(`Rejected website-video implementation is still present: ${forbidden}`);
}

const listFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(directory, entry.name);
  return entry.isDirectory() ? listFiles(entryPath) : [entryPath.replaceAll("\\", "/")];
});
const shippedVideo = listFiles("public").filter((filePath) => /\.(mp4|webm)$/i.test(filePath));
if (shippedVideo.length) {
  throw new Error(`Public website must not ship generated video binaries: ${shippedVideo.join(", ")}`);
}

if (homePage.includes("HomeBrandStory") || homePage.includes("<video")) {
  throw new Error("Homepage reintroduced the rejected video surface");
}

for (const sourcePath of [
  "/branding/characters/clara-canonical.webp",
  "/branding/characters/alex-canonical.webp",
  "/branding/characters/sofia-canonical.webp",
  "/branding/characters/javier-canonical.webp",
]) {
  if (!brandCharacters.includes(sourcePath)) throw new Error(`Canonical character source missing: ${sourcePath}`);
}
for (const phrase of [
  'import Image, { type StaticImageData } from "next/image"',
  'import claraCanonical from "../public/branding/characters/clara-canonical.webp"',
  'import alexCanonical from "../public/branding/characters/alex-canonical.webp"',
  'import sofiaCanonical from "../public/branding/characters/sofia-canonical.webp"',
  'import javierCanonical from "../public/branding/characters/javier-canonical.webp"',
  'const deliveryAssets: Record<BrandCharacter["id"], StaticImageData>',
  "src={deliveryAssets[character.id]}",
]) {
  if (!brandCharacterImage.includes(phrase)) throw new Error(`Canonical browser-delivery contract missing phrase: ${phrase}`);
}

if (!header.includes("hrefLang={otherLocale}")) {
  throw new Error("Bilingual language switch no longer exposes hreflang semantics");
}

for (const phrase of [
  "Phase 8A — Full UX and responsive acceptance",
  "Phase 8B — Accessibility closure",
  "Phase 8B final production closure gate",
  "Production Verification #31",
  "web-phase-8b-hydration-sync",
  "Phase 8C — Motion and animation finalization",
  "Phase 8D — Canonical visual fidelity closure",
  "Phase 8E — Performance & Core Web Vitals",
  "stable Lighthouse launch score gate",
  "Phase 8F — SEO, metadata and sharing",
]) {
  if (!docs.includes(phrase)) throw new Error(`Phase 8 finalization documentation missing phrase: ${phrase}`);
}

console.log(`Web Phase 8F release gate OK: ${marker} is active in ES/EN; permanent Phase 8A-8E regressions, Lighthouse and the Phase 8F runtime SEO matrix remain protected.`);
