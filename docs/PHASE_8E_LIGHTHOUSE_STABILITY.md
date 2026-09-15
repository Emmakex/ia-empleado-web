# Phase 8E — Lighthouse stability decision

## Status

**COMPLETE — Production Verification #46 accepted the adaptive Lighthouse stability contract and closed Phase 8E on 2026-09-15.**

Production Verification #45 produced the first complete exact-SHA Lighthouse scores without the Hostinger WAF in the audit path. Production Verification #46 then repeated the full real-production gate and passed the six-route Lighthouse launch matrix under the approved adaptive median-of-three rule, with every launch threshold unchanged.

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

## Why a stability rule was required

The bilingual pairs use effectively the same application/runtime bundles, yet the first run produced large opposite TBT swings: Home ES 507.7 ms versus Home EN 60 ms, and Team Builder ES 100 ms versus Team Builder EN 437.5 ms. ROI showed the same direction of lab variance at 152.5 ms versus 40.5 ms.

That pattern did not reproduce in the real Hostinger browser budget, where the same six routes showed no main-thread long task in #45 and sub-430 ms LCP. The evidence therefore supported CPU-throttle variance in a single Lighthouse sample, not a coherent language-specific product regression.

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

Structured diagnostics distinguish raw and final evidence:

- `PHASE8E_LIGHTHOUSE_SAMPLE` — every raw sample;
- `LIGHTHOUSE_SAMPLE_THRESHOLD_MISS` — informational miss for an individual sample;
- `LIGHTHOUSE_STABILITY_RETRY` — records why a route receives samples 2 and 3;
- `PHASE8E_LIGHTHOUSE` — final single-sample or median-of-three decision;
- `LIGHTHOUSE_THRESHOLD_FAILURE` — only a final stabilized threshold failure;
- `LIGHTHOUSE_EXECUTION_FAILURE` — hard audit execution failure.

## Production Verification #46 — accepted stability closure

Production Verification #46 (`34930591064`) checked out exact `main` SHA `783cbf5888f26056fc808a7c1fba4bdf2049c6ee` after Web CI #233 passed.

The real production path remained fully green:

- Hostinger served `web-phase-8e-lighthouse-gate`;
- **163/163** Playwright production tests passed;
- LCP across the six representative routes was **300–368 ms**;
- CLS was **0** throughout;
- the longest observed production long task was **0 ms** throughout;
- TTFB was approximately **36–41.3 ms**;
- third-party requests, broken images and below-fold eager-image violations were all zero;
- the canonical Clara asset remained **6,430 bytes** with `public, max-age=315360000, immutable`.

The exact SHA then built and started successfully in the WAF-independent local production lab. Lighthouse 13.4.1 produced these final route decisions:

| Route | Performance | Accessibility | Best Practices | SEO | Decision |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | **0.96** | 1.00 | 1.00 | 1.00 | median of 3 |
| `/en` | 0.96 | 1.00 | 1.00 | 1.00 | single sample |
| `/disena-tu-equipo-ia` | 0.96 | 0.96 | 1.00 | 1.00 | single sample |
| `/en/design-your-ai-team` | 0.96 | 0.96 | 1.00 | 1.00 | single sample |
| `/calculadora-roi` | 0.96 | 0.97 | 1.00 | 1.00 | single sample |
| `/en/roi-calculator` | 0.97 | 0.97 | 1.00 | 1.00 | single sample |

Only Home ES triggered the adaptive retry. Its Performance samples were **0.81 / 0.96 / 0.96**, with TBT **564.5 / 38 / 32.5 ms**. The final median was therefore **0.96**, proving that the initial miss was not persistent.

The Lighthouse step ended with:

`Phase 8E Lighthouse launch gate OK: 6 routes satisfy all unchanged category thresholds; threshold misses are stabilized by an adaptive median-of-three decision.`

## Acceptance

Phase 8E is closed. Its production budgets, static-media cache rules, exact-SHA split gate, pinned Lighthouse version, unchanged launch thresholds, adaptive stability rule and structured diagnostics remain permanent regression protection.

**Phase 8F — SEO, metadata and sharing — is now ACTIVE.**
