import type { Metadata } from "next";
import { EmployeeIndexPage } from "../../../../components/employee-index-page";
import { getDictionary } from "../../../../lib/i18n";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const dictionary = getDictionary("en");
const preview = brandPreviewUrl("en", "employees");
const title = "AI Employees for business | Specialized AI agents | IA Empleado";
const description = "Explore AI Employees and specialized agents for customer support, administration, accounting, billing and sales, with scoped permissions and human oversight.";
const socialDescription = "AI agents specialized by business function that work with systems, policies and other AI Employees under explicit boundaries.";

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
