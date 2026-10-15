# Phase 2 — Batch 07: Employee onboarding

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the Day 26 employee-onboarding cluster. It strengthens the existing landing and guide instead of creating another onboarding URL.

## Intent ownership

- Commercial process landing: `/automatizacion-onboarding-empleados-ia` → `onboarding de empleados` / `employee onboarding automation`.
- Informational guide: `/blog/como-automatizar-onboarding-empleados-ia` → `proceso de onboarding` / `employee onboarding process`.
- Supporting employee role: `/empleados-ia/administrativo` remains `agente ia administrativo` / `ai administrative assistant` and does not own HR onboarding.
- Supporting bounded use case: `/casos-de-uso/documentacion-administrativa` remains focused on administrative document processing.

## Demand evidence

Semrush ES, 2026-10-15:

- `onboarding de empleados`: 210/month, KD 14.
- `onboarding empleados`: 70/month, KD 13.
- `onboarding automatizado`: 70/month, KD 10.
- `automatización onboarding`: 10/month.
- `proceso de onboarding`: 320/month, KD 19.
- `proceso onboarding`: 70/month, KD 21.
- `cómo hacer un onboarding`: 20/month.
- `ia para recursos humanos`: 40/month, KD 34; retained as adjacent vocabulary rather than a new canonical owner in this batch.

Semrush UK, 2026-10-15:

- `employee onboarding`: 12,100/month, KD 51.
- `employee onboarding process`: 390/month, KD 43.
- `onboarding automation`: 170/month, KD 25.
- `automated employee onboarding`: 110/month, KD 28.
- `employee onboarding automation`: 70/month.
- `automate employee onboarding`: 40/month.
- `HR onboarding automation`: 30/month.
- `how to automate employee onboarding`: 20/month.

## Why the owners are split

The landing owns the commercial/process-evaluation need: coordinating a real onboarding workflow across HR, IT, administration and managers. Its job is to explain scope, systems, authority boundaries, metrics and how the process could be implemented.

The guide owns the informational process-design need. It answers how an onboarding process should be mapped, validated and automated step by step. It can rank for broader process language without turning the landing into a tutorial.

The Administrative AI role is connected because onboarding contains document, record and follow-up work, but it must not absorb the HR/IT process category. The administrative-documentation use case is also connected as a narrower reusable pattern rather than a replacement for the full onboarding owner.

## Implementation

- Repositioned the existing Day 26 landing title, description, hero and direct-answer lead around `onboarding de empleados` / `employee onboarding automation`.
- Repositioned the existing Day 26 guide around `proceso de onboarding` / `employee onboarding process` while retaining the automation how-to angle.
- Added contextual links from the landing to the Administrative AI role and administrative-documentation use case.
- Added reciprocal product/use-case links from the guide.
- Added a Phase 2 SEO override registry so researched historical optimizations can be applied without rewriting large immutable daily source files.
- Added Playwright coverage for ES/EN canonicals, optimized metadata/H1s and reciprocal cluster links.
- Added an auditable Batch 07 ownership record.

No new indexable SEO URL, merge, redirect or noindex action is introduced in this batch.
