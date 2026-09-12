import fs from "node:fs";

const content = fs.readFileSync("lib/comparison-content.ts", "utf8");
const indexPage = fs.readFileSync("components/comparisons-index-page.tsx", "utf8");
const detailPage = fs.readFileSync("components/comparison-detail-page.tsx", "utf8");
const comparisonScene = fs.readFileSync("components/brand-comparison-scene.tsx", "utf8");
const beforeAfterProof = fs.readFileSync("components/brand-before-after-proof.tsx", "utf8");
const evidencePanel = fs.readFileSync("components/brand-evidence-panel.tsx", "utf8");
const proofCss = fs.readFileSync("app/brand-comparison-proof.css", "utf8");
const proofGuide = fs.readFileSync("branding/PROOF_SYSTEM.md", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");
const esIndexRoute = fs.readFileSync("app/(es)/comparativas/page.tsx", "utf8");
const enIndexRoute = fs.readFileSync("app/(en)/en/comparisons/page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");

const requiredKeys = ["chatbot", "ai-agent", "rpa", "traditional-automation", "ai-copilot"];
const requiredEsSlugs = ["chatbot", "agente-ia", "rpa", "automatizacion-tradicional", "copiloto-ia"];
const requiredEnSlugs = ["chatbot", "ai-agent", "rpa", "traditional-automation", "ai-copilot"];

for (const key of requiredKeys) {
  if (!content.includes(`key: \"${key}\"`)) {
    throw new Error(`Missing comparison record: ${key}`);
  }
}

for (const slug of [...requiredEsSlugs, ...requiredEnSlugs]) {
  if (!content.includes(`\"${slug}\"`)) {
    throw new Error(`Missing comparison slug: ${slug}`);
  }
}

const keyCount = (content.match(/key: \"(?:chatbot|ai-agent|rpa|traditional-automation|ai-copilot)\"/g) ?? []).length;
if (keyCount !== 5) throw new Error(`Expected 5 canonical comparisons, found ${keyCount}`);

for (const marker of ["chooseEmployeeWhen", "chooseAlternativeWhen", "combineWhen", "dimensions", "faq"]) {
  const count = content.split(marker).length - 1;
  if (count < 5) throw new Error(`Comparison content is missing complete ${marker} coverage`);
}

if (!indexPage.includes("comparisonRecords.map")) throw new Error("Comparison index must render the canonical records");
if (!indexPage.includes("<BrandComparisonScene") || !indexPage.includes("<BrandEvidencePanel")) {
  throw new Error("Comparison index must expose branded decision and evidence surfaces");
}
if (!detailPage.includes("comparison-table")) throw new Error("Comparison detail must expose a visible comparison table");
if (!detailPage.includes("<BrandBeforeAfterProof") || !detailPage.includes("<BrandEvidencePanel") || !detailPage.includes("<BrandComparisonScene")) {
  throw new Error("Comparison detail must expose decision, proof and evidence visuals");
}
if (!detailPage.includes("no reglas universales") || !detailPage.includes("not universal rules")) {
  throw new Error("Comparison detail must state that patterns are not universal rules");
}
if (!comparisonScene.includes("getBrandCharacters") || !comparisonScene.includes("brand-comparison-system-row")) {
  throw new Error("Branded comparison scene must reuse canonical characters and system context");
}
if (!beforeAfterProof.includes("POTENCIAL · NO GARANTIZADO") || !beforeAfterProof.includes("POTENTIAL · NOT GUARANTEED")) {
  throw new Error("Before/with-AI/outcome proof must label potential outcomes as not guaranteed");
}
for (const marker of ["DEMOSTRABLE", "ANÁLISIS ORIENTATIVO", "ESTIMACIÓN", "DEMONSTRABLE", "INDICATIVE ANALYSIS", "ESTIMATE"]) {
  if (!evidencePanel.includes(marker)) throw new Error(`Evidence panel missing status label: ${marker}`);
}
for (const phrase of ["DEMONSTRABLE", "VERIFIED", "MEASURED", "ESTIMATE", "POTENTIAL", "INDICATIVE ANALYSIS"]) {
  if (!proofGuide.includes(phrase)) throw new Error(`Proof guide missing evidence class: ${phrase}`);
}
if (!proofCss.includes("@media (max-width: 680px)") || !proofCss.includes("prefers-reduced-motion")) {
  throw new Error("Comparison proof branding must include mobile and reduced-motion handling");
}
for (const [locale, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("brand-comparison-proof.css")) throw new Error(`${locale} layout does not load comparison proof branding`);
}
if (!esIndexRoute.includes("ComparisonsIndexPage locale=\"es\"")) throw new Error("Missing Spanish comparison index route");
if (!enIndexRoute.includes("ComparisonsIndexPage locale=\"en\"")) throw new Error("Missing English comparison index route");
if (!sitemap.includes("comparisonIndexPath") || !sitemap.includes("comparisonDetailPath")) {
  throw new Error("Sitemap must include comparison index and detail routes");
}

console.log("Comparison surfaces contract OK: 5 bilingual comparisons with trade-offs, branded decision visuals and explicit evidence taxonomy.");
