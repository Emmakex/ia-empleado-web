import type { Metadata } from "next";
import { CollaborationPage } from "../../../components/collaboration-page";
import { collaborationDemoPath, getCollaborationPageContent } from "../../../lib/collaboration-demo";
import { getDictionary } from "../../../lib/i18n";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../lib/conversion-seo-policy";

const dictionary = getDictionary("es");
const content = getCollaborationPageContent("es");
const policy = getPhase5SeoPolicy("collaboration");
const canonical = collaborationDemoPath("es");
const alternate = collaborationDemoPath("en");
const preview = brandPreviewUrl("es", "collaboration");
const seoTitle = policy.seoTitle?.es ?? content.seoTitle;
const seoDescription = policy.seoDescription?.es ?? content.seoDescription;

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  robots: { index: policy.index, follow: policy.follow },
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
    title: seoTitle,
    description: seoDescription,
    url: canonical,
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [{ url: preview, width: 1200, height: 630, alt: seoTitle }],
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [preview] },
};

export default function SpanishCollaborationPage() {
  return <CollaborationPage locale="es" dictionary={dictionary} />;
}
