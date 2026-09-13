# IA Empleado Web — Phase 7A: Conversion Handoff

Status: **Complete and production-verified — 2026-09-13**

## Goal

Web Phase 7A gives `iaempleado.com` one truthful, bilingual high-intent conversion destination instead of mixing Team Builder navigation with a raw `mailto:` link.

Canonical routes:

- ES: `/solicitar-demo`
- EN: `/en/request-demo`

The page preserves useful commercial context while keeping the public website independent from a CRM or private IA Empleado runtime.

## Context contract

High-intent links may pass only these public query fields:

- `intent` — one of `demo`, `team`, `process`, `employee`, `integration`, `private-deployment`;
- `source` — bounded source identifier for the public journey;
- `context` — bounded human-readable page/use-case context.

Unknown intents fall back to `demo`. Source and context are normalized and length-limited before rendering or preparing an email.

Canonical URLs never include query-state variants. ES/EN alternate links also point to the clean canonical route.

## Transport boundary

Phase 7A does **not** pretend a CRM or form backend exists.

The current verified contact channel is:

`hola@iaempleado.com`

The page collects name, contact email, optional company and the process/need locally in the browser. Clicking the primary action prepares a structured `mailto:` message and opens the visitor's email application.

The website therefore does not claim that:

- the form was submitted;
- a CRM record was created;
- an email was delivered;
- the public website stored the visitor's personal data.

A future CRM/webhook adapter may replace the transport while keeping the same route, intent/source/context model and CTA architecture.

## Initial journey scope

Phase 7A changes the highest-leverage public paths first:

1. desktop and mobile header CTA → Request demo;
2. Team Builder remains an exploration/configuration tool inside the Tools menu;
3. homepage hero primary CTA goes directly to Team Builder;
4. homepage final CTA → Request demo with `source=home-final` and localized context;
5. request-demo routes are added to the sitemap as clean canonical pages.

Interactive-result state propagation is intentionally deferred rather than serializing arbitrary user input into URLs.

## Privacy contract

- no network submission in the Phase 7A form;
- no `fetch()` or hidden API endpoint;
- no localStorage/sessionStorage persistence;
- no CRM claim until a real provider/transport is configured;
- visible explanation that data remains in the browser until the user chooses to send from their email application;
- query context is bounded and normalized;
- no query-state variants in canonical metadata or sitemap.

## Implementation contract

- `lib/conversion-handoff.ts` — routes, allowed intents, context normalization and mailto construction;
- `components/request-demo-page.tsx` — bilingual conversion page and context summary;
- `components/lead-handoff-form.tsx` — local-only form and explicit email handoff;
- `app/(es)/solicitar-demo/page.tsx` — Spanish canonical route;
- `app/(en)/en/request-demo/page.tsx` — English canonical route;
- `app/conversion-handoff.css` — responsive handoff UI;
- `scripts/check-conversion-handoff.mjs` — static phase contract;
- `tests/conversion-handoff.spec.ts` — browser/mobile/context/mailto contract;
- production release marker: `web-phase-7a-conversion-handoff`.

## Validation contract

Static CI verifies:

- both canonical routes and EN/ES metadata exist;
- the six allowed intents stay explicit;
- query normalization and length limits remain present;
- the contact destination remains explicit;
- the form uses browser validation and email handoff rather than a fake API submission;
- header and homepage use the shared route helper;
- Team Builder remains separately addressable;
- clean request-demo routes are in the sitemap;
- both layouts use the Phase 7A release marker;
- production verification includes the conversion handoff browser suite.

Browser QA verifies:

- ES and EN routes render;
- intent/source/context survive a valid handoff;
- invalid intent safely falls back to `demo`;
- CR/LF source input is normalized;
- required form fields exist;
- the generated email contains structured lead and journey context;
- mobile layout has no horizontal overflow;
- the page explains the no-storage/no-CRM transport boundary.

## Production evidence

Implementation and release evidence for 2026-09-13:

- implementation PR: **#53 — `feat: add bilingual conversion handoff`**;
- validated PR head: `4627c719208865dd7933480c6cc71ad72351b6a7`;
- PR Web CI: **#132**, run `34746767088` — success;
- PR gates passed: EN/ES parity, all historical product/branding contracts, Conversion handoff contract, TypeScript, Chromium browser QA and Next.js build;
- squash merge to `main`: **`c84768217190688394728b7a0f41d63e4691dcc8`**;
- post-merge Web CI: **#133**, run `34747014123` — success;
- Hostinger served release marker **`web-phase-7a-conversion-handoff`**;
- Production Verification: **#11**, run `34747171187` — success;
- production browser step **`Verify production geometry, brand systems, campaign media, conversion handoff, responsive UX and accessibility`** — success directly against `https://iaempleado.com`;
- production diagnostics upload — skipped because no browser failure occurred.

This evidence validates the deployed website contract. It does not imply that a CRM, webhook, backend form receiver or private runtime integration exists.

## Release criteria

Phase 7A is complete because:

1. ES and EN canonical request-demo routes exist;
2. global/header and homepage high-intent CTAs use the handoff route;
3. Team Builder remains a separate exploration tool;
4. source/context are bounded and normalized;
5. email handoff is truthful and structured;
6. no fake CRM/API submission exists;
7. sitemap and canonical metadata are correct;
8. static contract, TypeScript, browser QA and build pass;
9. PR CI #132 passed;
10. `main` CI #133 passed after merge;
11. Hostinger serves `web-phase-7a-conversion-handoff`;
12. Production Verification #11 passed directly against `https://iaempleado.com`;
13. production evidence is recorded in this document.

## Next likely phase

The next conversion phase can propagate selected, non-sensitive results from Team Builder / Process Analyzer into this handoff. A real CRM transport should be introduced **only after** a provider, authorization model, credentials and privacy/consent contract are explicitly configured and verified.