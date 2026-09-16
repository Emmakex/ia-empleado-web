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
const structuredNavigation = read("tests/phase8f-structured-navigation.spec.ts");

const historicalMarker = "web-phase-8f-structured-navigation";

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
  'WEB_RELEASE_FINGERPRINT',
  'other: { "ia-web-release": WEB_RELEASE_FINGERPRINT }',
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
  'WEB_RELEASE_FINGERPRINT',
  'other: { "ia-web-release": WEB_RELEASE_FINGERPRINT }',
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
  'EXPECTED_RELEASE: ${{ steps.release.outputs.fingerprint }}',
  'tests/phase8f-seo-runtime.spec.ts',
  'tests/phase8f-structured-navigation.spec.ts',
  'Wait for exact release fingerprint on Hostinger',
]);

requirePhrases("Phase 8E closure evidence", phase8eClosure, [
  "COMPLETE",
  "Production Verification #46",
  "163/163",
  "0.81 / 0.96 / 0.96",
  "Phase 8F — SEO, metadata and sharing — is now ACTIVE",
]);

requirePhrases("Phase 8F closure evidence", phase8f, [
  "COMPLETE",
  "Titles and descriptions",
  "Canonical URLs and language alternates",
  "Sitemap",
  "Robots and index policy",
  "Open Graph and Twitter sharing",
  "Structured data",
  "Navigation, breadcrumbs and errors",
  "browser/runtime SEO matrix",
  "Production Verification #48",
  "34954576538",
  "196/196 green",
  "web-phase-8f-runtime-seo",
  "0.80 / 0.96 / 0.96",
  "Production Verification #49",
  "34960212929",
  historicalMarker,
  "228 cases",
  "100 unique same-origin public links",
  "103/103 static pages",
  "10393543463",
  "Phase 8F is complete",
  "Phase 8G",
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

requirePhrases("Phase 8F structured/navigation matrix", structuredNavigation, [
  "PHASE8F_STRUCTURED_DATA",
  "PHASE8F_INTERNAL_LINK_AUDIT",
  "PHASE8F_BREADCRUMB_AUDIT",
  "forbiddenClaimTypes",
  "FAQPage",
  "Organization",
  "WebPage",
  "representativeDetails",
  "internalPrefixes",
  "public navigation exposes no broken or internal implementation links",
  "breadcrumbs, when rendered, point only to resolvable public routes",
]);

const pageRouteLeaks = [
  "app/brand-preview/[locale]/[surface]/page.tsx",
  "app/brand-campaign/[locale]/[format]/[surface]/page.tsx",
].filter((filePath) => fs.existsSync(filePath));
if (pageRouteLeaks.length) {
  throw new Error(`Internal rendering endpoints became customer-facing pages: ${pageRouteLeaks.join(", ")}`);
}

console.log(`Phase 8F SEO closure OK: historical marker ${historicalMarker} remains preserved as closure evidence while the active dynamic release fingerprint protects bilingual metadata, sitemap/robots, governed social previews, explicit internal noindex policy, runtime SEO and structured-data/navigation production coverage.`);
