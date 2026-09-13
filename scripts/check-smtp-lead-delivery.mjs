import fs from "node:fs";

const files = {
  smtp: "lib/lead-smtp-delivery.ts",
  route: "app/api/lead-intake/route.ts",
  env: ".env.example",
  package: "package.json",
  test: "tests/lead-intake.spec.ts",
  docs: "docs/PHASE_7C2_HOSTINGER_SMTP.md",
  diagnostic: "docs/EMAIL_DELIVERABILITY_DIAGNOSTIC.md",
  production: ".github/workflows/production-verify.yml",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing Web Phase 7C2 SMTP contract file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty Web Phase 7C2 SMTP contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const smtp = read(files.smtp);
const route = read(files.route);
const env = read(files.env);
const pkg = read(files.package);
const test = read(files.test);
const docs = read(files.docs);
const diagnostic = read(files.diagnostic);
const production = read(files.production);

for (const token of [
  'from "nodemailer"',
  "getLeadSmtpConfig",
  "deliverLeadViaSmtp",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM_EMAIL",
  "LEAD_NOTIFICATION_TO",
  "LEAD_NOTIFICATION_SUBJECT_PREFIX",
  "connectionTimeout",
  "greetingTimeout",
  "socketTimeout",
  'minVersion: "TLSv1.2"',
  'const subject = "IA Empleado - nuevo contacto"',
  "Nuevo contacto desde IA Empleado.",
  "info.accepted",
  "info.rejected",
  "info.pending",
  "acceptedCount !== config.recipients.length",
  "smtp_partial_delivery",
  "partial_delivery",
]) {
  if (!smtp.includes(token)) throw new Error(`SMTP delivery contract missing token: ${token}`);
}

for (const forbidden of [
  "NEXT_PUBLIC_SMTP",
  "console.log(config",
  "console.error(config",
  "console.log(input.payload",
  "console.error(input.payload",
  "replyTo:",
  '"X-IA-Empleado-Lead-Id"',
  '"X-IA-Empleado-Event"',
  "html: message.html",
]) {
  if (smtp.includes(forbidden)) throw new Error(`SMTP diagnostic profile contains forbidden pattern: ${forbidden}`);
}

for (const token of [
  "getLeadSmtpConfig",
  "LeadIntakeTransport",
  "const transport:",
  '"smtp"',
  '"webhook"',
  "transport: config.transport",
  'config.transport === "smtp"',
  "deliverLeadViaSmtp",
  "LEAD_INTAKE_WEBHOOK_URL",
  "LEAD_PRIVACY_NOTICE_URL",
  'code: "delivery_failed"',
  'fallback: "email"',
]) {
  if (!route.includes(token)) throw new Error(`Lead intake SMTP routing missing token: ${token}`);
}

for (const variable of [
  "APP_BASE_URL=",
  "LEAD_PRIVACY_NOTICE_URL=",
  "SMTP_HOST=",
  "SMTP_PORT=",
  "SMTP_SECURE=",
  "SMTP_USER=",
  "SMTP_PASSWORD=",
  "SMTP_FROM_EMAIL=",
  "SMTP_FROM_NAME=",
  "LEAD_NOTIFICATION_TO=",
  "LEAD_NOTIFICATION_SUBJECT_PREFIX=",
]) {
  if (!env.includes(variable)) throw new Error(`SMTP env template missing variable: ${variable}`);
}

if (!pkg.includes('"nodemailer": "10.0.8"')) {
  throw new Error("Nodemailer runtime dependency is missing or not pinned to the validated version");
}

for (const token of [
  "PRODUCTION_BASE_URL",
  'expect(publicState.mode).toBe("direct")',
  'expect(publicState.configured).toBe(true)',
  'expect(publicState.transport).toBe("smtp")',
  'not.toContain("SMTP_PASSWORD")',
  'not.toContain("LEAD_NOTIFICATION_TO")',
]) {
  if (!test.includes(token)) throw new Error(`Lead intake QA missing SMTP production token: ${token}`);
}

for (const phrase of [
  "Hostinger SMTP Commercial Lead Delivery",
  "Closed and production-verified",
  "iaempleado.com",
  "kairoseth.iaempleado.com",
  "SMTP_PASSWORD",
  "generic webhook",
  "one synthetic production lead",
  "partial recipient acceptance",
  "5.7.1 Spam message rejected",
]) {
  if (!docs.includes(phrase)) throw new Error(`7C2 SMTP documentation missing phrase: ${phrase}`);
}

for (const phrase of [
  "Manual messages",
  "plain text only",
  "no HTML alternative",
  "no external Reply-To",
  "no custom X-IA-* headers",
]) {
  if (!diagnostic.includes(phrase)) throw new Error(`Deliverability diagnostic documentation missing phrase: ${phrase}`);
}

if (!production.includes("tests/lead-intake.spec.ts")) {
  throw new Error("Production verification does not include lead intake QA");
}

console.log("Hostinger SMTP lead-delivery contract OK: minimal diagnostic message, server-only secrets, explicit SMTP transport, full-recipient acceptance and historical production evidence preserved.");
