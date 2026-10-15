# Phase 2 — Batch 09: Expense management

Date: 2026-10-15  
Decision: **REPOSITION existing owners**  
New indexable URLs: **0**

## Canonical owners

| Surface | ES primary intent | EN primary intent | Decision |
| --- | --- | --- | --- |
| `/automatizacion-gestion-gastos-ia` | `gestión de gastos` | `expense management automation` | REPOSITION |
| `/blog/como-automatizar-gestion-gastos-ia` | `nota de gastos` | `expense management process` | REPOSITION |
| `/empleados-ia/contabilidad-facturacion` | `ia para contabilidad` | `ai for accounting` | KEEP, supporting role |
| `/automatizacion-facturas-ia-empresas` | `automatización de facturas` | `invoice automation` | KEEP, supplier-invoice owner |

## Demand evidence

Semrush ES, 2026-10-15:
- `gestión de gastos`: 90 searches/month, KD 46; unaccented `gestion de gastos`: 170, KD 36.
- `gestion gastos empresa`: 110/month, KD 32.
- `nota de gastos`: 320/month, KD 19.
- `notas de gastos`: 140/month, KD 23.

Semrush UK, 2026-10-15:
- `expense management automation`: 140/month, KD 22.
- `employee expense management`: 320/month, KD 22.
- `expense automation`: 210/month, KD 19.
- `expense management`: 1,600/month, KD 41.
- `expense management process`: 40/month.
- `automate expense management`: 50/month.
- `expense claim process`: 20/month.

## Ownership rationale

The commercial landing owns employee expense-management evaluation: receipts, claims, card matching, policy checks, approvals, reconciliation and accounting handoff. The support guide owns the explanatory/process intent around a `nota de gastos` / expense-management process.

The Accounting and Billing AI Employee remains the role owner, not the expense-process owner. Supplier invoices and accounts payable remain separate under the invoice-processing cluster. This prevents `gestión de gastos`, employee claims and supplier-invoice automation from collapsing into the same canonical intent.

## Changes

- Reposition existing ES/EN metadata, H1, lead and direct answer around researched demand.
- Add explicit distinction between employee expenses and supplier invoices.
- Add reciprocal landing ↔ guide links already provided by the Growth relationship model.
- Add contextual links from landing and guide to the Accounting and Billing AI Employee.
- Preserve human financial authority for exceptions, limits and reimbursements.
- Add browser coverage for ES/EN canonicals, metadata/H1 and cluster links.

## Before → after

- **Before:** the landing led with the owned phrase “automatización de gestión de gastos con IA”.
- **After:** it leads with market vocabulary around `gestión de gastos` / `expense management automation` while retaining IA Empleado as the product framing.
- **Before:** the guide and landing were semantically close and could compete around generic automation language.
- **After:** the landing owns commercial process evaluation; the guide owns `nota de gastos` / process-how-to education.
- **Before:** the relationship to accounting and the separation from supplier invoices lived mainly in body copy.
- **After:** canonical ownership and contextual role links make that boundary explicit.

## Reporting

2 URLs optimized · 2 URLs expanded through contextual linking · 0 URLs created · 0 merged/redirected.
