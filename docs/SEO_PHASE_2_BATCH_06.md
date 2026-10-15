# Phase 2 — Batch 06: Sales-order processing

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to sales-order processing without creating a new indexable URL.

## Intent ownership

- Employee role: `/empleados-ia/comercial-sdr` → `agente ia ventas` / `ai sdr`.
- Commercial process landing: `/automatizacion-pedidos-ventas-ia-erp` → `automatización de pedidos` / `sales order automation`.
- Informational guide: `/blog/como-automatizar-procesamiento-pedidos-b2b-ia` → `automatizar pedidos` / `how to automate order processing`.
- Bounded use case: `/casos-de-uso/incidencias-pedidos` → `incidencias de pedidos` / `order exceptions`.

## Demand evidence

Semrush ES, 2026-10-15:

- `automatización de pedidos`: 70/month, KD 12.
- `automatizacion de pedidos`: 40/month, KD 10.
- `procesamiento de pedidos`: 20/month.
- `automatizar pedidos`: 50/month, KD 10.
- `agente ia ventas`: 50/month, KD 19.
- `ia para ventas`: 50/month, KD 37.

Semrush UK, 2026-10-15:

- `sales order automation`: 140/month, KD 13.
- `sales order processing automation`: 30/month.
- `order processing automation`: 50/month.
- `automated order processing`: 50/month.
- `ai order processing`: 50/month.
- `automate order processing`: 20/month.
- `how to automate order processing`: 10/month.
- `ai sdr`: 390/month, KD 57.
- `ai sales agent`: 210/month, KD 47.

## Boundary between owners

The sales role and the order-processing process are related but not interchangeable. The Sales/SDR employee page owns prospecting, account research, lead qualification, CRM updates and follow-up. The Day 25 process landing owns an existing B2B order after it arrives: intake, extraction, customer identification, SKU matching, pricing, stock, credit controls and controlled ERP creation.

The paired guide owns implementation/how-to intent for automating that order workflow. The order-exception use case starts after a normal order path breaks and focuses on coordinating stock, shipping, changes or other exceptions. Keeping these boundaries explicit prevents the sales role from absorbing process-automation terms and prevents the exception page from competing with the full order-processing owner.

## Implementation

- Removed broad `ai sales automation` from the Sales/SDR role supporting keyword set and documented the boundary with sales-order processing.
- Preserved the existing Day 25 landing instead of introducing a duplicate commercial URL.
- Added contextual links from the order-processing landing to the Sales/SDR role and order-exception use case while retaining the paired how-to guide.
- Added reciprocal product/use-case links from the Day 25 guide.
- Added a structured audit record for the cluster.
- Added Playwright coverage for ES/EN canonicals and the cluster-link contract.

No new indexable SEO URL, merge, redirect or noindex action is introduced in this batch.
