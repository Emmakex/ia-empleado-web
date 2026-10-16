import type { Metadata } from "next";
import { RoiEstimatorPage } from "../../../components/roi-estimator-page";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../../../lib/roi-estimator";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../lib/conversion-seo-policy";

const content = getRoiEstimatorPageContent("es");
const policy = getPhase5SeoPolicy("roi-calculator");
const canonical = roiEstimatorPath("es");
const alternate = roiEstimatorPath("en");
const preview = brandPreviewUrl("es", "roi");
const seoTitle = policy.seoTitle?.es ?? content.seoTitle;
const seoDescription = policy.seoDescription?.es ?? content.seoDescription;

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  robots: { index: policy.index, follow: policy.follow },
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
    title: seoTitle,
    description: seoDescription,
    images: [{ url: preview, width: 1200, height: 630, alt: seoTitle }],
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [preview] },
};

export default function RoiCalculatorSpanishPage() {
  return <RoiEstimatorPage locale="es" />;
}
