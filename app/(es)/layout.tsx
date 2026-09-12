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
import "../brand-system.css";
import "../brand-fidelity.css";
import "../brand-content.css";
import "../brand-sector-content.css";
import "../brand-organization-content.css";
import { getDictionary } from "../../lib/i18n";

const dictionary = getDictionary("es");

export const metadata: Metadata = {
  metadataBase: new URL("https://iaempleado.com"),
  title: dictionary.seo.title,
  description: dictionary.seo.description,
  alternates: { canonical: "/", languages: { "es-ES": "/", en: "/en", "x-default": "/" } },
  openGraph: { type: "website", url: "/", siteName: "IA Empleado", locale: "es_ES", alternateLocale: ["en_US"], title: dictionary.seo.ogTitle, description: dictionary.seo.ogDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light", themeColor: "#ffffff" };

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
