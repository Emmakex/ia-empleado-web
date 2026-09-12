import type { Metadata } from "next";
import { ProcessAnalyzerPage } from "../../../../components/process-analyzer-page";
import { getProcessAnalyzerPageContent, processAnalyzerPath } from "../../../../lib/process-analyzer";

const content = getProcessAnalyzerPageContent("en");
const canonical = processAnalyzerPath("en");
const alternate = processAnalyzerPath("es");

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
  },
};

export default function ImproveProcessEnglishPage() {
  return <ProcessAnalyzerPage locale="en" />;
}
