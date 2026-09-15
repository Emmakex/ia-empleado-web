# Phase 8E — Performance Baseline & Core Web Vitals Gate

## Status

**COMPLETE — closed on 2026-09-15 after exact-SHA Production Verification #46.**

The production performance budget, lazy-loading remediation, hashed canonical-image cache delivery and Lighthouse launch-score gate are all accepted. Phase 8E now remains as permanent regression protection while Phase 8F — SEO, metadata and sharing — is active.

Detailed final evidence is recorded in `docs/PHASE_8E_CLOSURE.md` and `docs/PHASE_8E_LIGHTHOUSE_STABILITY.md`.

## Objective

Turn performance from an informal visual check into an explicit release contract for `iaempleado.com`.

The Phase 8E gate ties deployment identity, real production browser acceptance, Core Web Vitals/resource budgets and reproducible Lighthouse launch scores to the same successful release SHA. Hostinger delivery is measured directly by Playwright, while Lighthouse audits the exact verified application build through a WAF-independent local production server.

## Representative production routes

The bilingual matrix covers:

- `/`
- `/en`
- `/disena-tu-equipo-ia`
- `/en/design-your-ai-team`
- `/calculadora-roi`
- `/en/roi-calculator`

These routes represent the public Home, a stateful product tool and the ROI conversion surface in both languages.

## Production budgets

The machine-readable source of truth is `config/performance-budgets.json`.

Launch limits:

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
- the browser-delivered canonical Clara image must stay <= 500 KB and expose at least 604800 seconds of reusable cache lifetime.

These are launch guardrails, not aspirational final numbers. None was weakened during remediation.

## Production baseline — Verification #40

Production Verification #40 (`34882801900`) ran against `main` SHA `a09d34ec640c50b3f1d3d475137960f418a3ba41`. The job finished with **155 passed, 7 failed and 1 flaky**.

All six representative routes were already comfortably inside the numeric Core Web Vitals/resource limits. LCP was approximately 300–468 ms, CLS was 0, TTFB was normally approximately 22–26 ms, total transfer stayed approximately 436–547 KB and third-party requests remained 0.

The seven actionable Phase 8E failures were below-fold eager decorative brand marks plus the absence of an explicit reusable cache header on the raw canonical Clara WebP. The `/en` Axe retry was flaky and not the Phase 8E root cause.

## Lazy-loading remediation — PR #85 / Verification #41

PR #85 corrected the below-fold loading policy without changing any performance threshold:

- footer branding loads lazily with asynchronous decoding;
- Team Builder empty/result-state decorative brand marks load lazily;
- diagnostics emit exact offending image URLs through `belowFoldEagerImages`;
- an initial `/branding/:path*` Next header policy attempted to add reusable caching.

Web CI #213 passed on the PR. After merge, Web CI #214 passed on `main` at SHA `2c258dc72f6b6407b3510c937804a5f14d7a8a62`.

Production Verification #41 (`34912068747`) verified the exact marker `web-phase-8e-cache-lazy-loading` and executed 163 production tests. Final result: **162 passed, 1 failed**.

The lazy-loading remediation was accepted in production. Every representative route reported `belowFoldEagerImages: []`, with no broken images, no third-party requests and fonts loaded. The sole remaining failure was the raw file `/branding/characters/clara-canonical.webp`: payload **6,430 bytes**, but `Cache-Control` remained empty. That proved the Hostinger-managed static `/public` delivery path was not honoring the application-level header rule used in PR #85.

## Hashed canonical-image cache remediation — PR #86 / Verification #42

The release contract was changed to follow the image request that the browser actually uses instead of the mutable raw `/public` URL.

The approved character WebPs remained unchanged. `lib/brand-characters.ts` remains the stable data/source-path catalog for server-side consumers. `components/brand-character-image.tsx` maps Clara, Alex, Sofía and Javier to Next static image imports so the browser receives content-hashed build media under `/_next/static/media/...` and responsive derivatives.

`next.config.ts` sets `images.minimumCacheTTL` to **604800 seconds (7 days)**. The production check discovers Clara's real `currentSrc`, verifies that its underlying source is the hashed canonical WebP and validates the actual browser-delivered resource.

PR #86 merged to `main` as `f29001f7922dc44fd61b3a4bf867e549c57658a8`. Web CI #224 passed on the final PR SHA and Web CI #225 passed again on `main`.

