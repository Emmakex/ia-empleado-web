# Phase 8E — Performance Baseline & Core Web Vitals Gate

## Status

ACTIVE — the measurable production budget is integrated. Production Verification #40 established the first real baseline and exposed two bounded remediation items: below-fold eager decorative images and missing explicit cache headers on canonical branding media.

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

## Production baseline — Verification #40

Production Verification #40 (`34882801900`) ran against `main` SHA `a09d34ec640c50b3f1d3d475137960f418a3ba41`. The job finished with **155 passed, 7 failed and 1 flaky**. The failures were actionable and did not require relaxing any numeric budget.

All six representative routes were comfortably inside the initial Core Web Vitals/resource limits:

- LCP was approximately 300–468 ms;
- CLS was 0 on every measured route;
- longest observed long task stayed approximately 54–77 ms;
- TTFB was normally approximately 22–26 ms, with one retry at approximately 113 ms, still well inside budget;
- total transfer stayed approximately 436–547 KB;
- JavaScript stayed approximately 219–313 KB;
- CSS stayed approximately 81.5 KB;
- third-party requests remained 0;
- broken images remained 0;
- fonts settled to `loaded`.

The seven Phase 8E failures were instead:

1. Home ES and EN each exposed one below-fold image without `loading="lazy"` — the footer brand mark.
2. Team Builder ES and EN each exposed two — the footer brand mark plus the empty-state brand mark.
3. ROI ES and EN each exposed one — again the footer brand mark.
4. `/branding/characters/clara-canonical.webp` was only 6,430 bytes but Hostinger returned no explicit `Cache-Control` header.

One existing `/en` Axe check had a transient `html-has-lang` failure on its first attempt and passed on retry, so it was reported as flaky. It was not a Phase 8E budget failure and is tracked separately from the performance remediation.

## Remediation after #40

The bounded remediation keeps all numeric budgets unchanged:

- below-fold footer branding loads lazily with asynchronous decoding;
- Team Builder empty/result-state decorative brand marks load lazily;
- `next.config.ts` sets an explicit reusable cache policy for `/branding/:path*`: `public, max-age=604800, stale-while-revalidate=86400`;
- performance diagnostics now emit the exact URL of every below-fold eager image instead of only a count;
- the exact production marker advances to `web-phase-8e-cache-lazy-loading`, preventing Production Verification from approving the already-deployed Phase 8D marker by mistake.

The cache policy deliberately does not use `immutable`: branding filenames are stable public paths and may be replaced in a future approved branding release, so a one-week freshness window plus stale-while-revalidate is safer than permanent immutability.

## Diagnostics

`tests/phase8e-performance-budget.spec.ts` prints one structured record per route:

- `PHASE8E_METRICS { ... }`

The record now includes `belowFoldEagerImages`, containing exact resolved URLs when the lazy-loading rule fails.

The static-media check prints:

- `PHASE8E_STATIC_ASSET { ... }`

A failed assertion therefore identifies the exact route, metric and offending asset rather than requiring manual inspection of a generic browser log.

## Execution model

- ordinary Web CI runs `scripts/check-phase8e-performance-budget.mjs` to validate the budget/test/workflow/cache/lazy-loading contract;
- the numeric network and Core Web Vitals budgets run only when `PRODUCTION_BASE_URL` is set;
- Production Verification includes `tests/phase8e-performance-budget.spec.ts` against `https://iaempleado.com`;
- `npm run qa:performance:production` provides the same focused production check when needed manually.

## Remaining Phase 8E work

Phase 8E remains open. The immediate acceptance gate is a green exact-marker production verification of the #40 remediation. After that, closure still requires a Lighthouse launch score gate for performance/accessibility/best-practices/SEO with documented exceptions where a score cannot be made deterministic.
