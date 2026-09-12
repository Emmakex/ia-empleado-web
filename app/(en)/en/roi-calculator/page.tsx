import type { Metadata } from "next";
import { RoiEstimatorPage } from "../../../../components/roi-estimator-page";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../../../../lib/roi-estimator";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = getRoiEstimatorPageContent("en");
const canonical = roiEstimatorPath("en");
const alternate = roiEstimatorPath("es");
const preview = brandPreviewUrl("en", "roi");

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
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function RoiCalculatorEnglishPage() {
  return <RoiEstimatorPage locale="en" />;
}
