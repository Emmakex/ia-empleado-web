import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseDetailPage } from "../../../../../components/use-case-detail-page";
import { getUseCaseBySlug, useCaseDetailPath, useCaseRecords } from "../../../../../lib/sector-use-cases";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return useCaseRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getUseCaseBySlug(slug, "en");
  if (!record) return {};
  const canonical = useCaseDetailPath(record.key, "en");
  const alternate = useCaseDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: record.seoTitle.en, description: record.seoDescription.en },
  };
}

export default async function UseCaseEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getUseCaseBySlug(slug, "en");
  if (!record) notFound();
  return <UseCaseDetailPage locale="en" record={record} />;
}
