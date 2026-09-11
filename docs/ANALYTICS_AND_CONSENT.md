# Analytics and Consent Baseline / Base de Analítica y Consentimiento

## Purpose

This document defines the initial privacy-safe analytics contract for `iaempleado.com`.

The commercial website must be measurable, but measurement must not become a reason to load unnecessary third-party tracking, leak visitor data or block the site on consent tooling.

## Bootstrap decision

At Web Phase 0 / Web Phase 1:

- no advertising pixel is required for the site to render or function;
- no non-essential third-party analytics script is loaded by default;
- no marketing cookie is created by the application baseline;
- essential server/hosting operational logs may exist under the hosting provider's normal infrastructure contract;
- future analytics providers must be added only after the event model, data minimization, retention and consent requirements are documented;
- consent-sensitive tracking must remain disabled until the corresponding consent state authorizes it.

This is intentionally conservative. It prevents the first commercial release from creating an undocumented privacy dependency simply to collect page views.

## Measurement model

When analytics is introduced, prioritize business and product-learning events rather than indiscriminate tracking.

Candidate first-party event vocabulary:

```text
page_view
cta_click
employee_profile_view
team_profile_view
workflow_explainer_start
workflow_explainer_complete
language_change
lead_start
lead_submit
meeting_booked
```

Do not send free-form visitor text, confidential business descriptions, form contents or credentials as analytics properties.

## Attribution context

Where consent and privacy rules permit, conversion events may carry bounded context such as:

- locale;
- landing path;
- employee/team/use-case identifier;
- CTA identifier;
- referrer class;
- campaign parameters supplied by the visitor URL;
- configurator completion state expressed through non-sensitive enumerated values.

Sensitive company information must not be copied into analytics merely because it appears in a lead form or future Team Builder.

## Consent architecture

When a consent manager becomes necessary, it must support at least:

- essential-only operation without degraded core content;
- granular activation of non-essential analytics/marketing categories where legally required;
- deterministic consent state before optional scripts initialize;
- withdrawal/change of consent;
- EN/ES UI parity;
- keyboard and mobile accessibility;
- documented vendor inventory and purpose.

A consent banner must not be a dark pattern.

## Performance

Analytics and consent code is non-critical. It must not delay the primary page content, navigation or CTA rendering.

Any future provider must be evaluated for bundle/network impact and Core Web Vitals regressions.

## Current release gate

The current baseline passes when:

1. the website contains no undocumented non-essential tracking dependency;
2. functional behavior does not depend on analytics availability;
3. future conversion points use stable identifiers suitable for later instrumentation;
4. any provider introduction updates this document and the public privacy disclosures before release.
