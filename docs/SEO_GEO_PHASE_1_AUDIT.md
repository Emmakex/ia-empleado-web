# IA Empleado — Phase 1 SEO/GEO Core Owner Audit

**Date:** 2026-10-15  
**Scope:** Home, Empleados IA hub, four reference roles, Equipos IA hub and four reference team pages.  
**Evidence:** current `main`, Semrush ES and UK keyword research, existing canonical ownership rules.

## Outcome

Phase 1 confirms that the product architecture is already strong enough to keep the existing core URLs. The main correction required is **search-language repositioning of the four deep employee pages at metadata level**. Their visible content already contains direct definitions, concrete tasks, systems, workflows, human-control boundaries, limits, FAQs and commercial CTAs, so creating replacement URLs would create unnecessary cannibalization.

The Team surfaces remain intentionally evaluation/composition pages. We do **not** force broad `agentes IA para empresas` or role keywords onto Team pages because Home and the employee-role pages already own those intents.

## Audited owners

| Surface | ES primary intent | EN primary intent | Decision | Notes |
| --- | --- | --- | --- | --- |
| `/` | `agentes IA para empresas` | `ai agents for business` | KEEP | Home remains the broad commercial/brand owner. Semrush: ES 170/KD30; UK 170/KD38. |
| `/empleados-ia` | catálogo de `empleados IA para empresas` | AI Employee catalog | KEEP | Category/catalog owner; no reason to compete with Home for broad agent intent. |
| `/empleados-ia/atencion-cliente` | `agentes ia atención al cliente` | `ai customer service agent` | REPOSITION | ES 140/KD11; UK 140/KD47. Metadata now leads with the market term while keeping Empleado IA product language in-page. |
| `/empleados-ia/administrativo` | `agente ia administrativo` | `ai administrative assistant` | REPOSITION | ES 30; UK 10. Existing deep content already satisfies operational intent. |
| `/empleados-ia/contabilidad-facturacion` | `ia para contabilidad` | `ai for accounting` | REPOSITION | ES 210/KD46; supporting `automatización de facturas` 170/KD25. UK 390/KD63; `ai invoice automation` 90. |
| `/empleados-ia/comercial-sdr` | `agente ia ventas` | `ai sdr` | REPOSITION | ES 50/KD19 plus `ia para ventas` 50/KD37. UK `ai sdr` 390/KD57 and `ai sales agent` 210/KD47. |
| `/equipos-ia` | Equipo IA como composición de roles | `ai teams` / AI Team composition | KEEP | ES exact demand is negligible in current Semrush data; UK `ai teams` reports 70. Do not steal broad agent intent from Home. |
| `/equipos-ia/ventas` | Equipo IA de Ventas como composición | `ai sales team` | KEEP | UK reports 20 for `ai sales team`; page is an evaluation/composition surface, distinct from the Sales SDR employee owner. |
| `/equipos-ia/ecommerce` | Equipo IA de Ecommerce | AI ecommerce team composition | KEEP | Exact tested keyword variants did not return meaningful volume; value is commercial evaluation, not a doorway keyword page. |
| `/equipos-ia/administracion` | Equipo IA de Administración | AI administration team composition | KEEP | Keep differentiated around handoffs, roles, systems and approvals. |
| `/equipos-ia/turismo` | Equipo IA de Turismo | AI travel team composition | KEEP | `ia para turismo` ES 20 and `ai for travel` UK 110 are broader sector intents; the Team page must not take ownership from sector-level content. |

## Metadata changes applied

The four employee detail routes now consume `lib/core-seo-intents.ts`, which stores the researched ES/EN primary query, semantic variants, decision, search intent, title, description and evidence basis. This separates **search acquisition language** from the product's visible role copy and keeps a single source of truth for Phase 1 ownership.

### Before → after examples

- `Empleado IA de Atención al Cliente | IA Empleado` → `Agente IA para Atención al Cliente | IA Empleado`
- `Empleado IA Administrativo | IA Empleado` → `Agente IA Administrativo | Automatización administrativa`
- `Contabilidad y Facturación IA` metadata → `IA para Contabilidad y Facturación | IA Empleado`
- `Comercial SDR IA` metadata → `Agente IA para Ventas y SDR | IA Empleado`
- EN role metadata now follows independently researched UK vocabulary rather than literal translation (`ai customer service agent`, `ai for accounting`, `ai sdr`).

## GEO/readiness verification

The four reference employee pages already expose server-rendered:

- a direct definition;
- tasks and scope;
- workflow steps;
- systems/integrations;
- collaboration context;
- human-control boundaries;
- use cases;
- explicit limitations;
- FAQs;
- a conversion CTA.

The Team hub already defines what an AI Team is, and each team page exposes members, handoffs, systems, controls, metrics, use cases, limits and FAQs. Therefore this phase does not add filler sections simply to increase word count.

## Cannibalization decisions

- Home keeps the broad `agentes IA para empresas` / `ai agents for business` intent.
- Employee pages own function-specific commercial/evaluation intent.
- Team pages own multi-role composition intent, not the individual employee keyword.
- Growth pages remain process/problem owners and will be audited in Phase 2 before any of them can supersede these core owners.
- Sector pages retain broader industry intent; Team Turismo does not take `IA para turismo` as its primary query.

## Phase 1 exit decision

**PASS once Web CI is green.** Every core product/role surface has a documented primary role, the four deep employee pages use researched acquisition vocabulary independently in ES/EN, and no new URL was required.
