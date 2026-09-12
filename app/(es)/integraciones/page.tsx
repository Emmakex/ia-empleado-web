import type { Metadata } from "next";
import { IntegrationIndexPage } from "../../../components/integration-index-page";
import { integrationIndexContent, integrationIndexPath } from "../../../lib/organization-map";

const content = integrationIndexContent.es;
const canonical = integrationIndexPath("es");
const alternate = integrationIndexPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: content.seoTitle, description: content.seoDescription },
};

export default function IntegrationsSpanishPage() {
  return <IntegrationIndexPage locale="es" />;
}
