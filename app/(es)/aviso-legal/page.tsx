import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../components/legal-document-page";
import {
  getLegalDocumentContent,
  isLegalIdentityComplete,
  legalNoticePath,
} from "../../../lib/legal-content";

const content = getLegalDocumentContent("es", "legal-notice");
const canonical = legalNoticePath("es");
const alternate = legalNoticePath("en");
const ready = isLegalIdentityComplete();

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
  },
  robots: { index: ready, follow: true },
};

export default function SpanishLegalNoticePage() {
  return <LegalDocumentPage locale="es" kind="legal-notice" />;
}
