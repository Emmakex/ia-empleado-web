import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { employeeIndexPath } from "../lib/employee-content-engine";
import { getDiscoveryFilterOptions, getDiscoveryProfiles } from "../lib/employee-discovery";
import { getBrandCharacters } from "../lib/brand-characters";
import { requestDemoPath } from "../lib/conversion-handoff";
import { BrandCharacterImage } from "./brand-character-image";
import { EmployeeCatalogExplorer } from "./employee-catalog-explorer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type EmployeeIndexPageProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

const copy = {
  es: {
    eyebrow: "CATÁLOGO DE EMPLEADOS IA",
    title: "Encuentra el Empleado IA que encaja con el trabajo real de tu empresa.",
    intro: "Explora el catálogo por departamento, sector, problema o tarea. La primera suite de referencia ya tiene contenido profundo; el resto se muestra como oportunidad de catálogo o, cuando corresponde, como uso restringido sujeto a revisión.",
    discover: "Explorar los 22 perfiles",
    reference: "Descubrimiento por necesidad",
    referenceText: "No hace falta empezar sabiendo el nombre del empleado. Puedes partir del problema que quieres resolver —correo, facturas, pedidos, reservas, reporting o soporte— y ver qué perfiles están relacionados.",
    whyTitle: "Un catálogo no significa una colección de chatbots.",
    whyBody: "Los perfiles comparten una base de gobierno, herramientas, permisos, conocimiento y supervisión. Lo importante es que puedan combinarse en equipos y pasarse tareas de forma controlada cuando un proceso cruza varios departamentos.",
    architecture: [["1", "Empleado IA", "Un rol especializado con un trabajo y autoridad definidos."], ["2", "Equipo IA", "Varios roles que colaboran alrededor de un proceso empresarial."], ["3", "Empresa aumentada", "Personas, Empleados IA y sistemas coordinados con límites explícitos."]],
    ctaTitle: "¿No sabes qué Empleado IA encaja primero?",
    ctaText: "Empieza por un proceso repetitivo, los sistemas que ya utilizas y las decisiones que quieres mantener bajo control humano.",
    cta: "Analizar mi proceso",
  },
  en: {
    eyebrow: "AI EMPLOYEE CATALOG",
    title: "Find the AI Employee that fits the real work inside your company.",
    intro: "Explore the catalog by department, sector, problem or task. The first reference suite already has deep public content; the rest is shown as catalog opportunities or, where appropriate, restricted use requiring review.",
    discover: "Explore all 22 profiles",
    reference: "Discover by business need",
    referenceText: "You do not need to know the employee name first. Start from the problem you want to solve — email, invoices, orders, reservations, reporting or support — and see which profiles are related.",
    whyTitle: "A catalog does not mean a collection of chatbots.",
    whyBody: "Profiles share a governed foundation of tools, permissions, knowledge and supervision. The important part is that they can be composed into teams and hand work across roles in a controlled way when a process crosses departments.",
    architecture: [["1", "AI Employee", "A specialist role with a defined job and authority."], ["2", "AI Team", "Several roles collaborating around a business process."], ["3", "AI-augmented company", "People, AI Employees and systems coordinated under explicit boundaries."]],
    ctaTitle: "Not sure which AI Employee should come first?",
    ctaText: "Start with one repetitive process, the systems you already use and the decisions you want to keep under human control.",
    cta: "Analyze my process",
  },
} as const;

export function EmployeeIndexPage({ locale, dictionary }: EmployeeIndexPageProps) {
  const t = copy[locale];
  const profiles = getDiscoveryProfiles(locale);
  const options = getDiscoveryFilterOptions(locale);
  const characters = getBrandCharacters(locale);
  const alternateHref = employeeIndexPath(locale === "es" ? "en" : "es");
  const homeHref = locale === "es" ? "/" : "/en";
  const processCtaHref = requestDemoPath(locale, {
    intent: "process",
    source: "employee-index",
    context: locale === "es" ? "Catálogo de Empleados IA" : "AI Employee catalog",
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "es" ? "Catálogo de Empleados IA" : "AI Employee catalog",
    numberOfItems: profiles.length,
    itemListElement: profiles.map((profile, index) => ({ "@type": "ListItem", position: index + 1, name: profile.name, ...(profile.href ? { url: `https://iaempleado.com${profile.href}` } : {}) })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternateHref} />
      <main id="contenido" className="employee-content-page brand-employee-index-page">
        <section className="employee-index-hero brand-employee-index-hero">
          <div className="container employee-index-hero-grid">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className="employee-hero-lead">{t.intro}</p>
              <div className="hero-actions">
                <a className="button" href="#perfiles">{t.discover}</a>
                <Link className="button button-ghost" href={`${homeHref}#como-funciona`}>{dictionary.nav.how}</Link>
              </div>
            </div>
            <aside className="brand-catalog-hero-art" aria-label={locale === "es" ? "Suite de referencia de Empleados IA" : "Reference AI Employee suite"}>
              <div className="brand-catalog-team" aria-hidden="true">
                {characters.map((character) => (
                  <div className="brand-catalog-person" data-accent={character.accent} key={character.id}>
                    <BrandCharacterImage character={character} sizes="(max-width: 760px) 132px, 180px" eager />
                    <span><strong>{character.name}</strong><small>{character.shortRole}</small></span>
                  </div>
                ))}
              </div>
              <div className="catalog-stat-card brand-catalog-stat-card">
                <span className="catalog-stat-number">22</span>
                <strong>{locale === "es" ? "perfiles identificados" : "identified profiles"}</strong>
                <p>{locale === "es" ? "4 perfiles profundos · 16 oportunidades de catálogo · 2 usos restringidos." : "4 deep profiles · 16 catalog opportunities · 2 restricted-use areas."}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="content-section section-panel" id="perfiles" aria-labelledby="profiles-title"><div className="container"><div className="section-heading catalog-discovery-heading"><p className="eyebrow">{t.reference}</p><h2 id="profiles-title">{t.reference}</h2><p>{t.referenceText}</p></div><EmployeeCatalogExplorer locale={locale} profiles={profiles} options={options} /></div></section>

        <section className="content-section" aria-labelledby="architecture-title"><div className="container employee-architecture-grid"><div><p className="eyebrow">{locale === "es" ? "DEL ROL AL EQUIPO" : "FROM ROLE TO TEAM"}</p><h2 id="architecture-title">{t.whyTitle}</h2><p className="section-lead">{t.whyBody}</p></div><div className="employee-architecture-steps">{t.architecture.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

        <section className="content-section final-cta"><div className="container cta-panel"><div><p className="eyebrow">{locale === "es" ? "EMPIEZA POR EL PROCESO" : "START WITH THE PROCESS"}</p><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><div className="cta-actions"><Link className="button" href={processCtaHref}>{t.cta}</Link><Link className="button button-ghost" href={homeHref}>{locale === "es" ? "Volver al inicio" : "Back to home"}</Link></div></div></section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </>
  );
}
