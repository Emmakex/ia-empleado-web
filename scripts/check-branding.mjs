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
  "app/icon.svg",
  "app/brand-system.css",
  "app/brand-fidelity.css",
];

for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Missing branding asset: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty branding asset: ${path}`);
}

const brandGuide = fs.readFileSync("branding/BRAND_SYSTEM.md", "utf8");
for (const phrase of [
  "Personas. IA. Sistemas. Un mismo equipo.",
  "People. AI. Systems. One team.",
  "digital colleague",
  "Clara",
  "Alex",
  "Sofía",
  "Javier",
]) {
  if (!brandGuide.includes(phrase)) throw new Error(`Brand guide missing contract phrase: ${phrase}`);
}

const tokens = JSON.parse(fs.readFileSync("branding/tokens.json", "utf8"));
if (tokens.colors.primary !== "#5B5FF5") throw new Error("Primary brand color drifted from approved concept");
if (tokens.colors.success !== "#10B981") throw new Error("Success semantic color drifted");

const header = fs.readFileSync("components/site-header.tsx", "utf8");
const footer = fs.readFileSync("components/site-footer.tsx", "utf8");
const home = fs.readFileSync("components/home-page.tsx", "utf8");
const hero = fs.readFileSync("components/brand-hero-scene.tsx", "utf8");
const characterRegistry = fs.readFileSync("lib/brand-characters.ts", "utf8");
const brandCss = fs.readFileSync("app/brand-system.css", "utf8");
const fidelityCss = fs.readFileSync("app/brand-fidelity.css", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");

for (const [name, source] of [["header", header], ["footer", footer]]) {
  if (!source.includes('/branding/ia-empleado-mark.svg')) throw new Error(`${name} does not use the master brand mark`);
}

if (!home.includes("<BrandHeroScene")) throw new Error("Homepage does not render the branded collaboration hero");
if (!home.includes("brand-character-card")) throw new Error("Homepage Reference Employee cards do not use the character family");
if (!hero.includes("brand-hero-approval")) throw new Error("Branded hero does not expose a human approval state");
if (!hero.includes("brand-hero-systems")) throw new Error("Branded hero does not expose company systems");
if (!brandCss.includes("prefers-reduced-motion") || !fidelityCss.includes("prefers-reduced-motion")) {
  throw new Error("Brand motion lacks reduced-motion handling");
}
if (!fidelityCss.includes("@media (max-width: 760px)")) throw new Error("Approved mobile hero layout is missing");
if (!fidelityCss.includes("brand-character-node-3") || !fidelityCss.includes("brand-hero-approval")) {
  throw new Error("Mobile hero does not explicitly place the character and human-approval layers");
}
if (!fidelityCss.includes("span:nth-child(n + 4)")) throw new Error("Mobile system-chip simplification is missing");

for (const [localeName, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("brand-system.css")) throw new Error(`${localeName} layout does not load brand-system.css`);
  if (!layout.includes("brand-fidelity.css")) throw new Error(`${localeName} layout does not load brand-fidelity.css`);
}

for (const [id, asset] of canonicalCharacters) {
  if (!characterRegistry.includes(`id: "${id}"`)) throw new Error(`Character registry missing ${id}`);
  if (!characterRegistry.includes(asset)) throw new Error(`Character registry missing canonical asset ${asset}`);
  const filePath = `public${asset}`;
  if (fs.statSync(filePath).size < 4_000) throw new Error(`Canonical character asset is unexpectedly small: ${filePath}`);
}

const mark = fs.readFileSync("public/branding/ia-empleado-mark.svg", "utf8");
if (!mark.includes("#5B5FF5") || !mark.includes("circle")) throw new Error("Master brand mark is missing expected brand geometry/color");

for (const path of requiredFiles.filter((path) => path.endsWith(".svg"))) {
  const svg = fs.readFileSync(path, "utf8");
  if (!svg.includes("<svg")) throw new Error(`Brand SVG lacks SVG structure: ${path}`);
}

console.log("Brand system contract OK");
