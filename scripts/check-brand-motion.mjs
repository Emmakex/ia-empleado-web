import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const motionPath = "app/brand-motion.css";
const phase8cPath = "app/phase8c-motion.css";
const phase8cTestPath = "tests/phase8c-motion.spec.ts";
const guidePath = "branding/MOTION_SYSTEM.md";

for (const path of [motionPath, phase8cPath, phase8cTestPath, guidePath]) {
  if (!fs.existsSync(path)) throw new Error(`Missing motion-system file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty motion-system file: ${path}`);
}

const css = read(motionPath);
const phase8c = read(phase8cPath);
const phase8cTest = read(phase8cTestPath);
const guide = read(guidePath);
const tokens = JSON.parse(read("branding/tokens.json"));
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");

for (const [name, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("brand-motion.css")) throw new Error(`${name} layout does not load the global motion system`);
  if (!layout.includes("phase8c-motion.css")) throw new Error(`${name} layout does not load the Phase 8C motion acceptance layer`);
  if (layout.indexOf("phase8c-motion.css") < layout.indexOf("brand-motion.css")) {
    throw new Error(`${name} Phase 8C motion acceptance layer must load after the canonical motion system`);
  }
}

for (const marker of [
  "prefers-reduced-motion: reduce",
  "prefers-reduced-motion: no-preference",
  "@supports (animation-timeline: view())",
  "animation-timeline: view()",
  "brand-motion-handoff",
  "brand-motion-orbit",
  "brand-motion-core-breathe",
  "brand-motion-person-drift",
  "brand-motion-scroll-reveal",
  "@media (max-width: 760px)",
]) {
  if (!css.includes(marker)) throw new Error(`Global motion stylesheet missing contract marker: ${marker}`);
}

for (const selector of [
  ".brand-home-hero",
  ".brand-context-scene",
  ".brand-organization-scene",
  ".brand-interactive-preview",
  ".brand-comparison-scene",
]) {
  if (!css.includes(selector)) throw new Error(`Global motion stylesheet does not cover ${selector}`);
}

for (const marker of [
  "phase8c-home-copy-enter",
  "phase8c-motion-handoff-focus",
  ".brand-role-family-portrait img",
  ".brand-collaboration-portrait img",
  ".brand-collaboration-hub-ring",
  ".brand-sector-art-portrait img",
  ".brand-sector-art-stage-track > li",
  "opacity: 1",
  "@media (max-width: 760px) and (prefers-reduced-motion: no-preference)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!phase8c.includes(marker)) throw new Error(`Phase 8C motion layer missing contract marker: ${marker}`);
}

const forbiddenLayoutDeclaration = /(?:^|\n)\s*(?:width|height|top|right|bottom|left|margin(?:-[a-z]+)?|padding(?:-[a-z]+)?)\s*:/m;
if (forbiddenLayoutDeclaration.test(phase8c)) {
  throw new Error("Phase 8C animation layer must not animate or redefine layout geometry properties");
}

for (const phrase of [
  'test.describe("Phase 8C motion acceptance"',
  'reducedMotion: "no-preference"',
  "offsetTop",
  "phase8c-home-copy-enter",
  "brand-motion-person-drift",
  "brand-motion-orbit",
  "expectedDuration: \"18s\"",
  "expectedDuration: \"34s\"",
  'reducedMotion: "reduce"',
]) {
  if (!phase8cTest.includes(phrase)) throw new Error(`Phase 8C browser motion acceptance missing phrase: ${phrase}`);
}

if (!css.includes("animation: none !important")) throw new Error("Reduced-motion mode must hard-disable decorative animation");
if (!css.includes("animation: none;")) throw new Error("Mobile mode must remove continuous character drift");
if (css.includes("setInterval(") || css.includes("requestAnimationFrame(") || phase8c.includes("setInterval(") || phase8c.includes("requestAnimationFrame(")) {
  throw new Error("Base brand motion must remain CSS/SVG-first");
}

for (const token of ["fast", "normal", "emphasis", "reveal", "ambient", "ambientOrbit", "handoff", "coreBreathe", "easing", "reducedMotion"]) {
  if (!(token in tokens.motion)) throw new Error(`Missing canonical motion token: ${token}`);
}

for (const phrase of [
  "Meaning before spectacle",
  "CSS/SVG first",
  "Canonical people are colleagues, not mascots",
  "No fake live status",
  "prefers-reduced-motion",
]) {
  if (!guide.includes(phrase)) throw new Error(`Motion guide missing principle: ${phrase}`);
}

console.log("Brand motion contract OK: Phase 8C maps the canonical vocabulary to live employee/team/department/sector selectors, keeps core CTAs immediately available, avoids layout geometry animation, simplifies mobile motion and protects reduced-motion behavior.");
