import fs from "node:fs";
import path from "node:path";

const files = {
  home: "components/home-page.tsx",
  header: "components/site-header.tsx",
  footer: "components/site-footer.tsx",
  requestDemo: "components/request-demo-page.tsx",
  leadForm: "components/lead-handoff-form.tsx",
  conversion: "lib/conversion-handoff.ts",
  legalContent: "lib/legal-content.ts",
  legalPage: "components/legal-document-page.tsx",
  legalEs: "app/(es)/aviso-legal/page.tsx",
  privacyEs: "app/(es)/politica-de-privacidad/page.tsx",
  legalEn: "app/(en)/en/legal-notice/page.tsx",
  privacyEn: "app/(en)/en/privacy-policy/page.tsx",
  sitemap: "app/sitemap.ts",
  envExample: ".env.example",
  esContent: "content/es.json",
  enContent: "content/en.json",
  phase8h: "docs/PHASE_8H_FINAL_COMMERCIAL_READINESS.md",
};

for (const file of Object.values(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing Phase 8H readiness file: ${file}`);
  if (fs.statSync(file).size === 0) throw new Error(`Empty Phase 8H readiness file: ${file}`);
}

const read = (file) => fs.readFileSync(file, "utf8");
const home = read(files.home);
const header = read(files.header);
const footer = read(files.footer);
const requestDemo = read(files.requestDemo);
const leadForm = read(files.leadForm);
const conversion = read(files.conversion);
const legalContent = read(files.legalContent);
const legalPage = read(files.legalPage);
const legalRoutes = [files.legalEs, files.privacyEs, files.legalEn, files.privacyEn].map(read);
const sitemap = read(files.sitemap);
const envExample = read(files.envExample);
const es = JSON.parse(read(files.esContent));
const en = JSON.parse(read(files.enContent));
const phase8h = read(files.phase8h);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// Keep principal commercial intents explicit and aligned across languages.
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

// Phase 8H legal identity and privacy surfaces are now production-intentional.
for (const token of [
  'LEGAL_OWNER_NAME = "Eduardo Jose Yauri Luna"',
  'LEGAL_OWNER_TAX_ID = "60281451S"',
  'LEGAL_CONTACT_EMAIL = "info@iaempleado.com"',
  'LEGAL_OWNER_ADDRESS = "Reina Amalia 8, 4 2, Barcelona, España"',
  'return locale === "es" ? "/aviso-legal" : "/en/legal-notice"',
  'return locale === "es" ? "/politica-de-privacidad" : "/en/privacy-policy"',
]) {
  assert(legalContent.includes(token), `Legal identity/surface contract missing token: ${token}`);
}

for (const token of ["legalNoticePath", "privacyPolicyPath", "footer-legal-nav"]) {
  assert(footer.includes(token), `Footer legal navigation missing token: ${token}`);
}
assert(footer.includes('`${homeHref}#seguridad`'), "Footer product security/privacy-control link no longer points to the product security section");

for (const route of legalRoutes) {
  for (const token of ["LegalDocumentPage", "isLegalIdentityComplete", "robots: { index: ready, follow: true }"]) {
    assert(route.includes(token), `Legal route missing publication readiness token: ${token}`);
  }
}
for (const token of ["getLegalDocumentContent", "isLegalIdentityComplete", "SiteFooter", "SiteHeader"]) {
  assert(legalPage.includes(token), `Shared legal page missing governed token: ${token}`);
}
for (const token of ["privacyPolicyPath", "legalNoticePath"]) {
  assert(sitemap.includes(token), `Sitemap does not publish legal route helper: ${token}`);
}
assert(
  envExample.includes("LEAD_PRIVACY_NOTICE_URL=https://iaempleado.com/politica-de-privacidad"),
  "Lead privacy configuration does not point to the first-party published Spanish privacy notice",
);
assert(phase8h.includes("ACTIVE — opened on 2026-09-16"), "Phase 8H master document no longer records the active final gate");

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

// The lead form may use buildLeadMailto as a truthful fallback, but it must not hard-code
// arbitrary mailto destinations or store lead data in browser persistence.
assert(leadForm.includes("buildLeadMailto"), "Lead form lost truthful email fallback helper");
assert(leadForm.includes('href={`mailto:${LEAD_CONTACT_EMAIL}`}'), "Lead form lost the explicit governed contact-email fallback");
const leadMailtoCount = (leadForm.match(/mailto\s*:/gi) ?? []).length;
assert(leadMailtoCount === 1, `Lead form must contain exactly one governed literal mailto fallback, found ${leadMailtoCount}`);
for (const forbiddenStorage of ["localStorage", "sessionStorage"]) {
  assert(!leadForm.includes(forbiddenStorage), `Lead form introduced unapproved browser persistence: ${forbiddenStorage}`);
}

console.log(`Phase 8H commercial/legal readiness OK: ${publicFiles.length} public source files scanned; bilingual legal identity, footer navigation, privacy handoff, CTA intent and placeholder hygiene are protected.`);
