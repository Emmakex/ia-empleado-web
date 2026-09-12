import type { Metadata } from "next";
import { ComparisonsIndexPage } from "../../../../components/comparisons-index-page";
import { comparisonIndexContent, comparisonIndexPath } from "../../../../lib/comparison-content";

const content = comparisonIndexContent.en;
const canonical = comparisonIndexPath("en");
const alternate = comparisonIndexPath("es");

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

export default function ComparisonsEnglishPage() {
  return <ComparisonsIndexPage locale="en" />;
}
