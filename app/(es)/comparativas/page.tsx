import type { Metadata } from "next";
import { ComparisonsIndexPage } from "../../../components/comparisons-index-page";
import { comparisonIndexContent, comparisonIndexPath } from "../../../lib/comparison-content";

const content = comparisonIndexContent.es;
const canonical = comparisonIndexPath("es");
const alternate = comparisonIndexPath("en");

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

export default function ComparisonsSpanishPage() {
  return <ComparisonsIndexPage locale="es" />;
}