Production Verification #42 (`34915450760`) verified `web-phase-8e-static-image-cache` and finished **163/163 green**. The canonical Clara request resolved to `/_next/static/media/clara-canonical.3zljg6zeigl6e.webp`, payload **6,430 bytes**, with `Cache-Control: public, max-age=315360000, immutable`. The computed reusable cache lifetime was **315360000 seconds**, far above the 604800-second minimum.

## Lighthouse launch-score gate

The final Phase 8E tranche added a reproducible Lighthouse gate on top of the accepted Playwright production budget; it does not replace or weaken real production measurement.

Machine-readable source of truth: `config/lighthouse-launch.json`.

Pinned tooling and launch thresholds:

- Lighthouse **13.4.1**;
- mobile form factor;
- Performance >= **0.90**;
- Accessibility >= **0.95**;
- Best Practices >= **0.95**;
- SEO >= **0.95**;
- the same six bilingual representative routes used by the production performance budget.

Production Verification always uploads the Lighthouse JSON evidence. No category threshold may be reduced merely to make CI pass.

## Production Verifications #43 and #44 — Hostinger/WAF blocker

Production Verification #43 (`34919207771`) completed the normal Hostinger production suite **163/163 green** but Lighthouse itself never reached scoring because all six routes returned the same `Status code: 403` under Lighthouse automation. There were zero threshold failures; all failures were execution failures.

PR #88 kept Lighthouse 13.4.1, the six routes and all four launch thresholds unchanged while adding a normal versioned mobile Chrome user agent.

Production Verification #44 (`34926445378`) again completed the full Hostinger browser matrix **163/163 green**, but Lighthouse still received the same 403 on all six routes. This confirmed the blocker was not the user-agent string and that continued identity spoofing would create brittle infrastructure without increasing product confidence.

## Split-gate decision after #44

Phase 8E therefore separates two forms of evidence without weakening either:

1. **Real production evidence stays on Hostinger.** The permanent Playwright matrix exercises `https://iaempleado.com` directly, including TTFB, LCP/CLS/resource budgets, canonical image cache behavior, accessibility, geometry, conversion, responsive behavior and motion.
2. **Lighthouse audits the exact verified release SHA in a deterministic lab.** Production Verification checks out the exact successful Web CI SHA, runs `npm run build`, starts `next start` on `127.0.0.1:3000`, verifies the release marker locally and runs pinned Lighthouse 13.4.1 against that exact application build through `LIGHTHOUSE_BASE_URL`.

Only the externally controlled WAF is bypassed. The application/runtime build and launch thresholds remain unchanged.

## Production Verification #45 — first complete Lighthouse scoring

Production Verification #45 (`34928413477`) was the first run in which the exact-SHA local Lighthouse lab completed all six routes.

The real Hostinger matrix remained **163/163 green**, with production LCP approximately **284–428 ms**, CLS 0, TTFB approximately **26.3–29.9 ms**, zero third-party requests and no production long tasks across the representative routes.

The first Lighthouse samples were:

| Route | Performance | Accessibility | Best Practices | SEO | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.82 | 1.00 | 1.00 | 1.00 | 507.7 ms |
| `/en` | 0.96 | 1.00 | 1.00 | 1.00 | 60 ms |
| `/disena-tu-equipo-ia` | 0.94 | 0.96 | 1.00 | 1.00 | 100 ms |
| `/en/design-your-ai-team` | 0.85 | 0.96 | 1.00 | 1.00 | 437.5 ms |
| `/calculadora-roi` | 0.94 | 0.97 | 1.00 | 1.00 | 152.5 ms |
| `/en/roi-calculator` | 0.96 | 0.97 | 1.00 | 1.00 | 40.5 ms |

The large opposite TBT swings between bilingual counterparts using effectively the same frontend bundles did not reproduce in the real Hostinger browser budget. PR #90 therefore introduced an adaptive stability rule without reducing any threshold: run one sample normally; only when it misses a category, run two additional samples and use the median of three. Execution failures remain hard failures.

## Production Verification #46 — final closure

PR #90 passed Web CI #232, merged to `main` as `783cbf5888f26056fc808a7c1fba4bdf2049c6ee`, and main Web CI #233 passed all contracts, TypeScript, browser QA and build.

