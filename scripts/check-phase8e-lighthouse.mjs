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
const stabilityDocs = read("docs/PHASE_8E_LIGHTHOUSE_STABILITY.md");

const expectedReleaseValues = [...production.matchAll(/EXPECTED_RELEASE:\s+([^\s]+)/g)].map((match) => match[1]);
if (!expectedReleaseValues.length) {
  throw new Error("Production Verification must declare an EXPECTED_RELEASE marker");
}
if (new Set(expectedReleaseValues).size !== 1) {
  throw new Error(`Production Verification uses inconsistent release markers: ${expectedReleaseValues.join(", ")}`);
}
const activeReleaseMarker = expectedReleaseValues[0];

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
const expectedUserAgent = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Mobile Safari/537.36";

if (config.version !== 2) throw new Error(`Phase 8E Lighthouse config version must be 2, received ${config.version}`);
if (config.tool?.package !== "lighthouse" || config.tool?.version !== "13.4.1") {
  throw new Error("Phase 8E Lighthouse tool/version is not pinned to lighthouse@13.4.1");
}
if (config.formFactor !== "mobile") throw new Error("Phase 8E Lighthouse launch gate must run with the mobile form factor");
if (config.emulatedUserAgent !== expectedUserAgent) {
  throw new Error("Phase 8E Lighthouse browser identity drifted from the approved normal mobile Chrome identity");
}
if (config.stability?.samplesOnThresholdFailure !== 3 || config.stability?.decision !== "median") {
  throw new Error("Phase 8E Lighthouse stability contract must use 3 samples and a median decision after an initial threshold miss");
}
if (JSON.stringify(config.routes) !== JSON.stringify(requiredRoutes)) {
  throw new Error(`Unexpected Phase 8E Lighthouse route matrix: ${JSON.stringify(config.routes)}`);
}
for (const [category, minimum] of Object.entries(expectedScores)) {
  if (config.categories?.[category] !== minimum) {
    throw new Error(`Unexpected Lighthouse threshold for ${category}: ${config.categories?.[category]}`);
  }
}

for (const phrase of [
  "LIGHTHOUSE_BASE_URL or PRODUCTION_BASE_URL is required",
  "LIGHTHOUSE_USER_AGENT_MISSING",
  "LIGHTHOUSE_STABILITY_CONFIG_INVALID",
  "samplesOnThresholdFailure",
  "const median =",
  "PHASE8E_LIGHTHOUSE_SAMPLE",
  "LIGHTHOUSE_SAMPLE_THRESHOLD_MISS",
  "LIGHTHOUSE_STABILITY_RETRY",
  "median-of-3",
  "LIGHTHOUSE_RUN_CONTEXT",
  "baseUrlSource",
  "--emulatedUserAgent=${config.emulatedUserAgent}",
  "PHASE8E_LIGHTHOUSE",
  "LIGHTHOUSE_THRESHOLD_FAILURE",
  "LIGHTHOUSE_EXECUTION_FAILURE",
  ".sample-${sample}.json",
  ".artifacts",
  "lighthouseVersion",
  "largestContentfulPaintMs",
  "totalBlockingTimeMs",
]) {
  if (!runner.includes(phrase)) throw new Error(`Lighthouse runner missing diagnostic/stability contract phrase: ${phrase}`);
}

if (packageJson.scripts?.["qa:lighthouse:production"] !== "node scripts/run-phase8e-lighthouse.mjs") {
  throw new Error("package.json is missing the exact qa:lighthouse:production command");
}
if (!ci.includes("Phase 8E Lighthouse launch contract") || !ci.includes("node scripts/check-phase8e-lighthouse.mjs")) {
  throw new Error("Web CI does not protect the Phase 8E Lighthouse launch contract");
}
for (const phrase of [
  "Verify production geometry, brand systems, conversion, accessibility, motion, canonical fidelity",
  "Build exact release for Lighthouse lab",
  "npm run build",
  "Start exact release for Lighthouse lab",
  "npm run start -- -H 127.0.0.1 -p 3000",
  "LIGHTHOUSE_BASE_URL: http://127.0.0.1:3000",
  "npm run qa:lighthouse:production",
  "phase8e-lighthouse-reports",
  ".artifacts/lighthouse/",
]) {
  if (!production.includes(phrase)) throw new Error(`Production/Lighthouse split gate missing phrase: ${phrase}`);
}
if (!production.includes("github.event.workflow_run.head_sha")) {
  throw new Error("Production Verification must checkout the exact successful Web CI SHA before building the Lighthouse lab target");
}
const metadataMarker = `"ia-web-release": "${activeReleaseMarker}"`;
if (!esLayout.includes(metadataMarker) || !enLayout.includes(metadataMarker)) {
  throw new Error(`ES/EN layouts do not match the active production release marker: ${activeReleaseMarker}`);
}
for (const phrase of [
  "Production Verification #42",
  "Production Verification #43",
  "Production Verification #44",
  "163/163",
  "315360000",
  "Status code: 403",
  "WAF-independent",
  "Lighthouse launch-score gate",
]) {
  if (!performanceDocs.includes(phrase)) throw new Error(`Phase 8E performance evidence missing phrase: ${phrase}`);
}
for (const phrase of [
  "Production Verification #45",
  "34928413477",
  "6e237d68f356f1d2ba9981b5df7da51456455cb6",
  "163/163",
  "284–428 ms",
  "0.82",
  "0.85",
  "median-of-three",
  "90/95/95/95",
  "no threshold is lowered",
]) {
  if (!stabilityDocs.includes(phrase)) throw new Error(`Phase 8E Lighthouse stability evidence missing phrase: ${phrase}`);
}

console.log(`Phase 8E Lighthouse launch contract OK under active release ${activeReleaseMarker}: production browser evidence stays on Hostinger while pinned Lighthouse audits the exact verified release SHA; unchanged launch scores use adaptive median-of-three stabilization only after an initial threshold miss.`);
