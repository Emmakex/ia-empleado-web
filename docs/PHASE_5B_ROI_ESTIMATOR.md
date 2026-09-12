# Web Phase 5B — Transparent ROI / Value Estimator

## Purpose

Phase 5B adds a bilingual commercial calculator that helps visitors quantify **potential operational capacity** from their own process data without publishing fabricated savings claims.

The calculator is an educational decision-support surface for `iaempleado.com`. It is not part of the IA Empleado runtime, does not inspect customer systems and does not produce a binding financial or technical proposal.

## Public routes

- Spanish: `/calculadora-roi`
- English: `/en/roi-calculator`

Both routes must remain paired through canonical/hreflang and sitemap coverage.

## Truthfulness contract

The calculator must distinguish three categories clearly:

1. **User-provided data** — monthly volume, manual time per unit, hourly cost and optional solution-cost estimates.
2. **User-controlled assumption** — expected reduction in manual time.
3. **Derived arithmetic** — baseline hours/capacity, potential hours freed, potential economic capacity and optional first-year ROI.

No derived output may be described as guaranteed savings, verified benefit or realized customer outcome.

The phrase **economic capacity** is preferred to **savings** because freeing employee time does not automatically reduce spend. Time can instead be reassigned, absorb growth, improve response times or reduce backlog.

## Scenario model

A visitor provides one base manual-time reduction assumption.

The tool derives three transparent scenarios:

```text
Conservative = base assumption - 10 percentage points
Base         = base assumption
High         = base assumption + 10 percentage points
```

All scenario rates are capped between `0%` and `90%`.

These bands are not IA Empleado benchmarks and are not predictions.

## Formulas

### Current baseline hours per month

```text
monthly volume × manual minutes per unit ÷ 60
```

### Current economic capacity per month

```text
baseline hours × hourly cost
```

### Potential hours freed per month

```text
baseline hours × scenario reduction %
```

### Potential economic capacity per month

```text
potential hours freed × hourly cost
```

### Potential gross value per year

```text
potential economic capacity per month × 12
```

### Estimated first-year solution cost

```text
estimated implementation cost + (estimated monthly operating cost × 12)
```

### Potential first-year ROI

```text
((potential annual gross value - estimated first-year solution cost)
 / estimated first-year solution cost) × 100
```

Percentage ROI is **not calculated** when estimated solution cost is zero. This prevents a mathematically invalid or misleading ROI claim.

## Default values

The interactive calculator may load with synthetic example values to make the mechanism understandable:

- 500 units / month
- 8 manual minutes / unit
- 25 currency units / hour
- 30% base manual-time reduction assumption
- 0 operating cost
- 0 implementation cost

The UI must identify these as an **editable example** and not a benchmark or expected result.

## Currency behavior

Phase 5B supports `EUR`, `USD` and `GBP` as display currencies.

The calculator performs no FX conversion. Every monetary input and output is assumed to use the currency chosen by the visitor.

## Privacy boundary

All calculation occurs client-side in the browser.

Phase 5B does not:

- POST calculator inputs to a backend;
- store calculator values in customer/runtime systems;
- create a lead automatically;
- inspect CRM/ERP/ticketing data;
- infer salary/cost information;
- call an LLM to generate financial assumptions.

If analytics are added later, calculator values must not be sent as event properties without a separate privacy review.

## SEO / GEO contract

The calculator must not be a client-only black box.

Server-rendered content includes:

- definition and limitation of the calculator;
- methodology;
- visible formulas;
- synthetic worked example;
- FAQ;
- links to Process Analyzer and Team Builder.

Structured data:

- `WebPage`
- methodology `ItemList`
- `FAQPage`

The interactive output itself is not marked up as a verified financial product or customer result.

## Accessibility

The calculator must provide:

- normal labels for every input;
- keyboard-operable controls;
- numeric inputs in addition to the improvement slider;
- `aria-live` for recalculated results;
- visible focus behavior inherited from the site design system;
- responsive stacking on narrow screens.

## Internal linking

The global footer links to the ROI calculator.

The calculator links visitors back to:

- `/mejora-tu-proceso` / `/en/improve-your-process`
- `/disena-tu-equipo-ia` / `/en/design-your-ai-team`

This creates a commercial path:

```text
understand current process
→ estimate potential value
→ design candidate AI Team
→ validate technically
```

## CI contract

`scripts/check-roi-estimator.mjs` protects the minimum release contract:

- bilingual routes;
- conservative/base/high scenarios;
- explicit ±10 percentage-point method;
- ROI denominator guard;
- truthfulness language around capacity vs guaranteed savings;
- local/browser processing statement;
- structured data;
- sitemap coverage;
- footer discoverability;
- CSS imports in ES/EN layouts.

The normal TypeScript and production-build gates also apply.

## Release gate

Phase 5B is complete only after:

1. feature implementation;
2. dedicated ROI/value CI contract passes;
3. TypeScript passes;
4. production build passes;
5. PR merges to `main`;
6. `main` CI passes;
7. Hostinger publishes the new routes;
8. production interaction is manually verified.
