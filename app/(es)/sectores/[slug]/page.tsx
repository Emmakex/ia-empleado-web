import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorDetailPage } from "../../../../components/sector-detail-page";
import { getSectorBySlug, sectorDetailPath, sectorRecords } from "../../../../lib/sector-use-cases";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sectorRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getSectorBySlug(slug, "es");
  if (!record) return {};
  const canonical = sectorDetailPath(record.key, "es");
  const alternate = sectorDetailPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: record.seoTitle.es, description: record.seoDescription.es },
  };
}

export default async function SectorSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getSectorBySlug(slug, "es");
  if (!record) notFound();
  return <SectorDetailPage locale="es" sector={record} />;
}
