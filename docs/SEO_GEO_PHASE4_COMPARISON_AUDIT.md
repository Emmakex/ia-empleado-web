# IA Empleado — Phase 4 comparison audit

**Status:** complete pending green merge  
**Date:** 2026-10-16  
**Scope:** comparison hub + 5 dedicated comparison pages  
**Canonical rules:** `SEO_GEO_CONTENT_OWNERSHIP.md` + `SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`

## Goal

Phase 4 makes the comparison family own decision-stage search intent without competing with Home, the AI-agent definition article or historical Growth content. Phase 2 already consolidated the clearest chatbot/RPA Growth duplicates, so this phase audits the dedicated comparison owners themselves.

## Final scope — 6/6

| Surface | Decision | ES owner | EN owner | Boundary |
| --- | --- | --- | --- | --- |
| Comparison hub | REPOSITION | `comparativas de IA para empresas` | `AI comparisons for business` | evaluation/navigation; no broad product ownership |
| Chatbot | REPOSITION | `agente ia vs chatbot` | `AI agent vs chatbot` | comparison only; `/blog/que-es-un-agente-ia` keeps definition intent |
| Agente IA | EXPAND | `empleado ia vs agente ia` | `AI employee vs AI agent` | product-definition boundary, not generic agent definition |
| RPA | REPOSITION | `rpa vs ia` | `RPA vs AI` | comparison only; process automation pages keep implementation intent |
| Automatización tradicional | KEEP | `ia vs automatización tradicional` | `AI vs traditional automation` | deliberate architecture decision support despite low measured demand |
| Copiloto IA | REPOSITION | `agente ia vs copiloto ia` | `AI agent vs copilot` | assistance-vs-delegation decision, not generic agent education |

## Search evidence

Semrush research on 2026-10-16 found measurable comparison demand in the strongest categories:

- ES `agente IA vs chatbot`: **30/month**.
- UK `AI agent vs chatbot`: **70/month**; `chatbot vs AI agent`: **10/month**.
- ES `RPA vs IA`: **20/month**.
- UK `RPA vs AI`: **40/month**; `AI agent vs RPA`: **10/month**.
- UK `AI agent vs copilot`: **10/month**.

Exact Empleado IA / AI Employee comparison variants and traditional-automation comparison variants did not show meaningful measured volume in the tested batch. Those pages remain justified because they answer distinct evaluation/product-architecture questions and have clear ownership boundaries. We do not inflate them into broader high-volume terms that belong to other canonical owners.

## Implementation decisions

`lib/comparison-search-optimization.ts` is the audited view layer. It preserves every existing public slug and canonical URL while applying researched metadata, direct answers and explicit ownership boundaries. ES and EN remain independent search markets rather than literal translations.

Key changes:

- Chatbot comparison now speaks the market language `agente IA vs chatbot` / `AI agent vs chatbot` while explaining where the governed Empleado IA model fits.
- RPA comparison owns `RPA vs IA` / `RPA vs AI` and explicitly recommends combining deterministic execution with AI interpretation when appropriate.
- Copilot comparison owns agent-vs-copilot decision intent and defines the boundary as direct assistance versus governed delegation.
- The Empleado IA vs agente IA page remains the owned product-definition comparison rather than trying to capture generic `agente IA` definition intent.
- Traditional automation remains indexable as deliberate architecture decision support; no unsupported search-demand claim is made.
- The comparison hub is repositioned around business AI comparisons and renders the audited records in both locale trees.

## Cannibalization closure

The comparison family now has one owner per decision intent:

- generic `qué es un agente IA` remains informational blog ownership;
- Home remains broad `agentes IA para empresas` / `IA para empresas` ownership;
- process-automation Growth landings remain implementation/commercial owners;
- dedicated comparison pages own only pairwise evaluation intent.

No new public URL, redirect or noindex action is required in Phase 4.

## Exit gate

Phase 4 is complete when this branch passes Web CI and the comparison routes retain their canonical/hreflang behavior. At that point the roadmap advances to Phase 5: conversion, tools and indexability decisions.
