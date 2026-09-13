import type { Locale } from "../lib/i18n";
import type { RoleReference, SectorKey } from "../lib/sector-use-cases";
import { getBrandCharacterByEmployeeKey } from "../lib/brand-characters";
import { BrandCharacterImage } from "./brand-character-image";

type BrandSectorHeroArtProps = {
  locale: Locale;
  sectorKey: SectorKey;
  eyebrow: string;
  title: string;
  roles: RoleReference[];
  systems: string[];
  humanLabel: string;
};

type SectorVisualCopy = {
  signature: string;
  signatureDetail: string;
  stages: [string, string, string, string];
};

const sectorVisualCopy: Record<SectorKey, Record<Locale, SectorVisualCopy>> = {
  ecommerce: {
    es: {
      signature: "Pedido conectado",
      signatureDetail: "Cliente, stock, envío y facturación comparten contexto operativo.",
      stages: ["Solicitud", "Pedido / stock", "Envío / back office", "Resolución"],
    },
    en: {
      signature: "Connected order",
      signatureDetail: "Customer, stock, shipping and billing share operational context.",
      stages: ["Request", "Order / stock", "Shipping / back office", "Resolution"],
    },
  },
  travel: {
    es: {
      signature: "Ruta de reserva",
      signatureDetail: "Consulta, disponibilidad, confirmación y cambios conservan la fuente real.",
      stages: ["Consulta", "Disponibilidad", "Reserva", "Cambio / soporte"],
    },
    en: {
      signature: "Booking route",
      signatureDetail: "Inquiry, availability, confirmation and changes preserve the authoritative source.",
      stages: ["Inquiry", "Availability", "Booking", "Change / support"],
    },
  },
  "professional-services": {
    es: {
      signature: "Expediente trazable",
      signatureDetail: "Correo, documentos, CRM y facturación se coordinan alrededor del trabajo experto.",
      stages: ["Entrada", "Documentación", "Preparación", "Responsable humano"],
    },
    en: {
      signature: "Traceable case file",
      signatureDetail: "Email, documents, CRM and billing coordinate around expert work.",
      stages: ["Intake", "Documentation", "Preparation", "Human owner"],
    },
  },
  sales: {
    es: {
      signature: "Pipeline con contexto",
      signatureDetail: "Señal, research, seguimiento y CRM avanzan sin convertir el proceso en spam autónomo.",
      stages: ["Señal", "Research", "Seguimiento", "Reunión / decisión"],
    },
    en: {
      signature: "Context-rich pipeline",
      signatureDetail: "Signal, research, follow-up and CRM progress without turning the workflow into autonomous spam.",
      stages: ["Signal", "Research", "Follow-up", "Meeting / decision"],
    },
  },
};

export function BrandSectorHeroArt({
  locale,
  sectorKey,
  eyebrow,
  title,
  roles,
  systems,
  humanLabel,
}: BrandSectorHeroArtProps) {
  const copy = sectorVisualCopy[sectorKey][locale];
  const canonical = roles
    .map((role) => role.employeeKey ? getBrandCharacterByEmployeeKey(role.employeeKey, locale) : undefined)
    .filter((character): character is NonNullable<typeof character> => Boolean(character));
  const neutralRoles = roles.filter((role) => !role.employeeKey).slice(0, 2);
  const accessibleLabel = locale === "es"
    ? `Composición visual del sector ${title}: ${copy.signature}. ${humanLabel}`
    : `${title} industry visual composition: ${copy.signature}. ${humanLabel}`;

  return (
    <aside
      className="brand-sector-hero-art"
      data-sector-art={sectorKey}
      role="img"
      aria-label={accessibleLabel}
    >
      <span className="brand-sector-art-glow glow-a" aria-hidden="true" />
      <span className="brand-sector-art-glow glow-b" aria-hidden="true" />

      <div className="brand-sector-art-heading" aria-hidden="true">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>

      <div className="brand-sector-art-body" aria-hidden="true">
        <div className="brand-sector-art-roles">
          {canonical.slice(0, 3).map((character) => (
            <div
              className="brand-sector-art-person"
              data-accent={character.accent}
              data-role-motif={character.visualFamily.motif}
              key={character.id}
            >
              <span className="brand-sector-art-portrait">
                <BrandCharacterImage character={character} sizes="(max-width: 760px) 90px, 112px" eager />
              </span>
              <span className="brand-sector-art-person-copy">
                <strong>{character.name}</strong>
                <small>{character.shortRole}</small>
                <i>{character.visualFamily.flow[0]}</i>
              </span>
            </div>
          ))}

          {neutralRoles.length > 0 && (
            <div className="brand-sector-art-neutral-list">
              {neutralRoles.map((role) => <span key={role.name}>{role.name}</span>)}
            </div>
          )}
        </div>

        <div className="brand-sector-art-operating-view">
          <div className="brand-sector-art-signature" data-sector-signature={sectorKey}>
            <span className="brand-sector-signature-layer layer-a" />
            <span className="brand-sector-signature-layer layer-b" />
            <span className="brand-sector-signature-layer layer-c" />
            <div className="brand-sector-signature-mark">
              <span />
              <span />
              <span />
            </div>
            <div>
              <strong>{copy.signature}</strong>
              <small>{copy.signatureDetail}</small>
            </div>
          </div>

          <ol className="brand-sector-art-stage-track">
            {copy.stages.map((stage, index) => (
              <li key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="brand-sector-art-footer" aria-hidden="true">
        <div className="brand-sector-art-systems">
          <strong>{locale === "es" ? "Sistemas" : "Systems"}</strong>
          <div>{systems.slice(0, 4).map((system) => <span key={system}>{system}</span>)}</div>
        </div>
        <div className="brand-sector-art-human">
          <span>✓</span>
          <strong>{humanLabel}</strong>
        </div>
      </div>
    </aside>
  );
}
