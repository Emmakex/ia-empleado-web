# Phase 5A — Process Analyzer / Mejora tu proceso

## Purpose

Phase 5A adds a public interactive process-analysis experience to `iaempleado.com` without turning the commercial website into a production runtime.

The visitor can compare a familiar business workflow **before** and **after** a governed IA Empleado redesign, mark bottlenecks and understand which steps are candidates for rule-based automation, which are better treated as assisted work and which should remain under human authority.

This feature remains separate from the private IA Empleado runtime and from customer production systems.

## Public routes

Spanish:

- `/mejora-tu-proceso`

English:

- `/en/improve-your-process`

Both routes require localized metadata, canonical URLs, hreflang and sitemap coverage.

## Initial process patterns

Phase 5A ships four predefined bilingual process patterns:

1. Customer issue / Incidencia de cliente
2. Invoice intake and validation / Recepción y validación de factura
3. Sales lead and follow-up / Lead comercial y seguimiento
4. Order exception / Incidencia de pedido

These patterns are educational reference flows. They are not claims that a customer's exact process has been automatically discovered or validated.

## Interaction contract

The visitor can:

- choose one reference process;
- select general bottleneck categories;
- mark individual current-process steps as bottlenecks;
- compare current and proposed flows side by side;
- inspect the proposed mode for every step;
- see which IA Employee profiles participate;
- see which systems would need evaluation;
- see human-control boundaries;
- prepare a user-controlled email with the selected context.

The page does not POST configuration state in Phase 5A.

## Three execution modes

Every proposed step must remain explicitly classified as one of:

### `automated`

A candidate for repetitive, verifiable execution inside explicit rules, sources and permissions.

This label is not permission to execute autonomously in production. Customer-specific policy still controls authority.

### `assisted`

IA prepares context, validates information or drafts the action, while deterministic policy or a person confirms the relevant step.

### `human`

The step remains under human authority because it involves consequential approval, professional judgment, negotiation, sensitive exception handling or another boundary that should not be presented as generic autonomous work.

## Human-control rule

Every process step includes an explicit `humanControl` explanation.

The commercial site must make visible that:

- technical capability is separate from business authority;
- uncertainty can trigger escalation;
- high-impact actions may require approval;
- authoritative systems remain the source for business state;
- integrations are customer-specific and must be validated.

## Employee relationships

The Process Analyzer reuses the canonical 22-profile Employee taxonomy already present in the website.

Reference Employee links should point to existing deep pages when available. Catalog-only profiles may appear as a label but must not acquire thin standalone SEO pages only to satisfy the interaction.

Restricted profiles are not part of the initial four process patterns.

## Systems

Systems displayed in the analyzer are dependencies to evaluate, not promises of existing connectors.

Examples include:

- Email
- CRM
- ERP
- Ecommerce
- Ticketing
- OCR/documents
- Calendar
- Billing
- warehouse/order systems
- shipping/carrier systems
- reporting/BI

The final integration contract is customer-specific.

## Privacy and data boundary

Phase 5A operates entirely in the browser.

It must not:

- send marked bottlenecks to an API;
- persist the analysis server-side;
- connect to production systems;
- inspect customer data;
- grant permissions;
- create runtime tasks.

The email CTA is user-controlled and opens the visitor's own mail client with a generated summary.

## SEO / GEO contract

The interactive UI is progressive enhancement. Critical process meaning must also exist as crawlable server-rendered HTML.

The page therefore includes:

- a static explanation of all four reference processes;
- visible before/after steps;
- clear execution-mode labels;
- methodology explaining automation vs assistance vs human responsibility;
- FAQ;
- WebPage structured data;
- ItemList structured data for the process patterns;
- FAQPage structured data;
- canonical and hreflang;
- sitemap coverage;
- an internal crawlable link from the site footer.

No critical process definition may exist only inside client state.

## Accessibility contract

The interaction must include:

- semantic fieldsets and legends;
- real buttons for process and bottleneck selection;
- `aria-pressed` for toggle state;
- keyboard-focus visibility;
- no meaning conveyed by color alone;
- mobile layout that preserves the before/after reading order;
- reduced-motion compatibility.

## Truthfulness boundary

The Process Analyzer must always be described as an educational / commercial design tool.

It must not claim that:

- the visitor's real process has been automatically audited;
- a recommended workflow is production-ready;
- all shown integrations already exist;
- all repetitive steps should be autonomous;
- a specific improvement percentage has been measured;
- human approvals can always be removed.

Any future measured ROI or performance claim requires separate methodology and evidence.

## Release gates

Phase 5A is complete only when:

1. both localized routes exist;
2. all four reference processes exist in ES and EN;
3. all proposed steps retain explicit automated / assisted / human classification;
4. interactive bottleneck selection works without server submission;
5. static crawlable before/after content exists;
6. structured data, canonical, hreflang and sitemap are present;
7. both locale layouts load the Process Analyzer styles;
8. a crawlable internal navigation link exists;
9. the dedicated Process Analyzer CI contract passes;
10. TypeScript passes;
11. production build passes;
12. `main` CI passes after merge;
13. Hostinger deployment is visually verified.

## Next logical extensions

After Phase 5A, the website can add richer conversion and evidence layers such as:

- transparent ROI / value estimator;
- comparison cluster (`Empleado IA vs chatbot`, `vs RPA`, `vs Copilot`, etc.);
- sector and use-case SEO/GEO clusters;
- richer lead attribution based on Team Builder and Process Analyzer context;
- video proof and transcripts;
- Reference Lab proof assets once the product evidence is valid.
