import type { Locale, SiteDictionary } from "../lib/i18n";
import { alternateLocale, localeHref } from "../lib/i18n";
import { employeeIndexPath } from "../lib/employee-catalog";
import { teamIndexPath } from "../lib/team-content-engine";
import { collaborationDemoPath } from "../lib/collaboration-demo";
import { teamBuilderPath } from "../lib/team-builder";
import { MenuNavigationLink } from "./menu-navigation-link";
import { MobileNavigation, type NavigationGroup } from "./mobile-navigation";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  alternateHref?: string;
};

export function SiteHeader({ locale, dictionary, alternateHref }: SiteHeaderProps) {
  const otherLocale = alternateLocale(locale);
  const homeHref = localeHref(locale);
  const employeeHref = employeeIndexPath(locale);
  const teamsHref = teamIndexPath(locale);
  const howHref = collaborationDemoPath(locale);
  const securityHref = `${homeHref}#seguridad`;
  const ctaHref = teamBuilderPath(locale);
  const languageHref = alternateHref ?? localeHref(otherLocale);

  const routes = locale === "es"
    ? {
        process: "/mejora-tu-proceso",
        roi: "/calculadora-roi",
        comparisons: "/comparativas",
        sectors: "/sectores",
        useCases: "/casos-de-uso",
        departments: "/departamentos",
        integrations: "/integraciones",
      }
    : {
        process: "/en/improve-your-process",
        roi: "/en/roi-calculator",
        comparisons: "/en/comparisons",
        sectors: "/en/sectors",
        useCases: "/en/use-cases",
        departments: "/en/departments",
        integrations: "/en/integrations",
      };

  const navigationGroups: NavigationGroup[] = locale === "es"
    ? [
        {
          label: "Principal",
          links: [
            { href: homeHref, label: "Inicio" },
            { href: employeeHref, label: dictionary.nav.employees },
            { href: teamsHref, label: dictionary.nav.teams },
            { href: howHref, label: "Cómo trabajan juntos" },
          ],
        },
        {
          label: "Herramientas",
          links: [
            { href: ctaHref, label: "Diseña tu equipo IA" },
            { href: routes.process, label: "Mejora tu proceso" },
            { href: routes.roi, label: "Calculadora ROI" },
          ],
        },
        {
          label: "Explorar",
          links: [
            { href: routes.comparisons, label: "Comparativas" },
            { href: routes.sectors, label: "Sectores" },
            { href: routes.useCases, label: "Casos de uso" },
            { href: routes.departments, label: "Departamentos" },
            { href: routes.integrations, label: "Integraciones" },
          ],
        },
        {
          label: "Confianza",
          links: [{ href: securityHref, label: dictionary.nav.security }],
        },
      ]
    : [
        {
          label: "Main",
          links: [
            { href: homeHref, label: "Home" },
            { href: employeeHref, label: dictionary.nav.employees },
            { href: teamsHref, label: dictionary.nav.teams },
            { href: howHref, label: "See the team work" },
          ],
        },
        {
          label: "Tools",
          links: [
            { href: ctaHref, label: "Design your AI team" },
            { href: routes.process, label: "Improve your process" },
            { href: routes.roi, label: "ROI calculator" },
          ],
        },
        {
          label: "Explore",
          links: [
            { href: routes.comparisons, label: "Comparisons" },
            { href: routes.sectors, label: "Sectors" },
            { href: routes.useCases, label: "Use cases" },
            { href: routes.departments, label: "Departments" },
            { href: routes.integrations, label: "Integrations" },
          ],
        },
        {
          label: "Trust",
          links: [{ href: securityHref, label: dictionary.nav.security }],
        },
      ];

  const exploreGroups = navigationGroups.slice(1);
  const exploreLabel = locale === "es" ? "Explorar" : "Explore";
  const navigationLabel = locale === "es" ? "Navegación principal" : "Main navigation";

  return (
    <header className="site-header">
      <div className="container header-inner">
        <MenuNavigationLink className="brand" href={homeHref}>
          <img className="brand-symbol" src="/branding/ia-empleado-mark.svg" alt="" width={41} height={41} aria-hidden="true" />
          <span className="brand-wordmark">IA Empleado</span>
        </MenuNavigationLink>
        <nav className="main-nav" aria-label={navigationLabel}>
          <MenuNavigationLink href={employeeHref}>{dictionary.nav.employees}</MenuNavigationLink>
          <MenuNavigationLink href={teamsHref}>{dictionary.nav.teams}</MenuNavigationLink>
          <MenuNavigationLink href={howHref}>{dictionary.nav.how}</MenuNavigationLink>
          <details className="site-nav-explore">
            <summary>{exploreLabel}</summary>
            <div className="site-nav-mega" aria-label={exploreLabel}>
              {exploreGroups.map((group) => (
                <section className="site-nav-group" key={group.label}>
                  <p className="site-nav-group-label">{group.label}</p>
                  <div className="site-nav-group-links">
                    {group.links.map((link) => (
                      <MenuNavigationLink href={link.href} key={`${group.label}-${link.href}`}>{link.label}</MenuNavigationLink>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <MenuNavigationLink className="language-link" href={languageHref} hrefLang={otherLocale}>
            {dictionary.nav.language}
          </MenuNavigationLink>
          <MenuNavigationLink className="button button-small" href={ctaHref}>
            {dictionary.nav.cta}
          </MenuNavigationLink>
        </div>
        <MobileNavigation
          groups={navigationGroups}
          alternateHref={languageHref}
          alternateHrefLang={otherLocale}
          languageLabel={dictionary.nav.language}
          ctaHref={ctaHref}
          ctaLabel={dictionary.nav.cta}
          openLabel={locale === "es" ? "Abrir menú" : "Open menu"}
          closeLabel={locale === "es" ? "Cerrar menú" : "Close menu"}
          navigationLabel={locale === "es" ? "Navegación móvil" : "Mobile navigation"}
        />
      </div>
    </header>
  );
}
