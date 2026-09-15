import fs from "node:fs";

const read = (filePath) => {
  if (!fs.existsSync(filePath)) throw new Error(`Missing Phase 8E Lighthouse gate file: ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
};

const config = JSON.parse(read("config/lighthouse-launch.json"));
const runner = read("scripts/run-phase8e-lighthouse.mjs");
const ci = read(".github/workflows/ci.yml");
const production = read(".github/workflows/production-verify.yml");
const packageJson = JSON.parse(read("package.json"));
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");
const performanceDocs = read("docs/PHASE_8E_PERFORMANCE_BASELINE.md");

const marker = "web-phase-8e-lighthouse-gate";
const requiredRoutes = [
  "/",
  "/en",
  "/disena-tu-equipo-ia",
  "/en/design-your-ai-team",
  "/calculadora-roi",
  "/en/roi-calculator",
];
const expectedScores = {
  performance: 0.9,
  accessibility: 0.95,
  "best-practices": 0.95,
  seo: 0.95,
};

if (config.tool?.package !== "lighthouse" || config.tool?.version !== "13.4.1") {
  throw new Error("Phase 8E Lighthouse tool/version is not pinned to lighthouse@13.4.1");
}
if (config.formFactor !== "mobile") throw new Error("Phase 8E Lighthouse launch gate must run with the mobile form factor");
if (JSON.stringify(config.routes) !== JSON.stringify(requiredRoutes)) {
  throw new Error(`Unexpected Phase 8E Lighthouse route matrix: ${JSON.stringify(config.routes)}`);
}
for (const [category, minimum] of Object.entries(expectedScores)) {
  if (config.categories?.[category] !== minimum) {
    throw new Error(`Unexpected Lighthouse threshold for ${category}: ${config.categories?.[category]}`);
  }
}

for (const phrase of [
  "PRODUCTION_BASE_URL is required",
  "PHASE8E_LIGHTHOUSE",
  "LIGHTHOUSE_THRESHOLD_FAILURE",
  "LIGHTHOUSE_EXECUTION_FAILURE",
  ".artifacts",
  "lighthouseVersion",
  "largestContentfulPaintMs",
  "totalBlockingTimeMs",
]) {
  if (!runner.includes(phrase)) throw new Error(`Lighthouse runner missing diagnostic contract phrase: ${phrase}`);
}

if (packageJson.scripts?.["qa:lighthouse:production"] !== "node scripts/run-phase8e-lighthouse.mjs") {
  throw new Error("package.json is missing the exact qa:lighthouse:production command");
}
if (!ci.includes("Phase 8E Lighthouse launch contract") || !ci.includes("node scripts/check-phase8e-lighthouse.mjs")) {
  throw new Error("Web CI does not protect the Phase 8E Lighthouse launch contract");
}
for (const phrase of [
  `EXPECTED_RELEASE: ${marker}`,
  "npm run qa:lighthouse:production",
  "phase8e-lighthouse-reports",
  ".artifacts/lighthouse/",
]) {
  if (!production.includes(phrase)) throw new Error(`Production Lighthouse gate missing phrase: ${phrase}`);
}
const metadataMarker = `"ia-web-release": "${marker}"`;
if (!esLayout.includes(metadataMarker) || !enLayout.includes(metadataMarker)) {
  throw new Error(`ES/EN layouts are not marked for the Lighthouse gate release: ${marker}`);
}
for (const phrase of [
  "Production Verification #42",
  "163/163",
  "315360000",
  "Lighthouse launch-score gate",
]) {
  if (!performanceDocs.includes(phrase)) throw new Error(`Phase 8E performance evidence missing phrase: ${phrase}`);
}

console.log("Phase 8E Lighthouse launch contract OK: pinned Lighthouse, bilingual route matrix, launch scores, diagnostics, exact marker and report artifacts are protected.");
