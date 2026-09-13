import fs from "node:fs";

const files = {
  envelope: "lib/lead-destination-envelope.ts",
  adapter: "lib/brevo-lead-destination.ts",
  route: "app/api/internal/lead-destinations/brevo/route.ts",
  env: ".env.example",
  test: "tests/brevo-lead-destination.spec.ts",
  phase: "docs/PHASE_7C_LEAD_INTAKE_PIPELINE.md",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  production: ".github/workflows/production-verify.yml",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 7C2A contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 7C2A contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const envelope = read(files.envelope);
const adapter = read(files.adapter);
const route = read(files.route);
const env = read(files.env);
const test = read(files.test);
const phase = read(files.phase);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const production = read(files.production);

for (const token of [
  "validateLeadDestinationEnvelope",
  "LEAD_INTAKE_SCHEMA_VERSION",
  "LEAD_CONSENT_VERSION",
  "hasOnlyKeys",
  'origin: "iaempleado.com"',
  "privacyNoticeUrl",
]) {
  if (!envelope.includes(token)) throw new Error(`Brevo destination envelope contract missing token: ${token}`);
}

for (const token of [
  'BREVO_API_BASE_URL = "https://api.brevo.com/v3"',
  "BREVO_API_KEY",
  "BREVO_PIPELINE_ID",
  "BREVO_DEAL_STAGE_ID",
  "BREVO_DEAL_OWNER",
  '"api-key"',
  '`${baseUrl}/contacts`',
  'identifierType=email_id',
  '`${baseUrl}/crm/deals`',
  '`${baseUrl}/crm/notes`',
  "FIRSTNAME",
  "LASTNAME",
  "updateEnabled: true",
  "pipeline: config.pipelineId",
  "deal_stage: config.dealStageId",
  "linkedContactsIds: [contactId]",
  "contactIds: [contactId]",
  "dealIds: [dealId]",
  "escapeHtml",
]) {
  if (!adapter.includes(token)) throw new Error(`Brevo destination adapter missing token: ${token}`);
}

for (const forbidden of [
  "listIds:",
  "/emailCampaigns",
  "/smsCampaigns",
  "/contacts/lists",
  "NEXT_PUBLIC_BREVO",
  "console.log(envelope",
  "console.error(envelope",
]) {
  if (adapter.includes(forbidden) || route.includes(forbidden)) {
    throw new Error(`Brevo destination introduced forbidden marketing/secret/PII pattern: ${forbidden}`);
  }
}

for (const token of [
  'export const runtime = "nodejs"',
  "timingSafeEqual",
  "LEAD_INTAKE_WEBHOOK_TOKEN",
  "validateLeadDestinationEnvelope",
  "deliverLeadToBrevo",
  'provider: "brevo"',
  'code: "destination_unconfigured"',
  'code: "unauthorized"',
  'code: "destination_delivery_failed"',
  '"Cache-Control": "no-store, max-age=0"',
  "validation.value.leadId",
]) {
  if (!route.includes(token)) throw new Error(`Brevo destination route missing safety token: ${token}`);
}

if (route.includes("validation.value.contact") || route.includes("validation.value.request.need")) {
  throw new Error("Brevo destination route logs or otherwise directly exposes validated PII fields");
}

for (const token of [
  "LEAD_INTAKE_WEBHOOK_URL=",
  "LEAD_INTAKE_WEBHOOK_TOKEN=",
  "LEAD_PRIVACY_NOTICE_URL=",
  "BREVO_API_KEY=",
  "BREVO_PIPELINE_ID=",
  "BREVO_DEAL_STAGE_ID=",
  "BREVO_DEAL_OWNER=",
  "https://iaempleado.com/api/internal/lead-destinations/brevo",
]) {
  if (!env.includes(token)) throw new Error(`Brevo destination env contract missing token: ${token}`);
}

for (const token of [
  "validateLeadDestinationEnvelope",
  "buildBrevoContactPayload",
  "buildBrevoDealPayload",
  "buildBrevoNotePayload",
  "deliverLeadToBrevo",
  'provider: "brevo"',
  "destination_unconfigured",
  "listIds",
  "390",
]) {
  if (!test.includes(token)) throw new Error(`Brevo destination QA missing token: ${token}`);
}

for (const phrase of [
  "7C2A — Brevo Destination Foundation",
  "contact → deal → note",
  "no marketing enrollment",
  "BREVO_API_KEY",
  "BREVO_PIPELINE_ID",
  "BREVO_DEAL_STAGE_ID",
  "synthetic end-to-end lead",
]) {
  if (!phase.includes(phrase)) throw new Error(`Phase 7C documentation missing 7C2A phrase: ${phrase}`);
}

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes('"ia-web-release": "web-phase-7c2a-brevo-destination-foundation"')) {
    throw new Error(`${label} layout is not marked for the Web Phase 7C2A destination foundation release`);
  }
}

if (!production.includes("web-phase-7c2a-brevo-destination-foundation")) {
  throw new Error("Production verification is not waiting for the 7C2A release marker");
}
if (!production.includes("tests/brevo-lead-destination.spec.ts")) {
  throw new Error("Production verification does not include Brevo destination QA");
}
if (!production.includes("tests/lead-intake.spec.ts")) {
  throw new Error("Production verification lost the provider-agnostic lead intake regression");
}

console.log("Brevo destination contract OK: strict envelope, protected server receiver, contact/deal/note mapping, no marketing enrollment and production-safe activation boundary protected.");
