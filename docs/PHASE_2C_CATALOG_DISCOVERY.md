# Web Phase 2C — Employee Catalog Discovery

## Goal

Turn `/empleados-ia/` and `/en/ai-employees/` from a four-card reference index into a scalable discovery experience for the complete 22-profile opportunity catalog, without publishing thin standalone pages or overstating product readiness.

The user should be able to start from a business need instead of already knowing an employee name.

## Public catalog states

Every visible catalog profile must use one of three states:

### Reference

Deep public ES/EN content exists and the profile can link to its dedicated page.

Current Reference Employees:

- Customer Support / Atención al Cliente;
- Administrative / Administrativo;
- Accounting & Billing / Contabilidad y Facturación;
- Sales / SDR / Comercial SDR.

### Catalog opportunity

The profile is part of the documented opportunity catalog and may be described at summary level, but the website must not infer that a deep product implementation or generic activation is already available.

Catalog-only profiles do not receive thin standalone SEO pages during Phase 2C.

### Restricted

The domain is high-impact or regulated and must not be marketed as generic self-service activation.

Current restricted areas:

- Recruitment Selection / Selección de personal;
- Financial Decisions / Decisiones financieras.

Restricted cards must remain explicit about mandatory product/legal/risk review and must not link to self-service deep-profile activation pages.

## Discovery model

The 22 profiles are classified through four user-facing taxonomies:

1. department;
2. sector;
3. business problem;
4. task.

The index also supports plain-language text search.

The filtering layer is progressive enhancement: the complete catalog remains present in the initial server-rendered page output, while client-side controls help users narrow it interactively.

## SEO / GEO rules

- all 22 profile summaries are crawlable from the canonical catalog page;
- no query-string faceted pages are created in this phase;
- filters must not create duplicate indexable URLs;
- the canonical catalog ItemList structured data must match the visible catalog;
- only profiles with released deep content receive URLs in ItemList entries;
- restricted status must remain visible in normal HTML, not only interaction state;
- EN/ES taxonomy and profile summaries ship together.

## Ecosystem relationships

Reference Employee pages must show related roles from the broader catalog so users can understand that employees are designed to work as an ecosystem.

A relationship can point to:

- another deep Reference Employee page;
- a catalog-only profile;
- a restricted profile when contextually relevant, while retaining the restricted label.

Relationships are explanatory commercial links, not runtime orchestration claims.

## Accessibility and UX

The explorer must provide:

- visible labels for search and all filters;
- keyboard-operable native controls;
- accessible result-count updates;
- a clear reset action;
- a useful empty state;
- responsive layouts;
- status meaning that is not communicated by color alone.

## Validation contract

Before merge, CI must validate:

- exactly 22 unique catalog profile records;
- all canonical opportunity keys are present;
- the four Reference Employees remain linked to deep content;
- Recruitment Selection and Financial Decisions remain restricted and have no deep self-service link;
- every profile includes department, sector, problem, task, relationships and ES/EN content;
- department, sector, problem and task filters remain present;
- text search and accessible result announcements remain present;
- existing EN/ES, Reference Employee, TypeScript and production-build gates remain green.

## Exit criteria

Phase 2C is repository-complete when:

1. all 22 profiles are discoverable from the catalog index;
2. filtering works by department, sector, problem and task;
3. text search works across the catalog vocabulary;
4. the four deep Reference Employees are linked correctly;
5. restricted profiles are clearly gated;
6. Reference Employee pages expose related ecosystem roles;
7. CI validates the catalog contract;
8. production deployment is visually verified on Hostinger.

## Next phase

After Phase 2C, the website can move to **Web Phase 3 — AI Teams**, where individual roles are composed into commercial team pages and end-to-end workflows such as Sales, Ecommerce, Administration and Travel.
