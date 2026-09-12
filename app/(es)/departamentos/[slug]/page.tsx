import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DepartmentDetailPage } from "../../../../components/department-detail-page";
import { departmentDetailPath, departmentRecords, getDepartmentBySlug } from "../../../../lib/organization-map";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return departmentRecords.map((record) => ({ slug: record.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getDepartmentBySlug("es", slug);
  if (!record) return {};
  const canonical = departmentDetailPath(record.key, "es");
  const alternate = departmentDetailPath(record.key, "en");
  return {
    title: record.seoTitle.es,
    description: record.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: record.seoTitle.es, description: record.seoDescription.es },
  };
}

export default async function DepartmentSpanishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const record = getDepartmentBySlug("es", slug);
  if (!record) notFound();
  return <DepartmentDetailPage locale="es" department={record} />;
}
