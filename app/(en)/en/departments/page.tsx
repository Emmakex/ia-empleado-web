import type { Metadata } from "next";
import { DepartmentIndexPage } from "../../../../components/department-index-page";
import { departmentIndexContent, departmentIndexPath } from "../../../../lib/organization-map";

const content = departmentIndexContent.en;
const canonical = departmentIndexPath("en");
const alternate = departmentIndexPath("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription },
};

export default function DepartmentsEnglishPage() {
  return <DepartmentIndexPage locale="en" />;
}
