import { execFileSync } from "node:child_process";
import fs from "node:fs";

const files = {
  generator: "scripts/generate-release-fingerprint.mjs",
  generated: "lib/release-fingerprint.generated.ts",
  package: "package.json",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  production: ".github/workflows/production-verify.yml",
};

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const file of Object.values(files)) {
  assert(fs.existsSync(file), `Missing release fingerprint contract file: ${file}`);
  assert(fs.statSync(file).size > 0, `Empty release fingerprint contract file: ${file}`);
}

const generator = read(files.generator);
const generated = read(files.generated);
const packageJson = JSON.parse(read(files.package));
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const production = read(files.production);

assert(
  packageJson.scripts?.prebuild === "node scripts/generate-release-fingerprint.mjs",
  "Production build lifecycle no longer generates the release fingerprint",
);

for (const token of [
  'const generatedRelativePath = "lib/release-fingerprint.generated.ts"',
  'const sourceRoots = ["app", "components", "config", "content", "lib", "public"]',
  'execFileSync("git", ["rev-parse", "HEAD"]',
  'return `web-${commit.slice(0, 24)}`;',
  'crypto.createHash("sha256")',
  'slice(0, 24)',
  'process.argv.includes("--print")',
  'file !== generatedRelativePath',
  'computeGitReleaseFingerprint() ?? computeSourceFallbackFingerprint()',
]) {
  assert(generator.includes(token), `Release fingerprint generator missing token: ${token}`);
}

assert(
  generated.includes('export const WEB_RELEASE_FINGERPRINT = "web-dev-unbuilt" as const;'),
  "Committed generated module must retain the deterministic pre-build fallback",
);

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  assert(layout.includes("WEB_RELEASE_FINGERPRINT"), `${label} layout does not import/use the generated release fingerprint`);
  assert(
    layout.includes('other: { "ia-web-release": WEB_RELEASE_FINGERPRINT }'),
    `${label} layout does not publish the dynamic release fingerprint`,
  );
}

for (const token of [
  "Compute exact web release fingerprint",
  'node scripts/generate-release-fingerprint.mjs --print',
  'EXPECTED_RELEASE: ${{ steps.release.outputs.fingerprint }}',
  "Wait for exact release fingerprint on Hostinger",
]) {
  assert(production.includes(token), `Production verification missing exact-release token: ${token}`);
}

const legacyMarker = "web-phase-8f-structured-navigation";
const activeCodeLines = [...esLayout.split("\n"), ...enLayout.split("\n")]
  .filter((line) => !line.trimStart().startsWith("//"));
assert(
  !activeCodeLines.some((line) => line.includes(legacyMarker)),
  "A root layout reactivated the historical fixed Phase 8F release marker",
);

const activeWorkflowLines = production.split("\n")
  .filter((line) => !line.trimStart().startsWith("#"));
assert(
  !activeWorkflowLines.some((line) => line.includes(`EXPECTED_RELEASE: ${legacyMarker}`)),
  "Production Verification reactivated the historical fixed Phase 8F expected release",
);

const fingerprintA = execFileSync(process.execPath, [files.generator, "--print"], { encoding: "utf8" }).trim();
const fingerprintB = execFileSync(process.execPath, [files.generator, "--print"], { encoding: "utf8" }).trim();
assert(/^web-[a-f0-9]{24}$/.test(fingerprintA), `Unexpected release fingerprint format: ${fingerprintA}`);
assert(fingerprintA === fingerprintB, "Release fingerprint is not deterministic across identical release inputs");

const gitCommit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim().toLowerCase();
assert(
  fingerprintA === `web-${gitCommit.slice(0, 24)}`,
  `Git-backed release fingerprint must match the checked-out commit: expected web-${gitCommit.slice(0, 24)}, got ${fingerprintA}`,
);

console.log(`Exact web release fingerprint contract OK: ${fingerprintA}; Git-backed deployments and production verification use the same checked-out commit identity.`);
