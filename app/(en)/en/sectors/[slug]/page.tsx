import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorDetailPage } from "../../../../../components/sector-detail-page";
import { sectorDetailPath } from "../../../../../lib/sector-use-cases";
import { getOptimizedSectorBySlug, optimizedSectorRecords } from "../../../../../lib/sector-search-optimization";
import { buildRouteSocialMetadata } from "../../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return optimizedSectorRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getOptimizedSectorBySlug(slug, "en");
  if (!record) return {};
  const canonical = sectorDetailPath(record.key, "en");
  const alternate = sectorDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    ...buildRouteSocialMetadata({ locale: "en", surface: "sectors", title: record.seoTitle.en, description: record.seoDescription.en, canonical }),
  };
}

export default async function SectorEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getOptimizedSectorBySlug(slug, "en");
  if (!record) notFound();
  return <SectorDetailPage locale="en" sector={record} />;
}
