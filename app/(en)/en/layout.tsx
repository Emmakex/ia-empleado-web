import type { Metadata, Viewport } from "next";
import "../../globals.css";
import "../../light-theme.css";
import "../../employee-content.css";
import "../../employee-discovery.css";
import "../../mobile-navigation.css";
import "../../team-content.css";
import "../../collaboration-demo.css";
import "../../team-builder.css";
import "../../process-analyzer.css";
import "../../roi-estimator.css";
import "../../comparison-content.css";
import "../../sector-use-cases.css";
import "../../organization-map.css";
import "../../conversion-handoff.css";
import "../../brand-system.css";
import "../../brand-fidelity.css";
import "../../brand-content.css";
import "../../brand-role-families.css";
import "../../brand-collaboration-compositions.css";
import "../../brand-sector-content.css";
import "../../brand-sector-hero-art.css";
import "../../brand-organization-content.css";
import "../../brand-interactive-content.css";
import "../../brand-comparison-proof.css";
import "../../brand-motion.css";
import "../../ux-accessibility.css";
import "../../reflow-hardening.css";
import "../../brand-visual-polish.css";
import "../../home-hero-geometry.css";
import "../../internal-page-ux.css";
import { MenuScrollReset } from "../../../components/menu-scroll-reset";
import { getDictionary } from "../../../lib/i18n";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const dictionary = getDictionary("en");
const homePreview = brandPreviewUrl("en", "home");

export const metadata: Metadata = {
  metadataBase: new URL("https://iaempleado.com"),
  title: dictionary.seo.title,
  description: dictionary.seo.description,
  alternates: { canonical: "/en", languages: { "es-ES": "/", en: "/en", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: "/en",
    siteName: "IA Empleado",
    locale: "en_US",
    alternateLocale: ["es_ES"],
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
  other: { "ia-web-release": "web-home-hero-geometry-fix" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light", themeColor: "#ffffff" };

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MenuScrollReset />{children}</body></html>;
}
