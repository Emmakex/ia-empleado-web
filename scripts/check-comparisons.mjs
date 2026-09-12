import fs from "node:fs";

const content = fs.readFileSync("lib/comparison-content.ts", "utf8");
const indexPage = fs.readFileSync("components/comparisons-index-page.tsx", "utf8");
const detailPage = fs.readFileSync("components/comparison-detail-page.tsx", "utf8");
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
if (!detailPage.includes("comparison-table")) throw new Error("Comparison detail must expose a visible comparison table");
if (!detailPage.includes("no reglas universales") || !detailPage.includes("not universal rules")) {
  throw new Error("Comparison detail must state that patterns are not universal rules");
}
if (!esIndexRoute.includes("ComparisonsIndexPage locale=\"es\"")) throw new Error("Missing Spanish comparison index route");
if (!enIndexRoute.includes("ComparisonsIndexPage locale=\"en\"")) throw new Error("Missing English comparison index route");
if (!sitemap.includes("comparisonIndexPath") || !sitemap.includes("comparisonDetailPath")) {
  throw new Error("Sitemap must include comparison index and detail routes");
}

console.log("Comparison surfaces contract OK: 5 bilingual comparisons with trade-offs, combination guidance and SEO routes.");
