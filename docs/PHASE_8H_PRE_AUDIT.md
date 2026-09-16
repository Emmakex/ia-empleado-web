# Phase 8H — Pre-audit before final commercial review

## Status

**COMPLETE — historical pre-audit, superseded by `PHASE_8H_FINAL_COMMERCIAL_READINESS.md`.**

Phase 8G closed on 2026-09-16 after automated/native browser coverage and manual physical-device validation were recorded. Phase 8H is now active.

The pre-audit correctly identified the public legal/privacy surface as the principal P0 launch blocker. The required owner/controller data has since been explicitly confirmed by the project owner and is no longer inferred or left as a placeholder.

## Confirmed legal identity for the Phase 8H implementation

- Owner / controller: Eduardo Jose Yauri Luna
- NIF: 60281451S
- Publishable address: Reina Amalia 8, 4 2, Barcelona, España
- Public legal/privacy contact: info@iaempleado.com

Commercial lead fallback remains a separate role-specific address (`hola@iaempleado.com`); the legal/privacy contact is `info@iaempleado.com`.

## Findings carried into active Phase 8H

The pre-audit established that:

- ES/EN structural parity is enforced in CI;
- conversion routes exist in both locales (`/solicitar-demo`, `/en/request-demo`);
- lead intake supports truthful email fallback and direct SMTP/webhook delivery only when configured;
- direct lead submission requires consent and a valid published privacy-notice URL;
- commercial copy uses scope qualifiers and avoids treating illustrative workflows as guaranteed outcomes;
- the public site has no baseline non-essential advertising/marketing tracker dependency;
- canonical visual identity, accessibility, motion, performance, SEO and automated browser coverage are protected by earlier Phase 8 gates.

## P0 legal/privacy implementation resulting from this audit

The active Phase 8H implementation now requires and protects:

- bilingual Privacy Policy routes (`/politica-de-privacidad`, `/en/privacy-policy`);
- bilingual Legal Notice routes (`/aviso-legal`, `/en/legal-notice`);
- canonical/hreflang metadata for those routes;
- footer links to the real legal/privacy destinations in both locales;
- a first-party privacy URL for direct lead consent (`https://iaempleado.com/politica-de-privacidad`);
- legal identity consistency across the public documents;
- a browser regression covering the four public legal routes;
- a CI contract that fails if the confirmed legal identity, legal links or privacy handoff disappear.

## Cookie / tracking posture

The current baseline intentionally loads no non-essential advertising or marketing tracking by default. A cookie banner must not be added merely as decoration.

If non-essential analytics or marketing technology is introduced later, the project must first inventory the provider and purpose, then add the consent mechanism and disclosures required by the actual implementation.

## Remaining active Phase 8H work

The pre-audit is no longer the source of truth for closure. Continue in `PHASE_8H_FINAL_COMMERCIAL_READINESS.md` with:

1. route-by-route claims and proof-language audit;
2. CTA and conversion-context audit;
3. semantic ES/EN content review beyond schema parity;
4. final desktop/iPhone/Android visual acceptance;
5. full Web CI and Production Verification on the exact release candidate;
6. final Phase 8 release gate before `kairoseth.iaempleado.com` is unblocked.
