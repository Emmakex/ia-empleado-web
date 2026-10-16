# Phase 2 — Batch 18: CRM, ERP and email automation

Date: 2026-10-16

This batch audits the historical Day 08–10 Growth pairs against the dedicated Integration surfaces. The decision is to **keep and reposition all six historical records**, because search demand shows a real distinction between automating work inside a system and integrating an AI Employee with that system.

## Decisions

| Existing record | Decision | ES primary intent | EN primary intent | Distinct system owner |
| --- | --- | --- | --- | --- |
| `ai-crm-automation` | REPOSITION | `crm con ia` | `crm automation` | `/integraciones/crm` |
| `how-to-automate-crm-with-ai-without-losing-control` | REPOSITION | `automatización crm` | `crm with ai` | `/integraciones/crm` |
| `ai-erp-automation` | REPOSITION | `erp con ia` | `erp automation` | `/integraciones/erp` |
| `how-to-automate-erp-with-ai-without-losing-control` | REPOSITION | `automatizacion erp` | `erp with ai` | `/integraciones/erp` |
| `ai-enterprise-email-automation` | REPOSITION | `automatización de correo electrónico` | `email automation` | `/integraciones/email` |
| `how-to-automate-enterprise-email-with-ai-without-losing-control` | REPOSITION | `automatizar emails` | `email workflow automation` | `/integraciones/email` |

No new indexable URL, redirect, merge or noindex action is introduced.

## Search evidence

Semrush ES research on 2026-10-16 returned:

- `crm con ia`: 110 searches/month, KD 49;
- `crm ia`: 260/month, KD 35;
- `automatización crm`: 30/month;
- `integración crm`: 70/month, KD 22;
- `integracion crm`: 40/month, KD 21;
- `erp con ia`: 70/month, KD 19;
- `erp ia`: 30/month;
- `automatización erp`: 20/month;
- `integración erp`: 50/month, KD 13;
- `integracion erp`: 390/month, KD 20;
- `automatización de correo electrónico`: 30/month;
- `automatizar emails`: 30/month;
- `automatizar correos`: 20/month;
- `automatización email`: 20/month;
- `ia email`: 30/month.

Semrush UK research on 2026-10-16 returned:

- `crm automation`: 260/month, KD 41;
- `ai crm`: 320/month, KD 58;
- `crm with ai`: 30/month;
- `crm integration`: 880/month, KD 37;
- `erp automation`: 140/month, KD 27;
- `ai erp`: 140/month, KD 39;
- `erp integration`: 590/month, KD 33;
- `email automation`: 720/month, KD 58;
- `email workflow automation`: 140/month, KD 34;
- `ai email automation`: 20/month;
- `email integration`: 50/month;
- `ai email integration`: 20/month.

The exact how-to variants tested for CRM and ERP did not return reported volume, so the support guides use measured adjacent vocabulary while retaining informational implementation intent.

## Ownership rule

For each system, three jobs now remain explicit:

1. **Growth landing:** commercial/evaluation intent for automating operational work with AI.
2. **Growth article:** informational implementation intent for designing the workflow safely.
3. **Integration surface:** system-access intent: authentication, objects/data, read/write permissions, matching, connector controls and audit.

This prevents `/automatizacion-crm-ia`, `/automatizacion-erp-ia` and `/automatizacion-email-empresarial-ia` from competing with `/integraciones/crm`, `/integraciones/erp` and `/integraciones/email` merely because both mention the same underlying system.

## GEO and internal graph

The landing leads now provide extractable definitions that explicitly distinguish process automation from system integration. The support articles state their implementation job directly. Existing reciprocal landing ↔ article links remain unchanged, and ES/EN canonical URLs are preserved.

## Phase 2 progress

Batch 17 left **41 / 56** historical Growth records audited. This batch reviews six more records, moving the audit to **47 / 56** with **9 remaining**.

The next batch should inventory those final nine records against all existing owners before deciding whether to keep, reposition or consolidate them.
