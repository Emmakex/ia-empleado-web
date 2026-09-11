import type { Metadata, Viewport } from "next";
import "../../globals.css";
import "../../light-theme.css";
import { getDictionary } from "../../../lib/i18n";

const dictionary = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL("https://iaempleado.com"),
  title: dictionary.seo.title,
  description: dictionary.seo.description,
  alternates: {
    canonical: "/en",
    languages: {
      "es-ES": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/en",
    siteName: "IA Empleado",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    title: dictionary.seo.ogTitle,
    description: dictionary.seo.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
