import fs from "node:fs";

const requiredFiles = [
  "components/brand-collaboration-composition.tsx",
  "components/team-detail-page.tsx",
  "components/department-detail-page.tsx",
  "app/brand-collaboration-compositions.css",
  "app/(es)/layout.tsx",
  "app/(en)/en/layout.tsx",
];

for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Missing Branding Phase 2B contract file: ${path}`);
}

const composition = fs.readFileSync("components/brand-collaboration-composition.tsx", "utf8");
for (const token of [
  "getBrandCharacterByEmployeeKey",
  "BrandCharacterImage",
  "character?.visualFamily",
  "data-role-family",
  "data-role-motif",
  "brand-collaboration-mini-flow",
  "brand-collaboration-hub",
  "brand-collaboration-systems",
  "brand-collaboration-human",
  'variant: "team" | "department"',
]) {
  if (!composition.includes(token)) throw new Error(`Shared collaboration composition is missing: ${token}`);
}

const team = fs.readFileSync("components/team-detail-page.tsx", "utf8");
for (const token of [
  "BrandCollaborationComposition",
  'variant="team"',
  "participants={collaborationParticipants}",
  "systems={detail.systems}",
  "Team handoffs",
]) {
  if (!team.includes(token)) throw new Error(`Team detail composition contract missing: ${token}`);
}
if (team.includes('className="brand-team-scene"')) {
  throw new Error("Team detail still renders the legacy standalone brand-team-scene instead of the shared Phase 2B composition");
}

const department = fs.readFileSync("components/department-detail-page.tsx", "utf8");
for (const token of [
  "BrandCollaborationComposition",
  'variant="department"',
  "participants={collaborationParticipants}",
  "sceneSystems.length ? sceneSystems : department.integrations",
  "Department coordination",
]) {
  if (!department.includes(token)) throw new Error(`Department detail composition contract missing: ${token}`);
}
if (department.includes("<BrandOrganizationScene")) {
  throw new Error("Department detail still renders the legacy organization scene instead of the shared Phase 2B composition");
}

const css = fs.readFileSync("app/brand-collaboration-compositions.css", "utf8");
for (const token of [
  ".brand-collaboration-composition",
  ".brand-collaboration-participant",
  ".brand-collaboration-hub",
  ".brand-collaboration-systems",
  ".brand-collaboration-human",
  ".motif-conversation",
  ".motif-operations",
  ".motif-ledger",
  ".motif-pipeline",
  "prefers-reduced-motion",
  "max-width: 760px",
  "max-width: 430px",
]) {
  if (!css.includes(token)) throw new Error(`Phase 2B CSS contract missing: ${token}`);
}

for (const path of ["app/(es)/layout.tsx", "app/(en)/en/layout.tsx"]) {
  const layout = fs.readFileSync(path, "utf8");
  if (!layout.includes("brand-collaboration-compositions.css")) {
    throw new Error(`Phase 2B stylesheet is not loaded by ${path}`);
  }
  if (!layout.includes("branding-phase-2b-team-department-compositions")) {
    throw new Error(`Phase 2B release marker is missing from ${path}`);
  }
}

console.log("Team and Department collaboration composition contract OK");