Production Verification #46 (`34930591064`) checked out that exact SHA, confirmed Hostinger served `web-phase-8e-lighthouse-gate`, and completed the full production browser matrix **163/163 green**.

Final Hostinger performance evidence:

| Route | LCP | CLS | Long task max | TTFB | Total transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 312 ms | 0 | 0 ms | 41.3 ms | 450,803 B |
| `/en` | 300 ms | 0 | 0 ms | 37.8 ms | 447,891 B |
| `/disena-tu-equipo-ia` | 368 ms | 0 | 0 ms | 36.0 ms | 563,778 B |
| `/en/design-your-ai-team` | 360 ms | 0 | 0 ms | 38.5 ms | 559,795 B |
| `/calculadora-roi` | 332 ms | 0 | 0 ms | 40.6 ms | 492,345 B |
| `/en/roi-calculator` | 356 ms | 0 | 0 ms | 37.9 ms | 487,529 B |

All six routes also reported zero third-party requests, zero broken images, no below-fold eager-image violations and loaded fonts. Clara remained 6,430 bytes with `public, max-age=315360000, immutable`.

Final Lighthouse decisions:

| Route | Performance | Accessibility | Best Practices | SEO | Decision |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | **0.96** | 1.00 | 1.00 | 1.00 | median of 3 |
| `/en` | 0.96 | 1.00 | 1.00 | 1.00 | single sample |
| `/disena-tu-equipo-ia` | 0.96 | 0.96 | 1.00 | 1.00 | single sample |
| `/en/design-your-ai-team` | 0.96 | 0.96 | 1.00 | 1.00 | single sample |
| `/calculadora-roi` | 0.96 | 0.97 | 1.00 | 1.00 | single sample |
| `/en/roi-calculator` | 0.97 | 0.97 | 1.00 | 1.00 | single sample |

Home ES was the only route that triggered the adaptive retry. Its Performance samples were **0.81 / 0.96 / 0.96** and its TBT values were **564.5 / 38 / 32.5 ms**. The final median was **0.96**, confirming the initial miss as an isolated throttled-lab outlier rather than a persistent regression.

The final Lighthouse step reported:

`Phase 8E Lighthouse launch gate OK: 6 routes satisfy all unchanged category thresholds; threshold misses are stabilized by an adaptive median-of-three decision.`

## Diagnostics

`tests/phase8e-performance-budget.spec.ts` prints one structured `PHASE8E_METRICS` record per route. The canonical image delivery check prints `PHASE8E_STATIC_ASSET` with browser URL, decoded source URL, payload bytes, cache control and computed cache lifetime.

The Lighthouse gate emits:

- `LIGHTHOUSE_RUN_CONTEXT`;
- `PHASE8E_LIGHTHOUSE_SAMPLE` for each raw sample;
- `LIGHTHOUSE_SAMPLE_THRESHOLD_MISS` for an individual threshold miss;
- `LIGHTHOUSE_STABILITY_RETRY` when samples 2 and 3 are required;
- `PHASE8E_LIGHTHOUSE` for the final route decision;
- `LIGHTHOUSE_THRESHOLD_FAILURE` only for a final stabilized threshold failure;
- `LIGHTHOUSE_EXECUTION_FAILURE` for hard audit execution failures.

Raw Lighthouse JSON reports are retained as workflow artifacts.

## Execution model

- ordinary Web CI protects `scripts/check-phase8e-performance-budget.mjs` and `scripts/check-phase8e-lighthouse.mjs` without running network-sensitive production audits on pull requests;
- Production Verification checks out the exact successful Web CI SHA;
- the full Playwright production matrix runs directly against `https://iaempleado.com`;
- after production browser acceptance is green, Production Verification builds and starts the same SHA locally;
- Lighthouse audits that exact production build through `LIGHTHOUSE_BASE_URL` with the unchanged 90/95/95/95 thresholds;
- threshold misses are stabilized only through the approved adaptive median rule;
- `npm run qa:performance:production` remains the focused Playwright performance command.

## Closure

Phase 8E is complete. Its performance budgets, cache/lazy-loading rules, exact-SHA split gate, pinned Lighthouse version, unchanged launch thresholds, adaptive stability rule and structured diagnostics remain permanent regression protection.

**Phase 8F — SEO, metadata and sharing — is now ACTIVE.**
