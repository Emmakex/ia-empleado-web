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
- Audited in Batch 02: **3**.
- Audited in Batch 03: **4**.
- Audited in Batch 04: **4**.
- Total audited: **15 / 56**.
- Remaining after Batch 04: **41**.
- New search-intent URLs created in Phase 2: **0**. Existing owners are merged, expanded or repositioned before any new URL is considered.

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

## Batch 02 — definition ownership + customer-service separation

### 1. Reposition the mixed definition/chatbot article

The legacy support article `what-is-an-ai-employee` mixed two jobs in one URL: defining the product/category and comparing it with a chatbot. The dedicated comparison owner now owns chatbot-vs-agent evaluation, while Semrush shows meaningful informational demand for the broader market-language question.

| Record | Previous focus | Decision | New primary intent |
| --- | --- | --- | --- |
| `what-is-an-ai-employee` | `qué es un Empleado IA` + chatbot comparison | **REPOSITION** | informational definition: `que es un agente ia` / `what is an ai agent` |

Demand evidence captured on 2026-10-15:

- ES `que es un agente ia`: **320 searches/month**, KD **58**;
- ES `qué es un agente ia`: **90**, KD **65**;
- UK `what is an ai agent`: **2,400**, KD **68**;
- UK `what are ai agents`: **880**, KD **72**.

The article keeps the same internal record key so its existing relationship with the SME commercial landing remains intact, but is replaced by a current long-form ES/EN version and moves to:

- ES `/blog/que-es-un-agente-ia`;
- EN `/en/blog/what-is-an-ai-agent`.

The old ES/EN article paths permanently redirect directly to the new paths. The revised article gives the informational query one owner and treats chatbot comparison as a secondary concept rather than the primary intent. The dedicated `/comparativas/chatbot` surface remains the owner of the comparison query.

### 2. Keep customer-service role and process as separate owners

The customer-service cluster was reviewed against the deep role page. Search evidence supports keeping the distinction rather than merging:

| Surface | Decision | Primary job |
| --- | --- | --- |
| `/empleados-ia/atencion-cliente` | KEEP | the specialist role / agent itself |
| `/automatizacion-atencion-cliente-ia` | EXPAND | the customer-service automation process |
| support article `automate-customer-service-human-control` | KEEP | informational how-to guidance |

Demand evidence:

- ES `agentes ia atención al cliente`: **140**, KD **11**;
- ES `agente ia atención al cliente`: **40**, KD **21**;
- ES `automatización de atención al cliente`: **50**, KD **12**;
- UK `ai customer service agent`: **140**, KD **47**;
- UK `customer service automation`: **320**, KD **34**;
- UK `ai customer service automation`: **20**.

This shows two distinct search/evaluation jobs: choosing or understanding the agent/role, and designing the automation process. The exact `automate ... with AI` how-to phrases returned no measurable data in the tested database, but the article remains useful as informational support and does not target the same primary query as either commercial owner.

Batch 02 strengthens the internal graph in both directions: the process landing links directly to the Customer Support AI role, and the deep role links back to the automation landing and its practical guide.

## Batch 03 — cost + ROI ownership

Batch 03 audits the four Day 13/14 records against the existing ROI calculator. The objective is to keep a useful cost/evaluation cluster while removing articles that repeat the same budgeting or formula job already handled by a stronger owner.

| Historical record | Decision | Canonical job / destination |
| --- | --- | --- |
| Day 13 landing `ai-employee-cost` | **KEEP** | commercial/evaluation owner for AI Employee / AI-agent implementation cost |
| Day 13 article `how-much-ai-employee-costs` | **MERGE + REDIRECT** | `/coste-empleado-ia` / `/en/ai-employee-cost` |
| Day 14 landing `ai-employee-roi` | **KEEP + EXPAND GRAPH** | education/evaluation owner for AI ROI and return methodology |
| Day 14 article `how-to-calculate-ai-employee-roi` | **MERGE + REDIRECT** | `/calculadora-roi` / `/en/roi-calculator` |

### Search evidence and intent split

Semrush evidence captured on 2026-10-15 supports keeping ROI evaluation separate from the calculator tool:

- ES `roi ia`: **20 searches/month**;
- UK `ai roi`: **110**, KD **36**;
- UK `roi of ai`: **70**;
- UK `ai return on investment`: **30**;
- UK `ai roi calculator`: **30**.

For cost, the Spanish exact phrases tested did not return measurable data, so no Spanish volume is invented. UK does show low but real demand around the broader market wording:

- UK `cost of implementing ai`: **30**;
- UK `cost of ai agents`: **20**;
- UK `ai agent pricing`: **20**;
- UK `ai agent cost`: **10**;
- UK `ai implementation cost`: **10**.

The resulting ownership is deliberately different by user job:

- **Cost landing:** what implementation costs consist of, what changes the budget and how to evaluate total cost.
- **ROI landing:** how to think about return, baselines, quality, capacity and defensible benefit measurement.
- **ROI calculator:** transactional tool for entering real assumptions and calculating transparent scenarios.

