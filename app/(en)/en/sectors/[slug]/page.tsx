import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorDetailPage } from "../../../../../components/sector-detail-page";
import { getSectorBySlug, sectorDetailPath, sectorRecords } from "../../../../../lib/sector-use-cases";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sectorRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getSectorBySlug(slug, "en");
  if (!record) return {};
  const canonical = sectorDetailPath(record.key, "en");
  const alternate = sectorDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: record.seoTitle.en, description: record.seoDescription.en },
  };
}

export default async function SectorEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getSectorBySlug(slug, "en");
  if (!record) notFound();
  return <SectorDetailPage locale="en" sector={record} />;
}
