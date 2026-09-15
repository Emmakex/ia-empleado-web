import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationDetailPage } from "../../../../components/integration-detail-page";
import { getIntegrationBySlug, integrationDetailPath, integrationRecords } from "../../../../lib/organization-map";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return integrationRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getIntegrationBySlug("es", slug);
  if (!record) return {};
  const canonical = integrationDetailPath(record.key, "es");
  const alternate = integrationDetailPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    ...buildRouteSocialMetadata({ locale: "es", surface: "integrations", title: record.seoTitle.es, description: record.seoDescription.es, canonical }),
  };
}

export default async function IntegrationSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getIntegrationBySlug("es", slug);
  if (!record) notFound();
  return <IntegrationDetailPage locale="es" integration={record} />;
}
