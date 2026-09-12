import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const motionPath = "app/brand-motion.css";
const guidePath = "branding/MOTION_SYSTEM.md";

for (const path of [motionPath, guidePath]) {
  if (!fs.existsSync(path)) throw new Error(`Missing motion-system file: ${path}`);
  if (fs.statSync(path).size === 0) throw new Error(`Empty motion-system file: ${path}`);
}

const css = read(motionPath);
const guide = read(guidePath);
const tokens = JSON.parse(read("branding/tokens.json"));
const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");

for (const [name, layout] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!layout.includes("brand-motion.css")) throw new Error(`${name} layout does not load the global motion system`);
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

if (!css.includes("animation: none !important")) throw new Error("Reduced-motion mode must hard-disable decorative animation");
if (!css.includes("animation: none;")) throw new Error("Mobile mode must remove continuous character drift");
if (css.includes("setInterval(") || css.includes("requestAnimationFrame(")) throw new Error("Base brand motion must remain CSS/SVG-first");

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

console.log("Brand motion contract OK: global CSS/SVG-first motion, mobile simplification and reduced-motion accessibility are protected.");
