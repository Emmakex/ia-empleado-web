import type { Metadata } from "next";
import { BlogIndexPage } from "../../../components/blog-index-page";
import { blogIndexPath } from "../../../lib/growth-content";

const canonical = blogIndexPath("es");
const alternate = blogIndexPath("en");

export const metadata: Metadata = {
  title: "Guías sobre agentes IA y automatización de procesos | IA Empleado",
  description: "Guías prácticas sobre agentes IA, Empleados IA, IA para empresas y automatización de procesos con sistemas, control humano e implantación real.",
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
};

export default function SpanishBlogPage() {
  return <BlogIndexPage locale="es" />;
}
