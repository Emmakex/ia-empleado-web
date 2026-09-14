import fs from "node:fs";

const files = {
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  production: ".github/workflows/production-verify.yml",
  docs: "docs/PHASE_8_WEB_FINALIZATION.md",
  responsive: "tests/phase8-responsive-matrix.spec.ts",
  interaction: "tests/phase8-interaction-ux.spec.ts",
  accessibility: "tests/phase8b-accessibility.spec.ts",
  accessibilityInteraction: "tests/phase8b-interaction-accessibility.spec.ts",
  motion: "tests/phase8c-motion.spec.ts",
  roi: "components/roi-estimator.tsx",
  teamBuilder: "components/team-builder.tsx",
  processAnalyzer: "components/process-analyzer.tsx",
  header: "components/site-header.tsx",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 8 release-gate file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 8 release-gate file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const production = read(files.production);
const docs = read(files.docs);
const interaction = read(files.interaction);
const accessibility = read(files.accessibility);
const accessibilityInteraction = read(files.accessibilityInteraction);
const motion = read(files.motion);
const roi = read(files.roi);
const teamBuilder = read(files.teamBuilder);
const processAnalyzer = read(files.processAnalyzer);
const header = read(files.header);

const marker = "web-phase-8c-motion-acceptance";
const metadataMarker = `"ia-web-release": "${marker}"`;

if (!esLayout.includes(metadataMarker) || !enLayout.includes(metadataMarker)) {
  throw new Error(`ES/EN layouts are not marked for the active Web Phase 8C release: ${marker}`);
}

if (!production.includes(`EXPECTED_RELEASE: ${marker}`)) {
  throw new Error(`Production verification is not waiting for the active Web Phase 8C release: ${marker}`);
}

for (const testPath of [
  "tests/phase8-responsive-matrix.spec.ts",
  "tests/phase8-interaction-ux.spec.ts",
  "tests/phase8b-accessibility.spec.ts",
  "tests/phase8b-interaction-accessibility.spec.ts",
  "tests/phase8c-motion.spec.ts",
]) {
  if (!production.includes(testPath)) {
    throw new Error(`Production verification is missing required Phase 8 browser coverage: ${testPath}`);
  }
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
]) {
  if (!docs.includes(phrase)) throw new Error(`Phase 8 finalization documentation missing phrase: ${phrase}`);
}

console.log(`Web Phase 8C release gate OK: ${marker} is active in ES/EN; permanent Phase 8A/8B regressions remain protected; production verification includes Phase 8C motion acceptance.`);
