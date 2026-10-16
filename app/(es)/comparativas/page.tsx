import type { Metadata } from "next";
import { ComparisonsIndexPage } from "../../../components/comparisons-index-page";
import { comparisonIndexPath } from "../../../lib/comparison-content";
import { auditedComparisonIndexContent } from "../../../lib/comparison-search-optimization";
import { buildRouteSocialMetadata } from "../../../lib/seo-social-metadata";

const content = auditedComparisonIndexContent.es;
const canonical = comparisonIndexPath("es");
const alternate = comparisonIndexPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
  },
  ...buildRouteSocialMetadata({
    locale: "es",
    surface: "home",
    title: content.seoTitle,
    description: content.seoDescription,
    canonical,
  }),
};

export default function ComparisonsSpanishPage() {
  return <ComparisonsIndexPage locale="es" />;
}
