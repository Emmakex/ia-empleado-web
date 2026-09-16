import type { Metadata, Viewport } from "next";
import "../globals.css";
import "../light-theme.css";
import "../employee-content.css";
import "../employee-discovery.css";
import "../mobile-navigation.css";
import "../team-content.css";
import "../collaboration-demo.css";
import "../team-builder.css";
import "../process-analyzer.css";
import "../roi-estimator.css";
import "../comparison-content.css";
import "../sector-use-cases.css";
import "../organization-map.css";
import "../conversion-handoff.css";
import "../legal-content.css";
import "../brand-system.css";
import "../brand-fidelity.css";
import "../brand-content.css";
import "../brand-role-families.css";
import "../brand-collaboration-compositions.css";
import "../brand-sector-content.css";
import "../brand-sector-hero-art.css";
import "../brand-organization-content.css";
import "../brand-interactive-content.css";
import "../brand-comparison-proof.css";
import "../brand-motion.css";
import "../phase8c-motion.css";
import "../ux-accessibility.css";
import "../reflow-hardening.css";
import "../brand-visual-polish.css";
import "../internal-page-ux.css";
import "../phase8-interaction-ux.css";
import "../phase8b-accessibility.css";
import { MenuScrollReset } from "../../components/menu-scroll-reset";
import { getDictionary } from "../../lib/i18n";
import { brandPreviewUrl } from "../../lib/brand-social-previews";
import { WEB_RELEASE_FINGERPRINT } from "../../lib/release-fingerprint.generated";

// Historical Phase 8F regression reference only: "ia-web-release": "web-phase-8f-structured-navigation"
const dictionary = getDictionary("es");
const homePreview = brandPreviewUrl("es", "home");

export const metadata: Metadata = {
  metadataBase: new URL("https://iaempleado.com"),
  title: dictionary.seo.title,
  description: dictionary.seo.description,
  alternates: { canonical: "/", languages: { "es-ES": "/", en: "/en", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "IA Empleado",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    title: dictionary.seo.ogTitle,
    description: dictionary.seo.ogDescription,
    images: [{ url: homePreview, width: 1200, height: 630, alt: dictionary.seo.ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: dictionary.seo.ogTitle,
    description: dictionary.seo.ogDescription,
    images: [homePreview],
  },
  robots: { index: true, follow: true },
  other: { "ia-web-release": WEB_RELEASE_FINGERPRINT },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light", themeColor: "#ffffff" };

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><MenuScrollReset />{children}</body></html>;
}
