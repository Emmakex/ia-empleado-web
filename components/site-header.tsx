import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { alternateLocale, localeHref } from "../lib/i18n";
import { employeeIndexPath } from "../lib/employee-catalog";
import { teamIndexPath } from "../lib/team-content-engine";
import { collaborationDemoPath } from "../lib/collaboration-demo";
import { MobileNavigation } from "./mobile-navigation";

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
  const ctaHref = `${homeHref}#disena-tu-equipo`;
  const languageHref = alternateHref ?? localeHref(otherLocale);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href={homeHref} aria-label="IA Empleado">
          <span className="brand-mark" aria-hidden="true">IA</span>
          <span>IA Empleado</span>
        </Link>
        <nav className="main-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          <Link href={employeeHref}>{dictionary.nav.employees}</Link>
          <Link href={teamsHref}>{dictionary.nav.teams}</Link>
          <Link href={howHref}>{dictionary.nav.how}</Link>
          <Link href={securityHref}>{dictionary.nav.security}</Link>
        </nav>
        <div className="header-actions">
          <Link className="language-link" href={languageHref} hrefLang={otherLocale}>
            {dictionary.nav.language}
          </Link>
          <Link className="button button-small" href={ctaHref}>
            {dictionary.nav.cta}
          </Link>
        </div>
        <MobileNavigation
          employeeHref={employeeHref}
          teamsHref={teamsHref}
          howHref={howHref}
          securityHref={securityHref}
          alternateHref={languageHref}
          alternateHrefLang={otherLocale}
          languageLabel={dictionary.nav.language}
          ctaHref={ctaHref}
          ctaLabel={dictionary.nav.cta}
          employeesLabel={dictionary.nav.employees}
          teamsLabel={dictionary.nav.teams}
          howLabel={dictionary.nav.how}
          securityLabel={dictionary.nav.security}
          openLabel={locale === "es" ? "Abrir menú" : "Open menu"}
          closeLabel={locale === "es" ? "Cerrar menú" : "Close menu"}
          navigationLabel={locale === "es" ? "Navegación móvil" : "Mobile navigation"}
        />
      </div>
    </header>
  );
}
