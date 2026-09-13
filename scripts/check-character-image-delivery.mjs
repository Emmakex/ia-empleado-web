import fs from "node:fs";

const helperPath = "components/brand-character-image.tsx";
const roleFamilyPath = "components/brand-role-family-scene.tsx";
const directCriticalSurfaces = [
  "components/brand-hero-scene.tsx",
  "components/home-page.tsx",
  "components/employee-index-page.tsx",
  "components/employee-catalog-explorer.tsx",
  "components/team-index-page.tsx",
  "components/team-detail-page.tsx",
  "components/brand-context-scene.tsx",
  "components/brand-sector-hero-art.tsx",
  "components/brand-organization-scene.tsx",
  "components/brand-collaboration-composition.tsx",
  "components/brand-comparison-scene.tsx",
  "components/brand-interactive-preview.tsx",
  "components/collaboration-simulator.tsx",
  "components/team-builder.tsx",
  "components/process-analyzer.tsx",
];
const composedCriticalSurfaces = [
  "components/employee-detail-page.tsx",
];

for (const path of [helperPath, roleFamilyPath, ...directCriticalSurfaces, ...composedCriticalSurfaces]) {
  if (!fs.existsSync(path)) throw new Error(`Missing character image delivery contract file: ${path}`);
}

const helper = fs.readFileSync(helperPath, "utf8");
for (const token of [
  'from "next/image"',
  "width={420}",
  "height={525}",
  "sizes={sizes}",
  'loading={eager ? "eager" : "lazy"}',
  "fetchPriority={fetchPriority}",
  'decoding="async"',
]) {
  if (!helper.includes(token)) throw new Error(`BrandCharacterImage is missing responsive delivery contract: ${token}`);
}

for (const path of directCriticalSurfaces) {
  const source = fs.readFileSync(path, "utf8");
  if (!source.includes("BrandCharacterImage")) {
    throw new Error(`Critical portrait surface does not use BrandCharacterImage: ${path}`);
  }

  if (/<img\s[^>]*src=\{(?:character|activeCharacter)\.asset\}/s.test(source)) {
    throw new Error(`Critical portrait surface bypasses responsive delivery with a raw canonical <img>: ${path}`);
  }
}

const roleFamily = fs.readFileSync(roleFamilyPath, "utf8");
for (const token of [
  "BrandCharacterImage",
  'sizes="(max-width: 760px) 250px, 300px"',
  "eager",
  'fetchPriority="high"',
]) {
  if (!roleFamily.includes(token)) {
    throw new Error(`Role family scene is missing employee-detail image delivery contract: ${token}`);
  }
}
if (/<img\s[^>]*src=\{character\.asset\}/s.test(roleFamily)) {
  throw new Error("Role family scene bypasses responsive delivery with a raw canonical <img>");
}

const collaboration = fs.readFileSync("components/brand-collaboration-composition.tsx", "utf8");
if (!collaboration.includes('sizes="(max-width: 760px) 86px, 104px"')) {
  throw new Error("Team/Department collaboration composition is missing an explicit responsive portrait sizes contract");
}

const sectorHero = fs.readFileSync("components/brand-sector-hero-art.tsx", "utf8");
if (!sectorHero.includes('sizes="(max-width: 760px) 90px, 112px"')) {
  throw new Error("Sector hero art is missing an explicit responsive canonical portrait sizes contract");
}

const sectorDetail = fs.readFileSync("components/sector-detail-page.tsx", "utf8");
if (/<img\s[^>]*src=\{character\.asset\}/s.test(sectorDetail)) {
  throw new Error("Sector detail bypasses responsive delivery with a raw canonical <img>");
}
if (!sectorDetail.includes('BrandCharacterImage character={character} sizes="96px"')) {
  throw new Error("Sector detail role cards must use BrandCharacterImage with an explicit sizes contract");
}

const detail = fs.readFileSync("components/employee-detail-page.tsx", "utf8");
if (!detail.includes("BrandRoleFamilyScene") || !detail.includes("<BrandRoleFamilyScene character={character} />")) {
  throw new Error("Employee detail hero must delegate canonical portrait delivery through BrandRoleFamilyScene");
}

const hero = fs.readFileSync("components/brand-hero-scene.tsx", "utf8");
if (!hero.includes("fetchPriority={index < 2 ? \"high\" : \"auto\"}")) {
  throw new Error("Homepage hero must reserve high fetch priority for the first visible character row");
}
if (!hero.includes("sizes=\"(max-width: 430px) 120px, (max-width: 760px) 126px, 140px\"")) {
  throw new Error("Homepage hero is missing an explicit responsive portrait sizes contract");
}

console.log("Canonical character responsive image delivery contract OK");
