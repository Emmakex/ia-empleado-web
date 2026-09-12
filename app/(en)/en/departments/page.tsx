import type { Metadata } from "next";
import { DepartmentIndexPage } from "../../../../components/department-index-page";
import { departmentIndexContent, departmentIndexPath } from "../../../../lib/organization-map";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = departmentIndexContent.en;
const canonical = departmentIndexPath("en");
const alternate = departmentIndexPath("es");
const preview = brandPreviewUrl("en", "departments");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
  openGraph: { type: "website", url: canonical, siteName: "IA Empleado", locale: "en_US", alternateLocale: ["es_ES"], title: content.seoTitle, description: content.seoDescription, images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }] },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function DepartmentsEnglishPage() {
  return <DepartmentIndexPage locale="en" />;
}
