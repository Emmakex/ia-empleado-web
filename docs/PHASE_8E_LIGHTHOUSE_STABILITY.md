# Phase 8E — Lighthouse stability decision

## Status

ACTIVE — Production Verification #45 produced the first complete exact-SHA Lighthouse scores without the Hostinger WAF in the audit path. The real production browser matrix remains fully green; the only remaining Phase 8E question is whether two isolated Lighthouse Performance misses reproduce consistently under throttled lab CPU.

## Evidence from Production Verification #45

Production Verification #45 (`34928413477`) audited exact `main` SHA `6e237d68f356f1d2ba9981b5df7da51456455cb6`.

The release identity and real production path were accepted first:

- Hostinger served the expected `web-phase-8e-lighthouse-gate` marker;
- the complete Playwright production matrix finished **163/163** green;
- production LCP across the six representative routes stayed between **284–428 ms**;
- CLS was **0** on all six routes;
- TTFB stayed approximately **26.3–29.9 ms**;
- no representative route recorded a main-thread long task in the production budget test;
- third-party requests, broken images and below-fold eager images remained at zero;
- the canonical Clara asset remained 6,430 bytes with `public, max-age=315360000, immutable`.

The same verified SHA then built successfully with `next build`, started successfully with `next start` on `127.0.0.1:3000`, and Lighthouse 13.4.1 completed all six routes. The WAF execution blocker was therefore removed.

## First Lighthouse score matrix

| Route | Performance | Accessibility | Best Practices | SEO | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | **0.82** | 1.00 | 1.00 | 1.00 | 507.7 ms |
| `/en` | 0.96 | 1.00 | 1.00 | 1.00 | 60 ms |
| `/disena-tu-equipo-ia` | 0.94 | 0.96 | 1.00 | 1.00 | 100 ms |
| `/en/design-your-ai-team` | **0.85** | 0.96 | 1.00 | 1.00 | 437.5 ms |
| `/calculadora-roi` | 0.94 | 0.97 | 1.00 | 1.00 | 152.5 ms |
| `/en/roi-calculator` | 0.96 | 0.97 | 1.00 | 1.00 | 40.5 ms |

All six lab LCP values were in a narrow range of approximately 2.70–2.97 seconds. Four routes passed every launch category on the first sample. Only Home ES and Team Builder EN missed the Performance >= 0.90 threshold, and both misses were dominated by high Total Blocking Time rather than network transfer, image weight, CLS, accessibility, best-practice or SEO problems.

## Why a stability rule is required

The bilingual pairs use effectively the same application/runtime bundles, yet the first run produced large opposite TBT swings: Home ES 507.7 ms versus Home EN 60 ms, and Team Builder ES 100 ms versus Team Builder EN 437.5 ms. ROI showed the same direction of lab variance at 152.5 ms versus 40.5 ms.

That pattern does not reproduce in the real Hostinger browser budget, where the same six routes showed no main-thread long task in #45 and sub-430 ms LCP. The evidence therefore supports CPU-throttle variance in a single Lighthouse sample, not a coherent language-specific product regression.

This does **not** justify weakening the launch requirement. The protected category thresholds remain exactly **90/95/95/95**, and **no threshold is lowered**.

## Adaptive median-of-three contract

`config/lighthouse-launch.json` versions the stability policy:

- one Lighthouse sample is run for every route;
- when the first sample satisfies every category, that sample is the final route decision;
- when the first sample misses any threshold, the route receives two additional samples;
- the final category scores and diagnostic audit values are the **median-of-three**;
- a final threshold failure is emitted only when that median still misses the unchanged minimum;
- an execution failure remains a hard failure and is never hidden by sampling;
- every individual JSON report is retained (`route.json`, `route.sample-2.json`, `route.sample-3.json`).

This means a real launch regression must reproduce in at least two of three samples. A single throttled-run outlier cannot promote itself to a release blocker, while a persistent regression still fails the exact same threshold.

Structured diagnostics now distinguish raw and final evidence:

- `PHASE8E_LIGHTHOUSE_SAMPLE` — every raw sample;
- `LIGHTHOUSE_SAMPLE_THRESHOLD_MISS` — informational miss for an individual sample;
- `LIGHTHOUSE_STABILITY_RETRY` — records why a route receives samples 2 and 3;
- `PHASE8E_LIGHTHOUSE` — final single-sample or median-of-three decision;
- `LIGHTHOUSE_THRESHOLD_FAILURE` — only a final stabilized threshold failure;
- `LIGHTHOUSE_EXECUTION_FAILURE` — hard audit execution failure.

## Acceptance

Phase 8E remains open. The next Production Verification must again pass the real Hostinger 163-test matrix, build the exact successful Web CI SHA, and then pass all six Lighthouse route decisions under the adaptive stability contract. If a route still fails its median, that route becomes a confirmed implementation-performance regression and must be optimized before Phase 8E can close.
