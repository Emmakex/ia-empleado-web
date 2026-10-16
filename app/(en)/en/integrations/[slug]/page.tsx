import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationDetailPage } from "../../../../../components/integration-detail-page";
import { integrationDetailPath } from "../../../../../lib/organization-map";
import { getOptimizedIntegrationBySlug, optimizedIntegrationRecords } from "../../../../../lib/integration-seo-intents";
import { buildRouteSocialMetadata } from "../../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return optimizedIntegrationRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getOptimizedIntegrationBySlug("en", slug);
  if (!record) return {};
  const canonical = integrationDetailPath(record.key, "en");
  const alternate = integrationDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    ...buildRouteSocialMetadata({ locale: "en", surface: "integrations", title: record.seoTitle.en, description: record.seoDescription.en, canonical }),
  };
}

export default async function IntegrationEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getOptimizedIntegrationBySlug("en", slug);
  if (!record) notFound();
  return <IntegrationDetailPage locale="en" integration={record} />;
}
