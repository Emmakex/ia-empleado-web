import type { Metadata } from "next";
import { RequestDemoPage } from "../../../../components/request-demo-page";
import {
  getConversionHandoffContent,
  requestDemoPath,
  type SearchParamRecord,
} from "../../../../lib/conversion-handoff";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = getConversionHandoffContent("en");
const canonical = requestDemoPath("en");
const alternate = requestDemoPath("es");
const preview = brandPreviewUrl("en", "home");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: "IA Empleado",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    title: content.seoTitle,
    description: content.seoDescription,
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default async function RequestDemoEnglishPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  return <RequestDemoPage locale="en" searchParams={await searchParams} />;
}
