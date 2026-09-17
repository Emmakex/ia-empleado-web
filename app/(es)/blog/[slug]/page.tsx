import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "../../../../components/blog-article-page";
import { blogArticlePath, blogArticleRecords, getBlogArticleBySlug } from "../../../../lib/growth-content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogArticleRecords.map((article) => ({ slug: article.slugs.es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug, "es");
  if (!article) return {};
  const canonical = blogArticlePath(article.key, "es");
  const alternate = blogArticlePath(article.key, "en");
  return {
    title: article.seoTitle.es,
    description: article.seoDescription.es,
    alternates: { canonical, languages: { "es-ES": canonical, en: alternate, "x-default": canonical } },
    openGraph: { type: "article", title: article.seoTitle.es, description: article.seoDescription.es, url: canonical, siteName: "IA Empleado", locale: "es_ES", publishedTime: article.publishedAt, modifiedTime: article.updatedAt },
    twitter: { card: "summary_large_image", title: article.seoTitle.es, description: article.seoDescription.es },
  };
}

export default async function SpanishBlogArticle({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug, "es");
  if (!article) notFound();
  return <BlogArticlePage locale="es" article={article} />;
}
