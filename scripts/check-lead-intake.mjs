import fs from "node:fs";

const files = {
  intake: "lib/lead-intake.ts",
  route: "app/api/lead-intake/route.ts",
  form: "components/lead-handoff-form.tsx",
  conversion: "lib/conversion-handoff.ts",
  css: "app/conversion-handoff.css",
  env: ".env.example",
  test: "tests/lead-intake.spec.ts",
  phase: "docs/PHASE_7C_LEAD_INTAKE_PIPELINE.md",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  production: ".github/workflows/production-verify.yml",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 7C1 contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 7C1 contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const intake = read(files.intake);
const route = read(files.route);
const form = read(files.form);
const conversion = read(files.conversion);
const css = read(files.css);
const env = read(files.env);
const test = read(files.test);
const phase = read(files.phase);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const production = read(files.production);

for (const token of [
  'LEAD_INTAKE_ENDPOINT = "/api/lead-intake"',
  'LEAD_CONSENT_VERSION = "lead-intake-v1"',
  "validateLeadIntakePayload",
  "consentVersion !== LEAD_CONSENT_VERSION",
  "EMAIL_PATTERN",
  "cleanMultiline",
]) {
  if (!intake.includes(token)) throw new Error(`Lead intake validation contract missing token: ${token}`);
}

for (const token of [
  'export const runtime = "nodejs"',
  "LEAD_INTAKE_WEBHOOK_URL",
  "LEAD_PRIVACY_NOTICE_URL",
  "LEAD_INTAKE_WEBHOOK_TOKEN",
  "originAllowed",
  "rateLimited",
  "validation.value.website",
  '"Cache-Control": "no-store, max-age=0"',
  '"X-IA-Empleado-Event": "lead.created"',
  'code: "transport_unconfigured"',
  'code: "delivery_failed"',
  "privacyNoticeUrl: config.privacyNoticeUrl",
]) {
  if (!route.includes(token)) throw new Error(`Lead intake route missing safety/delivery token: ${token}`);
}

for (const forbidden of [
  "console.log(validation.value",
  "console.error(validation.value",
  "localStorage",
  "sessionStorage",
]) {
  if (route.includes(forbidden)) throw new Error(`Lead intake route contains forbidden PII/storage pattern: ${forbidden}`);
}

for (const token of [
  "LEAD_INTAKE_ENDPOINT",
  "LEAD_CONSENT_VERSION",
  "data-lead-intake-mode",
  "data-lead-intake-success",
  "data-lead-intake-fallback",
  "capability.privacyNoticeUrl",
  'name="consent"',
  'name="website"',
  "buildLeadMailto",
  "window.location.href = mailto",
]) {
  if (!form.includes(token)) throw new Error(`Lead intake form missing progressive-enhancement token: ${token}`);
}

for (const token of [
  "directFormDescription",
  "directSubmit",
  "directPrivacy",
  "successTitle",
  "fallbackAction",
]) {
  if (!conversion.includes(token)) throw new Error(`Conversion copy missing lead intake token: ${token}`);
}

for (const token of [
  ".lead-handoff-consent",
  ".lead-handoff-honeypot",
  ".lead-handoff-status-success",
  ".lead-handoff-status-fallback",
  "@media (max-width: 760px)",
]) {
  if (!css.includes(token)) throw new Error(`Lead intake CSS missing token: ${token}`);
}

for (const token of [
  "LEAD_INTAKE_WEBHOOK_URL=",
  "LEAD_PRIVACY_NOTICE_URL=",
  "LEAD_INTAKE_WEBHOOK_TOKEN=",
]) {
  if (!env.includes(token)) throw new Error(`Lead intake env template missing variable: ${token}`);
}

for (const token of [
  "/api/lead-intake",
  'mode: "direct"',
  "transport_unconfigured",
  "validation_error",
  "Enviar solicitud",
  "Prepare fallback email",
  "390",
]) {
  if (!test.includes(token)) throw new Error(`Lead intake browser/API QA missing token: ${token}`);
}

for (const phrase of [
  "7C1 — Lead Intake Foundation",
  "7C2 — Direct Intake Activation",
  "LEAD_INTAKE_WEBHOOK_URL",
  "LEAD_PRIVACY_NOTICE_URL",
  "must not claim that a lead was received",
  "7C2 activation blockers",
]) {
  if (!phase.includes(phrase)) throw new Error(`Phase 7C documentation missing contract phrase: ${phrase}`);
}

for (const [label, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes('"ia-web-release"')) {
    throw new Error(`${label} layout lost the production release marker contract`);
  }
}

if (!production.includes("tests/lead-intake.spec.ts")) {
  throw new Error("Production verification does not include lead intake QA");
}

console.log("Lead intake contract OK: server validation, gated direct transport, consent, truthful fallback and production verification protected.");
