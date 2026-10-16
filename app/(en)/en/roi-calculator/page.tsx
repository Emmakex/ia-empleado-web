import type { Metadata } from "next";
import { RoiEstimatorPage } from "../../../../components/roi-estimator-page";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../../../../lib/roi-estimator";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../../lib/conversion-seo-policy";

const content = getRoiEstimatorPageContent("en");
const policy = getPhase5SeoPolicy("roi-calculator");
const canonical = roiEstimatorPath("en");
const alternate = roiEstimatorPath("es");
const preview = brandPreviewUrl("en", "roi");
const seoTitle = policy.seoTitle?.en ?? content.seoTitle;
const seoDescription = policy.seoDescription?.en ?? content.seoDescription;

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  robots: { index: policy.index, follow: policy.follow },
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
    title: seoTitle,
    description: seoDescription,
    images: [{ url: preview, width: 1200, height: 630, alt: seoTitle }],
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [preview] },
};

export default function RoiCalculatorEnglishPage() {
  return <RoiEstimatorPage locale="en" />;
}
