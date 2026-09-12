import type { Metadata } from "next";
import { SectorIndexPage } from "../../../../components/sector-index-page";
import { sectorIndexContent, sectorIndexPath } from "../../../../lib/sector-use-cases";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = sectorIndexContent.en;
const canonical = sectorIndexPath("en");
const alternate = sectorIndexPath("es");
const preview = brandPreviewUrl("en", "sectors");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription, images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }] },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function SectorsEnglishPage() {
  return <SectorIndexPage locale="en" />;
}
