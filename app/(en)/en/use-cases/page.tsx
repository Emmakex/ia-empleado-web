import type { Metadata } from "next";
import { UseCaseIndexPage } from "../../../../components/use-case-index-page";
import { useCaseIndexContent, useCaseIndexPath } from "../../../../lib/sector-use-cases";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = useCaseIndexContent.en;
const canonical = useCaseIndexPath("en");
const alternate = useCaseIndexPath("es");
const preview = brandPreviewUrl("en", "use-cases");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription, images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }] },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function UseCasesEnglishPage() {
  return <UseCaseIndexPage locale="en" />;
}
