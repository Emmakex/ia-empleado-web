# IA Empleado — Branding Phase 2C: Sector-specific hero art

Status: **complete and production-verified — 2026-09-13**

## Goal

Branding Phase 2C gives each deep sector page a distinct operating-context visual without creating four unrelated illustration systems.

The new art must answer, at a glance:

1. what kind of operational flow defines this sector;
2. which approved AI Employees participate;
3. which representative systems provide context;
4. where human authority remains visible.

The visual layer remains explanatory. It does not assert that every displayed integration exists for every customer, that every step is autonomous, or that the depicted composition is a fixed package.

## Canonical sector scope

Phase 2C follows the actual sector model in `lib/sector-use-cases.ts`:

- `ecommerce` — Ecommerce;
- `travel` — Turismo y reservas / Travel and reservations;
- `professional-services` — Servicios profesionales / Professional services;
- `sales` — Ventas B2B / B2B sales.

There is no standalone Retail sector in the current content model, so Phase 2C does not invent one. A future Retail surface would require a product/content decision first.

## Shared renderer

`components/brand-sector-hero-art.tsx` is the single renderer for all four sector variants.

It reuses:

- the approved Clara / Alex / Sofía / Javier canonical assets;
- Phase 2A role-family motifs and functional cues;
- the existing sector role and system records;
- neutral treatment for catalog roles without a canonical character;
- an explicit human-control boundary;
- the light-first premium IA Empleado visual system.

Sector-specific art is therefore a controlled variation of the brand system rather than independent campaign illustration.

## Four operating signatures

### Ecommerce — Connected order

Visual meaning:

`request → order / stock → shipping / back office → resolution`

The signature uses order-card, fulfilment and movement cues. It communicates that customer conversation alone is not the workflow: order, stock, shipping and billing context must remain coordinated.

### Travel — Booking route

Visual meaning:

`inquiry → availability → booking → change / support`

The signature uses route and locator geometry. It must preserve the distinction between an option checked and a service actually confirmed by an authoritative supplier or booking system.

### Professional services — Traceable case file

Visual meaning:

`intake → documentation → preparation → human owner`

The signature uses a controlled document stack and approval cue. It reinforces that AI can absorb operational coordination while professional judgment, signature and consequential responsibility remain with qualified owners where required.

### B2B sales — Context-rich pipeline

Visual meaning:

`signal → research → follow-up → meeting / decision`

The signature uses a narrowing pipeline. It communicates continuity and CRM discipline rather than indiscriminate autonomous outreach; negotiation, claims and consequential commercial commitments remain bounded.

## Surface boundaries

### Deep sector pages

All four deep sector pages in ES and EN render `BrandSectorHeroArt`.

### Sector index

The general sector index continues to use `BrandContextScene` because it represents the cross-sector IA Empleado system rather than one specific operating context.

### Use-case pages

Use-case index/detail surfaces continue to use `BrandContextScene`. Their unit of meaning is the reusable process pattern, not a sector identity.

This separation prevents sector and process semantics from collapsing into one visual layer.

## Identity and truthfulness boundaries

1. Canonical character identities are reused, not redrawn or renamed.
2. Role motifs come from Phase 2A.
3. Non-canonical catalog roles remain neutral.
4. Displayed system chips come from the existing sector content and remain representative, not universal connector claims.
5. Human approval remains visually separate from automated or assisted work.
6. Sector-specific shapes must communicate operating context, not decorative sci-fi.
7. EN/ES ship together.
8. Responsive reflow and reduced-motion behavior are release requirements.

## Implementation contract

- `components/brand-sector-hero-art.tsx` — shared renderer and bilingual operating-signature copy.
- `app/brand-sector-hero-art.css` — four sector grammars, responsive geometry and reduced-motion behavior.
- `components/sector-detail-page.tsx` — deep-sector integration.
- `scripts/check-sector-hero-art.mjs` — Phase 2C static contract.
- `tests/sector-hero-art.spec.ts` — browser geometry/reflow contract.
- `scripts/check-character-image-delivery.mjs` — canonical responsive portrait delivery also covers sector art.
- production release marker: `branding-phase-2c-sector-hero-art`.

## Browser validation contract

Desktop coverage includes every deep sector route in both languages:

- 4 sectors × 2 locales = 8 routes.

Mobile stress coverage includes all four Spanish deep-sector routes at 390 px.

The browser gate verifies:

- correct `data-sector-art` mapping;
- correct sector-specific operational signature;
- canonical participant presence and known Phase 2A motifs;
- exactly four operating stages;
- system context remains visible;
- human-control boundary remains visible;
- functional blocks stay contained in the hero art;
- no horizontal page overflow on desktop or mobile.

## Production verification evidence

Phase 2C completed the full repository delivery contract:

- implementation PR: **#49 — `feat: add sector-specific hero art`**;
- PR head validated by **Web CI #118**, run `34733509269`;
- PR #49 squash-merged to `main` as `3962ba00e5a8a0e7300a08ce6ce4d28bd94e2375`;
- `main` passed **Web CI #119**, run `34734517951`;
- Hostinger published the release marker `branding-phase-2c-sector-hero-art`;
- **Production Verification #7**, run `34734671808`, passed directly against `https://iaempleado.com`;
- the production suite covered geometry, role families, Team/Department collaboration compositions, sector hero art, responsive UX and accessibility;
- production diagnostics upload was skipped because the suite completed without failure.

This evidence closes every Phase 2C release criterion below.

## Release criteria

Phase 2C is complete because:

1. all four real sector deep pages use the shared sector renderer in ES and EN;
2. the four operating signatures are distinct and semantically aligned with sector content;
3. canonical portraits use responsive `BrandCharacterImage` delivery;
4. static branding/sector/image contracts pass;
5. TypeScript and production build pass;
6. browser QA passes on all covered routes;
7. `main` CI passed after merge;
8. Hostinger serves `branding-phase-2c-sector-hero-art`;
9. Production Verification passed the sector-art suite against `https://iaempleado.com`;
10. production evidence is recorded here before advancing.

## Next — Branding Phase 2D

Adapt the stable identity, role, Team/Department and sector visual grammars into reusable campaign/social variants rather than creating isolated one-off art per channel. Phase 2D should preserve the same canonical identities, truthfulness boundaries, EN/ES parity and responsive/export contracts established by the website branding system.
