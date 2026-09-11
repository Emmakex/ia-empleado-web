import type { Metadata } from "next";
import { EmployeeIndexPage } from "../../../components/employee-index-page";
import { getDictionary } from "../../../lib/i18n";

const dictionary = getDictionary("es");

export const metadata: Metadata = {
  title: "Empleados IA para empresas | IA Empleado",
  description: "Explora la suite de Empleados IA de referencia: Atención al Cliente, Administrativo, Contabilidad y Facturación y Comercial SDR, con trabajo gobernado y supervisión humana.",
  alternates: {
    canonical: "/empleados-ia",
    languages: {
      "es-ES": "/empleados-ia",
      en: "/en/ai-employees",
      "x-default": "/empleados-ia",
    },
  },
  openGraph: {
    title: "Empleados IA para empresas | IA Empleado",
    description: "Roles digitales especializados que pueden trabajar con sistemas, políticas y otros Empleados IA para resolver procesos empresariales.",
    url: "/empleados-ia",
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
};

export default function SpanishEmployeeIndexPage() {
  return <EmployeeIndexPage locale="es" dictionary={dictionary} />;
}
