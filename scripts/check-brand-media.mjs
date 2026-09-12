import fs from "node:fs";

const requiredFiles = [
  "branding/SOCIAL_MEDIA_SYSTEM.md",
  "public/branding/media/demo-frame.svg",
  "public/branding/media/social-square-frame.svg",
  "public/branding/media/story-frame.svg",
  "lib/brand-social-previews.tsx",
  "app/brand-preview/[locale]/[surface]/route.tsx",
];

for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Missing brand media asset: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty brand media asset: ${path}`);
}

for (const path of requiredFiles.filter((path) => path.endsWith(".svg"))) {
  const source = fs.readFileSync(path, "utf8");
  if (!source.includes("<svg")) throw new Error(`Invalid SVG media master: ${path}`);
}

const renderer = fs.readFileSync("lib/brand-social-previews.tsx", "utf8");
const route = fs.readFileSync("app/brand-preview/[locale]/[surface]/route.tsx", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");

for (const token of ["clara", "alex", "sofia", "javier", "1200", "630", "renderBrandSocialPreview", "brandPreviewUrl"]) {
  if (!renderer.includes(token)) throw new Error(`Social preview renderer missing contract token: ${token}`);
}
if (!route.includes("renderBrandSocialPreview") || !route.includes("isBrandPreviewSurface")) throw new Error("Brand preview route is not restricted to registered surfaces");

for (const [name, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes('brandPreviewUrl(')) throw new Error(`${name} layout lacks branded home preview`);
  if (!layout.includes('summary_large_image')) throw new Error(`${name} layout lacks Twitter large-image metadata`);
}

const pageContracts = [
  ["app/(es)/como-trabajan-juntos/page.tsx", "collaboration"],
  ["app/(en)/en/see-team-work/page.tsx", "collaboration"],
  ["app/(es)/disena-tu-equipo-ia/page.tsx", "team-builder"],
  ["app/(en)/en/design-your-ai-team/page.tsx", "team-builder"],
  ["app/(es)/mejora-tu-proceso/page.tsx", "process-analyzer"],
  ["app/(en)/en/improve-your-process/page.tsx", "process-analyzer"],
  ["app/(es)/calculadora-roi/page.tsx", "roi"],
  ["app/(en)/en/roi-calculator/page.tsx", "roi"],
  ["app/(es)/empleados-ia/page.tsx", "employees"],
  ["app/(en)/en/ai-employees/page.tsx", "employees"],
  ["app/(es)/equipos-ia/page.tsx", "teams"],
  ["app/(en)/en/ai-teams/page.tsx", "teams"],
  ["app/(es)/sectores/page.tsx", "sectors"],
  ["app/(en)/en/sectors/page.tsx", "sectors"],
  ["app/(es)/casos-de-uso/page.tsx", "use-cases"],
  ["app/(en)/en/use-cases/page.tsx", "use-cases"],
  ["app/(es)/departamentos/page.tsx", "departments"],
  ["app/(en)/en/departments/page.tsx", "departments"],
  ["app/(es)/integraciones/page.tsx", "integrations"],
  ["app/(en)/en/integrations/page.tsx", "integrations"],
];

for (const [path, surface] of pageContracts) {
  const source = fs.readFileSync(path, "utf8");
  if (!source.includes(`"${surface}"`)) throw new Error(`${path} does not use ${surface} social preview`);
  if (!source.includes("summary_large_image")) throw new Error(`${path} lacks Twitter share metadata`);
  if (!source.includes("1200") || !source.includes("630")) throw new Error(`${path} lacks explicit social image dimensions`);
}

const mediaGuide = fs.readFileSync("branding/SOCIAL_MEDIA_SYSTEM.md", "utf8");
for (const phrase of ["People. AI. Systems. One team.", "ROI", "human control", "1080 × 1920", "1200 × 630"]) {
  if (!mediaGuide.includes(phrase)) throw new Error(`Brand media guide missing rule: ${phrase}`);
}

console.log("Brand media contract OK");
