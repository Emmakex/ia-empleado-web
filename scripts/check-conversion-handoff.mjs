import fs from "node:fs";

const files = {
  contract: "lib/conversion-handoff.ts",
  page: "components/request-demo-page.tsx",
  form: "components/lead-handoff-form.tsx",
  css: "app/conversion-handoff.css",
  esRoute: "app/(es)/solicitar-demo/page.tsx",
  enRoute: "app/(en)/en/request-demo/page.tsx",
  header: "components/site-header.tsx",
  home: "components/home-page.tsx",
  esContent: "content/es.json",
  enContent: "content/en.json",
  sitemap: "app/sitemap.ts",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  browser: "tests/conversion-handoff.spec.ts",
  productionWorkflow: ".github/workflows/production-verify.yml",
  phase: "docs/PHASE_7A_CONVERSION_HANDOFF.md",
  campaignContract: "scripts/check-campaign-media.mjs",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 7A contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 7A contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const contract = read(files.contract);
const page = read(files.page);
const form = read(files.form);
const css = read(files.css);
const esRoute = read(files.esRoute);
const enRoute = read(files.enRoute);
const header = read(files.header);
const home = read(files.home);
const esContent = read(files.esContent);
const enContent = read(files.enContent);
const sitemap = read(files.sitemap);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const browser = read(files.browser);
const productionWorkflow = read(files.productionWorkflow);
const phase = read(files.phase);
const campaignContract = read(files.campaignContract);

for (const token of [
  'export const LEAD_CONTACT_EMAIL = "hola@iaempleado.com"',
  '"demo"',
  '"team"',
  '"process"',
  '"employee"',
  '"integration"',
  '"private-deployment"',
  "normalizeLeadHandoffParams",
  "requestDemoPath",
  "buildLeadMailto",
  'source: rawSource ?? "direct"',
  "cleanParam(firstParam(searchParams.source), 80)",
  "cleanParam(firstParam(searchParams.context), 160)",
  "encodeURIComponent(subject)",
  'encodeURIComponent(lines.join("\\n"))',
]) {
  if (!contract.includes(token)) throw new Error(`Conversion handoff contract missing token: ${token}`);
}

if (!contract.includes('locale === "es" ? "/solicitar-demo" : "/en/request-demo"')) {
  throw new Error("Conversion handoff route helper lost ES/EN canonical paths");
}

for (const [label, route, locale] of [["ES", esRoute, "es"], ["EN", enRoute, "en"]]) {
  if (!route.includes("RequestDemoPage")) throw new Error(`${label} request-demo route does not render shared page`);
  if (!route.includes(`requestDemoPath(\"${locale}\")`)) throw new Error(`${label} request-demo route does not own a clean canonical path`);
  if (!route.includes("SearchParamRecord")) throw new Error(`${label} request-demo route does not accept bounded query context`);
}

for (const token of [
  "normalizeLeadHandoffParams",
  "getLeadIntentLabel",
  "LeadHandoffForm",
  "data-lead-source",
  "data-lead-context",
  "requestDemoPath(otherLocale)",
]) {
  if (!page.includes(token)) throw new Error(`Request-demo page missing context contract: ${token}`);
}

// Phase 7A remains responsible for the truthful email fallback even when a
// later phase adds an explicitly governed server-side transport.
for (const token of [
  "form.reportValidity()",
  "window.location.href = mailto",
  "buildLeadMailto",
  "data-lead-handoff-form",
  "data-lead-prepare-email",
  'type="email"',
  'type="tel"',
  'name="phone"',
  "required",
  "LEAD_CONTACT_EMAIL",
]) {
  if (!form.includes(token)) throw new Error(`Lead handoff form missing Phase 7A fallback contract: ${token}`);
}
for (const forbidden of ["localStorage", "sessionStorage"]) {
  if (form.includes(forbidden)) throw new Error(`Lead handoff form introduced unapproved browser storage: ${forbidden}`);
}

if (!header.includes("requestDemoPath") || !header.includes('source: "header"')) {
  throw new Error("Header high-intent CTA is not routed through the conversion handoff");
}
if (!header.includes("const builderHref = teamBuilderPath(locale)")) {
  throw new Error("Header no longer keeps Team Builder separate from high-intent conversion");
}
if (!header.includes('{ href: builderHref, label: "Diseña tu equipo IA" }') || !header.includes('{ href: builderHref, label: "Design your AI team" }')) {
  throw new Error("Team Builder disappeared from the bilingual Tools navigation");
}

if (!home.includes("requestDemoPath") || !home.includes('source: "home-final"')) {
  throw new Error("Homepage final CTA does not preserve conversion source context");
}
if (!home.includes("const builderHref = teamBuilderPath(locale)")) {
  throw new Error("Homepage hero no longer targets Team Builder directly");
}
if (home.includes("mailto:hola@iaempleado.com?subject=")) {
  throw new Error("Homepage still bypasses the shared conversion handoff with a raw mailto CTA");
}

for (const [label, content, expected] of [
  ["ES", esContent, '"cta": "Solicitar demo"'],
  ["EN", enContent, '"cta": "Request demo"'],
]) {
  if (!content.includes(expected)) throw new Error(`${label} global CTA copy is not aligned with request-demo intent`);
}

for (const token of ['requestDemoPath("es")', 'requestDemoPath("en")']) {
  if (!sitemap.includes(token)) throw new Error(`Sitemap missing clean conversion route: ${token}`);
}

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes('"ia-web-release"')) {
    throw new Error(`${label} layout lost the production release marker contract`);
  }
  if (!layout.includes("conversion-handoff.css")) throw new Error(`${label} layout does not load conversion handoff styles`);
}

for (const token of [
  ".conversion-handoff-hero-grid",
  ".lead-context-card",
  ".lead-handoff-form",
  ".lead-handoff-field-grid",
  ":focus-visible",
  "@media (max-width: 760px)",
]) {
  if (!css.includes(token)) throw new Error(`Conversion handoff CSS missing responsive/accessibility token: ${token}`);
}

for (const token of [
  "/solicitar-demo?intent=team",
  "/en/request-demo?intent=process",
  "buildLeadMailto",
  'getByLabel("Teléfono")',
  'getByLabel("Phone")',
  "natural",
  "390",
  "scrollWidth",
]) {
  if (!browser.includes(token)) throw new Error(`Conversion handoff browser QA missing token: ${token}`);
}

if (!productionWorkflow.includes("tests/conversion-handoff.spec.ts")) {
  throw new Error("Production verification does not include conversion handoff browser QA");
}
if (!campaignContract.includes('layout.includes(\'"ia-web-release"\')')) {
  throw new Error("Historical campaign-media contract still owns the exact active release marker");
}

for (const phrase of [
  "no network submission",
  "no CRM claim",
  "web-phase-7a-conversion-handoff",
  "Production Verification",
]) {
  if (!phase.includes(phrase)) throw new Error(`Phase 7A documentation missing contract phrase: ${phrase}`);
}

console.log("Conversion handoff contract OK: bilingual routing, bounded context and truthful email fallback remain protected while later governed transports may extend the form.");
