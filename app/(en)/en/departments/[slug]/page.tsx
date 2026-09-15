import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DepartmentDetailPage } from "../../../../../components/department-detail-page";
import { departmentDetailPath, departmentRecords, getDepartmentBySlug } from "../../../../../lib/organization-map";
import { buildRouteSocialMetadata } from "../../../../../lib/seo-social-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return departmentRecords.map((record) => ({ slug: record.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getDepartmentBySlug("en", slug);
  if (!record) return {};
  const canonical = departmentDetailPath(record.key, "en");
  const alternate = departmentDetailPath(record.key, "es");
  return {
    title: record.seoTitle.en,
    description: record.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    ...buildRouteSocialMetadata({ locale: "en", surface: "departments", title: record.seoTitle.en, description: record.seoDescription.en, canonical }),
  };
}

export default async function DepartmentEnglishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getDepartmentBySlug("en", slug);
  if (!record) notFound();
  return <DepartmentDetailPage locale="en" department={record} />;
}
