import fs from "node:fs";

const requiredFiles = [
  "branding/README.md",
  "branding/BRAND_SYSTEM.md",
  "branding/ASSET_MANIFEST.md",
  "branding/tokens.json",
  "public/branding/ia-empleado-mark.svg",
  "public/branding/ia-empleado-mark-mono.svg",
  "public/branding/ia-employee-human.svg",
  "public/branding/orbit-pattern.svg",
  "public/branding/people-ai-systems.svg",
  "app/icon.svg",
  "app/brand-system.css",
];

for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Missing branding asset: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty branding asset: ${path}`);
}

const brandGuide = fs.readFileSync("branding/BRAND_SYSTEM.md", "utf8");
for (const phrase of ["Personas. IA. Sistemas. Un mismo equipo.", "People. AI. Systems. One team.", "humanized digital colleague"]) {
  if (!brandGuide.includes(phrase)) throw new Error(`Brand guide missing contract phrase: ${phrase}`);
}

const tokens = JSON.parse(fs.readFileSync("branding/tokens.json", "utf8"));
if (tokens.colors.primary !== "#5B5FF5") throw new Error("Primary brand color drifted from approved concept");
if (tokens.colors.success !== "#10B981") throw new Error("Success semantic color drifted");

const header = fs.readFileSync("components/site-header.tsx", "utf8");
const footer = fs.readFileSync("components/site-footer.tsx", "utf8");
const home = fs.readFileSync("components/home-page.tsx", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");

for (const [name, source] of [["header", header], ["footer", footer]]) {
  if (!source.includes('/branding/ia-empleado-mark.svg')) throw new Error(`${name} does not use the master brand mark`);
}

if (!home.includes('/branding/ia-employee-human.svg')) throw new Error("Homepage does not use the approved humanized AI Employee visual");
if (!esLayout.includes('brand-system.css') || !enLayout.includes('brand-system.css')) throw new Error("Brand CSS is not loaded in both locales");

const mark = fs.readFileSync("public/branding/ia-empleado-mark.svg", "utf8");
if (!mark.includes("#5B5FF5") || !mark.includes("circle")) throw new Error("Master brand mark is missing expected brand geometry/color");

console.log("Brand system contract OK");
