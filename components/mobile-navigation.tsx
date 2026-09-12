"use client";

import { useEffect, useRef, useState } from "react";
import { MenuNavigationLink } from "./menu-navigation-link";

export type NavigationLink = {
  href: string;
  label: string;
};

export type NavigationGroup = {
  label: string;
  links: NavigationLink[];
};

type MobileNavigationProps = {
  groups: NavigationGroup[];
  alternateHref: string;
  alternateHrefLang: string;
  languageLabel: string;
  ctaHref: string;
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
  navigationLabel: string;
};

export function MobileNavigation({
  groups,
  alternateHref,
  alternateHrefLang,
  languageLabel,
  ctaHref,
  ctaLabel,
  openLabel,
  closeLabel,
  navigationLabel,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = "mobile-site-navigation";

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const mainWasInert = main?.hasAttribute("inert") ?? false;
    const footerWasInert = footer?.hasAttribute("inert") ?? false;

    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const getFocusable = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])
        .filter((element) => element.getAttribute("aria-hidden") !== "true");

    const focusFrame = window.requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        toggleRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (!mainWasInert) main?.removeAttribute("inert");
      if (!footerWasInert) footer?.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const closeAndRestoreFocus = () => {
    setOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  return (
    <div className="mobile-navigation">
      <button
        ref={toggleRef}
        className={`mobile-menu-toggle${open ? " is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
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
          <button className="mobile-menu-backdrop" type="button" aria-label={closeLabel} onClick={closeAndRestoreFocus} tabIndex={-1} />
          <div
            ref={panelRef}
            className="mobile-menu-panel"
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={navigationLabel}
          >
            <nav className="mobile-menu-links" aria-label={navigationLabel}>
              {groups.map((group) => (
                <section className="mobile-menu-group" key={group.label}>
                  <p className="mobile-menu-group-label">{group.label}</p>
                  <div className="mobile-menu-group-links">
                    {group.links.map((link) => (
                      <MenuNavigationLink href={link.href} onClick={close} key={`${group.label}-${link.href}`}>
                        {link.label}
                      </MenuNavigationLink>
                    ))}
                  </div>
                </section>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <MenuNavigationLink className="mobile-language-link" href={alternateHref} hrefLang={alternateHrefLang} onClick={close}>
                {languageLabel}
              </MenuNavigationLink>
              <MenuNavigationLink className="button mobile-menu-cta" href={ctaHref} onClick={close}>
                {ctaLabel}
              </MenuNavigationLink>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
