# Phase 2 — Batch 13: Enterprise AI integration

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the historical Day 19 enterprise-integration pair. It keeps the current URLs and separates three different user jobs: browsing integration categories, evaluating AI integration as an enterprise capability, and learning how to implement it.

## Intent ownership

- Integration catalog: `/integraciones` / `/en/integrations` → navigation and evaluation by system category such as CRM, ERP, email, calendar, ecommerce, ticketing and document management.
- Commercial/evaluation landing: `/integracion-ia-sistemas-empresariales` / `/en/enterprise-ai-systems-integration` → `integración de ia` / `enterprise ai integration`.
- Implementation guide: `/blog/como-conectar-empleado-ia-crm-erp-email-apis` / `/en/blog/how-to-connect-ai-employee-to-crm-erp-email-apis` → `cómo integrar ia` / `how to integrate ai`.

The catalog does not try to own the AI-integration category query. The landing does not become a generic connector catalog. The guide does not compete for the same commercial/evaluation intent as the landing.

## Demand evidence

Semrush ES, 2026-10-15:

- `integración de ia`: 30/month.
- `integracion ia`: 20/month.
- `integración de inteligencia artificial`: 20/month.
- `integración ia empresas`: 10/month.
- `integración de sistemas`: 320/month, KD 15.
- `integracion de sistemas`: 210/month, KD 12.
- `integración api`: 70/month, KD 21.
- `integracion api`: 90/month, KD 25.
- The exact tested how-to variants such as `cómo integrar ia` and `integrar ia en sistemas` returned no reported volume. No volume is invented for them.

Semrush UK, 2026-10-15:

- `enterprise ai integration`: 30/month.
- `ai integration`: 260/month, KD 69.
- `artificial intelligence integration`: 30/month.
- `ai systems integration`: 10/month.
- `ai integration services`: 320/month, KD 34.
- `how to integrate ai`: 20/month.
- `integrate ai into business`: 20/month.
- `integrating ai into business`: 20/month.
- `ai integration architecture`: 10/month.
- `api integration`: 1,600/month, KD 47.
- `crm erp integration`: 140/month, KD 19.

The broad `api integration` and `systems integration` terms are supporting context rather than the commercial landing's primary owner because their SERP intent is materially wider than IA Empleado's product proposition.

## Before → After

### Commercial landing

**Before**

- Search framing was the owned phrase `Integración de IA con sistemas empresariales` without an explicit researched keyword contract.
- The copy explained architecture well but did not give answer engines a compact definition of what enterprise AI integration means.
- The relationship with the integration catalog was implicit rather than governed as a separate intent.

**After**

- Primary ownership is explicit: ES `integración de ia`; EN `enterprise ai integration`.
- SEO title and H1 retain CRM, ERP, email and API vocabulary while moving the first concept to researched market language.
- The lead starts with an extractable GEO definition: AI integration is a controlled connection between agents/automation and the systems where the business process runs.
- The definition includes authoritative sources, validation before writes, least privilege, traceability and human approval for sensitive actions.
- `/integraciones` remains the catalog owner instead of being replaced by this landing.

### Implementation guide

**Before**

- The guide was framed around `Empleado IA` and a list of systems.
- It contained strong technical implementation material but its ownership versus the commercial landing was not explicit.

**After**

- Primary ownership is ES `cómo integrar ia` and EN `how to integrate ai`.
- The exact Spanish how-to query is retained for intent precision even though Semrush reports no measurable volume; supporting evidence comes from measured API/system-integration vocabulary.
- Title, description, H1, excerpt and intro are repositioned around implementation rather than category evaluation.
- The intro explicitly states that the landing owns category/evaluation and the guide owns implementation.
- Existing reciprocal landing ↔ guide links remain intact.

## Decision

| Historical record | Decision | Canonical job |
| --- | --- | --- |
| `enterprise-ai-integration` | **REPOSITION** | commercial/evaluation owner for enterprise AI integration |
| `how-to-connect-ai-employee-to-business-systems` | **REPOSITION** | informational implementation owner for integrating AI with business systems |

No new indexable URL, redirect, merge or noindex action is introduced.

## Audit progress

The reconciled historical Growth audit moves from **31 / 56** to **33 / 56** explicit decisions. **23** historical records remain. New search-intent URLs created in this batch: **0**.

## Verification contract

Playwright regression coverage checks ES/EN status, titles, H1s, canonicals, reciprocal landing ↔ guide relationships, the landing → integration-catalog link and the new direct-answer language. Merge is allowed only after Growth Content CI, Web CI and Native Safari are green.
