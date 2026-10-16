import type { Metadata } from "next";
import { ProcessAnalyzerPage } from "../../../../components/process-analyzer-page";
import { getProcessAnalyzerPageContent, processAnalyzerPath } from "../../../../lib/process-analyzer";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../../lib/conversion-seo-policy";

const content = getProcessAnalyzerPageContent("en");
const policy = getPhase5SeoPolicy("process-analyzer");
const canonical = processAnalyzerPath("en");
const alternate = processAnalyzerPath("es");
const preview = brandPreviewUrl("en", "process-analyzer");
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

export default function ImproveProcessEnglishPage() {
  return <ProcessAnalyzerPage locale="en" />;
}
