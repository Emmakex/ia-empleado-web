import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseDetailPage } from "../../../../components/use-case-detail-page";
import { getUseCaseBySlug, useCaseDetailPath, useCaseRecords } from "../../../../lib/sector-use-cases";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return useCaseRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getUseCaseBySlug(slug, "es");
  if (!record) return {};
  const canonical = useCaseDetailPath(record.key, "es");
  const alternate = useCaseDetailPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    ...buildRouteSocialMetadata({ locale: "es", surface: "use-cases", title: record.seoTitle.es, description: record.seoDescription.es, canonical }),
  };
}

export default async function UseCaseSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getUseCaseBySlug(slug, "es");
  if (!record) notFound();
  return <UseCaseDetailPage locale="es" record={record} />;
}
