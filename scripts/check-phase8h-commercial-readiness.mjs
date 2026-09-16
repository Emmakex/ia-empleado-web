import fs from "node:fs";
import path from "node:path";

const files = {
  home: "components/home-page.tsx",
  header: "components/site-header.tsx",
  footer: "components/site-footer.tsx",
  requestDemo: "components/request-demo-page.tsx",
  leadForm: "components/lead-handoff-form.tsx",
  conversion: "lib/conversion-handoff.ts",
  esContent: "content/es.json",
  enContent: "content/en.json",
  preAudit: "docs/PHASE_8H_PRE_AUDIT.md",
};

for (const file of Object.values(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing Phase 8H pre-audit contract file: ${file}`);
  if (fs.statSync(file).size === 0) throw new Error(`Empty Phase 8H pre-audit contract file: ${file}`);
}

const read = (file) => fs.readFileSync(file, "utf8");
const home = read(files.home);
const header = read(files.header);
const footer = read(files.footer);
const requestDemo = read(files.requestDemo);
const leadForm = read(files.leadForm);
const conversion = read(files.conversion);
const es = JSON.parse(read(files.esContent));
const en = JSON.parse(read(files.enContent));
const preAudit = read(files.preAudit);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// Keep the three principal commercial intents explicit and semantically aligned.
assert(es.nav.cta === "Solicitar demo", "ES navigation CTA drifted from demo intent");
assert(en.nav.cta === "Request demo", "EN navigation CTA drifted from demo intent");
assert(es.cta.primary === "Solicitar una demo", "ES final primary CTA drifted from demo intent");
assert(en.cta.primary === "Request a demo", "EN final primary CTA drifted from demo intent");
assert(es.hero.primaryCta === "Diseñar mi equipo IA", "ES hero primary CTA no longer targets team design intent");
assert(en.hero.primaryCta === "Design my AI team", "EN hero primary CTA no longer targets team design intent");
assert(es.cta.secondary === "Diseñar mi equipo IA", "ES final secondary CTA no longer matches team-design intent");
assert(en.cta.secondary === "Design my AI team", "EN final secondary CTA no longer matches team-design intent");

// High-intent conversion must keep going through the shared contextual handoff.
for (const token of ["requestDemoPath", 'source: "header"', "const builderHref = teamBuilderPath(locale)"]) {
  assert(header.includes(token), `Header commercial routing missing token: ${token}`);
}
for (const token of ["requestDemoPath", 'source: "home-final"', "const builderHref = teamBuilderPath(locale)", "href={demoHref}", "href={builderHref}"]) {
  assert(home.includes(token), `Homepage commercial routing missing token: ${token}`);
}
for (const token of ["LeadHandoffForm", "normalizeLeadHandoffParams", "requestDemoPath(otherLocale)"]) {
  assert(requestDemo.includes(token), `Request-demo surface missing governed handoff token: ${token}`);
}
for (const token of [
  'export const LEAD_CONTACT_EMAIL = "hola@iaempleado.com"',
  'locale === "es" ? "/solicitar-demo" : "/en/request-demo"',
  "buildLeadMailto",
]) {
  assert(conversion.includes(token), `Conversion contract missing canonical token: ${token}`);
}

// The current "Privacy & control" footer destination is a product/security section,
// not a legal privacy notice. Preserve that truthful distinction until dedicated legal
// routes are intentionally published in Phase 8H.
assert(footer.includes('`${homeHref}#seguridad`'), "Footer product privacy/control link no longer points to the security section");
assert(footer.includes("dictionary.footer.links.slice(2)"), "Footer resource mapping drifted from bilingual dictionary contract");
assert(!footer.includes("/privacy-policy") && !footer.includes("/politica-de-privacidad"), "Footer introduced a privacy-policy route before the dedicated legal surface exists");

// No public surface should bypass the governed handoff with a literal mailto link,
// empty CTA, fake anchor, javascript pseudo-link or obvious launch placeholder.
const roots = ["app", "components", "content"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json"]);
const publicFiles = [];

const walk = (root) => {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (extensions.has(path.extname(entry.name))) publicFiles.push(full);
  }
};

for (const root of roots) walk(root);

const forbidden = [
  { pattern: /href\s*=\s*["']#["']/i, label: "empty # href" },
  { pattern: /href\s*=\s*["']\s*["']/i, label: "empty href" },
  { pattern: /javascript\s*:/i, label: "javascript pseudo-link" },
  { pattern: /mailto\s*:/i, label: "literal mailto bypass" },
  { pattern: /\bcoming soon\b/i, label: "coming-soon placeholder" },
  { pattern: /\bpr[oó]ximamente\b/i, label: "proximamente placeholder" },
  { pattern: /\blorem ipsum\b/i, label: "lorem ipsum placeholder" },
];

const violations = [];

for (const file of publicFiles) {
  const source = read(file);
  for (const rule of forbidden) {
    // lead-handoff-form.tsx owns the intentionally governed email fallback. It may
    // contain exactly one literal mailto URI for the public contact address; all
    // other commercial surfaces must route through requestDemoPath/buildLeadMailto.
    if (rule.label === "literal mailto bypass" && file === files.leadForm) continue;
    if (rule.pattern.test(source)) {
      violations.push(`Public commercial surface contains ${rule.label}: ${file}`);
    }
  }

  for (const internalHref of ['href="/api/', "href='/api/", 'href="/internal', "href='/internal", 'href="/admin', "href='/admin"]) {
    if (source.includes(internalHref)) {
      violations.push(`Public surface links to an internal/non-commercial destination (${internalHref}): ${file}`);
    }
  }
}

if (violations.length > 0) {
  throw new Error(`Phase 8H commercial readiness violations (${violations.length}):\n- ${violations.join("\n- ")}`);
}

// Protect the pre-audit boundary: this gate prepares 8H but must not claim it is active
// or that the unresolved legal/privacy work is complete.
for (const phrase of [
  "PRE-AUDIT ONLY. Phase 8H is not active yet.",
  "Phase 8G remains active until the real-device acceptance tracked in issue #103 is complete.",
  "public legal/privacy surface is incomplete",
  "Do not invent legal identity data.",
  "Current `Privacidad y control` is a product/security section link, not a legal privacy notice.",
]) {
  assert(preAudit.includes(phrase), `Phase 8H pre-audit boundary missing phrase: ${phrase}`);
}

// The lead form may use buildLeadMailto as a truthful fallback, but it must not hard-code
// arbitrary mailto destinations or store lead data in browser persistence.
assert(leadForm.includes("buildLeadMailto"), "Lead form lost truthful email fallback helper");
assert(leadForm.includes('href={`mailto:${LEAD_CONTACT_EMAIL}`}'), "Lead form lost the explicit governed contact-email fallback");
const leadMailtoCount = (leadForm.match(/mailto\s*:/gi) ?? []).length;
assert(leadMailtoCount === 1, `Lead form must contain exactly one governed literal mailto fallback, found ${leadMailtoCount}`);
for (const forbiddenStorage of ["localStorage", "sessionStorage"]) {
  assert(!leadForm.includes(forbiddenStorage), `Lead form introduced unapproved browser persistence: ${forbiddenStorage}`);
}

console.log(`Phase 8H commercial readiness pre-audit OK: ${publicFiles.length} public source files scanned; CTA intent, governed handoff and placeholder hygiene remain protected without claiming Phase 8H activation.`);
