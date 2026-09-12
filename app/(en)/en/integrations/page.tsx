import type { Metadata } from "next";
import { IntegrationIndexPage } from "../../../../components/integration-index-page";
import { integrationIndexContent, integrationIndexPath } from "../../../../lib/organization-map";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = integrationIndexContent.en;
const canonical = integrationIndexPath("en");
const alternate = integrationIndexPath("es");
const preview = brandPreviewUrl("en", "integrations");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription, images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }] },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function IntegrationsEnglishPage() {
  return <IntegrationIndexPage locale="en" />;
}
