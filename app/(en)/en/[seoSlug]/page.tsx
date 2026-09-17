import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GrowthLandingPage } from "../../../../components/growth-landing-page";
import { getGrowthLandingBySlug, growthLandingPath, growthLandingRecords } from "../../../../lib/growth-content";

type PageProps = { params: Promise<{ seoSlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return growthLandingRecords.map((record) => ({ seoSlug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoSlug } = await params;
  const record = getGrowthLandingBySlug(seoSlug, "en");
  if (!record) return {};
  const canonical = growthLandingPath(record.key, "en");
  const alternate = growthLandingPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    openGraph: { type: "website", title: record.seoTitle.en, description: record.seoDescription.en, url: canonical, siteName: "IA Empleado", locale: "en_US" },
    twitter: { card: "summary_large_image", title: record.seoTitle.en, description: record.seoDescription.en },
  };
}

export default async function EnglishGrowthLanding({ params }: PageProps) {
  const { seoSlug } = await params;
  const record = getGrowthLandingBySlug(seoSlug, "en");
  if (!record) notFound();
  return <GrowthLandingPage locale="en" record={record} />;
}
