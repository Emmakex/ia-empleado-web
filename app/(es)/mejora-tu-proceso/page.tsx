import type { Metadata } from "next";
import { ProcessAnalyzerPage } from "../../../components/process-analyzer-page";
import { getProcessAnalyzerPageContent, processAnalyzerPath } from "../../../lib/process-analyzer";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const content = getProcessAnalyzerPageContent("es");
const canonical = processAnalyzerPath("es");
const alternate = processAnalyzerPath("en");
const preview = brandPreviewUrl("es", "process-analyzer");

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

export default function ImproveProcessSpanishPage() {
  return <ProcessAnalyzerPage locale="es" />;
}
