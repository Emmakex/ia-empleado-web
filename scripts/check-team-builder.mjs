import fs from "node:fs";

const requiredFiles = [
  "lib/team-builder.ts",
  "components/team-builder.tsx",
  "components/team-builder-page.tsx",
  "app/(es)/disena-tu-equipo-ia/page.tsx",
  "app/(en)/en/design-your-ai-team/page.tsx",
  "app/team-builder.css",
  "docs/PHASE_4B_TEAM_BUILDER.md",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing Team Builder file: ${file}`);
}

const engine = fs.readFileSync("lib/team-builder.ts", "utf8");
const client = fs.readFileSync("components/team-builder.tsx", "utf8");
const page = fs.readFileSync("components/team-builder-page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const header = fs.readFileSync("components/site-header.tsx", "utf8");

for (const route of ["/disena-tu-equipo-ia", "/en/design-your-ai-team"]) {
  if (!engine.includes(route)) throw new Error(`Missing Team Builder route: ${route}`);
}

for (const preset of ["sales", "ecommerce", "administration", "travel"]) {
  if (!engine.includes(`${preset}: {`)) throw new Error(`Missing Team Builder preset: ${preset}`);
}

for (const signal of ["sectorId", "problemIds", "departmentIds", "systemIds"]) {
  if (!engine.includes(signal)) throw new Error(`Missing Team Builder recommendation signal: ${signal}`);
}

if (!engine.includes('profile.status !== "restricted"')) {
  throw new Error("Restricted Employee profiles must be excluded from normal Team Builder recommendations");
}

if (!engine.includes("restrictedAreas")) {
  throw new Error("Team Builder must preserve a restricted-area warning path");
}

if (!client.includes('"use client"') || !client.includes("aria-live") || !client.includes("aria-pressed")) {
  throw new Error("Team Builder client/accessibility boundary is incomplete");
}

if (!client.includes("mailto:hola@iaempleado.com")) {
  throw new Error("Team Builder commercial handoff must remain explicit and user-controlled");
}

if (!page.includes("FAQPage") || !page.includes("ItemList")) {
  throw new Error("Team Builder structured-data contract is incomplete");
}

if (!page.includes("Cálculo local") || !page.includes("Local calculation")) {
  throw new Error("Team Builder must preserve its local-processing disclosure in ES and EN");
}

if (!sitemap.includes("teamBuilderPath")) {
  throw new Error("Team Builder routes must be included in sitemap generation");
}

if (!header.includes("teamBuilderPath")) {
  throw new Error("Global commercial CTA must route to the Team Builder");
}

console.log("Team Builder contract OK");
