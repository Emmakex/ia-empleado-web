import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "../../../../../components/blog-article-page";
import { blogArticlePath, blogArticleRecords, getBlogArticleBySlug } from "../../../../../lib/growth-content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogArticleRecords.map((article) => ({ slug: article.slugs.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug, "en");
  if (!article) return {};
  const canonical = blogArticlePath(article.key, "en");
  const alternate = blogArticlePath(article.key, "es");
  return {
    title: article.seoTitle.en,
    description: article.seoDescription.en,
    alternates: { canonical, languages: { "es-ES": alternate, en: canonical, "x-default": alternate } },
    openGraph: { type: "article", title: article.seoTitle.en, description: article.seoDescription.en, url: canonical, siteName: "IA Empleado", locale: "en_US", publishedTime: article.publishedAt, modifiedTime: article.updatedAt },
    twitter: { card: "summary_large_image", title: article.seoTitle.en, description: article.seoDescription.en },
  };
}

export default async function EnglishBlogArticle({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug, "en");
  if (!article) notFound();
  return <BlogArticlePage locale="en" article={article} />;
}
