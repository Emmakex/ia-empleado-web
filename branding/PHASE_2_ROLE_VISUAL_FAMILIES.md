# IA Empleado — Branding Phase 2A: role visual families

Status: **Complete and production-verified — 2026-09-12**

## Goal

Branding Phase 2A turns the four canonical Reference Employees into reusable visual families without changing their approved faces or inventing new character identities.

The character portrait remains the identity anchor. Role differentiation is expressed through workflow geometry, system context, accent color and the kind of governed work surrounding each employee.

## Canonical families

| Employee | Role | Motif | Visual meaning |
| --- | --- | --- | --- |
| Clara | Customer Support / Atención al Cliente | `conversation` | request → context → resolution |
| Alex | Administration / Administración | `operations` | request → document → follow-up |
| Sofía | Accounting & Billing / Contabilidad y Facturación | `ledger` | invoice → validation → record |
| Javier | Sales / SDR / Comercial | `pipeline` | lead → qualification → follow-up |

Each family also carries three representative system categories and one explicit human-control statement. These labels explain the workflow visually; they do not claim that every customer deployment includes those exact connectors.

## Implementation contract

- `lib/brand-characters.ts` owns localized role-family data.
- `components/brand-role-family-scene.tsx` is the reusable renderer.
- `app/brand-role-families.css` owns the four visual grammars and responsive behavior.
- `components/employee-detail-page.tsx` applies the family scene to all four deep Reference Employee pages.
- `scripts/check-role-visual-families.mjs` protects the static contract.
- `tests/role-visual-families.spec.ts` protects browser geometry, identity mapping and EN/ES parity.
- production release marker: `branding-phase-2a-role-families`.

## Identity safety

The following are hard requirements:

1. Clara, Alex, Sofía and Javier continue to use the approved canonical WebP portraits.
2. Role motifs must surround/support the portrait rather than redraw the person.
3. No role family may imply unlimited authority, connector availability or autonomous high-impact decisions.
4. Human-control language remains visible in each composition.
5. ES and EN ship together.
6. Mobile reflow and reduced-motion compatibility are required.
7. The role-family renderer must be reusable in later Team, Department, Sector and campaign compositions.

## Production verification

Phase 2A closed only after the deployed Hostinger site passed the same browser contracts used in CI.

Evidence:

- merged implementation: PR #45;
- main release commit: `6f4220c53509398a714b5ff59e90b7280ab0a0b3`;
- Web CI #107 / run `34717087126`: **success**;
- Hostinger served release marker `branding-phase-2a-role-families` before production browser QA began;
- Production Verification #3 / run `34717199794`: **success**;
- production Playwright step `Verify production geometry, role families, responsive UX and accessibility`: **success**;
- failure diagnostics were not uploaded because the production gate completed cleanly.

## Release criteria result

All Phase 2A exit criteria are satisfied:

- all four deep ES employee pages render their correct family and motif;
- all four EN equivalents preserve the same canonical mapping;
- flow, systems and human-control elements remain contained on desktop and mobile;
- no family creates horizontal overflow;
- static role-family contract, TypeScript, browser QA and production build pass;
- Hostinger serves the expected Phase 2A marker;
- production Playwright passes against `iaempleado.com`.

## Next — Branding Phase 2B

Reuse the same role-family grammar inside richer **Team and Department compositions**. The next phase must make collaboration visually legible — role handoffs, shared systems and human approval — without creating a second visual language or changing the approved character identities.
