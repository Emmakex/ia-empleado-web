# Phase 2 — Batch 05: Accounting and invoices

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the accounting and invoicing cluster without creating new indexable URLs.

## Intent ownership

- Employee role: `/empleados-ia/contabilidad-facturacion` → `ia para contabilidad` / `ai for accounting`.
- Commercial process landing: `/automatizacion-facturacion-contabilidad-ia` → `automatización contable` / `accounting automation`.
- Informational guide: `/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana` → `automatizar contabilidad` / `how to automate accounting`.
- Bounded use case: `/casos-de-uso/validacion-facturas` → `validación de facturas` / `invoice validation`.

## Demand evidence

Semrush ES, 2026-10-15:

- `ia para contabilidad`: 210/month, KD 46.
- `ia contable`: 110/month, KD 50.
- `automatizacion contable`: 110/month, KD 25.
- `automatización de facturas`: 170/month, KD 25.
- `automatización de cuentas por pagar`: 90/month, KD 22.
- `automatizar contabilidad`: 30/month.
- `validación de facturas`: 10/month; `validacion de facturas`: 20/month.

Semrush UK, 2026-10-15:

- `ai for accounting`: 390/month, KD 63.
- `ai accountant`: 1,000/month, KD 47.
- `accounting automation`: 590/month, KD 34.
- `invoice automation`: 720/month, KD 39.
- `accounts payable automation`: 1,300/month, KD 44.
- `how to automate accounting`: 30/month.
- `invoice validation`: 110/month, KD 14.

## Implementation

- Reassigned supporting keywords so the employee profile no longer tries to own accounting-automation demand.
- Expanded the accounting automation landing with direct-answer copy and market-language metadata.
- Repositioned the how-to guide around informational automation intent.
- Added contextual links from the commercial landing and guide to the accounting role and invoice-validation use case.
- Added Playwright coverage for canonical URLs, metadata/H1 separation and reciprocal internal links.
- Added an auditable Batch 05 ownership record.

No new SEO URL, merge, redirect or noindex action is introduced in this batch.
