import fs from "node:fs";

const files = {
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  production: ".github/workflows/production-verify.yml",
  docs: "docs/PHASE_8_WEB_FINALIZATION.md",
  responsive: "tests/phase8-responsive-matrix.spec.ts",
  interaction: "tests/phase8-interaction-ux.spec.ts",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 8A release-gate file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 8A release-gate file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const production = read(files.production);
const docs = read(files.docs);

const marker = "web-phase-8a-responsive-interaction-ux";
const metadataMarker = `"ia-web-release": "${marker}"`;

if (!esLayout.includes(metadataMarker) || !enLayout.includes(metadataMarker)) {
  throw new Error(`ES/EN layouts are not marked for the active Web Phase 8A release: ${marker}`);
}

if (!production.includes(`EXPECTED_RELEASE: ${marker}`)) {
  throw new Error(`Production verification is not waiting for the active Web Phase 8A release: ${marker}`);
}

for (const testPath of [
  "tests/phase8-responsive-matrix.spec.ts",
  "tests/phase8-interaction-ux.spec.ts",
]) {
  if (!production.includes(testPath)) {
    throw new Error(`Production verification is missing Phase 8A browser coverage: ${testPath}`);
  }
}

for (const phrase of [
  "Phase 8A — Full UX and responsive acceptance",
  "full route responsive matrix green",
  "production verification green",
]) {
  if (!docs.includes(phrase)) throw new Error(`Phase 8 finalization documentation missing phrase: ${phrase}`);
}

console.log(`Web Phase 8A release gate OK: ${marker} is active in ES/EN and production verification covers responsive + interaction acceptance.`);
