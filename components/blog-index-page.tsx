import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import { blogArticlePath, blogArticleRecords, blogIndexPath } from "../lib/growth-content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale };

export function BlogIndexPage({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = blogIndexPath(locale);
  const alternate = blogIndexPath(otherLocale);
  const title = locale === "es" ? "Blog sobre Empleados IA, automatización y empresa" : "AI Employees, automation and business blog";
  const description = locale === "es"
    ? "Guías, novedades y recursos prácticos para entender, evaluar e implantar Empleados IA en procesos empresariales."
    : "Guides, updates and practical resources to understand, evaluate and implement AI Employees in business processes.";

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
      <main id="contenido" className="sector-cluster-page">
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
        <section className="content-section">
          <div className="container">
            <div className="section-heading sector-section-heading"><p className="eyebrow">{locale === "es" ? "ÚLTIMOS CONTENIDOS" : "LATEST CONTENT"}</p><h2>{locale === "es" ? "Guías para pasar de la idea al proceso" : "Guides from idea to process"}</h2></div>
            <div className="sector-card-grid">
              {blogArticleRecords.map((article) => (
                <article className="sector-card" key={article.key}>
                  <div className="sector-card-topline"><span>{article.publishedAt}</span><span>IA Empleado</span></div>
                  <h3>{article.title[locale]}</h3>
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
