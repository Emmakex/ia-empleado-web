# Phase 8E — Performance Baseline & Core Web Vitals Gate

## Status

ACTIVE — initial measurable production budget is being introduced after Phase 8D closed green in Production Verification #39.

## Objective

Turn performance from an informal visual check into an explicit release contract for `iaempleado.com`.

The first Phase 8E tranche deliberately uses the existing Playwright production stack so the same deployment verification can emit actionable per-route measurements without adding a parallel browser harness.

## Representative production routes

The initial bilingual matrix covers:

- `/`
- `/en`
- `/disena-tu-equipo-ia`
- `/en/design-your-ai-team`
- `/calculadora-roi`
- `/en/roi-calculator`

These routes represent the public Home, a stateful product tool and the ROI conversion surface in both languages.

## Initial budgets

The machine-readable source of truth is `config/performance-budgets.json`.

Initial production limits:

- LCP: <= 3000 ms;
- CLS: <= 0.10;
- longest main-thread long task, used as the first lab responsiveness/INP proxy: <= 250 ms;
- TTFB/server response: <= 1200 ms;
- total initial transfer per route: <= 3.5 MB;
- JavaScript transfer: <= 900 KB;
- CSS transfer: <= 500 KB;
- image transfer: <= 2.5 MB;
- third-party requests: 0;
- broken images: 0;
- images well below the first viewport must be lazy-loaded;
- `document.fonts` must settle to `loaded`;
- the canonical Clara WebP payload must stay <= 500 KB and expose a reusable cache policy.

These are launch guardrails, not aspirational final numbers. They are intentionally explicit so later optimization can tighten them using measured production evidence rather than guesses.

## Diagnostics

`tests/phase8e-performance-budget.spec.ts` prints one structured record per route:

- `PHASE8E_METRICS { ... }`

The static-media check prints:

- `PHASE8E_STATIC_ASSET { ... }`

A failed assertion therefore identifies the exact route, metric and budget instead of requiring manual inspection of a generic browser log.

## Execution model

- ordinary Web CI runs `scripts/check-phase8e-performance-budget.mjs` to validate the budget/test/workflow contract;
- the numeric network and Core Web Vitals budgets run only when `PRODUCTION_BASE_URL` is set;
- Production Verification includes `tests/phase8e-performance-budget.spec.ts` against `https://iaempleado.com`;
- `npm run qa:performance:production` provides the same focused production check when needed manually.

## Remaining Phase 8E work

This baseline does not close Phase 8E. Closure still requires measured production results, remediation of any exceeded budget, and a Lighthouse launch score gate for performance/accessibility/best-practices/SEO with documented exceptions where a score cannot be made deterministic.
