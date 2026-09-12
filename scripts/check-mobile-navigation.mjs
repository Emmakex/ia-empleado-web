import { readFile } from "node:fs/promises";

const files = {
  header: await readFile("components/site-header.tsx", "utf8"),
  mobile: await readFile("components/mobile-navigation.tsx", "utf8"),
  css: await readFile("app/mobile-navigation.css", "utf8"),
  esLayout: await readFile("app/(es)/layout.tsx", "utf8"),
  enLayout: await readFile("app/(en)/en/layout.tsx", "utf8"),
};

const checks = [
  [files.header.includes("<MobileNavigation"), "SiteHeader must render MobileNavigation"],
  [files.mobile.includes("aria-expanded={open}"), "Mobile menu toggle must expose aria-expanded"],
  [files.mobile.includes("aria-controls={panelId}"), "Mobile menu toggle must expose aria-controls"],
  [files.mobile.includes('event.key === "Escape"'), "Mobile menu must close with Escape"],
  [files.mobile.includes("employeesLabel"), "Mobile menu must include the Employee catalog link"],
  [files.mobile.includes("teamsLabel"), "Mobile menu must include the AI Teams link"],
  [files.mobile.includes("languageLabel"), "Mobile menu must preserve locale switching"],
  [files.mobile.includes("ctaLabel"), "Mobile menu must preserve the primary CTA"],
  [files.css.includes("@media (max-width: 1080px)"), "Mobile navigation must activate before desktop navigation disappears"],
  [files.css.includes(".mobile-navigation"), "Mobile navigation styles must exist"],
  [files.css.includes(".mobile-menu-panel"), "Mobile menu panel styles must exist"],
  [files.esLayout.includes('import "../mobile-navigation.css";'), "Spanish layout must load mobile navigation styles"],
  [files.enLayout.includes('import "../../mobile-navigation.css";'), "English layout must load mobile navigation styles"],
];

const failures = checks.filter(([ok]) => !ok).map(([, message]) => message);

if (failures.length > 0) {
  console.error("Mobile navigation contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Mobile navigation contract OK");
