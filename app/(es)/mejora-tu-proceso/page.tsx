import type { Metadata } from "next";
import { ProcessAnalyzerPage } from "../../../components/process-analyzer-page";
import { getProcessAnalyzerPageContent, processAnalyzerPath } from "../../../lib/process-analyzer";

const content = getProcessAnalyzerPageContent("es");
const canonical = processAnalyzerPath("es");
const alternate = processAnalyzerPath("en");

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

export default function ImproveProcessSpanishPage() {
  return <ProcessAnalyzerPage locale="es" />;
}
