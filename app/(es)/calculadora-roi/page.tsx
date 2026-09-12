import type { Metadata } from "next";
import { RoiEstimatorPage } from "../../../components/roi-estimator-page";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../../../lib/roi-estimator";

const content = getRoiEstimatorPageContent("es");
const canonical = roiEstimatorPath("es");
const alternate = roiEstimatorPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
  },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: "IA Empleado",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    title: content.seoTitle,
    description: content.seoDescription,
  },
};

export default function RoiCalculatorSpanishPage() {
  return <RoiEstimatorPage locale="es" />;
}
