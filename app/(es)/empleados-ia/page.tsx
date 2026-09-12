import type { Metadata } from "next";
import { EmployeeIndexPage } from "../../../components/employee-index-page";
import { getDictionary } from "../../../lib/i18n";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const dictionary = getDictionary("es");
const preview = brandPreviewUrl("es", "employees");
const title = "Empleados IA para empresas | IA Empleado";
const description = "Explora la suite de Empleados IA de referencia: Atención al Cliente, Administrativo, Contabilidad y Facturación y Comercial SDR, con trabajo gobernado y supervisión humana.";
const socialDescription = "Roles digitales especializados que pueden trabajar con sistemas, políticas y otros Empleados IA para resolver procesos empresariales.";

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
