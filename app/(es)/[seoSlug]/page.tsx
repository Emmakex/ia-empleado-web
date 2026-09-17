import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GrowthLandingPage } from "../../../components/growth-landing-page";
import { getGrowthLandingBySlug, growthLandingPath, growthLandingRecords } from "../../../lib/growth-content";

type PageProps = { params: Promise<{ seoSlug: string }> };

export function generateStaticParams() {
  return growthLandingRecords.map((record) => ({ seoSlug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoSlug } = await params;
  const record = getGrowthLandingBySlug(seoSlug, "es");
  if (!record) return {};
  const canonical = growthLandingPath(record.key, "es");
  const alternate = growthLandingPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    openGraph: { type: "website", title: record.seoTitle.es, description: record.seoDescription.es, url: canonical, siteName: "IA Empleado", locale: "es_ES" },
    twitter: { card: "summary_large_image", title: record.seoTitle.es, description: record.seoDescription.es },
  };
}

export default async function SpanishGrowthLanding({ params }: PageProps) {
  const { seoSlug } = await params;
  const record = getGrowthLandingBySlug(seoSlug, "es");
  if (!record) notFound();
  return <GrowthLandingPage locale="es" record={record} />;
}
