import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationDetailPage } from "../../../../../components/integration-detail-page";
import { getIntegrationBySlug, integrationDetailPath, integrationRecords } from "../../../../../lib/organization-map";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return integrationRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getIntegrationBySlug("en", slug);
  if (!record) return {};
  const canonical = integrationDetailPath(record.key, "en");
  const alternate = integrationDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: record.seoTitle.en, description: record.seoDescription.en },
  };
}

export default async function IntegrationEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getIntegrationBySlug("en", slug);
  if (!record) notFound();
  return <IntegrationDetailPage locale="en" integration={record} />;
}
