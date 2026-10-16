# Phase 2 — Batch 15: AI observability and production monitoring

Date: 2026-10-16

This batch continues the existing-content-first SEO/GEO audit with the historical Day 21 observability pair. It does not create a new indexable URL.

## Intent ownership

- Commercial/evaluation owner: `/observabilidad-empleados-ia-empresas` → `observabilidad ia` / `ai observability`.
- Informational/implementation owner: `/blog/como-monitorizar-empleados-ia-produccion` → `monitoreo ia` / `ai agent monitoring`.
- AI governance remains the owner for responsibilities, policy, authority and control boundaries.
- Incident response remains the owner for containment, recovery and learning after an operational signal becomes an incident.

The English equivalents keep their existing URLs:

- `/en/ai-employee-observability-business`.
- `/en/blog/how-to-monitor-ai-employees-in-production`.

## Demand evidence

Semrush ES, 2026-10-16:

- `observabilidad`: 720 searches/month, KD 33.
- `monitorización`: 720/month, KD 35.
- `monitorizacion`: 880/month, KD 29.
- `monitoreo`: 590/month, KD 27.
- `monitoreo ia`: 30/month.
- `monitoreo de sistemas`: 70/month, KD 18.
- `monitorización de sistemas`: 50/month, KD 12.
- `trazabilidad ia`: 10/month.
- Exact `observabilidad ia` reported 0 volume in the queried database. It is retained as the precise category-plus-modifier target because broader observability vocabulary has measurable demand and the page is specifically about operating AI agents.

Semrush UK, 2026-10-16:

- `ai observability`: 140/month, KD 30, CPC 17.77.
- `ai monitoring`: 90/month, KD 52.
- `ai agent monitoring`: 50/month.
- `ai agent observability`: 30/month.
- `monitor ai agents`: 30/month.
- `monitoring ai agents`: 30/month.
- `llm observability`: 50/month.
- `model monitoring`: 30/month.

## Before → After

### Landing

Before:

- Search framing was centered on the owned phrase `Observabilidad de Empleados IA`.
- The lead explained operational monitoring well, but the page did not explicitly own the broader market category `AI observability`.
- The boundary with governance and incident response was implicit.

After:

- ES H1: `Observabilidad de IA: controla agentes, trazas, métricas y alertas en producción.`
- EN H1: `AI observability: monitor agents, traces, metrics and alerts in production.`
- The lead now gives an extractable GEO definition of AI observability around end-to-end workflow reconstruction, data/tool usage, stage latency, decisions, exceptions, cost and outcomes.
- The page explicitly distinguishes governance, observability and incident response.
- Existing canonical URLs are preserved.

### Guide

Before:

- Search framing was centered on `Cómo monitorizar Empleados IA en producción`.
- It was a strong operational guide but did not explicitly separate implementation intent from the category/evaluation owner.

After:

- ES H1: `Cómo monitorizar agentes IA en producción: qué medir, trazar y alertar`.
- EN H1: `How to monitor AI agents in production: metrics, traces, alerts and quality`.
- The intro explicitly states that the guide owns monitoring implementation intent while the landing owns observability category/evaluation intent.
- Existing canonical URLs and reciprocal landing ↔ guide links are preserved.

## Editorial metadata gate

The global Growth policy became effective on 2026-10-16. Both optimized records therefore receive the required editorial metadata:

- primary keyword ES/EN;
- supporting keywords ES/EN;
- search intent;
- cluster;
- canonical role;
- conversion role;
- research basis.

Both records share the `ai-observability` cluster while targeting different primary keywords and different user jobs.

## Governance hardening

The runtime already consumed the Phase 4 override layer, but the Growth checker only validated the base, Phase 2 and Phase 3 registries. Batch 15 closes that gap:

- runtime now loads the new Phase 5 observability registry;
- the Growth checker validates base + Phase 2 + Phase 3 + Phase 4 + Phase 5;
- duplicate keys inside each individual registry remain rejected, while later registry layers may intentionally supersede an earlier override for the same historical owner;
- the 2026-10-16 editorial metadata gate is exercised on the optimized Day 21 pair.

This prevents a later override layer from affecting production without passing the same SEO/GEO contract as earlier layers while preserving deliberate layered precedence.

## Audit decision

| Historical record | Decision | Canonical job |
| --- | --- | --- |
| Day 21 landing `ai-employee-observability` | **REPOSITION** | AI observability category/evaluation |
| Day 21 article `how-to-monitor-ai-employees-in-production` | **REPOSITION** | AI-agent monitoring implementation/how-to |

No new indexable SEO URL, merge, redirect or noindex action is introduced.

## Progress

Batch 14 left **35 / 56** historical Growth records with an explicit decision. Batch 15 adds two more, bringing the reconciled total to **37 / 56**, with **19 remaining**.

The next highest-priority pair is Day 22 AI incident response, because its operational language sits immediately beside governance and observability and needs an explicit intent boundary before lower-risk historical content is revisited.
