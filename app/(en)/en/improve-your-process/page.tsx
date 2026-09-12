import type { Metadata } from "next";
import { ProcessAnalyzerPage } from "../../../../components/process-analyzer-page";
import { getProcessAnalyzerPageContent, processAnalyzerPath } from "../../../../lib/process-analyzer";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = getProcessAnalyzerPageContent("en");
const canonical = processAnalyzerPath("en");
const alternate = processAnalyzerPath("es");
const preview = brandPreviewUrl("en", "process-analyzer");

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

export default function ImproveProcessEnglishPage() {
  return <ProcessAnalyzerPage locale="en" />;
}
