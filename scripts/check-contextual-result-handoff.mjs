import fs from "node:fs";

const files = {
  team: "components/team-builder.tsx",
  teamPage: "components/team-builder-page.tsx",
  process: "components/process-analyzer.tsx",
  processPage: "components/process-analyzer-page.tsx",
  conversion: "lib/conversion-handoff.ts",
  browser: "tests/contextual-result-handoff.spec.ts",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  ci: ".github/workflows/ci.yml",
  production: ".github/workflows/production-verify.yml",
  phase: "docs/PHASE_7B_CONTEXTUAL_RESULT_HANDOFF.md",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 7B contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 7B contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const team = read(files.team);
const teamPage = read(files.teamPage);
const process = read(files.process);
const processPage = read(files.processPage);
const conversion = read(files.conversion);
const browser = read(files.browser);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const ci = read(files.ci);
const production = read(files.production);
const phase = read(files.phase);

for (const token of [
  "requestDemoPath",
  'intent: "team"',
  'source: "team-builder"',
  'data-contextual-result-handoff="team-builder"',
  "recommendation.roles.slice(0, 3)",
  "handoffContext",
]) {
  if (!team.includes(token)) throw new Error(`Team Builder Phase 7B handoff missing token: ${token}`);
}
if (team.includes("mailto:hola@iaempleado.com")) {
  throw new Error("Team Builder result still bypasses the shared conversion handoff");
}
if (team.includes("summary = useMemo") || team.includes("encodeURIComponent(summary)")) {
  throw new Error("Team Builder still contains the legacy full-result email serialization path");
}

for (const token of [
  "requestDemoPath",
  'intent: "process"',
  'source: "process-analyzer"',
  'data-contextual-result-handoff="process-analyzer"',
  "selectedPainLabels.slice(0, 2)",
  "bottlenecks.length",
  "handoffContext",
]) {
  if (!process.includes(token)) throw new Error(`Process Analyzer Phase 7B handoff missing token: ${token}`);
}
if (process.includes("mailto:hola@iaempleado.com")) {
  throw new Error("Process Analyzer result still bypasses the shared conversion handoff");
}
if (process.includes("emailBody") || process.includes("bottleneckLabels")) {
  throw new Error("Process Analyzer still contains legacy detailed email serialization");
}

for (const [label, page] of [["Team Builder", teamPage], ["Process Analyzer", processPage]]) {
  if (!page.includes("no viajan datos personales ni texto libre") || !page.includes("no personal data or free text")) {
    throw new Error(`${label} public disclosure does not explain the bounded result handoff in ES and EN`);
  }
  if (!page.includes("FAQPage")) throw new Error(`${label} structured FAQ contract is missing`);
}

for (const token of [
  "cleanParam(firstParam(searchParams.context), 160)",
  "requestDemoPath",
  "normalizeLeadHandoffParams",
]) {
  if (!conversion.includes(token)) throw new Error(`Shared conversion boundary missing token: ${token}`);
}

for (const token of [
  'data-contextual-result-handoff="team-builder"',
  'data-contextual-result-handoff="process-analyzer"',
  '"team-builder"',
  '"process-analyzer"',
  "LessThanOrEqual(160)",
  '["context", "intent", "source"]',
  "mailto:",
  "390",
]) {
  if (!browser.includes(token)) throw new Error(`Phase 7B browser QA missing token: ${token}`);
}

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes('"ia-web-release"')) throw new Error(`${label} layout lost the production release marker contract`);
}

if (!ci.includes("Contextual result handoff contract") || !ci.includes("node scripts/check-contextual-result-handoff.mjs")) {
  throw new Error("Web CI does not execute the Phase 7B static contract");
}
if (!production.includes("tests/contextual-result-handoff.spec.ts")) {
  throw new Error("Production verification no longer executes Phase 7B browser QA");
}

for (const phrase of [
  "Complete and production-verified",
  "no personal data",
  "no free text",
  "no storage",
  "web-phase-7b-contextual-result-handoff",
  "Production Verification",
  "34749824213",
]) {
  if (!phase.includes(phrase)) throw new Error(`Phase 7B documentation missing closure evidence: ${phrase}`);
}

console.log("Contextual result handoff contract OK: bounded non-sensitive Team Builder and Process Analyzer result context remains protected after Phase 7B production closure.");
