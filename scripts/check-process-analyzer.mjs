import fs from "node:fs";

const requiredFiles = [
  "lib/process-analyzer.ts",
  "components/process-analyzer.tsx",
  "components/process-analyzer-page.tsx",
  "app/(es)/mejora-tu-proceso/page.tsx",
  "app/(en)/en/improve-your-process/page.tsx",
  "app/process-analyzer.css",
  "docs/PHASE_5A_PROCESS_ANALYZER.md",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing Process Analyzer file: ${file}`);
}

const engine = fs.readFileSync("lib/process-analyzer.ts", "utf8");
const interaction = fs.readFileSync("components/process-analyzer.tsx", "utf8");
const page = fs.readFileSync("components/process-analyzer-page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const footer = fs.readFileSync("components/site-footer.tsx", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");

for (const route of ["/mejora-tu-proceso", "/en/improve-your-process"]) {
  if (!engine.includes(route)) throw new Error(`Missing localized Process Analyzer route: ${route}`);
}

for (const template of ["customer-issue", "invoice-control", "sales-follow-up", "order-exception"]) {
  if (!engine.includes(`key: \"${template}\"`)) throw new Error(`Missing Process Analyzer template: ${template}`);
}

for (const mode of ["automated", "assisted", "human"]) {
  if (!engine.includes(`\"${mode}\"`)) throw new Error(`Missing Process Analyzer mode: ${mode}`);
}

if (!interaction.includes('"use client"')) throw new Error("Process Analyzer interaction must remain an explicit client boundary");
if (interaction.includes("fetch(") || interaction.includes("axios") || interaction.includes("XMLHttpRequest")) {
  throw new Error("Process Analyzer must not upload analysis state");
}
if (!interaction.includes("aria-pressed") || !interaction.includes("bottlenecks")) {
  throw new Error("Process Analyzer must preserve accessible bottleneck selection");
}
for (const token of [
  "requestDemoPath",
  'intent: "process"',
  'source: "process-analyzer"',
  'data-contextual-result-handoff="process-analyzer"',
  "selectedPainLabels.slice(0, 2)",
]) {
  if (!interaction.includes(token)) throw new Error(`Process Analyzer contextual handoff missing token: ${token}`);
}
if (interaction.includes("mailto:hola@iaempleado.com")) {
  throw new Error("Process Analyzer must not bypass the shared conversion handoff with a raw mailto result CTA");
}
if (!page.includes("process-static-patterns")) {
  throw new Error("Process Analyzer meaning must also be rendered as crawlable static HTML");
}
if (!page.includes("FAQPage") || !page.includes("ItemList")) {
  throw new Error("Process Analyzer structured-data contract is incomplete");
}
if (!page.includes("no viajan datos personales ni texto libre") || !page.includes("no personal data or free text")) {
  throw new Error("Process Analyzer public FAQ must describe the bounded contextual handoff truthfully in ES and EN");
}
if (!sitemap.includes("processAnalyzerPath")) throw new Error("Process Analyzer routes must be present in sitemap generation");
if (!footer.includes("processAnalyzerPath")) throw new Error("Process Analyzer must have a crawlable internal navigation link");
if (!esLayout.includes("process-analyzer.css") || !enLayout.includes("process-analyzer.css")) {
  throw new Error("Process Analyzer styles must load in both locale layouts");
}
if (!engine.includes("Herramienta educativa") || !engine.includes("Educational tool")) {
  throw new Error("Process Analyzer must preserve its educational/non-runtime disclosure in ES and EN");
}

console.log("Process Analyzer contract OK");
