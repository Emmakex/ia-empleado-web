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
  "components/brand-sector-hero-art.tsx",
  "components/brand-organization-scene.tsx",
  "components/brand-collaboration-composition.tsx",
  "components/brand-interactive-preview.tsx",
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
  "components/collaboration-page.tsx",
  "components/collaboration-simulator.tsx",
  "components/team-builder-page.tsx",
  "components/team-builder.tsx",
  "components/process-analyzer-page.tsx",
  "components/process-analyzer.tsx",
  "components/roi-estimator-page.tsx",
  "components/roi-estimator.tsx",
  "app/icon.svg",
  "app/brand-system.css",
  "app/brand-fidelity.css",
  "app/brand-content.css",
  "app/brand-sector-content.css",
  "app/brand-sector-hero-art.css",
  "app/brand-organization-content.css",
  "app/brand-collaboration-compositions.css",
  "app/brand-interactive-content.css",
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

const read = (path) => fs.readFileSync(path, "utf8");
const header = read("components/site-header.tsx");
const footer = read("components/site-footer.tsx");
const home = read("components/home-page.tsx");
const hero = read("components/brand-hero-scene.tsx");
const contextScene = read("components/brand-context-scene.tsx");
const sectorHeroArt = read("components/brand-sector-hero-art.tsx");
const organizationScene = read("components/brand-organization-scene.tsx");
const collaborationComposition = read("components/brand-collaboration-composition.tsx");
const interactivePreview = read("components/brand-interactive-preview.tsx");
const employeeIndex = read("components/employee-index-page.tsx");
const employeeDetail = read("components/employee-detail-page.tsx");
const explorer = read("components/employee-catalog-explorer.tsx");
const teamIndex = read("components/team-index-page.tsx");
const teamDetail = read("components/team-detail-page.tsx");
const sectorIndex = read("components/sector-index-page.tsx");
const sectorDetail = read("components/sector-detail-page.tsx");
const useCaseIndex = read("components/use-case-index-page.tsx");
const useCaseDetail = read("components/use-case-detail-page.tsx");
const departmentIndex = read("components/department-index-page.tsx");
const departmentDetail = read("components/department-detail-page.tsx");
const integrationIndex = read("components/integration-index-page.tsx");
const integrationDetail = read("components/integration-detail-page.tsx");
const collaborationPage = read("components/collaboration-page.tsx");
const collaborationSimulator = read("components/collaboration-simulator.tsx");
const teamBuilderPage = read("components/team-builder-page.tsx");
const teamBuilder = read("components/team-builder.tsx");
const processAnalyzerPage = read("components/process-analyzer-page.tsx");
const processAnalyzer = read("components/process-analyzer.tsx");
const roiEstimatorPage = read("components/roi-estimator-page.tsx");
const roiEstimator = read("components/roi-estimator.tsx");
const characterRegistry = read("lib/brand-characters.ts");
const brandCss = read("app/brand-system.css");
const fidelityCss = read("app/brand-fidelity.css");
const contentCss = read("app/brand-content.css");
const sectorBrandCss = read("app/brand-sector-content.css");
const sectorHeroCss = read("app/brand-sector-hero-art.css");
const organizationBrandCss = read("app/brand-organization-content.css");
const collaborationBrandCss = read("app/brand-collaboration-compositions.css");
const interactiveBrandCss = read("app/brand-interactive-content.css");
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");

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
if (!collaborationComposition.includes("BrandCollaborationComposition") || !collaborationComposition.includes("brand-collaboration-hub") || !collaborationComposition.includes("brand-collaboration-human") || !collaborationComposition.includes("brand-collaboration-systems")) throw new Error("Reusable Team/Department collaboration composition is incomplete");
if (!teamDetail.includes("<BrandCollaborationComposition") || !teamDetail.includes('variant="team"') || !teamDetail.includes("brand-team-member-portrait")) throw new Error("Team detail does not expose the shared branded collaboration composition and canonical member portraits");

