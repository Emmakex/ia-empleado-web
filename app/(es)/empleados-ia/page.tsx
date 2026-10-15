import type { Metadata } from "next";
import { EmployeeIndexPage } from "../../../components/employee-index-page";
import { getDictionary } from "../../../lib/i18n";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const dictionary = getDictionary("es");
const preview = brandPreviewUrl("es", "employees");
const title = "Empleados IA para empresas | Agentes especializados | IA Empleado";
const description = "Explora Empleados IA y agentes especializados para atención al cliente, administración, contabilidad, facturación y ventas, con permisos y supervisión humana.";
const socialDescription = "Agentes IA especializados por función empresarial que trabajan con sistemas, políticas y otros Empleados IA bajo límites explícitos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/empleados-ia",
    languages: {
      "es-ES": "/empleados-ia",
      en: "/en/ai-employees",
      "x-default": "/empleados-ia",
    },
  },
  openGraph: {
    title,
    description: socialDescription,
    url: "/empleados-ia",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [{ url: preview, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: socialDescription, images: [preview] },
};

export default function SpanishEmployeeIndexPage() {
  return <EmployeeIndexPage locale="es" dictionary={dictionary} />;
}
