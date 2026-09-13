import type { Metadata } from "next";
import { RequestDemoPage } from "../../../components/request-demo-page";
import {
  getConversionHandoffContent,
  requestDemoPath,
  type SearchParamRecord,
} from "../../../lib/conversion-handoff";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const content = getConversionHandoffContent("es");
const canonical = requestDemoPath("es");
const alternate = requestDemoPath("en");
const preview = brandPreviewUrl("es", "home");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
  },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: "IA Empleado",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    title: content.seoTitle,
    description: content.seoDescription,
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default async function RequestDemoSpanishPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  return <RequestDemoPage locale="es" searchParams={await searchParams} />;
}
