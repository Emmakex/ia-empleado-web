import fs from "node:fs";

const requiredFiles = [
  "lib/reference-employee-details.ts",
  "lib/employee-content-engine.ts",
  "app/(es)/empleados-ia/[slug]/page.tsx",
  "app/(en)/en/ai-employees/[slug]/page.tsx",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing reference employee content file: ${file}`);
  }
}

const details = fs.readFileSync("lib/reference-employee-details.ts", "utf8");
const requiredSlugs = [
  "administrativo",
  "administrative",
  "contabilidad-facturacion",
  "accounting-billing",
  "comercial-sdr",
  "sales-sdr",
];

for (const slug of requiredSlugs) {
  if (!details.includes(`slug: \"${slug}\"`)) {
    throw new Error(`Missing localized reference employee slug: ${slug}`);
  }
}

console.log("Reference employee content contract OK");
