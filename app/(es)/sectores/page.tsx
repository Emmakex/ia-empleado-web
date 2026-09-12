import type { Metadata } from "next";
import { SectorIndexPage } from "../../../components/sector-index-page";
import { sectorIndexContent, sectorIndexPath } from "../../../lib/sector-use-cases";

const content = sectorIndexContent.es;
const canonical = sectorIndexPath("es");
const alternate = sectorIndexPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: content.seoTitle, description: content.seoDescription },
};

export default function SectorsSpanishPage() {
  return <SectorIndexPage locale="es" />;
}
