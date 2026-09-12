import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonDetailPage } from "../../../../components/comparison-detail-page";
import {
  comparisonDetailPath,
  comparisonRecords,
  getComparisonBySlug,
} from "../../../../lib/comparison-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return comparisonRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getComparisonBySlug(slug, "es");
  if (!record) return {};
  const canonical = comparisonDetailPath(record.key, "es");
  const alternate = comparisonDetailPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: {
      canonical,
      languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "IA Empleado",
      locale: "es_ES",
      alternateLocale: ["en_US"],
      title: record.seoTitle.es,
      description: record.seoDescription.es,
    },
  };
}

export default async function ComparisonSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getComparisonBySlug(slug, "es");
  if (!record) notFound();
  return <ComparisonDetailPage locale="es" record={record} />;
}
