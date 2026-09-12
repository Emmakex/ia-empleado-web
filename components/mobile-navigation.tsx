"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MobileNavigationProps = {
  employeeHref: string;
  teamsHref: string;
  howHref: string;
  securityHref: string;
  alternateHref: string;
  alternateHrefLang: string;
  languageLabel: string;
  ctaHref: string;
  ctaLabel: string;
  employeesLabel: string;
  teamsLabel: string;
  howLabel: string;
  securityLabel: string;
  openLabel: string;
  closeLabel: string;
  navigationLabel: string;
};

export function MobileNavigation({
  employeeHref,
  teamsHref,
  howHref,
  securityHref,
  alternateHref,
  alternateHrefLang,
  languageLabel,
  ctaHref,
  ctaLabel,
  employeesLabel,
  teamsLabel,
  howLabel,
  securityLabel,
  openLabel,
  closeLabel,
  navigationLabel,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = "mobile-site-navigation";

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="mobile-navigation">
      <button
        ref={toggleRef}
        className={`mobile-menu-toggle${open ? " is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {open ? (
        <>
          <button className="mobile-menu-backdrop" type="button" aria-label={closeLabel} onClick={close} tabIndex={-1} />
          <div className="mobile-menu-panel" id={panelId}>
            <nav className="mobile-menu-links" aria-label={navigationLabel}>
              <Link href={employeeHref} onClick={close}>{employeesLabel}</Link>
              <Link href={teamsHref} onClick={close}>{teamsLabel}</Link>
              <Link href={howHref} onClick={close}>{howLabel}</Link>
              <Link href={securityHref} onClick={close}>{securityLabel}</Link>
            </nav>
            <div className="mobile-menu-actions">
              <Link className="mobile-language-link" href={alternateHref} hrefLang={alternateHrefLang} onClick={close}>
                {languageLabel}
              </Link>
              <Link className="button mobile-menu-cta" href={ctaHref} onClick={close}>
                {ctaLabel}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
