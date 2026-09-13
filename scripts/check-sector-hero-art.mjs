import fs from "node:fs";

const files = {
  component: "components/brand-sector-hero-art.tsx",
  detail: "components/sector-detail-page.tsx",
  css: "app/brand-sector-hero-art.css",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  browser: "tests/sector-hero-art.spec.ts",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing sector hero art contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty sector hero art contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const component = read(files.component);
const detail = read(files.detail);
const css = read(files.css);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const browser = read(files.browser);

const sectors = ["ecommerce", "travel", "professional-services", "sales"];
for (const sector of sectors) {
  if (!component.includes(`${sector}:`) && !component.includes(`\"${sector}\":`)) {
    throw new Error(`Sector hero copy missing sector: ${sector}`);
  }
  if (!css.includes(`[data-sector-art=\"${sector}\"]`)) {
    throw new Error(`Sector hero CSS missing art grammar: ${sector}`);
  }
  if (!css.includes(`[data-sector-signature=\"${sector}\"]`)) {
    throw new Error(`Sector hero CSS missing operational signature: ${sector}`);
  }
}

for (const token of [
  "BrandSectorHeroArt",
  "data-sector-art={sectorKey}",
  "data-sector-signature={sectorKey}",
  "BrandCharacterImage",
  "character.visualFamily.motif",
  "brand-sector-art-stage-track",
  "brand-sector-art-systems",
  "brand-sector-art-human",
]) {
  if (!component.includes(token)) throw new Error(`Sector hero renderer missing contract token: ${token}`);
}

for (const token of [
  "<BrandSectorHeroArt",
  "sectorKey={sector.key}",
  "roles={sector.roles[locale]}",
  "systems={sector.systems[locale]}",
  "BrandCharacterImage character={character}",
]) {
  if (!detail.includes(token)) throw new Error(`Sector detail missing Phase 2C integration token: ${token}`);
}
if (detail.includes("<BrandContextScene")) {
  throw new Error("Deep sector hero must use BrandSectorHeroArt instead of the generic BrandContextScene");
}

for (const token of [
  "@media (max-width: 760px)",
  "@media (max-width: 430px)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!css.includes(token)) throw new Error(`Sector hero CSS missing responsive/accessibility contract: ${token}`);
}

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("brand-sector-hero-art.css")) throw new Error(`${label} layout does not load sector hero CSS`);
  if (!layout.includes('"ia-web-release":')) {
    throw new Error(`${label} layout no longer exposes an IA Empleado release marker`);
  }
}

for (const token of [
  "sectorRecords",
  "sectorDetailPath",
  '([\"es\", \"en\"] as Locale[])',
  'routesFor(\"es\")',
  'width: 390',
  'data-sector-art',
  'data-sector-signature',
  'brand-sector-art-systems',
  'brand-sector-art-human',
]) {
  if (!browser.includes(token)) throw new Error(`Sector hero browser QA missing canonical coverage token: ${token}`);
}

console.log("Sector hero art contract OK: four sector signatures, canonical role families, bilingual route generation and responsive production gate protected.");
