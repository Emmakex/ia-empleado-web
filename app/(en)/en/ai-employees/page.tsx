import type { Metadata } from "next";
import { EmployeeIndexPage } from "../../../../components/employee-index-page";
import { getDictionary } from "../../../../lib/i18n";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const dictionary = getDictionary("en");
const preview = brandPreviewUrl("en", "employees");
const title = "AI Employees for business | IA Empleado";
const description = "Explore the IA Empleado reference suite: Customer Support, Administrative, Accounting & Billing and Sales SDR, with governed work and human supervision.";
const socialDescription = "Specialist digital roles that can work with systems, policies and other AI Employees to resolve business processes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/ai-employees",
    languages: {
      "es-ES": "/empleados-ia",
      en: "/en/ai-employees",
      "x-default": "/empleados-ia",
    },
  },
  openGraph: {
    title,
    description: socialDescription,
    url: "/en/ai-employees",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    images: [{ url: preview, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: socialDescription, images: [preview] },
};

export default function EnglishEmployeeIndexPage() {
  return <EmployeeIndexPage locale="en" dictionary={dictionary} />;
}