if (!contextScene.includes("BrandContextScene") || !contextScene.includes("BrandCharacterStrip") || !contextScene.includes("getBrandCharacterByEmployeeKey")) throw new Error("Reusable overview/use-case brand scene is incomplete");
if (!sectorHeroArt.includes("BrandSectorHeroArt") || !sectorHeroArt.includes("data-sector-art={sectorKey}") || !sectorHeroArt.includes("brand-sector-art-human") || !sectorHeroArt.includes("brand-sector-art-systems") || !sectorHeroArt.includes("BrandCharacterImage")) throw new Error("Reusable sector-specific hero art is incomplete");
if (!sectorIndex.includes("<BrandContextScene") || !sectorIndex.includes("<BrandCharacterStrip")) throw new Error("Sector index does not use approved overview brand scenes");
if (!sectorDetail.includes("<BrandSectorHeroArt") || !sectorDetail.includes("sectorKey={sector.key}") || !sectorDetail.includes("sector-role-character") || !sectorDetail.includes("getBrandCharacterByEmployeeKey")) throw new Error("Sector detail does not use sector-specific hero art and canonical character roles");
if (sectorDetail.includes("<BrandContextScene")) throw new Error("Deep sector detail must not fall back to the generic context scene");
if (!useCaseIndex.includes("<BrandContextScene") || !useCaseIndex.includes("<BrandCharacterStrip")) throw new Error("Use-case index does not use approved brand scenes");
if (!useCaseDetail.includes("<BrandContextScene") || !useCaseDetail.includes("sector-role-character") || !useCaseDetail.includes("brand-use-case-flow-list")) throw new Error("Use-case detail does not use branded process visuals");

if (!organizationScene.includes("BrandOrganizationScene") || !organizationScene.includes("BrandOrganizationRoster") || !organizationScene.includes("getBrandCharacterByEmployeeKey")) throw new Error("Reusable department/integration brand scene is incomplete");
if (!departmentIndex.includes("<BrandOrganizationScene") || !departmentIndex.includes("<BrandOrganizationRoster")) throw new Error("Department index does not use approved organization scenes");
if (!departmentDetail.includes("<BrandCollaborationComposition") || !departmentDetail.includes('variant="department"') || !departmentDetail.includes("organization-role-portrait") || !departmentDetail.includes("getBrandCharacterByEmployeeKey")) throw new Error("Department detail does not use the shared collaboration composition and canonical role art");
if (!integrationIndex.includes("<BrandOrganizationScene") || !integrationIndex.includes("<BrandOrganizationRoster")) throw new Error("Integration index does not use approved organization scenes");
if (!integrationDetail.includes("<BrandOrganizationScene") || !integrationDetail.includes("organization-role-portrait") || !integrationDetail.includes("brand-integration-contract-grid")) throw new Error("Integration detail does not use branded authority visuals");

if (!interactivePreview.includes("BrandInteractivePreview") || !interactivePreview.includes("getBrandCharacters") || !interactivePreview.includes('/branding/ia-empleado-mark.svg')) throw new Error("Reusable interactive brand preview is incomplete");
if (!collaborationPage.includes('<BrandInteractivePreview') || !collaborationPage.includes('mode="collaboration"') || !collaborationPage.includes('locale={locale} content={content}')) throw new Error("Collaboration experience does not use the branded interactive layer");
if (!collaborationSimulator.includes("getBrandCharacterForActorLabel") || !collaborationSimulator.includes("brand-active-character") || !collaborationSimulator.includes("brand-simulator-state-strip")) throw new Error("Collaboration simulator does not expose canonical actor states");
if (!teamBuilderPage.includes('<BrandInteractivePreview') || !teamBuilderPage.includes('mode="team-builder"')) throw new Error("Team Builder hero does not use the branded interactive layer");
if (!teamBuilder.includes("builder-brand-team-map") || !teamBuilder.includes("builder-role-character") || !teamBuilder.includes("getBrandCharacterForProfileKey")) throw new Error("Team Builder does not render canonical recommended characters");
if (!processAnalyzerPage.includes('<BrandInteractivePreview') || !processAnalyzerPage.includes('mode="process"')) throw new Error("Process Analyzer hero does not use the branded interactive layer");
if (!processAnalyzer.includes("process-brand-map") || !processAnalyzer.includes("brand-process-step-employees") || !processAnalyzer.includes("getBrandCharacterForProfileKey")) throw new Error("Process Analyzer does not expose branded process participants");
if (!roiEstimatorPage.includes('<BrandInteractivePreview') || !roiEstimatorPage.includes('mode="roi"')) throw new Error("ROI Estimator hero does not use the branded interactive layer");
if (!roiEstimator.includes("roi-brand-value-path") || !roiEstimator.includes("roi-brand-scenario-meter")) throw new Error("ROI Estimator does not expose branded workload/capacity visualization");
if (roiEstimator.includes("getBrandCharacterForProfileKey") || roiEstimator.includes("getBrandCharacterForActorLabel")) throw new Error("ROI Estimator must not attribute financial estimates to a specific canonical character");

