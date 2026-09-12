import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonDetailPage } from "../../../../../components/comparison-detail-page";
import {
  comparisonDetailPath,
  comparisonRecords,
  getComparisonBySlug,
} from "../../../../../lib/comparison-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return comparisonRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getComparisonBySlug(slug, "en");
  if (!record) return {};
  const canonical = comparisonDetailPath(record.key, "en");
  const alternate = comparisonDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: {
      canonical,
      languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "IA Empleado",
      locale: "en_US",
      alternateLocale: ["es_ES"],
      title: record.seoTitle.en,
      description: record.seoDescription.en,
    },
  };
}

export default async function ComparisonEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getComparisonBySlug(slug, "en");
  if (!record) notFound();
  return <ComparisonDetailPage locale="en" record={record} />;
}
