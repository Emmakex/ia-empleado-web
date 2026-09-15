import fs from "node:fs";

const files = {
  budget: "config/performance-budgets.json",
  test: "tests/phase8e-performance-budget.spec.ts",
  packageJson: "package.json",
  production: ".github/workflows/production-verify.yml",
  canonicalDecision: "docs/PHASE_8D_CANONICAL_VISUAL_FIDELITY.md",
  nextConfig: "next.config.ts",
  footer: "components/site-footer.tsx",
  teamBuilder: "components/team-builder.tsx",
  brandCharacters: "lib/brand-characters.ts",
};

for (const filePath of Object.values(files)) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing Phase 8E performance file: ${filePath}`);
  if (fs.statSync(filePath).size === 0) throw new Error(`Empty Phase 8E performance file: ${filePath}`);
}

const budget = JSON.parse(fs.readFileSync(files.budget, "utf8"));
const testSource = fs.readFileSync(files.test, "utf8");
const packageJson = JSON.parse(fs.readFileSync(files.packageJson, "utf8"));
const production = fs.readFileSync(files.production, "utf8");
const canonicalDecision = fs.readFileSync(files.canonicalDecision, "utf8");
const nextConfig = fs.readFileSync(files.nextConfig, "utf8");
const footer = fs.readFileSync(files.footer, "utf8");
const teamBuilder = fs.readFileSync(files.teamBuilder, "utf8");
const brandCharacters = fs.readFileSync(files.brandCharacters, "utf8");

if (budget.version !== 1) throw new Error(`Unsupported Phase 8E budget version: ${budget.version}`);
if (!Array.isArray(budget.routes) || budget.routes.length < 6) {
  throw new Error("Phase 8E budget must cover representative ES/EN commercial routes");
}
for (const route of ["/", "/en", "/disena-tu-equipo-ia", "/en/design-your-ai-team", "/calculadora-roi", "/en/roi-calculator"]) {
  if (!budget.routes.includes(route)) throw new Error(`Phase 8E representative route missing: ${route}`);
}

const numericBudgets = [
  "lcpMs",
  "cls",
  "longTaskMaxMs",
  "ttfbMs",
  "totalTransferBytes",
  "jsTransferBytes",
  "cssTransferBytes",
  "imageTransferBytes",
  "thirdPartyRequests",
];
for (const key of numericBudgets) {
  if (typeof budget.production?.[key] !== "number" || budget.production[key] < 0) {
    throw new Error(`Invalid Phase 8E production budget: ${key}`);
  }
}
for (const key of ["maxEncodedBytes", "minimumCacheSeconds"]) {
  if (typeof budget.staticMedia?.[key] !== "number" || budget.staticMedia[key] <= 0) {
    throw new Error(`Invalid Phase 8E static-media budget: ${key}`);
  }
}
if (budget.staticMedia?.canonicalBasename !== "clara-canonical") {
  throw new Error("Phase 8E static-media baseline must track the canonical Clara asset");
}

for (const phrase of [
  'test.describe("Phase 8E production performance budget"',
  "largest-contentful-paint",
  "layout-shift",
  "longtask",
  "ttfbMs",
  "totalTransferBytes",
  "jsTransferBytes",
  "cssTransferBytes",
  "imageTransferBytes",
  "thirdPartyRequests",
  "belowFoldEagerImages",
  "image.currentSrc || image.src",
  "document.fonts.ready",
  "PHASE8E_METRICS",
  "PHASE8E_STATIC_ASSET",
  "browserUrl",
  "sourceUrl",
  "reusableCacheSeconds",
  "/_next/static/media/",
]) {
  if (!testSource.includes(phrase)) throw new Error(`Phase 8E performance test missing phrase: ${phrase}`);
}

for (const phrase of [
  "minimumCacheTTL: 604800",
]) {
  if (!nextConfig.includes(phrase)) throw new Error(`Phase 8E optimized-image cache policy missing phrase: ${phrase}`);
}

for (const phrase of [
  'import type { StaticImageData } from "next/image"',
  'import claraCanonical from "../public/branding/characters/clara-canonical.webp"',
  'import alexCanonical from "../public/branding/characters/alex-canonical.webp"',
  'import sofiaCanonical from "../public/branding/characters/sofia-canonical.webp"',
  'import javierCanonical from "../public/branding/characters/javier-canonical.webp"',
  "asset: StaticImageData",
]) {
  if (!brandCharacters.includes(phrase)) throw new Error(`Phase 8E canonical static-import contract missing phrase: ${phrase}`);
}

for (const [surface, source] of [["footer", footer], ["Team Builder", teamBuilder]]) {
  if (!source.includes('loading="lazy"') || !source.includes('decoding="async"')) {
    throw new Error(`Phase 8E ${surface} below-fold image policy is not protected`);
  }
}

if (packageJson.scripts?.["qa:performance:production"] !== "playwright test --config=playwright.production.config.ts tests/phase8e-performance-budget.spec.ts") {
  throw new Error("Package script qa:performance:production is not bound to the Phase 8E production test");
}

if (!production.includes("tests/phase8e-performance-budget.spec.ts")) {
  throw new Error("Production Verification does not include the Phase 8E performance budget test");
}

if (!canonicalDecision.includes("COMPLETE")) {
  throw new Error("Phase 8D documentation must be closed before Phase 8E advances");
}

console.log(`Phase 8E performance contract OK: ${budget.routes.length} representative routes, explicit CWV/resource budgets, static-import canonical media, optimized-image TTL, below-fold lazy loading and actionable URL diagnostics are protected.`);
