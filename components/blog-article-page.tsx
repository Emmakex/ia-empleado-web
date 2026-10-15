import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import type { BlogArticleRecord } from "../lib/growth-content";
import { blogArticlePath, blogIndexPath, getGrowthLandingByKey, growthLandingPath } from "../lib/growth-content";
import { employeeIndexPath } from "../lib/employee-catalog";
import { employeeDetailPath } from "../lib/employee-content-engine";
import { useCaseDetailPath } from "../lib/sector-use-cases";
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
  const chatbotComparisonHref = article.key === "what-is-an-ai-employee"
    ? (locale === "es" ? "/comparativas/chatbot" : "/en/comparisons/chatbot")
    : undefined;
  const isAccountingGuide = article.key === "automate-invoicing-accounting-human-review" || article.key === "how-to-automate-invoice-processing-ai";
  const isSalesOrderGuide = article.key === "how-to-automate-b2b-sales-order-processing-ai";
  const isEmployeeOnboardingGuide = article.key === "how-to-automate-employee-onboarding-ai";
  const workflowConnections = isAccountingGuide
    ? {
        employeeHref: employeeDetailPath("accounting-billing", locale),
        useCaseHref: useCaseDetailPath("invoice-validation", locale),
        heading: locale === "es" ? "Distingue el rol contable del patrón concreto de validación de facturas." : "Separate the accounting role from the specific invoice-validation pattern.",
        body: locale === "es" ? "El perfil de Contabilidad y Facturación explica quién realiza el trabajo; el caso de uso de validación de facturas muestra un flujo acotado con controles y escalado." : "The Accounting and Billing profile explains who performs the work; the invoice-validation use case shows a bounded workflow with controls and escalation.",
        employeeLabel: locale === "es" ? "Ver IA para Contabilidad" : "View AI for Accounting",
        useCaseLabel: locale === "es" ? "Ver validación de facturas" : "View invoice validation",
      }
    : isSalesOrderGuide
      ? {
          employeeHref: employeeDetailPath("sales-sdr", locale),
          useCaseHref: useCaseDetailPath("order-exception", locale),
          heading: locale === "es" ? "Separa la automatización de pedidos del trabajo comercial de prospección y seguimiento." : "Separate sales-order automation from prospecting and sales follow-up.",
          body: locale === "es" ? "El perfil de Ventas y SDR cubre research, cualificación, CRM y seguimiento; el caso de incidencias de pedidos cubre el tratamiento de excepciones una vez existe un pedido. Esta guía permanece centrada en cómo automatizar el procesamiento B2B de pedidos." : "The Sales and SDR profile covers research, qualification, CRM and follow-up; the order-exception use case covers exceptions once an order exists. This guide remains focused on automating B2B sales-order processing.",
          employeeLabel: locale === "es" ? "Ver Agente IA para Ventas" : "View AI Sales Agent",
          useCaseLabel: locale === "es" ? "Ver incidencias de pedidos" : "View order exceptions",
        }
      : isEmployeeOnboardingGuide
        ? {
            employeeHref: employeeDetailPath("administrative", locale),
            useCaseHref: useCaseDetailPath("administrative-documentation", locale),
            heading: locale === "es" ? "Mantén el onboarding como proceso de RRHH e IT y conecta solo el trabajo administrativo que le da soporte." : "Keep onboarding as an HR and IT process while connecting the administrative work that supports it.",
            body: locale === "es" ? "El perfil Administrativo ayuda con documentación, registros y seguimiento; el caso de documentación administrativa muestra un patrón acotado. Ninguno sustituye al propietario de onboarding, que coordina contratación aprobada, identidad, equipo, accesos, formación y excepciones entre RRHH e IT." : "The Administrative profile supports documents, records and follow-up, while the administrative-document workflow shows a bounded pattern. Neither replaces the onboarding owner, which coordinates approved hire, identity, equipment, access, training and exceptions across HR and IT.",
            employeeLabel: locale === "es" ? "Ver Agente IA Administrativo" : "View Administrative AI Agent",
            useCaseLabel: locale === "es" ? "Ver gestión documental" : "View document workflow",
          }
        : undefined;
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

          {chatbotComparisonHref ? (
            <section className="content-section">
              <div className="container cta-panel">
                <div>
                  <p className="eyebrow">{locale === "es" ? "COMPARACIÓN" : "COMPARISON"}</p>
                  <h2>{locale === "es" ? "¿Buscas decidir entre chatbot y agente IA?" : "Trying to choose between a chatbot and an AI agent?"}</h2>
                  <p>{locale === "es" ? "Esta guía posee la intención informacional de definir qué es un agente IA. La comparación de alternativas tiene su propia página canónica para evaluar diferencias y escenarios." : "This guide owns the informational definition of an AI agent. The alternatives comparison has its own canonical page for evaluating differences and scenarios."}</p>
                </div>
                <div className="cta-actions"><Link className="button button-ghost" href={chatbotComparisonHref}>{locale === "es" ? "Comparar con un chatbot" : "Compare with a chatbot"}</Link></div>
              </div>
            </section>
          ) : null}

          {relatedLanding ? (
            <section className="content-section">
              <div className="container cta-panel">
                <div><p className="eyebrow">{locale === "es" ? "SIGUE PROFUNDIZANDO" : "GO DEEPER"}</p><h2>{relatedLanding.title[locale]}</h2><p>{relatedLanding.lead[locale]}</p></div>
                <div className="cta-actions"><Link className="button" href={growthLandingPath(relatedLanding.key, locale)}>{locale === "es" ? "Ver solución" : "View solution"}</Link></div>
              </div>
            </section>
          ) : null}

          {workflowConnections ? (
            <section className="content-section section-panel" aria-labelledby="cluster-connections-title">
              <div className="container cta-panel">
                <div>
                  <p className="eyebrow">{locale === "es" ? "CONEXIONES DEL CLÚSTER" : "CLUSTER CONNECTIONS"}</p>
                  <h2 id="cluster-connections-title">{workflowConnections.heading}</h2>
                  <p>{workflowConnections.body}</p>
                </div>
                <div className="cta-actions">
                  <Link className="button button-ghost" href={workflowConnections.employeeHref}>{workflowConnections.employeeLabel}</Link>
                  <Link className="text-link" href={workflowConnections.useCaseHref}>{workflowConnections.useCaseLabel} →</Link>
                </div>
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
