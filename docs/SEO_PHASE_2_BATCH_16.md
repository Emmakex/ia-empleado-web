# Phase 2 — Batch 16: AI incident response and playbook

Date: 2026-10-16

This batch audits the historical Day 22 incident-response pair and keeps the existing URLs. It separates incident-response category/evaluation intent from practical plan/playbook implementation intent and makes the boundary with observability and governance explicit.

## Intent ownership

- Commercial/evaluation owner: `/respuesta-incidentes-empleados-ia-empresas` → `respuesta a incidentes de ia` / `ai incident response`.
- Informational/implementation owner: `/blog/playbook-respuesta-incidentes-empleados-ia` → `plan de respuesta a incidentes` / `incident response playbook`.
- Observability remains the owner for detection, traces, metrics, diagnosis and operational signals.
- AI governance remains the owner for authority, policies, responsibilities and control boundaries.

The English URLs remain:

- `/en/ai-employee-incident-response-business`.
- `/en/blog/ai-employee-incident-response-playbook`.

## Demand evidence

Semrush ES, 2026-10-16:

- `respuesta a incidentes`: 50 searches/month, KD 22.
- `respuesta ante incidentes`: 20/month.
- `gestión de incidentes`: 110/month, KD 28.
- `gestion de incidentes`: 40/month, KD 22.
- `plan de respuesta a incidentes`: 20/month.
- `resiliencia ia`: 20/month.
- Related research reports `plan de respuesta a incidentes de ciberseguridad`: 50/month, KD 18.
- Exact AI-specific Spanish incident-response variants did not return measurable volume, so the landing uses the precise AI modifier while supporting it with measured incident-response vocabulary.

Semrush UK, 2026-10-16:

- `ai incident response`: 40/month, CPC 15.17.
- `incident response`: 1,300/month, KD 48.
- `incident management`: 1,300/month, KD 41.
- `ai incident management`: 30/month.
- `ai incident response plan`: 20/month.
- `incident response playbook`: 140/month, KD 47.
- `incident response plan`: 590/month, KD 36.
- `ai resilience`: 20/month.

## Before → After

### Landing

Before:

- Search framing centered on the owned phrase `Respuesta a incidentes de Empleados IA`.
- The content already covered containment, safe mode, rollback and recovery but did not clearly own a market-language AI incident-response category.
- The relationship with observability and governance was implicit.

After:

- ES H1: `Respuesta a incidentes de IA: contener, recuperar y aprender sin perder el control operativo.`
- EN H1: `AI incident response: contain, recover and learn without losing operational control.`
- The lead now provides an extractable definition of AI incident response and concrete containment examples for business agents.
- It explicitly states that observability detects and explains signals, while incident response begins when those signals require containment or recovery; governance defines authority.
- Existing canonical URLs remain unchanged.

### Guide

Before:

- The article was framed as a `playbook de respuesta a incidentes para Empleados IA`.
- It already contained strong operational steps but did not explicitly separate itself from the category landing.

After:

- ES H1: `Cómo crear un plan de respuesta a incidentes de IA: playbook, roles y recuperación`.
- EN H1: `How to build an incident response playbook for AI systems`.
- The article owns the implementation job of building and testing the plan/playbook.
- Its intro explicitly points category/evaluation intent back to the incident-response landing and distinguishes observability and governance.
- Existing canonical URLs and reciprocal landing ↔ guide links are preserved.

## Editorial metadata

Both Day 22 records are updated on 2026-10-16 and therefore include the required editorial metadata: primary keywords, supporting keywords, search intent, cluster, canonical role, conversion role and research basis.

Both belong to `ai-incident-response`, but the landing targets category/evaluation intent and the article targets implementation/how-to intent. They therefore do not share an exact primary keyword in either locale.

## Audit decision

| Historical record | Decision | Canonical job |
| --- | --- | --- |
| Day 22 landing `ai-employee-incident-response` | **REPOSITION** | AI incident-response category/evaluation |
| Day 22 article `ai-incident-response-playbook` | **REPOSITION** | incident-response plan/playbook implementation |

No new indexable SEO URL, merge, redirect or noindex action is introduced.

## Progress

Batch 15 brought the reconciled audit to **37 / 56** records. Batch 16 adds two more, reaching **39 / 56**, with **17 remaining**.

The next priority is Day 23 pilot/production rollout, followed by the remaining older role, integration and process pairs that still need explicit KEEP/EXPAND/REPOSITION/MERGE/REDIRECT/NOINDEX decisions.
