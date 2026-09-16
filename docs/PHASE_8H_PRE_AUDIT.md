# Phase 8H — Pre-audit before final commercial review

## Status

**PRE-AUDIT ONLY. Phase 8H is not active yet.**

Phase 8G remains active until the real-device acceptance tracked in issue #103 is complete. This document prepares the final commercial/content review so work can continue without misrepresenting the Phase 8G state.

Baseline reviewed: `b1d5acc7971efeb4a17844ecd283cb4b967300f5`.

## What is already in good shape

- ES/EN structural parity is enforced in CI.
- Conversion routes exist in both locales (`/solicitar-demo`, `/en/request-demo`).
- Lead intake supports truthful email fallback and direct SMTP/webhook delivery only when configured.
- Direct lead submission requires consent and a valid published privacy-notice URL.
- Commercial copy already uses useful scope qualifiers such as illustrative/reference scenarios, per-client validation, configured authority and human approval.
- The public site currently has no baseline non-essential advertising/marketing tracker dependency.
- Canonical visual identity, accessibility, motion, performance, SEO and automated browser coverage are already protected by earlier Phase 8 gates.

## P0 launch blocker — public legal/privacy surface is incomplete

The repository does not currently expose dedicated public routes for:

- privacy policy / privacy notice;
- legal notice / site ownership information;
- cookie policy, if/when non-essential cookies or consent-managed tracking are introduced.

`components/site-footer.tsx` currently shows only the product disclaimer (`IA Empleado is a product metaphor...`) and product/resource links. It does not expose legal/privacy navigation.

The direct lead intake architecture expects `LEAD_PRIVACY_NOTICE_URL` to point to a published privacy notice. SMTP/webhook direct submission is intentionally disabled unless that URL is valid. This is the correct technical safeguard, but final launch readiness requires the notice itself to be intentionally published and linked from the public site.

### Required decision/input before implementation

Do not invent legal identity data. Before publishing the legal notice/privacy controller section, confirm the real legal owner/controller of `iaempleado.com` and the production contact details that must appear publicly. Depending on the final owner and jurisdiction, this may include:

- legal entity / controller name;
- tax/VAT identifier where required;
- registered/contact address where required;
- public contact email;
- company registry details where applicable;
- data-protection contact channel;
- hosting/processor or relevant vendor disclosure where required;
- retention and lawful-basis wording for commercial lead handling.

Until those facts are confirmed, legal pages must not ship with placeholders or invented entity information.

## P0 launch blocker — footer/legal navigation

Final footer acceptance should include intentional ES/EN links for the published legal/privacy surfaces. Current `Privacidad y control` is a product/security section link, not a legal privacy notice.

Recommended final footer grouping:

- Privacy / Privacidad
- Legal notice / Aviso legal
- Cookie policy / Política de cookies only when applicable
- Contact (`hola@iaempleado.com`) where commercially appropriate

The product-metaphor disclaimer should remain separate from legal navigation.

## P0 launch blocker — direct lead privacy notice consistency

Current direct submission behavior is sound:

- direct mode is enabled only when transport + privacy notice URL are configured;
- the form requires explicit consent;
- the selected privacy notice URL is recorded with the lead payload;
- otherwise the form falls back to preparing an email and does not pretend a direct submission occurred.

Final 8H acceptance must verify that the configured production `LEAD_PRIVACY_NOTICE_URL` resolves to the exact current public privacy notice and that the consent wording matches the published notice.

## P1 commercial review — claims and proof language

Current homepage copy is generally cautious and should be preserved:

- workflow examples are described as educational/illustrative;
- authority depends on configuration, integrations and policies;
- team examples are described as reference commercial models;
- catalogue copy avoids presenting every profile as immediately available;
- private deployment is described as an architectural option rather than a universal deployment guarantee.

8H should still perform a route-by-route claim audit, especially on employee, team, integration, sector, use-case and comparison detail pages. Any absolute or measurable claim must either have evidence or be rewritten as capability/scope language.

## P1 commercial review — CTA intent consistency

Primary conversion intent is currently coherent around:

- design an AI team;
- improve a process;
- request a demo;
- evaluate an employee/integration/private deployment.

8H must verify every visible CTA resolves to one of the intentional public destinations and preserves useful handoff context. No CTA should point to an unfinished/internal renderer route.

## P1 content review — ES/EN parity beyond schema parity

CI protects structural parity, but final commercial acceptance must review meaning, not only keys.

Verify:

- equivalent commercial promises in ES and EN;
- consistent naming for Employee / Team / Department / Integration / Use case concepts;
- equivalent qualifiers and disclaimers;
- privacy/legal pages published in both languages or with an intentional documented language policy;
- no stale temporary wording from earlier build phases.

## P1 privacy/cookie posture

Current analytics baseline intentionally loads no non-essential advertising/marketing tracking by default. Therefore a consent banner should not be added merely for decoration.

If a non-essential analytics or marketing provider is introduced before launch, 8H must reopen consent scope and require:

- vendor/purpose inventory;
- consent-gated initialization where required;
- withdrawal/change mechanism;
- ES/EN accessible consent UI;
- updated privacy/cookie disclosures;
- performance regression review.

## P1 unfinished/public-surface review

The final audit must verify there are no customer-visible placeholders, debug labels, development-only claims or orphaned sections.

Special attention:

- internal brand preview/campaign renderer routes remain non-indexed/internal and absent from navigation;
- demo/interactive scenes remain clearly illustrative, not represented as live customer integrations;
- contact success/failure wording must match actual delivery guarantees;
- footer, legal and contact coverage must remain usable on mobile and keyboard.

## Proposed Phase 8H implementation order after 8G closes

1. Confirm legal owner/controller and public legal contact details.
2. Implement bilingual privacy + legal routes with proper metadata/canonical/hreflang.
3. Connect footer legal navigation and production `LEAD_PRIVACY_NOTICE_URL`.
4. Add static/runtime tests for legal routes, footer links and lead privacy URL consistency.
5. Audit all CTAs and conversion context.
6. Audit claims/disclaimers across all commercial families.
7. Review ES/EN content meaning and naming consistency.
8. Run full Web CI + exact-SHA Production Verification.
9. Perform final manual visual/content acceptance.
10. Close Phase 8 and only then unblock implementation of `kairoseth.iaempleado.com`.

## Closure rule

This pre-audit does not close any Phase 8 gate. Phase 8H may only be marked active after Phase 8G real-device acceptance is complete. Phase 8 may only close after the final commercial/content, legal/privacy, CI, production and manual visual gates are all green.
