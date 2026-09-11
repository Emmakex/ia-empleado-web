import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmployeeDetailPage } from "../../../../../components/employee-detail-page";
import { alternateEmployeePath, employeeDetailPath, getDetailedEmployeeRecords, getEmployeeBySlug } from "../../../../../lib/employee-catalog";
import { getDictionary } from "../../../../../lib/i18n";

const dictionary = getDictionary("en");

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getDetailedEmployeeRecords().map((employee) => ({ slug: employee.detail!.en.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const employee = getEmployeeBySlug("en", slug);
  if (!employee) return {};

  const content = employee.content;
  const canonical = employeeDetailPath(employee.key, "en");
  const alternate = alternateEmployeePath(employee.key, "en");

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical,
      languages: {
        "es-ES": alternate,
        en: canonical,
        "x-default": alternate,
      },
    },
    openGraph: {
      type: "website",
      title: content.seoTitle,
      description: content.seoDescription,
      url: canonical,
      locale: "en_US",
      alternateLocale: ["es_ES"],
    },
  };
}

export default async function EnglishEmployeeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const employee = getEmployeeBySlug("en", slug);
  if (!employee) notFound();

  return <EmployeeDetailPage locale="en" dictionary={dictionary} employeeKey={employee.key} content={employee.content} />;
}
