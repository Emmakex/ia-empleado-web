import type { Metadata } from "next";
import { BlogIndexPage } from "../../../../components/blog-index-page";
import { blogIndexPath } from "../../../../lib/growth-content";

const canonical = blogIndexPath("en");
const alternate = blogIndexPath("es");

export const metadata: Metadata = {
  title: "AI agents and business process automation guides | IA Empleado",
  description: "Practical guides about AI agents, AI Employees, AI for business and process automation with systems, human control and real implementation patterns.",
  alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
};

export default function EnglishBlogPage() {
  return <BlogIndexPage locale="en" />;
}
