import fs from "node:fs";

const requiredFiles = [
  "lib/team-content-engine.ts",
  "lib/team-builder.ts",
  "components/team-index-page.tsx",
  "components/team-detail-page.tsx",
  "app/team-content.css",
  "app/(es)/equipos-ia/page.tsx",
  "app/(es)/equipos-ia/[slug]/page.tsx",
  "app/(en)/en/ai-teams/page.tsx",
  "app/(en)/en/ai-teams/[slug]/page.tsx",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing AI Team file: ${file}`);
  }
}

const engine = fs.readFileSync("lib/team-content-engine.ts", "utf8");
const requiredTeamKeys = ["sales", "ecommerce", "administration", "travel"];
const requiredSlugs = [
  "ventas",
  "sales",
  "ecommerce",
  "administracion",
  "administration",
  "turismo",
  "travel",
];

for (const key of requiredTeamKeys) {
  if (!engine.includes(`key: \"${key}\"`)) {
    throw new Error(`Missing AI Team key: ${key}`);
  }
}

for (const slug of requiredSlugs) {
  if (!engine.includes(`slug: \"${slug}\"`)) {
    throw new Error(`Missing localized AI Team slug: ${slug}`);
  }
}

for (const marker of [
  "Modelo de equipo de referencia",
  "Reference team model",
  "Puntos de control humano",
  "Human control points",
  "Límites realistas",
  "Realistic limits",
]) {
  if (!engine.includes(marker)) {
    throw new Error(`Missing AI Team truthfulness/control marker: ${marker}`);
  }
}

const header = fs.readFileSync("components/site-header.tsx", "utf8");
if (!header.includes("teamIndexPath(locale)")) {
  throw new Error("Global navigation does not link to the AI Team index");
}

const teamBuilder = fs.readFileSync("lib/team-builder.ts", "utf8");
for (const canonicalPath of ["/disena-tu-equipo-ia", "/en/design-your-ai-team"]) {
  if (!teamBuilder.includes(canonicalPath)) {
    throw new Error(`Team Builder helper lost canonical path: ${canonicalPath}`);
  }
}

for (const page of ["components/team-index-page.tsx", "components/team-detail-page.tsx"]) {
  const content = fs.readFileSync(page, "utf8");
  if (!content.includes('import { teamBuilderPath } from "../lib/team-builder"')) {
    throw new Error(`${page} does not import the canonical Team Builder path helper`);
  }
  if (!content.includes("const builderHref = teamBuilderPath(locale)")) {
    throw new Error(`${page} does not resolve the localized Team Builder CTA destination`);
  }
  if (!content.includes("href={builderHref}")) {
    throw new Error(`${page} does not route its commercial CTA to Team Builder`);
  }
  if (content.includes("#disena-tu-equipo")) {
    throw new Error(`${page} still bounces Team Builder intent through the homepage anchor`);
  }
}

const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
if (!sitemap.includes("getTeamRecords") || !sitemap.includes("teamDetailPath")) {
  throw new Error("AI Team pages are missing from sitemap generation");
}

for (const layout of ["app/(es)/layout.tsx", "app/(en)/en/layout.tsx"]) {
  const content = fs.readFileSync(layout, "utf8");
  if (!content.includes("team-content.css")) {
    throw new Error(`AI Team stylesheet is not loaded by ${layout}`);
  }
}

console.log("AI Teams content contract OK: localized content, truthfulness controls and direct Team Builder CTA routing are protected.");
