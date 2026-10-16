import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseDetailPage } from "../../../../../components/use-case-detail-page";
import { useCaseDetailPath } from "../../../../../lib/sector-use-cases";
import { getOptimizedUseCaseBySlug, optimizedUseCaseRecords } from "../../../../../lib/use-case-search-optimization";
import { buildRouteSocialMetadata } from "../../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return optimizedUseCaseRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getOptimizedUseCaseBySlug(slug, "en");
  if (!record) return {};
  const canonical = useCaseDetailPath(record.key, "en");
  const alternate = useCaseDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    ...buildRouteSocialMetadata({ locale: "en", surface: "use-cases", title: record.seoTitle.en, description: record.seoDescription.en, canonical }),
  };
}

export default async function UseCaseEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getOptimizedUseCaseBySlug(slug, "en");
  if (!record) notFound();
  return <UseCaseDetailPage locale="en" record={record} />;
}
