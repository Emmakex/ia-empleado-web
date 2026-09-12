import type { Metadata } from "next";
import { IntegrationIndexPage } from "../../../../components/integration-index-page";
import { integrationIndexContent, integrationIndexPath } from "../../../../lib/organization-map";

const content = integrationIndexContent.en;
const canonical = integrationIndexPath("en");
const alternate = integrationIndexPath("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription },
};

export default function IntegrationsEnglishPage() {
  return <IntegrationIndexPage locale="en" />;
}
