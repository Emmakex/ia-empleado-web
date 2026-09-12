import type { Metadata } from "next";
import { UseCaseIndexPage } from "../../../../components/use-case-index-page";
import { useCaseIndexContent, useCaseIndexPath } from "../../../../lib/sector-use-cases";

const content = useCaseIndexContent.en;
const canonical = useCaseIndexPath("en");
const alternate = useCaseIndexPath("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription },
};

export default function UseCasesEnglishPage() {
  return <UseCaseIndexPage locale="en" />;
}
