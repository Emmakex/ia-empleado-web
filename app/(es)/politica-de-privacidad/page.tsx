import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../components/legal-document-page";
import {
  getLegalDocumentContent,
  isLegalIdentityComplete,
  privacyPolicyPath,
} from "../../../lib/legal-content";

const content = getLegalDocumentContent("es", "privacy-policy");
const canonical = privacyPolicyPath("es");
const alternate = privacyPolicyPath("en");
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

export default function SpanishPrivacyPolicyPage() {
  return <LegalDocumentPage locale="es" kind="privacy-policy" />;
}
