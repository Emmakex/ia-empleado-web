import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import type { BlogArticleRecord } from "../lib/growth-content";
import { blogArticlePath, blogIndexPath, getGrowthLandingByKey, growthLandingPath } from "../lib/growth-content";
import { employeeIndexPath } from "../lib/employee-catalog";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { requestDemoPath } from "../lib/conversion-handoff";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; article: BlogArticleRecord };

export function BlogArticlePage({ locale, article }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = blogArticlePath(article.key, locale);
  const alternate = blogArticlePath(article.key, otherLocale);
  const relatedLanding = getGrowthLandingByKey(article.relatedLandingKey);
  const demoHref = requestDemoPath(locale, {
    intent: "demo",
    source: `blog:${article.key}`,
    context: article.title[locale],
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[locale],
    description: article.seoDescription[locale],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === "es" ? "es-ES" : "en",
    mainEntityOfPage: `https://iaempleado.com${canonical}`,
    author: { "@type": "Organization", name: "IA Empleado", url: "https://iaempleado.com" },
    publisher: { "@type": "Organization", name: "IA Empleado", url: "https://iaempleado.com" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://iaempleado.com${localeHref(locale)}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `https://iaempleado.com${blogIndexPath(locale)}` },
      { "@type": "ListItem", position: 3, name: article.title[locale], item: `https://iaempleado.com${canonical}` },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="sector-cluster-page">
        <article>
          <header className="sector-hero section-shell">
            <div className="container sector-hero-grid">
              <div>
                <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                  <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link><span aria-hidden="true">/</span><Link href={blogIndexPath(locale)}>Blog</Link><span aria-hidden="true">/</span><span>{article.title[locale]}</span>
                </nav>
                <p className="eyebrow">{locale === "es" ? "GUÍA PRÁCTICA" : "PRACTICAL GUIDE"}</p>
                <h1>{article.title[locale]}</h1>
                <p className="sector-hero-lead">{article.excerpt[locale]}</p>
                <p><time dateTime={article.publishedAt}>{article.publishedAt}</time> · IA Empleado</p>
              </div>
            </div>
          </header>

          <section className="content-section">
            <div className="container"><div className="legal-copy"><p>{article.intro[locale]}</p></div></div>
          </section>

          {article.sections.map((section, index) => (
            <section className={index % 2 === 0 ? "content-section section-panel" : "content-section"} key={section.title[locale]}>
              <div className="container">
                <div className="section-heading sector-section-heading"><p className="eyebrow">{String(index + 1).padStart(2, "0")}</p><h2>{section.title[locale]}</h2></div>
                <div className="legal-copy">{section.paragraphs[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </div>
            </section>
          ))}

          <section className="content-section section-panel">
            <div className="container">
              <div className="section-heading sector-section-heading"><p className="eyebrow">{locale === "es" ? "EN RESUMEN" : "TAKEAWAYS"}</p><h2>{locale === "es" ? "Ideas clave" : "Key ideas"}</h2></div>
              <div className="sector-card-grid">{article.takeaways[locale].map((item) => <article className="sector-card" key={item}><p>{item}</p></article>)}</div>
            </div>
          </section>

          {relatedLanding ? (
            <section className="content-section">
              <div className="container cta-panel">
                <div><p className="eyebrow">{locale === "es" ? "SIGUE PROFUNDIZANDO" : "GO DEEPER"}</p><h2>{relatedLanding.title[locale]}</h2><p>{relatedLanding.lead[locale]}</p></div>
                <div className="cta-actions"><Link className="button" href={growthLandingPath(relatedLanding.key, locale)}>{locale === "es" ? "Ver solución" : "View solution"}</Link></div>
              </div>
            </section>
          ) : null}

          <section className="content-section final-cta">
            <div className="container cta-panel">
              <div><p className="eyebrow">{locale === "es" ? "APLICARLO" : "APPLY IT"}</p><h2>{locale === "es" ? "¿Quieres identificar dónde encaja un Empleado IA en tu empresa?" : "Want to identify where an AI Employee fits in your business?"}</h2></div>
              <div className="cta-actions">
                <Link className="button" href={demoHref}>{locale === "es" ? "Solicitar demo" : "Request demo"}</Link>
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar proceso" : "Analyse process"}</Link>
                <Link className="text-link" href={employeeIndexPath(locale)}>{locale === "es" ? "Explorar Empleados IA" : "Explore AI Employees"} →</Link>
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
