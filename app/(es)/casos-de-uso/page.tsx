import type { Metadata } from "next";
import { UseCaseIndexPage } from "../../../components/use-case-index-page";
import { useCaseIndexContent, useCaseIndexPath } from "../../../lib/sector-use-cases";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const content = useCaseIndexContent.es;
const canonical = useCaseIndexPath("es");
const alternate = useCaseIndexPath("en");
const preview = brandPreviewUrl("es", "use-cases");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: content.seoTitle, description: content.seoDescription, images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }] },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function UseCasesSpanishPage() {
  return <UseCaseIndexPage locale="es" />;
}
