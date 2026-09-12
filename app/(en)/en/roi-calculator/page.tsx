import type { Metadata } from "next";
import { RoiEstimatorPage } from "../../../../components/roi-estimator-page";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../../../../lib/roi-estimator";

const content = getRoiEstimatorPageContent("en");
const canonical = roiEstimatorPath("en");
const alternate = roiEstimatorPath("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: "IA Empleado",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    title: content.seoTitle,
    description: content.seoDescription,
  },
};

export default function RoiCalculatorEnglishPage() {
  return <RoiEstimatorPage locale="en" />;
}
