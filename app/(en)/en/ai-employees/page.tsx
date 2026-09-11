import type { Metadata } from "next";
import { EmployeeIndexPage } from "../../../../components/employee-index-page";
import { getDictionary } from "../../../../lib/i18n";

const dictionary = getDictionary("en");

export const metadata: Metadata = {
  title: "AI Employees for business | IA Empleado",
  description: "Explore the IA Empleado reference suite: Customer Support, Administrative, Accounting & Billing and Sales SDR, with governed work and human supervision.",
  alternates: {
    canonical: "/en/ai-employees",
    languages: {
      "es-ES": "/empleados-ia",
      en: "/en/ai-employees",
      "x-default": "/empleados-ia",
    },
  },
  openGraph: {
    title: "AI Employees for business | IA Empleado",
    description: "Specialist digital roles that can work with systems, policies and other AI Employees to resolve business processes.",
    url: "/en/ai-employees",
    locale: "en_US",
    alternateLocale: ["es_ES"],
  },
};

export default function EnglishEmployeeIndexPage() {
  return <EmployeeIndexPage locale="en" dictionary={dictionary} />;
}
