import type { Metadata } from "next";
import { BlogIndexPage } from "../../../components/blog-index-page";
import { blogIndexPath } from "../../../lib/growth-content";

const canonical = blogIndexPath("es");
const alternate = blogIndexPath("en");

export const metadata: Metadata = {
  title: "Blog sobre Empleados IA, automatización y empresa | IA Empleado",
  description: "Guías, novedades y recursos prácticos para entender, evaluar e implantar Empleados IA en procesos empresariales.",
  alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
};

export default function SpanishBlogPage() {
  return <BlogIndexPage locale="es" />;
}
