import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../../components/legal-document-page";
import {
  getLegalDocumentContent,
  isLegalIdentityComplete,
  legalNoticePath,
} from "../../../../lib/legal-content";

const content = getLegalDocumentContent("en", "legal-notice");
const canonical = legalNoticePath("en");
const alternate = legalNoticePath("es");
const ready = isLegalIdentityComplete();

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  robots: { index: ready, follow: true },
};

export default function EnglishLegalNoticePage() {
  return <LegalDocumentPage locale="en" kind="legal-notice" />;
}
