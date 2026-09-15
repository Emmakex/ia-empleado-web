import type { Metadata } from "next";
import { ComparisonsIndexPage } from "../../../components/comparisons-index-page";
import { comparisonIndexContent, comparisonIndexPath } from "../../../lib/comparison-content";
import { buildRouteSocialMetadata } from "../../../lib/seo-social-metadata";

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
