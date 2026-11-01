import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import type { BlogArticleRecord } from "../lib/growth-content";
import { blogArticlePath, blogArticleRecords, blogIndexPath } from "../lib/growth-content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale };

function formatEditorialDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function readingMinutes(article: BlogArticleRecord, locale: Locale) {
  const words = [
    article.excerpt[locale],
    article.intro[locale],
    ...article.sections.flatMap((section) => [section.title[locale], ...section.paragraphs[locale]]),
    ...article.takeaways[locale],
  ]
    .join(" ")
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;

  return Math.max(4, Math.ceil(words / 220));
}

export function BlogIndexPage({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = blogIndexPath(locale);
  const alternate = blogIndexPath(otherLocale);
  const title = locale === "es" ? "Guías sobre agentes IA y automatización de procesos" : "AI agents and business process automation guides";
  const description = locale === "es"
    ? "Contenido práctico para entender agentes IA, Empleados IA, IA para empresas y automatización de procesos, desde la evaluación hasta una implantación gobernada."
    : "Practical content about AI agents, AI Employees, AI for business and process automation, from evaluation to governed implementation.";
  const [featuredArticle, ...remainingArticles] = blogArticleRecords;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: title,
    description,
    url: `https://iaempleado.com${canonical}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    blogPost: blogArticleRecords.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title[locale],
      url: `https://iaempleado.com${blogArticlePath(article.key, locale)}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="sector-cluster-page editorial-index-page">
        <section className="sector-hero section-shell">
          <div className="container sector-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}><Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link><span aria-hidden="true">/</span><span>Blog</span></nav>
              <p className="eyebrow">{locale === "es" ? "CONOCIMIENTO APLICADO" : "APPLIED KNOWLEDGE"}</p>
              <h1>{title}</h1>
              <p className="sector-hero-lead">{description}</p>
            </div>
          </div>
        </section>

        <section className="content-section editorial-index-shell">
          <div className="container">
            <div className="editorial-index-heading">
              <div>
                <p className="eyebrow">{locale === "es" ? "MÁS RECIENTE PRIMERO" : "NEWEST FIRST"}</p>
                <h2>{locale === "es" ? "Ideas útiles para llevar la IA a procesos reales." : "Useful ideas for bringing AI into real processes."}</h2>
              </div>
              <p>{locale === "es" ? "Las guías se ordenan por fecha de publicación. Cada pieza conecta el problema operativo con controles, implementación y el siguiente paso dentro de IA Empleado." : "Guides are ordered by publication date. Each piece connects the operational problem with controls, implementation and the next relevant step inside IA Empleado."}</p>
            </div>

            {featuredArticle ? (
              <article className="editorial-feature">
                <div className="editorial-feature-copy">
                  <div className="editorial-meta">
                    <strong>{locale === "es" ? "Última guía" : "Latest guide"}</strong>
                    <time dateTime={featuredArticle.publishedAt}>{formatEditorialDate(featuredArticle.publishedAt, locale)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{readingMinutes(featuredArticle, locale)} {locale === "es" ? "min de lectura" : "min read"}</span>
                  </div>
                  <h2><Link href={blogArticlePath(featuredArticle.key, locale)}>{featuredArticle.title[locale]}</Link></h2>
                  <p>{featuredArticle.excerpt[locale]}</p>
                </div>
                <div className="editorial-feature-side">
                  <p>{locale === "es" ? "Lectura recomendada" : "Recommended reading"}</p>
                  <Link className="text-link" href={blogArticlePath(featuredArticle.key, locale)}>{locale === "es" ? "Abrir guía completa" : "Open full guide"} <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ) : null}

            <div className="editorial-card-grid">
              {remainingArticles.map((article) => (
                <article className="editorial-card" key={article.key}>
                  <div className="editorial-card-meta">
                    <time dateTime={article.publishedAt}>{formatEditorialDate(article.publishedAt, locale)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{readingMinutes(article, locale)} {locale === "es" ? "min" : "min read"}</span>
                  </div>
                  <h3><Link href={blogArticlePath(article.key, locale)}>{article.title[locale]}</Link></h3>
                  <p>{article.excerpt[locale]}</p>
                  <Link className="text-link" href={blogArticlePath(article.key, locale)}>{locale === "es" ? "Leer artículo" : "Read article"} <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </>
  );
}
