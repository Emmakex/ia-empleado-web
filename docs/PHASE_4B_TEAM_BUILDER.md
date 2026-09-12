# Phase 4B — Team Builder / Diseña tu Equipo IA

## Purpose

Phase 4B turns the commercial CTA “Diseña tu Equipo IA / Design your AI Team” into an actual guided experience.

The builder is **not** a production orchestrator, provisioning screen or technical sizing engine. It is a public commercial and educational tool that helps a visitor map business context to the existing IA Empleado catalog.

Canonical public routes:

- ES: `/disena-tu-equipo-ia`
- EN: `/en/design-your-ai-team`

## Product boundary

The builder must remain inside `ia-empleado-web`.

It may:

- use the published 22-profile Employee taxonomy;
- use the four published AI Team reference compositions;
- recommend a bounded set of catalog roles;
- explain why each role appears;
- expose natural role-to-role relationships;
- flag restricted/high-impact areas;
- prepare an email summary for a commercial follow-up.

It must not:

- activate or provision an AI Employee;
- connect to customer systems;
- claim that a selected system has a ready connector;
- grant permissions or authority;
- infer regulated eligibility or ranking decisions;
- send configuration data to a server in this phase;
- present the output as a final technical proposal.

## Recommendation model

Phase 4B intentionally uses deterministic, explainable scoring rather than a generative model.

Inputs:

1. primary sector;
2. business problems;
3. departments involved;
4. systems already present in the workflow.

Role scoring prioritizes:

- direct business-problem matches;
- department matches;
- sector relevance;
- task overlap implied by selected system types;
- existing deep Reference Employee profiles as a small tie-breaker.

The output is capped to a small composition rather than presenting all matching catalog roles.

## Restricted areas

Profiles marked `restricted` in the canonical Employee discovery catalog are never emitted as normal recommended roles.

When a selected problem intersects a restricted/high-impact profile, the UI must show a review warning instead.

Current restricted areas remain:

- Recruitment Selection;
- Financial Decisions.

These require dedicated product, legal, risk and human-oversight review before any commercial or technical design.

## Systems

System choices are context signals only:

- Email;
- CRM;
- ERP;
- Calendar / scheduling;
- Ecommerce;
- Ticketing / support;
- Documents / OCR;
- Booking / reservations;
- Reporting / BI;
- APIs / internal systems.

Selecting a system does **not** assert connector availability.

The builder maps each system category to task types already present in the catalog and uses that overlap as one recommendation signal.

## Reference Team match

The builder compares the same visitor selection against the four existing Team reference models:

- Sales;
- Ecommerce;
- Administration;
- Travel.

If one model has sufficient overlap, it is presented as the closest published reference composition with a link to its canonical page.

This does not mean the customer must deploy that complete composition.

## Handoffs

The result surfaces a small set of natural connections between recommended roles using the existing `relatedKeys` graph in the Employee catalog.

A handoff means only that two roles have a natural process relationship. It does not imply:

- shared unrestricted memory;
- shared credentials;
- universal data access;
- autonomous authority.

Only the context required for the approved process should cross a role boundary.

## Privacy baseline

The configuration is calculated in the browser.

Phase 4B does not POST selections to a backend and does not add a tracking dependency.

The commercial CTA generates a `mailto:` draft containing the selected context and suggested composition. The visitor decides whether to send it from their own email client.

## SEO / GEO

The Team Builder route is indexable and bilingual.

Critical explanatory content remains server-rendered even though the configurator itself is a client component.

The page includes:

- canonical + hreflang;
- sitemap coverage;
- explicit definition and scope;
- methodology explanation;
- interpretation guidance;
- visible limitations;
- FAQ;
- `WebPage`, `ItemList` and `FAQPage` structured data.

The recommendation result itself is not required for indexing because it depends on user input.

## Accessibility and responsive behavior

Requirements:

- all configuration controls are real buttons;
- multi-select choices expose `aria-pressed`;
- result updates use an `aria-live` region;
- fieldsets and legends group related choices;
- keyboard usage must not depend on pointer interaction;
- sticky desktop result becomes normal flow on smaller screens;
- mobile options collapse to two and then one column;
- reduced-motion preferences disable optional transitions.

## Conversion path

The global CTA now routes to the Team Builder.

The builder output prepares a commercial email summary containing:

- selected sector;
- selected problems;
- selected departments;
- selected systems;
- closest reference team when present;
- recommended roles;
- validation disclaimer.

No configuration is stored by the public website in this phase.

## Release gate

Phase 4B is complete only when:

1. ES and EN routes exist;
2. the deterministic recommendation engine uses canonical Employee and Team data;
3. restricted profiles cannot appear as normal recommendations;
4. canonical/hreflang and sitemap are present;
5. the global CTA routes to the builder;
6. the dedicated Team Builder CI contract passes;
7. TypeScript passes;
8. production build passes;
9. `main` CI passes after merge;
10. Hostinger production behavior is visually verified on desktop and mobile.
