import type { Metadata } from "next";
import { brandPreviewUrl, type BrandPreviewSurface } from "./brand-social-previews";
import type { Locale } from "./i18n";

type RouteSocialMetadataInput = {
  locale: Locale;
  surface: BrandPreviewSurface;
  title: string;
  description: string;
  canonical: string;
};

export function buildRouteSocialMetadata({
  locale,
  surface,
  title,
  description,
  canonical,
}: RouteSocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const preview = brandPreviewUrl(locale, surface);
  const isSpanish = locale === "es";

  return {
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "IA Empleado",
      locale: isSpanish ? "es_ES" : "en_US",
      alternateLocale: [isSpanish ? "en_US" : "es_ES"],
      title,
      description,
      images: [{ url: preview, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [preview],
    },
  };
}
