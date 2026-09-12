import fs from "node:fs";

const required = [
  "app/ux-accessibility.css",
  "components/mobile-navigation.tsx",
  "app/(es)/layout.tsx",
  "app/(en)/en/layout.tsx",
];

for (const path of required) {
  if (!fs.existsSync(path)) throw new Error(`Missing UX/accessibility file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty UX/accessibility file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const css = read("app/ux-accessibility.css");
const nav = read("components/mobile-navigation.tsx");
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");

for (const [locale, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("ux-accessibility.css")) throw new Error(`${locale} layout does not load UX/accessibility hardening last`);
  if (layout.indexOf("ux-accessibility.css") < layout.indexOf("brand-motion.css")) throw new Error(`${locale} UX/accessibility stylesheet must load after brand motion`);
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
  "@media (forced-colors: active)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!css.includes(token)) throw new Error(`UX/accessibility CSS missing contract: ${token}`);
}

if (!css.includes("font-size: 0.81rem") || !css.includes("font-size: 0.94rem")) {
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

console.log("UX/accessibility contract OK");
