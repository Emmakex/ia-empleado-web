"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export const MENU_SCROLL_RESET_KEY = "ia-empleado:menu-scroll-reset";

type MenuNavigationLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  hrefLang?: string;
  onClick?: () => void;
};

function shouldResetScroll(href: string) {
  return href.startsWith("/") && !href.includes("#");
}

export function MenuNavigationLink({
  href,
  children,
  className,
  hrefLang,
  onClick,
}: MenuNavigationLinkProps) {
  const resetScroll = shouldResetScroll(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const primaryNavigation =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !event.defaultPrevented;

    if (resetScroll && primaryNavigation) {
      try {
        window.sessionStorage.setItem(MENU_SCROLL_RESET_KEY, "1");
      } catch {
        // Navigation still works when storage is unavailable.
      }

      const targetPath = new URL(href, window.location.origin).pathname;
      if (targetPath === window.location.pathname) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        try {
          window.sessionStorage.removeItem(MENU_SCROLL_RESET_KEY);
        } catch {
          // Ignore storage cleanup failures.
        }
      }
    }

    onClick?.();
  };

  return (
    <Link
      href={href}
      className={className}
      hrefLang={hrefLang}
      scroll={resetScroll ? true : undefined}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
