import type { Metadata } from "next";
import { BlogIndexPage } from "../../../../components/blog-index-page";
import { blogIndexPath } from "../../../../lib/growth-content";

const canonical = blogIndexPath("en");
const alternate = blogIndexPath("es");

export const metadata: Metadata = {
  title: "AI Employees, automation and business blog | IA Empleado",
  description: "Guides, updates and practical resources to understand, evaluate and implement AI Employees in business processes.",
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
};

export default function EnglishBlogPage() {
  return <BlogIndexPage locale="en" />;
}
