import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmployeeDetailPage } from "../../../../components/employee-detail-page";
import { alternateEmployeePath, employeeDetailPath, getDetailedEmployeeRecords, getEmployeeBySlug } from "../../../../lib/employee-content-engine";
import { getDictionary } from "../../../../lib/i18n";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

const dictionary = getDictionary("es");

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getDetailedEmployeeRecords().map((employee) => ({ slug: employee.detail.es.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const employee = getEmployeeBySlug("es", slug);
  if (!employee) return {};

  const content = employee.content;
  const canonical = employeeDetailPath(employee.key, "es");
  const alternate = alternateEmployeePath(employee.key, "es");

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical,
      languages: {
        "es-ES": canonical,
        en: alternate,
        "x-default": canonical,
      },
    },
    ...buildRouteSocialMetadata({
      locale: "es",
      surface: "employees",
      title: content.seoTitle,
      description: content.seoDescription,
      canonical,
    }),
  };
}

export default async function SpanishEmployeeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const employee = getEmployeeBySlug("es", slug);
  if (!employee) notFound();

  return <EmployeeDetailPage locale="es" dictionary={dictionary} employeeKey={employee.key} content={employee.content} />;
}
