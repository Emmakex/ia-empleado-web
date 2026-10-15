# Phase 2 — Batch 05: Accounting and invoices

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the accounting and invoicing cluster without creating new indexable URLs.

## Intent ownership

- Employee role: `/empleados-ia/contabilidad-facturacion` → `ia para contabilidad` / `ai for accounting`.
- Broad accounting commercial landing: `/automatizacion-facturacion-contabilidad-ia` → `automatización contable` / `accounting automation`.
- Broad accounting informational guide: `/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana` → `automatizar contabilidad` / `how to automate accounting`.
- Invoice-processing commercial landing: `/automatizacion-facturas-ia-empresas` → `automatización de facturas` / `invoice automation`.
- Invoice-processing informational guide: `/blog/como-automatizar-procesamiento-facturas-ia` → `cómo automatizar facturas con IA` / `how to automate invoice processing`.
- Bounded use case: `/casos-de-uso/validacion-facturas` → `validación de facturas` / `invoice validation`.

## Demand evidence

Semrush ES, 2026-10-15:

- `ia para contabilidad`: 210/month, KD 46.
- `ia contable`: 110/month, KD 50.
- `automatizacion contable`: 110/month, KD 25.
- `automatización de facturas`: 170/month, KD 25.
- `automatizacion de facturas`: 140/month, KD 19.
- `automatización de cuentas por pagar`: 90/month, KD 22.
- `procesamiento de facturas`: 50/month, KD 21.
- `automatizar contabilidad`: 30/month.
- exact Spanish invoice how-to variants had no meaningful reported volume.
- `validación de facturas`: 10/month; `validacion de facturas`: 20/month.

Semrush UK, 2026-10-15:

- `ai for accounting`: 390/month, KD 63.
- `ai accountant`: 1,000/month, KD 47.
- `accounting automation`: 590/month, KD 34.
- `automated accounting`: 170/month, KD 19.
- `invoice automation`: 720/month, KD 39.
- `automated invoice processing`: 1,000/month, KD 38.
- `invoice processing automation`: 320/month, KD 33.
- `accounts payable automation`: 1,300/month, KD 44.
- `how to automate accounting`: 30/month.
- `how to automate invoice processing`: 110/month, KD 46.
- `automate invoice processing`: 210/month, KD 49.
- `invoice validation`: 110/month, KD 14.

## Implementation

- Reassigned supporting keywords so the employee profile no longer tries to own accounting-automation demand.
- Repositioned the broad accounting landing around `accounting automation`, explicitly excluding invoice-processing category ownership.
- Repositioned the broad accounting how-to guide around accounting implementation intent.
- Kept and expanded the existing Day 24 invoice-processing landing instead of creating a duplicate URL.
- Kept and expanded the existing Day 24 invoice-processing guide as its informational support owner.
- Added contextual links from both commercial landings and both guides to the accounting role and invoice-validation use case.
- Added Playwright coverage for 12 ES/EN canonical surfaces plus reciprocal cluster links.
- Expanded the auditable Batch 05 ownership record to six existing URL owners.

No new SEO URL, merge, redirect or noindex action is introduced in this batch.
