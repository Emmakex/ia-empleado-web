import type { Metadata } from "next";
import { UseCaseIndexPage } from "../../../components/use-case-index-page";
import { useCaseIndexContent, useCaseIndexPath } from "../../../lib/sector-use-cases";

const content = useCaseIndexContent.es;
const canonical = useCaseIndexPath("es");
const alternate = useCaseIndexPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: content.seoTitle, description: content.seoDescription },
};

export default function UseCasesSpanishPage() {
  return <UseCaseIndexPage locale="es" />;
}
