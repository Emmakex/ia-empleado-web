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
  roi: "components/roi-estimator.tsx",
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
const roi = read(files.roi);
const header = read(files.header);

const marker = "web-phase-8b-accessibility-closure";
const metadataMarker = `"ia-web-release": "${marker}"`;

if (!esLayout.includes(metadataMarker) || !enLayout.includes(metadataMarker)) {
  throw new Error(`ES/EN layouts are not marked for the active Web Phase 8B release: ${marker}`);
}

if (!production.includes(`EXPECTED_RELEASE: ${marker}`)) {
  throw new Error(`Production verification is not waiting for the active Web Phase 8B release: ${marker}`);
}

for (const testPath of [
  "tests/phase8-responsive-matrix.spec.ts",
  "tests/phase8-interaction-ux.spec.ts",
  "tests/phase8b-accessibility.spec.ts",
  "tests/phase8b-interaction-accessibility.spec.ts",
]) {
  if (!production.includes(testPath)) {
    throw new Error(`Production verification is missing required Phase 8 browser coverage: ${testPath}`);
  }
}

// Phase 8A remains a permanent regression gate even after the active marker advances.
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
]) {
  if (!interaction.includes(phrase)) throw new Error(`Phase 8A interaction regression coverage missing phrase: ${phrase}`);
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

if (!header.includes("hrefLang={otherLocale}")) {
  throw new Error("Bilingual language switch no longer exposes hreflang semantics");
}

for (const phrase of [
  "Phase 8A — Full UX and responsive acceptance",
  "Phase 8B — Accessibility closure",
  "Phase 8B final production closure gate",
  "web-phase-8b-accessibility-closure",
]) {
  if (!docs.includes(phrase)) throw new Error(`Phase 8 finalization documentation missing phrase: ${phrase}`);
}

console.log(`Web Phase 8B release gate OK: ${marker} is active in ES/EN, Phase 8A ROI regression remains protected, and production verification includes both Phase 8B accessibility suites.`);
