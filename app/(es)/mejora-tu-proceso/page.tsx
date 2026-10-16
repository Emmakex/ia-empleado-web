import type { Metadata } from "next";
import { ProcessAnalyzerPage } from "../../../components/process-analyzer-page";
import { getProcessAnalyzerPageContent, processAnalyzerPath } from "../../../lib/process-analyzer";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../lib/conversion-seo-policy";

const content = getProcessAnalyzerPageContent("es");
const policy = getPhase5SeoPolicy("process-analyzer");
const canonical = processAnalyzerPath("es");
const alternate = processAnalyzerPath("en");
const preview = brandPreviewUrl("es", "process-analyzer");
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

export default function ImproveProcessSpanishPage() {
  return <ProcessAnalyzerPage locale="es" />;
}
