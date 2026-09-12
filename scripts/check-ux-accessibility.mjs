import fs from "node:fs";

const required = [
  "app/ux-accessibility.css",
  "app/reflow-hardening.css",
  "components/mobile-navigation.tsx",
  "app/(es)/layout.tsx",
  "app/(en)/en/layout.tsx",
  "playwright.config.ts",
  "tests/ux-visual.spec.ts",
  "package.json",
  ".github/workflows/ci.yml",
];

for (const path of required) {
  if (!fs.existsSync(path)) throw new Error(`Missing UX/accessibility file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty UX/accessibility file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const css = read("app/ux-accessibility.css");
const reflow = read("app/reflow-hardening.css");
const nav = read("components/mobile-navigation.tsx");
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");
const playwright = read("playwright.config.ts");
const browserQa = read("tests/ux-visual.spec.ts");
const packageJson = read("package.json");
const ci = read(".github/workflows/ci.yml");

for (const [locale, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("ux-accessibility.css")) throw new Error(`${locale} layout does not load UX/accessibility hardening`);
  if (!layout.includes("reflow-hardening.css")) throw new Error(`${locale} layout does not load structural reflow hardening`);
  if (layout.indexOf("ux-accessibility.css") < layout.indexOf("brand-motion.css")) throw new Error(`${locale} UX/accessibility stylesheet must load after brand motion`);
  if (layout.indexOf("reflow-hardening.css") < layout.indexOf("ux-accessibility.css")) throw new Error(`${locale} structural reflow hardening must load after UX/accessibility styles`);
}

for (const token of [
  "--site-header-height",
  "scroll-padding-top",
  "scroll-margin-top",
  "-webkit-text-size-adjust: 100%",
  "grid-template-areas",
  '"person1 person2"',
  '"core core"',
  '"person3 person4"',
  '"approval approval"',
  '"systems systems"',
  "min-height: 0",
  "brand-character-status",
  "var(--character-accent",
  "env(safe-area-inset-left)",
  "env(safe-area-inset-bottom)",
  "@media (prefers-contrast: more)",
  "@media (forced-colors: active)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!css.includes(token)) throw new Error(`UX/accessibility CSS missing contract: ${token}`);
}

for (const token of [
  ".two-column > *",
  ".team-detail-hero-grid > *",
  "grid-template-columns: minmax(0, 1fr)",
  "overflow-wrap: anywhere",
  "white-space: normal",
]) {
  if (!reflow.includes(token)) throw new Error(`Structural reflow CSS missing contract: ${token}`);
}

if (reflow.includes("overflow-x: hidden") || reflow.includes("overflow-x:hidden")) {
  throw new Error("Structural reflow must fix overflow causes rather than hiding page overflow");
}

if (!css.includes("font-size: 0.8125rem") || !css.includes("font-size: 0.94rem")) {
  throw new Error("Mobile hero typography does not expose the hardened readable scale");
}

if (!css.includes("--ux-readable-muted: #596579")) {
  throw new Error("Readable muted-text contrast token drifted");
}

for (const token of [
  'role="dialog"',
  'aria-modal="true"',
  'aria-haspopup="dialog"',
  "focusableSelector",
  'event.key === "Escape"',
  'event.key !== "Tab"',
  'setAttribute("inert", "")',
  'removeAttribute("inert")',
  "toggleRef.current?.focus()",
]) {
  if (!nav.includes(token)) throw new Error(`Mobile navigation accessibility missing: ${token}`);
}

if (nav.includes("maximum-scale") || esLayout.includes("maximumScale") || enLayout.includes("maximumScale")) {
  throw new Error("Viewport must not disable user zoom");
}

for (const token of [
  "@playwright/test",
  "@axe-core/playwright",
  '"qa:browser"',
]) {
  if (!packageJson.includes(token)) throw new Error(`Browser QA dependency/script missing: ${token}`);
}

for (const token of [
  "reducedMotion: \"reduce\"",
  "screenshot: \"only-on-failure\"",
  "trace: \"retain-on-failure\"",
]) {
  if (!playwright.includes(token)) throw new Error(`Playwright diagnostics/stability contract missing: ${token}`);
}

for (const token of [
  "320",
  "360",
  "390",
  "430",
  "768",
  "200% text scaling",
  "assertNoHorizontalOverflow",
  "assertMobileHeroGeometry",
  "findHorizontalOverflow",
  "AxeBuilder",
  "mobile navigation traps focus",
]) {
  if (!browserQa.includes(token)) throw new Error(`Browser QA coverage missing: ${token}`);
}

for (const token of [
  "npx playwright install --with-deps chromium",
  "npm run qa:browser",
  "actions/upload-artifact@v4",
]) {
  if (!ci.includes(token)) throw new Error(`CI browser QA wiring missing: ${token}`);
}

console.log("UX/accessibility contract OK");
