# IA Empleado — Phase 2 Growth audit

**Status:** active  
**Started:** 2026-10-15  
**Scope:** 28 commercial Growth landings + 28 supporting articles  
**Canonical rules:** `SEO_GEO_CONTENT_OWNERSHIP.md` + `SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`

## Goal

Audit every historical Growth record against the current `one-primary-intent = one-canonical-URL` rule. Historical daily publication is not evidence that a URL should remain indexable. Each record must finish with one explicit decision: `KEEP`, `EXPAND`, `REPOSITION`, `MERGE`, `REDIRECT`, or `NOINDEX`.

## Progress

- Total historical Growth records: **56**.
- Audited in Batch 01: **4**.
- Remaining after Batch 01: **52**.
- New URLs created in Phase 2: **0**.

## Batch 01 — comparison-intent consolidation

The first batch starts with the clearest cannibalisation risk: historical Growth content that duplicates dedicated comparison owners created later.

| Historical record | ES legacy URL | EN legacy URL | Decision | Canonical owner |
| --- | --- | --- | --- | --- |
| Day 11 landing `ai-employee-vs-chatbot` | `/empleado-ia-vs-chatbot` | `/en/ai-employee-vs-chatbot` | MERGE + REDIRECT | `/comparativas/chatbot` / `/en/comparisons/chatbot` |
| Day 11 article `when-to-choose-ai-employee-or-chatbot` | `/blog/cuando-elegir-empleado-ia-o-chatbot` | `/en/blog/when-to-choose-ai-employee-or-chatbot` | MERGE + REDIRECT | `/comparativas/chatbot` / `/en/comparisons/chatbot` |
| Day 12 landing `ai-agent-vs-rpa` | `/agente-ia-vs-rpa` | `/en/ai-agent-vs-rpa` | MERGE + REDIRECT | `/comparativas/rpa` / `/en/comparisons/rpa` |
| Day 12 article `when-to-use-ai-agent-rpa-or-both` | `/blog/cuando-usar-agente-ia-rpa-o-ambos` | `/en/blog/when-to-use-ai-agent-rpa-or-both` | MERGE + REDIRECT | `/comparativas/rpa` / `/en/comparisons/rpa` |

### Why merge instead of keep

The dedicated comparison surfaces already provide the same evaluation job with a direct answer, structured comparison dimensions, explicit guidance on when to choose each approach, combination patterns and FAQ. Keeping parallel Growth landing/article URLs would split the same comparison intent across multiple canonical candidates.

The Day 11 and Day 12 records are therefore removed from the Growth inventory and sitemap, while their public legacy paths receive permanent redirects to the dedicated comparison owners. This preserves a single indexable owner and avoids throwing away any link/history value accumulated by the old URLs.

Semrush did not return measurable keyword data for the exact long-tail comparison phrases tested on 2026-10-15. The consolidation decision is therefore based on direct intent/content overlap and the current canonical architecture, not on invented volume.

## Redirect contract

All eight ES/EN legacy paths must:

1. return a permanent redirect;
2. resolve directly to the canonical comparison owner without a redirect chain;
3. disappear from `growth-sitemap.xml`;
4. leave the canonical comparison URL indexable;
5. not create a replacement Growth URL.

A Playwright regression contract covers the redirect status/destination and sitemap removal.

## Next audit order

Continue existing-content-first with the remaining 52 records. Prioritise records with the highest overlap risk against existing owners before low-risk long-tail process content:

1. original definition/chatbot support article versus Home, `/empleados-ia` and `/comparativas/chatbot`;
2. customer-service Growth pair versus `/empleados-ia/atencion-cliente`;
3. Day 13 cost and Day 14 ROI versus `/calculadora-roi` and conversion intent;
4. Day 15 private deployment versus product/security positioning;
5. Day 16 broad process automation versus Home and process-analysis surfaces;
6. Day 24 invoice processing versus Accounting & Billing and invoice-validation use case;
7. then the remaining integration, governance, operational and HR/finance process clusters.

## Completion rule

Phase 2 closes only when all **56/56** historical records have an explicit decision and no unresolved same-intent pair remains.
