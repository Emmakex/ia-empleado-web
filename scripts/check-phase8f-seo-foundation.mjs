import fs from "node:fs";

const read = (filePath) => {
  if (!fs.existsSync(filePath)) throw new Error(`Missing Phase 8F foundation file: ${filePath}`);
  const value = fs.readFileSync(filePath, "utf8");
  if (!value.trim()) throw new Error(`Empty Phase 8F foundation file: ${filePath}`);
  return value;
};

const esLayout = read("app/(es)/layout.tsx");
const enLayout = read("app/(en)/en/layout.tsx");
const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");
const nextConfig = read("next.config.ts");
const socialPreviews = read("lib/brand-social-previews.tsx");
const socialMetadata = read("lib/seo-social-metadata.ts");
const previewRoute = read("app/brand-preview/[locale]/[surface]/route.tsx");
const campaignRoute = read("app/brand-campaign/[locale]/[format]/[surface]/route.tsx");
const production = read(".github/workflows/production-verify.yml");
const phase8eClosure = read("docs/PHASE_8E_CLOSURE.md");
const phase8f = read("docs/PHASE_8F_SEO_METADATA_SHARING.md");
const runtimeSeoMatrix = read("tests/phase8f-seo-runtime.spec.ts");

const requirePhrases = (label, source, phrases) => {
  for (const phrase of phrases) {
    if (!source.includes(phrase)) throw new Error(`${label} missing required phrase: ${phrase}`);
  }
};

requirePhrases("Spanish root metadata", esLayout, [
  'metadataBase: new URL("https://iaempleado.com")',
  'alternates:',
  'canonical: "/"',
  '"es-ES": "/"',
  'en: "/en"',
  '"x-default": "/"',
  'openGraph:',
  'twitter:',
  'robots: { index: true, follow: true }',
  'brandPreviewUrl("es", "home")',
  '"ia-web-release": "web-phase-8f-runtime-seo"',
]);

requirePhrases("English root metadata", enLayout, [
  'metadataBase: new URL("https://iaempleado.com")',
  'alternates:',
  'canonical: "/en"',
  '"es-ES": "/"',
  'en: "/en"',
  '"x-default": "/"',
  'openGraph:',
  'twitter:',
  'robots: { index: true, follow: true }',
  'brandPreviewUrl("en", "home")',
  '"ia-web-release": "web-phase-8f-runtime-seo"',
]);

requirePhrases("Sitemap", sitemap, [
  'MetadataRoute.Sitemap',
  'https://iaempleado.com/',
  'alternates: { languages:',
  'getDetailedEmployeeRecords()',
  'getTeamRecords()',
  'comparisonRecords',
  'sectorRecords',
  'useCaseRecords',
  'departmentRecords',
  'integrationRecords',
  'teamBuilderPath',
  'processAnalyzerPath',
  'roiEstimatorPath',
  'requestDemoPath',
]);

requirePhrases("Robots", robots, [
  'userAgent: "*"',
  'allow: "/"',
  'sitemap: "https://iaempleado.com/sitemap.xml"',
  'host: "https://iaempleado.com"',
]);

requirePhrases("Internal endpoint noindex headers", nextConfig, [
  'key: "X-Robots-Tag"',
  'value: "noindex, nofollow"',
  'source: "/brand-preview/:path*"',
  'source: "/brand-campaign/:path*"',
  'source: "/api/:path*"',
]);

requirePhrases("Social preview system", socialPreviews, [
  'brandPreviewUrl',
  '1200',
  '630',
]);

requirePhrases("Route social metadata helper", socialMetadata, [
  'buildRouteSocialMetadata',
  'brandPreviewUrl(locale, surface)',
  'card: "summary_large_image"',
  'width: 1200',
  'height: 630',
]);

for (const [label, routeSource] of [
  ["brand preview route", previewRoute],
  ["brand campaign route", campaignRoute],
]) {
  if (!routeSource.includes("export async function GET") && !routeSource.includes("export function GET")) {
    throw new Error(`${label} must remain a route handler rather than a customer-facing page`);
  }
}

requirePhrases("Production Phase 8F gate", production, [
  'EXPECTED_RELEASE: web-phase-8f-runtime-seo',
  'tests/phase8f-seo-runtime.spec.ts',
  'Wait for Web Phase 8F runtime SEO gate on Hostinger',
]);

requirePhrases("Phase 8E closure evidence", phase8eClosure, [
  "COMPLETE",
  "Production Verification #46",
  "163/163",
  "0.81 / 0.96 / 0.96",
  "Phase 8F — SEO, metadata and sharing — is now ACTIVE",
]);

requirePhrases("Phase 8F activation", phase8f, [
  "ACTIVE",
  "Titles and descriptions",
  "Canonical URLs and language alternates",
  "Sitemap",
  "Robots and index policy",
  "Open Graph and Twitter sharing",
  "Structured data",
  "Navigation, breadcrumbs and errors",
  "browser/runtime SEO matrix",
]);

requirePhrases("Phase 8F runtime SEO matrix", runtimeSeoMatrix, [
  "PHASE8F_SEO_ROUTE",
  "PHASE8F_INTERNAL_INDEX_POLICY",
  'link[rel="canonical"]',
  'hreflang="es-ES"',
  'hreflang="en"',
  'hreflang="x-default"',
  'meta[property="og:image"]',
  'meta[name="twitter:image"]',
  "/sitemap.xml",
  "/robots.txt",
  "x-robots-tag",
  "not-found responses are 404 and explicitly non-indexable",
]);

const pageRouteLeaks = [
  "app/brand-preview/[locale]/[surface]/page.tsx",
  "app/brand-campaign/[locale]/[format]/[surface]/page.tsx",
].filter((filePath) => fs.existsSync(filePath));
if (pageRouteLeaks.length) {
  throw new Error(`Internal rendering endpoints became customer-facing pages: ${pageRouteLeaks.join(", ")}`);
}

console.log("Phase 8F SEO foundation OK: bilingual metadata, sitemap/robots generation, governed social previews, explicit internal noindex policy, the runtime SEO matrix and its production release gate are protected.");
