import type { Metadata } from "next";
import { DepartmentIndexPage } from "../../../components/department-index-page";
import { departmentIndexContent, departmentIndexPath } from "../../../lib/organization-map";

const content = departmentIndexContent.es;
const canonical = departmentIndexPath("es");
const alternate = departmentIndexPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: content.seoTitle, description: content.seoDescription },
};

export default function DepartmentsSpanishPage() {
  return <DepartmentIndexPage locale="es" />;
}