The historical cost article duplicated the cost landing's budgeting job, while the historical ROI how-to duplicated formulas and methodology already present in the calculator. Both support URLs are removed from the active Growth inventory and sitemap and permanently redirected to the stronger owner.

### Internal graph

Batch 03 adds reciprocal intent-aware links instead of replacing one kind of page with another:

- cost landing → ROI calculator;
- ROI landing → ROI calculator;
- ROI calculator → ROI evaluation landing;
- ROI calculator → cost landing.

This makes the distinction visible to users and search/answer engines: education/evaluation content explains the decision, while the calculator performs the calculation.

### Consolidation registry

`content/growth/consolidations.json` is the explicit registry for Growth records that remain in historical source files but must no longer participate in routing, sitemap generation or canonical ownership. The Growth runtime and CI contract both consume this registry.

## Batch 04 — private AI + process automation

Batch 04 audits Day 15 and Day 16. Unlike earlier comparison or ROI support duplicates, these clusters have distinct search demand and a useful business job, so the correct move is to strengthen the existing owners rather than delete them.

| Historical record | Decision | Primary ownership after audit |
| --- | --- | --- |
| Day 15 landing `private-ai-employee-deployment` | **REPOSITION** | private AI for business / private deployment evaluation |
| Day 15 article `how-to-deploy-ai-employee-privately` | **REPOSITION** | local, self-hosted and on-premise AI informational guide |
| Day 16 landing `ai-business-process-automation` | **EXPAND** | AI process automation / automation of business processes with AI |
| Day 16 article `how-to-choose-first-ai-process` | **KEEP** | how to choose the first process to automate with AI |

### Day 15 — private AI is a real market-language opportunity

Semrush evidence captured on 2026-10-15:

- ES `ia local`: **480 searches/month**, KD **14**;
- ES `ia privada`: **210**, KD **15**;
- ES `inteligencia artificial privada`: **20**;
- ES `ia on premise`: **20**;
- ES `ia privada para empresas`: **10**;
- UK `private ai`: **390**, KD **33**;
- UK `self hosted ai`: **170**, KD **31**;
- UK `on premise ai`: **90**, KD **19**;
- UK `private ai agents`: **20**, KD **21**;
- UK `private ai infrastructure`: **10**.

The original pages were too centered on the owned phrase `Empleado IA privado`. Batch 04 keeps the existing URLs and authority but changes the visible search framing:

- the **landing** now owns business evaluation around private AI, dedicated infrastructure and on-premise deployment;
- the **article** owns the informational/technical question around local, self-hosted and on-premise AI architecture.

No slug changes are necessary: the intent can be clarified through title, H1, description, direct answer and internal relationship without paying the cost of another migration.

### Day 16 — process automation deserves its own owner

Search evidence is stronger still:

- ES `automatización de procesos con ia`: **320 searches/month**, KD **46**;
- ES `automatización de procesos`: **1,300**, KD **32**;
- ES `automatización de procesos empresariales`: **50**, KD **12**;
- UK `business process automation`: **6,600**, KD **57**;
- UK `ai workflow automation`: **260**, KD **42**;
- UK `ai process automation`: **110**, KD **26**;
- UK `automate business processes with ai`: **30**, KD **18**.

The Day 16 landing therefore remains distinct from Home and from `/mejora-tu-proceso`. Home owns the broad company/category proposition; the Growth landing owns the commercial/evaluation concept of process automation with AI; Process Analyzer remains the transactional tool used to inspect a concrete workflow. The existing support article remains informational and answers how to select the first process rather than competing for the commercial phrase.

### SEO override registry

Batch 04 introduces `content/growth/seo-overrides.json` so historical content can be repositioned without copying or rewriting entire source records. An override must point to a real existing record and declares:

- explicit decision;
- primary keyword in ES and EN;
- supporting keyword set;
- research evidence;
- only the fields that materially change, such as title, description, H1, lead or `updatedAt`.

The Growth runtime applies these overrides to the canonical record, while `scripts/check-growth-content.mjs` rejects unknown keys, duplicate overrides, invalid decisions, missing keyword evidence or malformed dates. This gives future audits a smaller and more reviewable change surface than duplicating full 30–40 KB historical JSON files.

## Redirect contract

Historical redirects created during Phase 2 must:

1. return a permanent redirect;
2. resolve directly to the intended owner without a redirect chain;
3. disappear from the sitemap when the historical URL no longer exists as an owner;
4. leave the destination indexable;
5. preserve ES/EN parity.

Regression tests cover redirect status/destination, sitemap ownership, canonical URLs and the contextual link graph.

## Next audit order

Continue existing-content-first with the remaining **41** records. Prioritise records with the highest overlap risk against existing owners before low-risk long-tail process content:

1. Day 24 invoice processing versus Accounting & Billing and invoice-validation use case;
2. administrative/accounting/sales original Growth pairs versus their deep role owners;
3. CRM / ERP / enterprise email integration pairs versus dedicated integration surfaces;
4. data readiness, governance, human-in-the-loop, observability and incident-response clusters;
5. pilot, sales-order, onboarding, leave and expense-management process clusters.

## Completion rule

Phase 2 closes only when all **56 / 56** historical records have an explicit decision and no unresolved same-intent pair remains.
