import fs from "node:fs";

const content = fs.readFileSync("lib/sector-use-cases.ts", "utf8");
const sectorOptimization = fs.readFileSync("lib/sector-search-optimization.ts", "utf8");
const sectorIndex = fs.readFileSync("components/sector-index-page.tsx", "utf8");
const sectorDetail = fs.readFileSync("components/sector-detail-page.tsx", "utf8");
const useCaseIndex = fs.readFileSync("components/use-case-index-page.tsx", "utf8");
const useCaseDetail = fs.readFileSync("components/use-case-detail-page.tsx", "utf8");
const sectorEsRoute = fs.readFileSync("app/(es)/sectores/[slug]/page.tsx", "utf8");
const sectorEnRoute = fs.readFileSync("app/(en)/en/sectors/[slug]/page.tsx", "utf8");
const sectorEsIndexRoute = fs.readFileSync("app/(es)/sectores/page.tsx", "utf8");
const sectorEnIndexRoute = fs.readFileSync("app/(en)/en/sectors/page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const footer = fs.readFileSync("components/site-footer.tsx", "utf8");

const sectorKeys = ["ecommerce", "travel", "professional-services", "sales"];
const useCaseKeys = ["customer-issue", "invoice-validation", "sales-follow-up", "order-exception", "travel-booking", "administrative-documentation"];

const hasObjectKey = (source, key) => source.includes(`${key}:`) || source.includes(`"${key}":`) || source.includes(`'${key}':`);

for (const key of sectorKeys) {
  if (!content.includes(`key: \"${key}\"`)) throw new Error(`Missing sector record: ${key}`);
  if (!hasObjectKey(sectorOptimization, key)) throw new Error(`Missing audited sector search ownership: ${key}`);
}
for (const key of useCaseKeys) {
  if (!content.includes(`key: \"${key}\"`)) throw new Error(`Missing use-case record: ${key}`);
}

for (const marker of ["problems:", "systems:", "controls:", "metrics:", "implementation:", "faq:"]) {
  if ((content.split(marker).length - 1) < 4) throw new Error(`Sector content missing ${marker} coverage`);
}

for (const marker of ["steps:", "roles:", "limits:", "sectors:", "teams:"]) {
  if ((content.split(marker).length - 1) < 6) throw new Error(`Use-case content missing ${marker} coverage`);
}

if (!content.includes('return locale === "es" ? "/sectores" : "/en/sectors"')) throw new Error("Missing bilingual sector index paths");
if (!content.includes('return locale === "es" ? "/casos-de-uso" : "/en/use-cases"')) throw new Error("Missing bilingual use-case index paths");

// Phase 3 sector optimization must remain a view/ownership layer over the canonical records.
if (!sectorOptimization.includes("sectorRecords.map")) throw new Error("Optimized sectors must derive from canonical sectorRecords");
if (!sectorOptimization.includes("sectorIndexContent")) throw new Error("Optimized sector hub must derive from canonical sectorIndexContent");
if (!sectorOptimization.includes("optimizedSectorRecords")) throw new Error("Missing optimized sector record export");
if (!sectorOptimization.includes("optimizedSectorIndexContent")) throw new Error("Missing optimized sector hub export");
if (!sectorOptimization.includes("getOptimizedSectorBySlug")) throw new Error("Missing optimized sector slug resolver");

if (!sectorIndex.includes("optimizedSectorRecords.map")) throw new Error("Sector index must render audited optimized sector records");
if (!sectorIndex.includes("optimizedSectorIndexContent")) throw new Error("Sector index must render audited optimized hub content");
if (!useCaseIndex.includes("useCaseRecords.map")) throw new Error("Use-case index must render canonical use cases");

for (const [label, route] of [
  ["ES sector detail", sectorEsRoute],
  ["EN sector detail", sectorEnRoute],
]) {
  if (!route.includes("getOptimizedSectorBySlug")) throw new Error(`${label} must resolve audited sector content`);
  if (!route.includes("optimizedSectorRecords")) throw new Error(`${label} must generate params from audited sector records`);
  if (!route.includes("sectorDetailPath")) throw new Error(`${label} must preserve canonical bilingual route generation`);
}
for (const [label, route] of [
  ["ES sector index", sectorEsIndexRoute],
  ["EN sector index", sectorEnIndexRoute],
]) {
  if (!route.includes("optimizedSectorIndexContent")) throw new Error(`${label} must expose audited hub metadata`);
  if (!route.includes("sectorIndexPath")) throw new Error(`${label} must preserve canonical bilingual hub routes`);
}

if (!sectorDetail.includes("human") && !sectorDetail.includes("control")) throw new Error("Sector detail must expose human-control context");
if (!useCaseDetail.includes("modeLabel") || !useCaseDetail.includes("HowTo")) throw new Error("Use-case detail must expose responsibility modes and crawlable workflow schema");
if (!sitemap.includes("sectorDetailPath") || !sitemap.includes("useCaseDetailPath")) throw new Error("Sitemap must include sector and use-case detail routes");
if (!footer.includes("sectorIndexPath") || !footer.includes("useCaseIndexPath")) throw new Error("Footer must expose sector and use-case discovery");

const routeFiles = [
  "app/(es)/sectores/page.tsx",
  "app/(es)/sectores/[slug]/page.tsx",
  "app/(en)/en/sectors/page.tsx",
  "app/(en)/en/sectors/[slug]/page.tsx",
  "app/(es)/casos-de-uso/page.tsx",
  "app/(es)/casos-de-uso/[slug]/page.tsx",
  "app/(en)/en/use-cases/page.tsx",
  "app/(en)/en/use-cases/[slug]/page.tsx",
];
for (const file of routeFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing Phase 6B route file: ${file}`);
}

console.log("Sector/use-case contract OK: audited sector ownership derives from 4 canonical bilingual sectors, with 6 bilingual deep use cases, controls, metrics and SEO routes protected.");
