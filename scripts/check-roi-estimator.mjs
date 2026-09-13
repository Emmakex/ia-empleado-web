import fs from "node:fs";

const mustContain = (path, needles) => {
  const source = fs.readFileSync(path, "utf8");
  for (const needle of needles) {
    if (!source.includes(needle)) {
      console.error(`[roi-estimator] Missing ${JSON.stringify(needle)} in ${path}`);
      process.exit(1);
    }
  }
};

mustContain("lib/roi-estimator.ts", [
  '"/calculadora-roi"',
  '"/en/roi-calculator"',
  'key: "conservative"',
  'key: "base"',
  'key: "high"',
  'annualEstimatedCost > 0',
  'base - 10',
  'base + 10',
  'Capacidad, no ahorro garantizado',
  'Capacity, not guaranteed savings',
  'localmente en el navegador',
  'locally in the browser',
]);

mustContain("components/roi-estimator.tsx", [
  'type="range"',
  'content.roiUnavailable',
  'aria-live="polite"',
  'calculateRoi(inputs)',
  'const [isHydrated, setIsHydrated] = useState(false)',
  'data-roi-hydrated={isHydrated ? "true" : "false"}',
  'data-roi-release="phase8a-roi-hydration-sync"',
  'disabled={!isHydrated}',
]);

mustContain("components/roi-estimator-page.tsx", [
  'FAQPage',
  'ItemList',
  'RoiEstimator',
  'processAnalyzerPath(locale)',
  'teamBuilderPath(locale)',
]);

mustContain("app/sitemap.ts", [
  'roiEstimatorPath("es")',
  'roiEstimatorPath("en")',
]);

mustContain("components/site-footer.tsx", [
  'roiEstimatorPath(locale)',
  'Calculadora ROI',
  'ROI calculator',
]);

mustContain("app/(es)/layout.tsx", ['../roi-estimator.css']);
mustContain("app/(en)/en/layout.tsx", ['../../roi-estimator.css']);

console.log("[roi-estimator] contract OK");
