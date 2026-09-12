import fs from "node:fs";

const content = fs.readFileSync("lib/organization-map.ts", "utf8");
const departmentIndex = fs.readFileSync("components/department-index-page.tsx", "utf8");
const departmentDetail = fs.readFileSync("components/department-detail-page.tsx", "utf8");
const integrationIndex = fs.readFileSync("components/integration-index-page.tsx", "utf8");
const integrationDetail = fs.readFileSync("components/integration-detail-page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const footer = fs.readFileSync("components/site-footer.tsx", "utf8");
const esLayout = fs.readFileSync("app/(es)/layout.tsx", "utf8");
const enLayout = fs.readFileSync("app/(en)/en/layout.tsx", "utf8");

const departments = [
  "customer-support",
  "administration",
  "accounting-billing",
  "sales",
  "ecommerce-operations",
  "travel-reservations",
];
const integrations = ["crm", "erp", "email", "calendar", "ecommerce", "ticketing", "document-management"];

for (const key of departments) {
  if (!content.includes(`key: \"${key}\"`)) throw new Error(`Missing department: ${key}`);
}
for (const key of integrations) {
  if (!content.includes(`key: \"${key}\"`)) throw new Error(`Missing integration: ${key}`);
}

if (!content.includes('return locale === "es" ? "/departamentos" : "/en/departments"')) {
  throw new Error("Missing localized department index paths");
}
if (!content.includes('return locale === "es" ? "/integraciones" : "/en/integrations"')) {
  throw new Error("Missing localized integration index paths");
}

for (const marker of ["employeeKeys", "useCases", "integrations", "controls", "metrics", "operatingModel"]) {
  if ((content.split(marker).length - 1) < departments.length) throw new Error(`Department content missing ${marker} coverage`);
}
for (const marker of ["reads", "writes", "departments", "useCases", "controls", "checklist", "limits"]) {
  if ((content.split(marker).length - 1) < integrations.length) throw new Error(`Integration content missing ${marker} coverage`);
}

if (!departmentIndex.includes("departmentRecords.map")) throw new Error("Department index must render canonical records");
if (!integrationIndex.includes("integrationRecords.map")) throw new Error("Integration index must render canonical records");
if (!departmentDetail.includes("employeeDetailPath") || !departmentDetail.includes("useCaseDetailPath") || !departmentDetail.includes("integrationDetailPath")) {
  throw new Error("Department detail must connect employees, use cases and integrations");
}
if (!integrationDetail.includes("departmentDetailPath") || !integrationDetail.includes("employeeDetailPath") || !integrationDetail.includes("useCaseDetailPath")) {
  throw new Error("Integration detail must connect departments, employees and use cases");
}
if (!integrationDetail.includes("Separate read and write") || !integrationDetail.includes("Separar lectura y escritura")) {
  throw new Error("Integration detail must make read/write authority explicit");
}
if (!content.includes("no una promesa de compatibilidad universal") || !content.includes("not a promise of universal compatibility")) {
  throw new Error("Integration index must reject universal connector claims");
}
if (!sitemap.includes("departmentIndexPath") || !sitemap.includes("departmentDetailPath") || !sitemap.includes("integrationIndexPath") || !sitemap.includes("integrationDetailPath")) {
  throw new Error("Sitemap must include department and integration surfaces");
}
if (!footer.includes("departmentIndexPath") || !footer.includes("integrationIndexPath")) {
  throw new Error("Footer must expose department and integration indexes");
}
if (!esLayout.includes("organization-map.css") || !enLayout.includes("organization-map.css")) {
  throw new Error("Both locale layouts must load organization-map.css");
}

console.log("Organization map contract OK: 6 departments + 7 integrations with bilingual routes, authority controls and graph links.");
