import type { Metadata } from "next";
import { RoiEstimatorPage } from "../../../components/roi-estimator-page";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../../../lib/roi-estimator";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const content = getRoiEstimatorPageContent("es");
const canonical = roiEstimatorPath("es");
const alternate = roiEstimatorPath("en");
const preview = brandPreviewUrl("es", "roi");

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
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function RoiCalculatorSpanishPage() {
  return <RoiEstimatorPage locale="es" />;
}
