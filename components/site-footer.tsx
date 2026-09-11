import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { localeHref } from "../lib/i18n";
import { employeeIndexPath } from "../lib/employee-catalog";

type SiteFooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const homeHref = localeHref(locale);
  const links = [employeeIndexPath(locale), `${homeHref}#equipos`, `${homeHref}#como-funciona`, `${homeHref}#seguridad`];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand brand-footer" href={homeHref} aria-label="IA Empleado">
            <span className="brand-mark" aria-hidden="true">IA</span>
            <span>IA Empleado</span>
          </Link>
          <p className="footer-tagline">{dictionary.footer.tagline}</p>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.product}</p>
          <ul className="footer-links">
            {dictionary.footer.links.slice(0, 2).map((label, index) => (
              <li key={label}><Link href={links[index]}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-heading">{dictionary.footer.resources}</p>
          <ul className="footer-links">
            {dictionary.footer.links.slice(2).map((label, index) => (
              <li key={label}><Link href={links[index + 2]}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} IA Empleado</p>
        <p>{dictionary.footer.legal}</p>
      </div>
    </footer>
  );
}
