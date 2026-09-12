import fs from "node:fs";

const requiredFiles = [
  "lib/collaboration-demo.ts",
  "components/collaboration-simulator.tsx",
  "components/collaboration-page.tsx",
  "app/(es)/como-trabajan-juntos/page.tsx",
  "app/(en)/en/see-team-work/page.tsx",
  "app/collaboration-demo.css",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing interactive collaboration file: ${file}`);
  }
}

const engine = fs.readFileSync("lib/collaboration-demo.ts", "utf8");
const simulator = fs.readFileSync("components/collaboration-simulator.tsx", "utf8");
const page = fs.readFileSync("components/collaboration-page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const header = fs.readFileSync("components/site-header.tsx", "utf8");

for (const route of ["/como-trabajan-juntos", "/en/see-team-work"]) {
  if (!engine.includes(route)) {
    throw new Error(`Missing localized collaboration route: ${route}`);
  }
}

for (const scenario of ["invoice-cancellation", "sales-lead", "delivery-incident"]) {
  if (!engine.includes(`key: \"${scenario}\"`)) {
    throw new Error(`Missing collaboration scenario: ${scenario}`);
  }
}

for (const control of ["previousLabel", "nextLabel", "playLabel", "pauseLabel", "resetLabel"]) {
  if (!simulator.includes(control)) {
    throw new Error(`Missing simulator control contract: ${control}`);
  }
}

if (!simulator.includes('"use client"')) {
  throw new Error("Collaboration simulator must remain an explicit client interaction boundary");
}

if (!page.includes("collaboration-static-scenarios")) {
  throw new Error("Interactive collaboration meaning must also be rendered as crawlable HTML");
}

if (!engine.includes("datos sintéticos") || !engine.includes("synthetic data")) {
  throw new Error("Public simulator must preserve its synthetic-data disclosure in ES and EN");
}

if (!page.includes("FAQPage") || !page.includes("ItemList")) {
  throw new Error("Collaboration page structured-data contract is incomplete");
}

if (!sitemap.includes("collaborationDemoPath")) {
  throw new Error("Collaboration routes must be included in sitemap generation");
}

if (!header.includes("collaborationDemoPath")) {
  throw new Error("Global navigation must route Cómo funciona / How it works to the collaboration experience");
}

console.log("Interactive collaboration contract OK");
