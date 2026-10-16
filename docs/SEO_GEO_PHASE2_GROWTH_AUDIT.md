# IA Empleado — Phase 2 Growth audit

**Status:** ✅ COMPLETE  
**Started:** 2026-10-15  
**Completed:** 2026-10-16  
**Scope:** 28 commercial Growth landings + 28 supporting articles  
**Result:** **56 / 56 historical records audited · 0 remaining**  
**Canonical rules:** `SEO_GEO_CONTENT_OWNERSHIP.md` + `SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`

## Goal

Audit every historical Growth record against the `one-primary-intent = one-canonical-URL` and `existing-owner-first` rules. Historical publication is not evidence that a URL should remain indexable. Every record must finish with an explicit `KEEP`, `EXPAND`, `REPOSITION`, `MERGE`, `REDIRECT` or `NOINDEX` decision.

## Final result

Phase 2 is complete. All **56 historical Growth records** have been reviewed against search demand, current canonical owners, ES/EN intent, internal relationships and conversion role.

The audit did **not** create new indexable URLs simply to maintain publication cadence. Existing owners were preferred, strengthened, repositioned or consolidated.

### Closure counter

- Total historical Growth records: **56**.
- Audited: **56**.
- Remaining: **0**.
- New search-intent URLs created to satisfy the audit: **0**.
- Batch 17 authoritative checkpoint: **41 / 56**.
- Batch 18 CRM / ERP / email: **+6 → 47 / 56**.
- Batch 19 final ecommerce / tourism / administration / sales / SME review: **+9 → 56 / 56**.

## What changed during the audit

### Consolidated same-intent duplicates

Historical Growth pages that duplicated stronger canonical owners were merged and permanently redirected where appropriate. The clearest cases were:

- Empleado IA vs chatbot → dedicated chatbot comparison;
- agente IA vs RPA → dedicated RPA comparison;
- duplicate cost support content → cost owner;
- duplicate ROI calculation guide → ROI calculator/tool owner.

Redirected historical URLs are removed from active Growth ownership and sitemap participation while preserving direct permanent destinations.

### Repositioned market-language owners

Useful historical content was preserved when it had a distinct job but originally used terminology that was too centered on the owned phrase `Empleado IA`. Examples include:

- AI-agent definition;
- private/local/on-premise AI;
- business-process automation;
- accounting and invoice automation;
- sales-order automation;
- onboarding, leave and expense management;
- data readiness;
- AI governance;
- enterprise AI integration;
- human-in-the-loop;
- AI observability and monitoring;
- AI incident response;
- AI pilot;
- CRM, ERP and email automation;
- ecommerce automation;
- booking automation;
- administrative automation;
- sales automation;
- AI for SMEs / small business.

### Separated landing and support intent

Where both a commercial landing and support article remain indexable, they no longer intentionally target the same primary query. The landing owns category/evaluation/process demand; the support article owns implementation, how-to or educational intent.

The Growth CI contract enforces this rule whenever both sides declare editorial metadata.

## Final ownership boundaries

The surviving Growth content is subordinate to the wider site ownership model:

- **Home:** broad `agentes IA para empresas` / company-level proposition.
- **Empleado IA profiles:** specialist role/agent intent.
- **Growth landings:** process/problem/audience-specific commercial intent.
- **Growth articles:** informational and implementation support.
- **Departments:** organisational operating model.
- **Sectors:** industry-specific context and workflows.
- **Use cases:** bounded problem/outcome intent.
- **Integrations:** system access, permissions, data and connector controls.
- **Comparisons:** explicit decision-stage comparison intent.
- **Conversion tools:** transactional action, not informational ownership.

## Search-evidence rule

ES and EN were researched independently. Semrush volumes are recorded only where the connected database returned data. Exact long-tail phrases with zero or no reported volume are never presented as measured opportunities; they may still be used for support intent when a distinct user job exists and adjacent category demand is measurable.

## Technical governance added during Phase 2

The audit introduced and hardened:

- `content/growth/consolidations.json` for explicit merged/redirected historical records;
- layered `seo-overrides*.json` registries so historical owners can be repositioned without copying entire source files;
- validation that overrides target real records and declare allowed decisions;
- mandatory editorial metadata for new/updated Growth content after the governance effective date;
- landing/support cluster consistency;
- prevention of exact primary-keyword duplication inside a landing/article pair;
- permanent-redirect, canonical and sitemap regression coverage where consolidation occurs;
- ES/EN regression coverage for repositioned owners.

## Exit gate

Phase 2 is considered closed because:

1. **56 / 56** historical Growth records have an explicit audit decision;
2. no known same-intent Growth pair remains unresolved;
3. surviving landing/article pairs have distinct search jobs;
4. overlap with role, department, sector, integration, comparison and tool owners is explicitly bounded;
5. ES and EN rationale is independent;
6. legacy duplicates use direct permanent destinations rather than parallel indexable owners;
7. future Growth changes remain protected by CI governance.

## Handoff

The active roadmap now moves to **Phase 3 — sectors, use cases, departments and integrations**. Phase 3 should not assume those templated surfaces deserve indexation merely because they exist: each must prove distinct demand/evaluation value or be merged/noindexed.

Detailed implementation evidence for the final closure is recorded in `SEO_PHASE_2_BATCH_18.md` and `SEO_PHASE_2_BATCH_19.md`, with earlier batch documentation and Git history preserving the preceding decisions.
