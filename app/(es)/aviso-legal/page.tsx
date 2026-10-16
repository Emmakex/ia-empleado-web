import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../components/legal-document-page";
import { getLegalDocumentContent, legalNoticePath } from "../../../lib/legal-content";
import { getPhase5SeoPolicy } from "../../../lib/conversion-seo-policy";

const content = getLegalDocumentContent("es", "legal-notice");
const policy = getPhase5SeoPolicy("legal-notice");
const canonical = legalNoticePath("es");
const alternate = legalNoticePath("en");

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
  },
  robots: { index: policy.index, follow: policy.follow },
};

export default function SpanishLegalNoticePage() {
  return <LegalDocumentPage locale="es" kind="legal-notice" />;
}