for (const css of [brandCss, fidelityCss, contentCss, sectorBrandCss, sectorHeroCss, organizationBrandCss, collaborationBrandCss, interactiveBrandCss]) {
  if (!css.includes("prefers-reduced-motion")) throw new Error("Brand motion lacks reduced-motion handling");
}
if (!fidelityCss.includes("@media (max-width: 760px)")) throw new Error("Approved mobile hero layout is missing");
if (!contentCss.includes("@media (max-width: 760px)")) throw new Error("Employee/team branded surfaces lack mobile handling");
if (!sectorBrandCss.includes("@media (max-width: 760px)")) throw new Error("Sector/use-case branded surfaces lack mobile handling");
if (!sectorHeroCss.includes("@media (max-width: 760px)") || !sectorHeroCss.includes("@media (max-width: 430px)")) throw new Error("Sector hero art lacks mobile handling");
if (!organizationBrandCss.includes("@media (max-width: 760px)")) throw new Error("Department/integration branded surfaces lack mobile handling");
if (!collaborationBrandCss.includes("@media (max-width: 760px)")) throw new Error("Team/Department collaboration compositions lack mobile handling");
if (!interactiveBrandCss.includes("@media (max-width: 760px)")) throw new Error("Interactive branded surfaces lack mobile handling");
if (!interactiveBrandCss.includes("brand-interactive-human") || !interactiveBrandCss.includes("brand-simulator-state-strip")) throw new Error("Interactive visuals do not expose human-control/state layers");
if (!organizationBrandCss.includes("brand-organization-human") || !organizationBrandCss.includes("brand-organization-systems")) throw new Error("Organization scenes do not expose human-control and system layers");
if (!collaborationBrandCss.includes("brand-collaboration-human") || !collaborationBrandCss.includes("brand-collaboration-systems")) throw new Error("Team/Department compositions do not expose human-control and shared-system layers");
if (!sectorHeroCss.includes("brand-sector-art-human") || !sectorHeroCss.includes("brand-sector-art-systems")) throw new Error("Sector hero art does not expose human-control and system layers");
if (!organizationBrandCss.includes("READ") && !integrationDetail.includes("READ")) throw new Error("Integration authority visual is missing READ semantics");
if (!sectorBrandCss.includes('data-context="ecommerce"') || !sectorBrandCss.includes('data-context="travel"') || !sectorBrandCss.includes('data-context="sales"')) throw new Error("Sector/use-case context accents are incomplete");
for (const sector of ["ecommerce", "travel", "professional-services", "sales"]) {
  if (!sectorHeroCss.includes(`[data-sector-art="${sector}"]`) || !sectorHeroCss.includes(`[data-sector-signature="${sector}"]`)) {
    throw new Error(`Sector hero visual grammar missing: ${sector}`);
  }
}
if (!fidelityCss.includes("span:nth-child(n + 4)")) throw new Error("Mobile system-chip simplification is missing");

for (const [localeName, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  for (const stylesheet of ["brand-system.css", "brand-fidelity.css", "brand-content.css", "brand-sector-content.css", "brand-sector-hero-art.css", "brand-organization-content.css", "brand-collaboration-compositions.css", "brand-interactive-content.css"]) {
    if (!layout.includes(stylesheet)) throw new Error(`${localeName} layout does not load ${stylesheet}`);
  }
}

for (const [id, asset] of canonicalCharacters) {
  if (!characterRegistry.includes(`id: "${id}"`)) throw new Error(`Character registry missing ${id}`);
  if (!characterRegistry.includes(asset)) throw new Error(`Character registry missing canonical asset ${asset}`);
  const filePath = `public${asset}`;
  if (fs.statSync(filePath).size < 4_000) throw new Error(`Canonical character asset is unexpectedly small: ${filePath}`);
}
if (!characterRegistry.includes("getBrandCharacterByEmployeeKey") || !characterRegistry.includes("getBrandCharacterForProfileKey") || !characterRegistry.includes("getBrandCharacterForActorLabel")) throw new Error("Canonical character lookup helpers are missing");

const mark = read("public/branding/ia-empleado-mark.svg");
if (!mark.includes("#5B5FF5") || !mark.includes("circle")) throw new Error("Master brand mark is missing expected brand geometry/color");
for (const path of requiredFiles.filter((path) => path.endsWith(".svg"))) {
  const svg = read(path);
  if (!svg.includes("<svg")) throw new Error(`Brand SVG lacks SVG structure: ${path}`);
}

console.log("Brand system contract OK");
