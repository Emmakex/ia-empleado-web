import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonDetailPage } from "../../../../components/comparison-detail-page";
import { comparisonDetailPath } from "../../../../lib/comparison-content";
import {
  auditedComparisonRecords,
  getAuditedComparisonBySlug,
} from "../../../../lib/comparison-search-optimization";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return auditedComparisonRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getAuditedComparisonBySlug(slug, "es");
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
    ...buildRouteSocialMetadata({
      locale: "es",
      surface: "home",
      title: record.seoTitle.es,
      description: record.seoDescription.es,
      canonical,
    }),
  };
}

export default async function ComparisonSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getAuditedComparisonBySlug(slug, "es");
  if (!record) notFound();
  return <ComparisonDetailPage locale="es" record={record} />;
}
