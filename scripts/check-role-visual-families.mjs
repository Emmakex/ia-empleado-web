import fs from "node:fs";

const files = {
  characters: "lib/brand-characters.ts",
  scene: "components/brand-role-family-scene.tsx",
  employee: "components/employee-detail-page.tsx",
  css: "app/brand-role-families.css",
  esLayout: "app/(es)/layout.tsx",
  enLayout: "app/(en)/en/layout.tsx",
  browser: "tests/role-visual-families.spec.ts",
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) throw new Error(`Missing role visual family contract file: ${path}`);
}

const read = (path) => fs.readFileSync(path, "utf8");
const characters = read(files.characters);
const scene = read(files.scene);
const employee = read(files.employee);
const css = read(files.css);
const esLayout = read(files.esLayout);
const enLayout = read(files.enLayout);
const browser = read(files.browser);

for (const token of [
  'export type BrandRoleMotif = "conversation" | "operations" | "ledger" | "pipeline"',
  "visualFamily: BrandRoleVisualFamily",
  'motif: "conversation"',
  'motif: "operations"',
  'motif: "ledger"',
  'motif: "pipeline"',
]) {
  if (!characters.includes(token)) throw new Error(`Role visual family data contract missing: ${token}`);
}

for (const id of ["clara", "alex", "sofia", "javier"]) {
  if (!characters.includes(`id: "${id}"`)) throw new Error(`Missing canonical role family: ${id}`);
}

for (const token of [
  "data-role-family={character.id}",
  "data-role-motif={family.motif}",
  "family.flow.map",
  "family.systems.map",
  "family.humanControl",
  "BrandCharacterImage",
]) {
  if (!scene.includes(token)) throw new Error(`Reusable role family scene missing: ${token}`);
}

if (!employee.includes("<BrandRoleFamilyScene character={character} />")) {
  throw new Error("Employee detail hero must render the reusable role visual family scene");
}

for (const motif of ["conversation", "operations", "ledger", "pipeline"]) {
  if (!css.includes(`.brand-role-family-scene.motif-${motif}`)) {
    throw new Error(`Missing CSS grammar for role motif: ${motif}`);
  }
}

for (const token of ["@media (max-width: 760px)", "@media (max-width: 430px)", "@media (prefers-reduced-motion: reduce)"]) {
  if (!css.includes(token)) throw new Error(`Role family CSS missing responsive/accessibility contract: ${token}`);
}

for (const [label, source] of [["ES", esLayout], ["EN", enLayout]]) {
  if (!source.includes("brand-role-families.css")) throw new Error(`${label} layout does not load role family CSS`);
  if (!source.includes('ia-web-release": "branding-phase-2a-role-families"')) {
    throw new Error(`${label} layout is not marked with Branding Phase 2A release`);
  }
}

for (const route of ["atencion-cliente", "administrativo", "contabilidad-facturacion", "comercial-sdr"]) {
  if (!browser.includes(route)) throw new Error(`Browser QA missing deep employee route: ${route}`);
}

console.log("Role visual family contract OK: four canonical motifs, responsive CSS, deep-profile application and production release marker protected.");
