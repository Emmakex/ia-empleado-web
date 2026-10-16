import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorDetailPage } from "../../../../components/sector-detail-page";
import { sectorDetailPath } from "../../../../lib/sector-use-cases";
import { getOptimizedSectorBySlug, optimizedSectorRecords } from "../../../../lib/sector-search-optimization";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return optimizedSectorRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getOptimizedSectorBySlug(slug, "es");
  if (!record) return {};
  const canonical = sectorDetailPath(record.key, "es");
  const alternate = sectorDetailPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    ...buildRouteSocialMetadata({ locale: "es", surface: "sectors", title: record.seoTitle.es, description: record.seoDescription.es, canonical }),
  };
}

export default async function SectorSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getOptimizedSectorBySlug(slug, "es");
  if (!record) notFound();
  return <SectorDetailPage locale="es" sector={record} />;
}
