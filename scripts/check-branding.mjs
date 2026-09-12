import fs from "node:fs";

const canonicalCharacters = [
  ["clara", "/branding/characters/clara-canonical.webp"],
  ["alex", "/branding/characters/alex-canonical.webp"],
  ["sofia", "/branding/characters/sofia-canonical.webp"],
  ["javier", "/branding/characters/javier-canonical.webp"],
];

const requiredFiles = [
  "branding/README.md",
  "branding/BRAND_SYSTEM.md",
  "branding/ASSET_MANIFEST.md",
  "branding/tokens.json",
  "public/branding/ia-empleado-mark.svg",
  "public/branding/ia-empleado-mark-mono.svg",
  "public/branding/ia-employee-human.svg",
  ...canonicalCharacters.map(([, asset]) => `public${asset}`),
  "public/branding/orbit-pattern.svg",
  "public/branding/people-ai-systems.svg",
  "lib/brand-characters.ts",
  "components/brand-hero-scene.tsx",
  "components/brand-context-scene.tsx",
  "components/brand-organization-scene.tsx",
  "components/employee-index-page.tsx",
  "components/employee-detail-page.tsx",
  "components/employee-catalog-explorer.tsx",
  "components/team-index-page.tsx",
  "components/team-detail-page.tsx",
  "components/sector-index-page.tsx",
  "components/sector-detail-page.tsx",
  "components/use-case-index-page.tsx",
  "components/use-case-detail-page.tsx",
  "components/department-index-page.tsx",
  "components/department-detail-page.tsx",
  "components/integration-index-page.tsx",
  "components/integration-detail-page.tsx",
  "app/icon.svg",
  "app/brand-system.css",
  "app/brand-fidelity.css",
  "app/brand-content.css",
  "app/brand-sector-content.css",
  "app/brand-organization-content.css",
];

