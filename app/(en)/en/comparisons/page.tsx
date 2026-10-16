import type { Metadata } from "next";
import { ComparisonsIndexPage } from "../../../../components/comparisons-index-page";
import { comparisonIndexPath } from "../../../../lib/comparison-content";
import { auditedComparisonIndexContent } from "../../../../lib/comparison-search-optimization";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

const content = auditedComparisonIndexContent.en;
const canonical = comparisonIndexPath("en");
const alternate = comparisonIndexPath("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  ...buildRouteSocialMetadata({
    locale: "en",
    surface: "home",
    title: content.seoTitle,
    description: content.seoDescription,
    canonical,
  }),
};

export default function ComparisonsEnglishPage() {
  return <ComparisonsIndexPage locale="en" />;
}
