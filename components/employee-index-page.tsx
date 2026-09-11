import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { employeeIndexPath, getEmployeeCatalog } from "../lib/employee-catalog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type EmployeeIndexPageProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

const copy = {
  es: {
    eyebrow: "CATÁLOGO DE EMPLEADOS IA",
    title: "Empleados IA especializados en trabajos reales de empresa.",
    intro: "IA Empleado organiza capacidades de inteligencia artificial alrededor de funciones empresariales concretas. Cada perfil define qué trabajo asume, qué sistemas necesita, qué límites aplica y cuándo debe intervenir una persona.",
    reference: "Suite de referencia",
    referenceText: "Los cuatro perfiles siguientes son la primera suite comercial de referencia. El catálogo de producto identifica 22 oportunidades, pero la publicación profunda se realiza por fases para no presentar como disponible lo que todavía pertenece al roadmap.",
    discover: "Explorar perfiles",
    department: "Departamento",
    focus: "Foco",
    ready: "Contenido profundo disponible",
    next: "Ficha profunda en preparación",
    whyTitle: "Un catálogo no significa una colección de chatbots.",
    whyBody: "Los perfiles comparten una base de gobierno, herramientas, permisos, conocimiento y supervisión. Lo importante es que puedan combinarse en equipos y pasarse tareas de forma controlada cuando un proceso cruza varios departamentos.",
    architecture: [
      ["1", "Empleado IA", "Un rol especializado con un trabajo y autoridad definidos."],
      ["2", "Equipo IA", "Varios roles que colaboran alrededor de un proceso empresarial."],
      ["3", "Empresa aumentada", "Personas, Empleados IA y sistemas coordinados con límites explícitos."],
    ],
    ctaTitle: "¿No sabes qué Empleado IA encaja primero?",
    ctaText: "Empieza por un proceso repetitivo, los sistemas que ya utilizas y las decisiones que quieres mantener bajo control humano.",
    cta: "Analizar mi proceso",
  },
  en: {
    eyebrow: "AI EMPLOYEE CATALOG",
    title: "AI Employees specialized in real business jobs.",
    intro: "IA Empleado organizes AI capabilities around concrete business functions. Each profile defines the work it takes on, the systems it needs, its boundaries and when a person must intervene.",
    reference: "Reference suite",
    referenceText: "The four profiles below form the first commercial reference suite. Product discovery identifies 22 opportunities, but deep public content is released in phases so the website does not present roadmap scope as already available.",
    discover: "Explore profiles",
    department: "Department",
    focus: "Focus",
    ready: "Deep content available",
    next: "Deep profile in preparation",
    whyTitle: "A catalog does not mean a collection of chatbots.",
    whyBody: "Profiles share a governed foundation of tools, permissions, knowledge and supervision. The important part is that they can be composed into teams and hand work across roles in a controlled way when a process crosses departments.",
    architecture: [
      ["1", "AI Employee", "A specialist role with a defined job and authority."],
      ["2", "AI Team", "Several roles collaborating around a business process."],
      ["3", "AI-augmented company", "People, AI Employees and systems coordinated under explicit boundaries."],
    ],
    ctaTitle: "Not sure which AI Employee should come first?",
    ctaText: "Start with one repetitive process, the systems you already use and the decisions you want to keep under human control.",
    cta: "Analyze my process",
  },
} as const;

export function EmployeeIndexPage({ locale, dictionary }: EmployeeIndexPageProps) {
  const t = copy[locale];
  const employees = getEmployeeCatalog(locale);
  const alternateHref = employeeIndexPath(locale === "es" ? "en" : "es");
  const homeHref = locale === "es" ? "/" : "/en";

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.reference,
    numberOfItems: employees.length,
    itemListElement: employees.map((employee, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: employee.name,
      ...(employee.href ? { url: `https://iaempleado.com${employee.href}` } : {}),
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternateHref} />
      <main id="contenido" className="employee-content-page">
        <section className="employee-index-hero">
          <div className="container employee-index-hero-grid">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className="employee-hero-lead">{t.intro}</p>
              <div className="hero-actions">
                <a className="button" href="#perfiles">{t.discover}</a>
                <Link className="button button-ghost" href={`${homeHref}#como-funciona`}>
                  {dictionary.nav.how}
                </Link>
              </div>
            </div>
            <aside className="catalog-stat-card" aria-label={locale === "es" ? "Resumen del catálogo" : "Catalog summary"}>
              <span className="catalog-stat-number">22</span>
              <strong>{locale === "es" ? "perfiles identificados" : "identified profiles"}</strong>
              <p>{locale === "es" ? "4 forman la primera suite de referencia pública." : "4 form the first public reference suite."}</p>
            </aside>
          </div>
        </section>

        <section className="content-section section-panel" id="perfiles" aria-labelledby="profiles-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t.reference}</p>
              <h2 id="profiles-title">{t.reference}</h2>
              <p>{t.referenceText}</p>
            </div>
            <div className="employee-catalog-grid">
              {employees.map((employee, index) => (
                <article className="employee-catalog-card" key={employee.key}>
                  <div className="employee-card-topline">
                    <span className="employee-card-index">0{index + 1}</span>
                    <span className={`employee-content-status ${employee.href ? "is-ready" : "is-next"}`}>
                      {employee.href ? t.ready : t.next}
                    </span>
                  </div>
                  <p className="employee-department">{employee.department}</p>
                  <h3>{employee.shortName}</h3>
                  <p className="employee-card-description">{employee.description}</p>
                  <dl className="employee-card-meta">
                    <div><dt>{t.department}</dt><dd>{employee.department}</dd></div>
                    <div><dt>{t.focus}</dt><dd>{employee.focus}</dd></div>
                  </dl>
                  {employee.href ? (
                    <Link className="employee-text-link" href={employee.href}>{employee.cardCta} <span aria-hidden="true">→</span></Link>
                  ) : (
                    <span className="employee-text-link is-disabled" aria-disabled="true">{employee.cardCta}</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="architecture-title">
          <div className="container employee-architecture-grid">
            <div>
              <p className="eyebrow">{locale === "es" ? "DEL ROL AL EQUIPO" : "FROM ROLE TO TEAM"}</p>
              <h2 id="architecture-title">{t.whyTitle}</h2>
              <p className="section-lead">{t.whyBody}</p>
            </div>
            <div className="employee-architecture-steps">
              {t.architecture.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "EMPIEZA POR EL PROCESO" : "START WITH THE PROCESS"}</p>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <div className="cta-actions">
              <a className="button" href="mailto:hola@iaempleado.com?subject=IA%20Empleado%20-%20Analisis%20de%20proceso">{t.cta}</a>
              <Link className="button button-ghost" href={homeHref}>{locale === "es" ? "Volver al inicio" : "Back to home"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </>
  );
}
