# Phase 2 — Batch 08: Leave management

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the Day 27 vacation and absence cluster. It strengthens the existing landing and guide rather than creating another HR URL.

## Intent ownership

- Commercial process landing: `/automatizacion-vacaciones-ausencias-ia` → `gestión de vacaciones` / `leave management`.
- Informational guide: `/blog/como-automatizar-vacaciones-ausencias-ia` → `planificar vacaciones empleados` / `how to manage employee absence`.
- Supporting employee role: `/empleados-ia/administrativo` remains `agente ia administrativo` / `ai administrative assistant` and does not own leave policy or employee-rights intent.
- Supporting bounded use case: `/casos-de-uso/documentacion-administrativa` remains a document-processing pattern only.

## Demand evidence

Semrush ES, 2026-10-15:

- `gestión de vacaciones`: 110/month, KD 10; unaccented `gestion de vacaciones`: 260/month, KD 12.
- `gestión de ausencias`: 140/month, KD 21; unaccented `gestion de ausencias`: 110/month, KD 20.
- `gestión de vacaciones empleados`: 50/month, KD 8; unaccented variant: 70/month, KD 10.
- `gestion vacaciones empresa`: 70/month, KD 9.
- `planificar vacaciones empleados`: 20/month, KD 11.
- `gestionar vacaciones empleados`: 10/month.

Semrush UK, 2026-10-15:

- `leave management`: 720/month, KD 11.
- `employee leave management`: 210/month, KD 9.
- `leave management system`: 1,000/month, KD 24.
- `absence management`: 1,900/month, KD 30.
- `holiday management`: 90/month, KD 5.
- `how to manage employee absence`: 70/month, KD 23.
- `absence management process`: 70/month, KD 15.
- `manage employee absence`: 30/month.

## Why the owners are split

The landing owns the commercial/process-evaluation need: receiving leave requests, checking balances and policy, reviewing coverage and overlaps, routing approvals and updating HR systems. `Gestión de vacaciones` is the cleaner Spanish acquisition phrase for this page, while `gestión de ausencias` remains supporting vocabulary because it can also imply sickness and broader absenteeism topics.

The guide owns planning/how-to intent. In Spanish the exact how-to variants have limited reported volume, so it targets the documented planning need rather than forcing the same category query onto two URLs. In English, `how to manage employee absence` provides a clear informational owner.

The Administrative AI role can support request intake, records and follow-up, but it is not the authority for leave policy, employment rights, medical information or sensitive exceptions. Administrative-documentation remains a narrower evidence/forms pattern.

## Implementation

- Repositioned the existing Day 27 landing title, description, hero and direct-answer lead around `gestión de vacaciones` / `leave management`.
- Repositioned the existing Day 27 guide around planning/how-to intent.
- Added contextual links from the landing to the Administrative AI role while retaining the paired guide and broader hubs.
- Added reciprocal links from the guide to the leave-management owner, Administrative AI role and bounded document workflow.
- Added researched ES/UK evidence to the Phase 2 override registry and ownership audit.
- Added Playwright coverage for ES/EN canonicals, metadata/H1s and reciprocal links.

No new indexable SEO URL, merge, redirect or noindex action is introduced in this batch.