for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Missing branding asset: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty branding asset: ${path}`);
}

const brandGuide = fs.readFileSync("branding/BRAND_SYSTEM.md", "utf8");
for (const phrase of ["Personas. IA. Sistemas. Un mismo equipo.", "People. AI. Systems. One team.", "digital colleague", "Clara", "Alex", "Sofía", "Javier"]) {
  if (!brandGuide.includes(phrase)) throw new Error(`Brand guide missing contract phrase: ${phrase}`);
}

const tokens = JSON.parse(fs.readFileSync("branding/tokens.json", "utf8"));
if (tokens.colors.primary !== "#5B5FF5") throw new Error("Primary brand color drifted from approved concept");
if (tokens.colors.success !== "#10B981") throw new Error("Success semantic color drifted");

const header = fs.readFileSync("components/site-header.tsx", "utf8");
const footer = fs.readFileSync("components/site-footer.tsx", "utf8");
const home = fs.readFileSync("components/home-page.tsx", "utf8");
const hero = fs.readFileSync("components/brand-hero-scene.tsx", "utf8");
const contextScene = fs.readFileSync("components/brand-context-scene.tsx", "utf8");
const organizationScene = fs.readFileSync("components/brand-organization-scene.tsx", "utf8");
const employeeIndex = fs.readFileSync("components/employee-index-page.tsx", "utf8");
const employeeDetail = fs.readFileSync("components/employee-detail-page.tsx", "utf8");
const explorer = fs.readFileSync("components/employee-catalog-explorer.tsx", "utf8");
const teamIndex = fs.readFileSync("components/team-index-page.tsx", "utf8");
const teamDetail = fs.readFileSync("components/team-detail-page.tsx", "utf8");
const sectorIndex = fs.readFileSync("components/sector-index-page.tsx", "utf8");
const sectorDetail = fs.readFileSync("components/sector-detail-page.tsx", "utf8");
const useCaseIndex = fs.readFileSync("components/use-case-index-page.tsx", "utf8");
const useCaseDetail = fs.readFileSync("components/use-case-detail-page.tsx", "utf8");
const departmentIndex = fs.readFileSync("components/department-index-page.tsx", "utf8");
const departmentDetail = fs.readFileSync("components/department-detail-page.tsx", "utf8");
const integrationIndex = fs.readFileSync("components/integration-index-page.tsx", "utf8");
const integrationDetail = fs.readFileSync("components/integration-detail-page.tsx", "utf8");
const characterRegistry = fs.readFileSync("lib/brand-characters.ts", "utf8");
const brandCss = fs.readFileSync("app/brand-system.css", "utf8");
const fidelityCss = fs.readFileSync("app/brand-fidelity.css", "utf8");
const contentCss = fs.readFileSync("app/brand-content.css", "utf8");
const sectorBrandCss = fs.readFileSync("app/brand-sector-content.css", "utf8");
const organizationBrandCss = fs.readFileSync("app/brand-organization-content.css", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");

for (const [name, source] of [["header", header], ["footer", footer]]) {
  if (!source.includes('/branding/ia-empleado-mark.svg')) throw new Error(`${name} does not use the master brand mark`);
}

if (!home.includes("<BrandHeroScene")) throw new Error("Homepage does not render the branded collaboration hero");
if (!home.includes("brand-character-card")) throw new Error("Homepage Reference Employee cards do not use the character family");
if (!hero.includes("brand-hero-approval") || !hero.includes("brand-hero-systems")) throw new Error("Branded hero is missing governance/system layers");

if (!employeeIndex.includes("brand-catalog-hero-art") || !employeeIndex.includes("getBrandCharacters")) throw new Error("Employee index does not use canonical brand art");
if (!employeeDetail.includes("brand-employee-role-card") || !employeeDetail.includes("getBrandCharacterByEmployeeKey")) throw new Error("Employee detail does not use canonical character art");
if (!explorer.includes("discovery-character-visual") || !explorer.includes("getBrandCharacterForProfileKey")) throw new Error("Reference catalog cards do not use canonical character art");
if (!teamIndex.includes("brand-team-hero-art") || !teamIndex.includes("brand-team-card-portraits")) throw new Error("Team index does not use branded team compositions");
if (!teamDetail.includes("brand-team-scene") || !teamDetail.includes("brand-team-human-approval") || !teamDetail.includes("brand-team-member-portrait")) throw new Error("Team detail does not expose branded collaboration and human control");

if (!contextScene.includes("BrandContextScene") || !contextScene.includes("BrandCharacterStrip") || !contextScene.includes("getBrandCharacterByEmployeeKey")) throw new Error("Reusable sector/use-case brand scene is incomplete");
if (!sectorIndex.includes("<BrandContextScene") || !sectorIndex.includes("<BrandCharacterStrip")) throw new Error("Sector index does not use approved brand scenes");
if (!sectorDetail.includes("<BrandContextScene") || !sectorDetail.includes("sector-role-character") || !sectorDetail.includes("getBrandCharacterByEmployeeKey")) throw new Error("Sector detail does not use canonical character art");
if (!useCaseIndex.includes("<BrandContextScene") || !useCaseIndex.includes("<BrandCharacterStrip")) throw new Error("Use-case index does not use approved brand scenes");
if (!useCaseDetail.includes("<BrandContextScene") || !useCaseDetail.includes("sector-role-character") || !useCaseDetail.includes("brand-use-case-flow-list")) throw new Error("Use-case detail does not use branded process visuals");

if (!organizationScene.includes("BrandOrganizationScene") || !organizationScene.includes("BrandOrganizationRoster") || !organizationScene.includes("getBrandCharacterByEmployeeKey")) throw new Error("Reusable department/integration brand scene is incomplete");
if (!departmentIndex.includes("<BrandOrganizationScene") || !departmentIndex.includes("<BrandOrganizationRoster")) throw new Error("Department index does not use approved organization scenes");
if (!departmentDetail.includes("<BrandOrganizationScene") || !departmentDetail.includes("organization-role-portrait") || !departmentDetail.includes("getBrandCharacterByEmployeeKey")) throw new Error("Department detail does not use canonical character art");
if (!integrationIndex.includes("<BrandOrganizationScene") || !integrationIndex.includes("<BrandOrganizationRoster")) throw new Error("Integration index does not use approved organization scenes");
if (!integrationDetail.includes("<BrandOrganizationScene") || !integrationDetail.includes("organization-role-portrait") || !integrationDetail.includes("brand-integration-contract-grid")) throw new Error("Integration detail does not use branded authority visuals");

for (const css of [brandCss, fidelityCss, contentCss, sectorBrandCss, organizationBrandCss]) {
  if (!css.includes("prefers-reduced-motion")) throw new Error("Brand motion lacks reduced-motion handling");
}
if (!fidelityCss.includes("@media (max-width: 760px)")) throw new Error("Approved mobile hero layout is missing");
if (!contentCss.includes("@media (max-width: 760px)")) throw new Error("Employee/team branded surfaces lack mobile handling");
if (!sectorBrandCss.includes("@media (max-width: 760px)")) throw new Error("Sector/use-case branded surfaces lack mobile handling");
if (!organizationBrandCss.includes("@media (max-width: 760px)")) throw new Error("Department/integration branded surfaces lack mobile handling");
if (!organizationBrandCss.includes("brand-organization-human") || !organizationBrandCss.includes("brand-organization-systems")) throw new Error("Organization scenes do not expose human-control and system layers");
if (!organizationBrandCss.includes("READ") && !integrationDetail.includes("READ")) throw new Error("Integration authority visual is missing READ semantics");
if (!sectorBrandCss.includes('data-context="ecommerce"') || !sectorBrandCss.includes('data-context="travel"') || !sectorBrandCss.includes('data-context="sales"')) throw new Error("Sector visual accents are incomplete");
if (!fidelityCss.includes("span:nth-child(n + 4)")) throw new Error("Mobile system-chip simplification is missing");

for (const [localeName, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  for (const stylesheet of ["brand-system.css", "brand-fidelity.css", "brand-content.css", "brand-sector-content.css", "brand-organization-content.css"]) {
    if (!layout.includes(stylesheet)) throw new Error(`${localeName} layout does not load ${stylesheet}`);
  }
}

for (const [id, asset] of canonicalCharacters) {
  if (!characterRegistry.includes(`id: "${id}"`)) throw new Error(`Character registry missing ${id}`);
  if (!characterRegistry.includes(asset)) throw new Error(`Character registry missing canonical asset ${asset}`);
  const filePath = `public${asset}`;
  if (fs.statSync(filePath).size < 4_000) throw new Error(`Canonical character asset is unexpectedly small: ${filePath}`);
}
if (!characterRegistry.includes("getBrandCharacterByEmployeeKey") || !characterRegistry.includes("getBrandCharacterForProfileKey")) throw new Error("Canonical character lookup helpers are missing");

const mark = fs.readFileSync("public/branding/ia-empleado-mark.svg", "utf8");
if (!mark.includes("#5B5FF5") || !mark.includes("circle")) throw new Error("Master brand mark is missing expected brand geometry/color");
for (const path of requiredFiles.filter((path) => path.endsWith(".svg"))) {
  const svg = fs.readFileSync(path, "utf8");
  if (!svg.includes("<svg")) throw new Error(`Brand SVG lacks SVG structure: ${path}`);
}

console.log("Brand system contract OK");
