"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MENU_SCROLL_RESET_KEY } from "./menu-navigation-link";

export function MenuScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    let pending = false;

    try {
      pending = window.sessionStorage.getItem(MENU_SCROLL_RESET_KEY) === "1";
    } catch {
      pending = false;
    }

    if (!pending) return;

    if (window.location.hash) {
      try {
        window.sessionStorage.removeItem(MENU_SCROLL_RESET_KEY);
      } catch {
        // Ignore storage cleanup failures.
      }
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        try {
          window.sessionStorage.removeItem(MENU_SCROLL_RESET_KEY);
        } catch {
          // Ignore storage cleanup failures.
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);

  return null;
}
