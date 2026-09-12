import type { Metadata } from "next";
import { CollaborationPage } from "../../../components/collaboration-page";
import { collaborationDemoPath, getCollaborationPageContent } from "../../../lib/collaboration-demo";
import { getDictionary } from "../../../lib/i18n";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const dictionary = getDictionary("es");
const content = getCollaborationPageContent("es");
const canonical = collaborationDemoPath("es");
const alternate = collaborationDemoPath("en");
const preview = brandPreviewUrl("es", "collaboration");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: {
      "es-ES": canonical,
      en: alternate,
      "x-default": canonical,
    },
  },
  openGraph: {
    type: "website",
    title: content.seoTitle,
    description: content.seoDescription,
    url: canonical,
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function SpanishCollaborationPage() {
  return <CollaborationPage locale="es" dictionary={dictionary} />;
}
