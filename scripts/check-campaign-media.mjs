import fs from "node:fs";

const files = {
  renderer: "lib/brand-campaign-media.tsx",
  previewRenderer: "lib/brand-social-previews.tsx",
  route: "app/brand-campaign/[locale]/[format]/[surface]/route.tsx",
  packageJson: "package.json",
  landscape: "public/branding/media/demo-frame.svg",
  square: "public/branding/media/social-square-frame.svg",
  portrait: "public/branding/media/portrait-frame.svg",
  story: "public/branding/media/story-frame.svg",
  phase: "branding/PHASE_2D_CAMPAIGN_SOCIAL_VARIANTS.md",
  guide: "branding/SOCIAL_MEDIA_SYSTEM.md",
  browser: "tests/campaign-media.spec.ts",
  productionWorkflow: ".github/workflows/production-verify.yml",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Branding Phase 2D contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Branding Phase 2D contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const renderer = read(files.renderer);
const previewRenderer = read(files.previewRenderer);
const route = read(files.route);
const packageJson = JSON.parse(read(files.packageJson));
const phase = read(files.phase);
const guide = read(files.guide);
const browser = read(files.browser);
const productionWorkflow = read(files.productionWorkflow);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);

const formats = [
  ["landscape", "1600", "900", files.landscape],
  ["square", "1080", "1080", files.square],
  ["portrait", "1080", "1350", files.portrait],
  ["story", "1080", "1920", files.story],
];

for (const [format, width, height, frame] of formats) {
  if (!renderer.includes(`${format}: { width: ${width}, height: ${height} }`)) {
    throw new Error(`Campaign renderer dimension contract drifted for ${format}`);
  }
  if (!renderer.includes(`/${frame.replace("public/", "")}`)) {
    throw new Error(`Campaign renderer does not map ${format} to its reusable frame`);
  }
  const svg = read(frame);
  if (!svg.includes("<svg") || !svg.includes(`width=\"${width}\"`) || !svg.includes(`height=\"${height}\"`)) {
    throw new Error(`Campaign frame dimensions/structure invalid for ${format}: ${frame}`);
  }
}

for (const token of [
  'export type BrandCampaignFormat = "landscape" | "square" | "portrait" | "story"',
  "BrandPreviewSurface",
  "getBrandCharacters",
  "brandCampaignUrl",
  "renderBrandCampaignMedia",
  "rasterAsset",
  "sharp(source).png()",
  "rasterAsset(campaignFrames[format])",
  "rasterAsset(character.asset)",
  'roi: {',
  "characterIds: []",
]) {
  if (!renderer.includes(token)) throw new Error(`Campaign renderer missing contract token: ${token}`);
}

if (renderer.includes("translate(calc(")) {
  throw new Error("Campaign renderer reintroduced calc-based transforms unsupported by ImageResponse/Satori");
}
if (renderer.includes("zIndex:")) {
  throw new Error("Campaign renderer reintroduced z-index, which is unsupported by ImageResponse/Satori");
}
if (packageJson.dependencies?.sharp !== "0.35.4") {
  throw new Error("Campaign media must pin sharp 0.35.4 for deterministic canonical asset rasterization");
}
if (!route.includes('export const runtime = "nodejs"')) {
  throw new Error("Campaign media route must use the Node runtime for Sharp rasterization");
}
if (!route.includes("return await renderBrandCampaignMedia")) {
  throw new Error("Campaign route must await the async rasterized ImageResponse renderer");
}

const surfaces = [
  "home",
  "employees",
  "teams",
  "collaboration",
  "team-builder",
  "process-analyzer",
  "roi",
  "sectors",
  "use-cases",
  "departments",
  "integrations",
];
for (const surface of surfaces) {
  if (!previewRenderer.includes(`${surface}: {`) && !previewRenderer.includes(`\"${surface}\": {`)) {
    throw new Error(`Canonical preview surface missing from existing renderer: ${surface}`);
  }
  if (!renderer.includes(`${surface}: {`) && !renderer.includes(`\"${surface}\": {`)) {
    throw new Error(`Campaign copy missing registered surface: ${surface}`);
  }
}

for (const token of [
  "isBrandCampaignFormat",
  "isBrandPreviewSurface",
  'new Response("Unknown campaign format", { status: 404 })',
  'new Response("Unknown campaign surface", { status: 404 })',
  "renderBrandCampaignMedia",
]) {
  if (!route.includes(token)) throw new Error(`Campaign route missing validation/render contract: ${token}`);
}

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes('"ia-web-release"')) {
    throw new Error(`${label} layout no longer exposes the shared release marker`);
  }
}

for (const phrase of [
  "1600 × 900",
  "1080 × 1080",
  "1080 × 1350",
  "1080 × 1920",
  "/brand-campaign/{locale}/{format}/{surface}",
]) {
  if (!phase.includes(phrase)) throw new Error(`Phase 2D guide missing contract phrase: ${phrase}`);
  if (!guide.includes(phrase)) throw new Error(`Social media guide missing Phase 2D contract phrase: ${phrase}`);
}

for (const token of [
  "brandCampaignUrl",
  "landscape",
  "square",
  "portrait",
  "story",
  "response.status()",
  'response.headers()["content-type"]',
  "image/png",
  "naturalWidth",
  "naturalHeight",
  "404",
]) {
  if (!browser.includes(token)) throw new Error(`Campaign browser QA missing contract token: ${token}`);
}

if (!productionWorkflow.includes("tests/campaign-media.spec.ts")) {
  throw new Error("Production verification does not include campaign media browser QA");
}

console.log("Campaign media contract OK: four reusable formats, canonical in-memory rasterization, bilingual surfaces, claim-safe rendering and production verification protected.");
