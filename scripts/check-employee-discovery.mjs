import fs from "node:fs";

const discovery = fs.readFileSync("lib/employee-discovery.ts", "utf8");
const explorer = fs.readFileSync("components/employee-catalog-explorer.tsx", "utf8");
const indexPage = fs.readFileSync("components/employee-index-page.tsx", "utf8");

const expectedKeys = [
  "email-manager",
  "customer-support",
  "administrative",
  "accounting-billing",
  "receptionist",
  "order-management",
  "ecommerce-operations",
  "back-office",
  "reporting",
  "sales-sdr",
  "marketing-operations",
  "travel-agent",
  "reservations",
  "logistics-operations",
  "it-support-l1",
  "software-qa",
  "documentation",
  "gestoria-operations",
  "legal-assistant",
  "hr-administration",
  "recruitment-selection",
  "financial-decisions",
];

const profileMatches = [...discovery.matchAll(/^    key: "([^"]+)",$/gm)].map((match) => match[1]);
if (profileMatches.length !== 22) {
  throw new Error(`[employee-discovery] expected 22 profile records, found ${profileMatches.length}`);
}

for (const key of expectedKeys) {
  if (!profileMatches.includes(key)) throw new Error(`[employee-discovery] missing profile: ${key}`);
}

if (new Set(profileMatches).size !== profileMatches.length) {
  throw new Error("[employee-discovery] duplicate profile keys detected");
}

function profileSegment(key) {
  const start = discovery.indexOf(`    key: "${key}",`);
  if (start < 0) throw new Error(`[employee-discovery] cannot locate profile segment: ${key}`);
  const next = discovery.indexOf("\n  {\n    key: ", start + 1);
  return discovery.slice(start, next < 0 ? discovery.indexOf("\n];", start) : next);
}

const referenceKeys = ["customer-support", "administrative", "accounting-billing", "sales-sdr"];
for (const key of referenceKeys) {
  const segment = profileSegment(key);
  if (!segment.includes('status: "reference"')) throw new Error(`[employee-discovery] ${key} must be reference`);
  if (!segment.includes("deepProfileKey:")) throw new Error(`[employee-discovery] ${key} must link to deep content`);
}

const restrictedKeys = ["recruitment-selection", "financial-decisions"];
for (const key of restrictedKeys) {
  const segment = profileSegment(key);
  if (!segment.includes('status: "restricted"')) throw new Error(`[employee-discovery] ${key} must remain restricted`);
  if (segment.includes("deepProfileKey:")) throw new Error(`[employee-discovery] ${key} must not expose a deep self-service profile`);
}

for (const key of expectedKeys) {
  const segment = profileSegment(key);
  for (const field of ["departmentId:", "sectorIds:", "problemIds:", "taskIds:", "relatedKeys:", "locales:"]) {
    if (!segment.includes(field)) throw new Error(`[employee-discovery] ${key} missing ${field}`);
  }
  if (!segment.includes("es:") || !segment.includes("en:")) {
    throw new Error(`[employee-discovery] ${key} must ship ES/EN together`);
  }
}

for (const stateName of ["department", "sector", "problem", "task"]) {
  if (!explorer.includes(`set${stateName[0].toUpperCase()}${stateName.slice(1)}`)) {
    throw new Error(`[employee-discovery] explorer missing ${stateName} filter`);
  }
}

if (!explorer.includes('type="search"')) throw new Error("[employee-discovery] explorer must include text search");
if (!explorer.includes('aria-live="polite"')) throw new Error("[employee-discovery] result count must be announced accessibly");
if (!indexPage.includes("EmployeeCatalogExplorer")) throw new Error("[employee-discovery] index must render the explorer");

console.log("[employee-discovery] 22-profile discovery contract OK");
