# Phase 8E — Performance Baseline & Core Web Vitals Gate

## Status

ACTIVE — the production performance budget, lazy-loading remediation and hashed canonical-image cache delivery are accepted in production. Production Verification #42 closed the cache blocker with 163/163 tests green. Production Verifications #43 and #44 both passed the full **163/163** browser matrix against Hostinger, while direct Lighthouse navigation was blocked by the Hostinger/WAF layer with the same 403 on all six routes. Phase 8E now uses a split evidence model: production Playwright remains on `iaempleado.com`, while Lighthouse audits the exact successful release SHA through a WAF-independent local production build. Launch thresholds remain unchanged.

## Objective

Turn performance from an informal visual check into an explicit release contract for `iaempleado.com`.

The Phase 8E gates use the existing production-verification chain so deployment identity, real production browser acceptance, Core Web Vitals/resource budgets and reproducible Lighthouse launch scores are all tied to the same successful release SHA before the phase can close. Hostinger delivery is measured directly by Playwright; Lighthouse is intentionally isolated from an externally controlled WAF that blocks its automation signature before scoring.

## Representative production routes

The bilingual matrix covers:

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
- the browser-delivered canonical Clara image must stay <= 500 KB and expose at least 604800 seconds of reusable cache lifetime.

These are launch guardrails, not aspirational final numbers. They have not been weakened during remediation.

## Production baseline — Verification #40

Production Verification #40 (`34882801900`) ran against `main` SHA `a09d34ec640c50b3f1d3d475137960f418a3ba41`. The job finished with **155 passed, 7 failed and 1 flaky**. The failures were actionable and did not require relaxing any numeric budget.

All six representative routes were comfortably inside the initial Core Web Vitals/resource limits. LCP was approximately 300–468 ms, CLS was 0, TTFB was normally approximately 22–26 ms, total transfer stayed approximately 436–547 KB and third-party requests remained 0.

The seven Phase 8E failures were below-fold eager decorative brand marks plus the absence of an explicit reusable cache header on the raw canonical Clara WebP. The `/en` Axe retry was flaky and not the Phase 8E root cause.

## First remediation — PR #85

PR #85 corrected the below-fold loading policy without changing any performance threshold:

- footer branding loads lazily with asynchronous decoding;
- Team Builder empty/result-state decorative brand marks load lazily;
- diagnostics emit exact offending image URLs through `belowFoldEagerImages`;
- an initial `/branding/:path*` Next header policy attempted to add reusable caching;
- the exact deployment marker advanced to `web-phase-8e-cache-lazy-loading`.

Web CI #213 passed on the PR. After merge, Web CI #214 passed on `main` at SHA `2c258dc72f6b6407b3510c937804a5f14d7a8a62`.

## Production Verification #41

Production Verification #41 (`34912068747`) verified the exact marker `web-phase-8e-cache-lazy-loading` and executed 163 production tests. Final result: **162 passed, 1 failed**.

The lazy-loading remediation was fully accepted in production. Every representative route reported `belowFoldEagerImages: []`, with no broken images, no third-party requests and fonts loaded. Measured results remained comfortably inside budget:

- LCP: **460–764 ms**;
- CLS: **0** on all six routes;
- longest observed long task: **0 ms** in this run;
- TTFB: approximately **60.6–156 ms**;
- total transfer: approximately **436–547 KB**;
- JavaScript: approximately **219–313 KB**;
- CSS: approximately **81.5 KB**;
- third-party requests: **0**;
- below-fold eager images: **0** on all six routes.

The sole remaining failure was the raw file `/branding/characters/clara-canonical.webp`: payload **6,430 bytes**, but `Cache-Control` remained an empty string even after the Next `headers()` rule. The repeated result proved that the Hostinger-managed static delivery path for this `/public` asset was not honoring the application-level header rule used in PR #85.

## Static-image cache remediation after #41

The release contract follows the image request that the browser actually uses instead of the mutable raw `/public` URL.

The approved character WebPs are unchanged. `lib/brand-characters.ts` remains a pure data/source-path catalog for server-side consumers such as campaign rendering. `components/brand-character-image.tsx` alone imports Clara, Alex, Sofía and Javier as Next static image modules and maps the character IDs to those `StaticImageData` assets for browser delivery. That keeps campaign/test code independent of binary module loaders while making the Next build emit content-hashed assets under `/_next/static/media/...` for the public renderer.

`next.config.ts` sets `images.minimumCacheTTL` to **604800 seconds (7 days)** for optimized image delivery. The Phase 8D canonical-fidelity test requires the four canonical character identities to resolve through hashed `/_next/static/media/...` sources. The Phase 8E production test discovers Clara's real `currentSrc`, verifies that its underlying source is the hashed canonical WebP, requests the actual browser URL and requires:

- payload <= 500 KB;
- no `no-store` directive;
- reusable `max-age` or `s-maxage` >= 604800 seconds.

This is not a relaxed cache requirement. It replaces an assertion against an unused mutable source path with a stronger assertion against the actual browser-delivered canonical image.

PR #86 completed this remediation and merged to `main` as `f29001f7922dc44fd61b3a4bf867e549c57658a8`. Web CI #224 passed on the final PR SHA and Web CI #225 passed again on `main`.

## Production Verification #42 — cache closure

Production Verification #42 (`34915450760`) verified the exact marker `web-phase-8e-static-image-cache` and finished **163/163 tests passed** against `https://iaempleado.com`.

Final production evidence:

- Home ES LCP **360 ms**, CLS **0**, TTFB approximately **36.1 ms**;
- Home EN LCP **348 ms**, CLS **0**, TTFB approximately **36.2 ms**;
- Team Builder ES LCP **344 ms**, CLS **0**;
- Team Builder EN LCP **392 ms**, CLS **0**;
- ROI ES LCP **344 ms**, CLS **0**;
- ROI EN LCP **520 ms**, CLS **0**, longest observed long task **56 ms**;
- `belowFoldEagerImages: []` on all six representative routes;
- broken images **0**;
- third-party requests **0**;
- fonts status `loaded` throughout.

The canonical Clara request resolved to `/_next/static/media/clara-canonical.3zljg6zeigl6e.webp`, payload **6,430 bytes**, with `Cache-Control: public, max-age=315360000, immutable`. The computed reusable cache lifetime was **315360000 seconds**, far above the 604800-second minimum.

The cache/lazy-loading remediation is therefore closed.

## Lighthouse launch-score gate

The final Phase 8E tranche adds a reproducible Lighthouse gate on top of the accepted Playwright production budget; it does not replace or weaken it.

Machine-readable source of truth: `config/lighthouse-launch.json`.

Pinned tooling and launch thresholds:

- Lighthouse **13.4.1**;
- mobile form factor;
- Performance >= **0.90**;
- Accessibility >= **0.95**;
- Best Practices >= **0.95**;
- SEO >= **0.95**;
- the same six bilingual representative routes used by the production performance budget.

`scripts/run-phase8e-lighthouse.mjs` discovers Chrome/Chromium explicitly, runs the pinned Lighthouse CLI, stores one JSON report per route under `.artifacts/lighthouse/`, writes a combined `summary.json` and emits structured diagnostics:

- `PHASE8E_LIGHTHOUSE { ... }` for every completed route;
- `LIGHTHOUSE_THRESHOLD_FAILURE { ... }` for any category below its minimum;
- `LIGHTHOUSE_EXECUTION_FAILURE { ... }` if the audit itself cannot execute;
- `LIGHTHOUSE_RUN_CONTEXT { ... }` with the resolved audit base URL and its source.

Production Verification uploads the Lighthouse JSON reports even when the gate is green, preserving launch evidence. The exact website release marker for this tranche remains `web-phase-8e-lighthouse-gate`.

No category threshold may be reduced merely to make CI pass. A failure must first be mapped to the responsible audit, route and implementation cause; any documented exception must be explicit and justified as nondeterministic or externally controlled.

## Production Verification #43 — Lighthouse/WAF execution blocker

Production Verification #43 (`34919207771`) checked out exact `main` SHA `4f09f5e5e7d01c4aba2d8b4d917225655acc74c4`, confirmed Hostinger was serving `web-phase-8e-lighthouse-gate`, and then completed the normal production suite **163/163 green**.

The Playwright performance evidence in that same run remained excellent:

- LCP across the six representative routes: **236–308 ms**;
- CLS: **0** on every route;
- TTFB: approximately **16.6–18.2 ms**;
- longest observed long task: **54 ms**;
- third-party requests: **0**;
- broken images: **0**;
- `belowFoldEagerImages: []` throughout;
- canonical Clara remained **6,430 bytes** with `public, max-age=315360000, immutable`.

Lighthouse itself never reached category scoring. All six routes produced the same structured execution error: `Lighthouse was unable to reliably load the page ... (Status code: 403)`. There were **zero `LIGHTHOUSE_THRESHOLD_FAILURE` records**; the failure class was exclusively `LIGHTHOUSE_EXECUTION_FAILURE`.

Because the exact same GitHub runner had already reached and exercised all six routes through Playwright, the repeated 403 was classified as an auditor-identity/WAF compatibility problem rather than a product availability or performance regression. PR #88 kept Lighthouse 13.4.1, the six routes and all four 90/95/95/95 thresholds unchanged, while adding a versioned normal mobile Chrome `emulatedUserAgent` before Lighthouse navigation.

## Production Verification #44 — browser UA does not bypass Hostinger WAF

Production Verification #44 (`34926445378`) ran after PR #88 merged to `main` as SHA `67a9bbc4a789b22f98f80cd40a5a48bec11c7dab`. Hostinger served the expected `web-phase-8e-lighthouse-gate` marker and the full production browser matrix again finished **163/163 green**.

Production performance remained comfortably inside budget in #44:

- LCP across the six representative routes: **496–564 ms**;
- CLS: **0** throughout;
- TTFB: approximately **62.8–65.3 ms**;
- longest observed long task: **61 ms**;
- third-party requests: **0**;
- broken images: **0**;
- `belowFoldEagerImages: []` throughout;
- Clara canonical remained **6,430 bytes** with `public, max-age=315360000, immutable`.

The Lighthouse runner confirmed it was using `/usr/bin/google-chrome` and the configured normal mobile Chrome identity through `LIGHTHOUSE_RUN_CONTEXT`. Despite that, all six routes still returned the same `Status code: 403` before Lighthouse could calculate a single category score. Again there were no threshold failures because scoring never began.

This second controlled reproduction confirms that the blocker is not the Lighthouse user-agent string. The Hostinger/WAF path is treating Lighthouse automation differently from normal browser automation on the same runner. Continued attempts to mimic browser identity would create brittle infrastructure without increasing confidence in the product.

### Split-gate decision after #44

Phase 8E therefore separates two kinds of evidence without weakening either:

1. **Real production evidence stays on Hostinger.** The existing 163-test Playwright matrix continues to exercise `https://iaempleado.com` directly, including real TTFB, LCP/CLS/resource budgets, canonical image cache behavior, accessibility, geometry, conversion, responsive behavior and motion.
2. **Lighthouse becomes a deterministic lab gate for the exact verified release SHA.** Production Verification checks out the exact SHA whose Web CI completed successfully, builds it with `npm run build`, starts that production build on `127.0.0.1:3000`, verifies the same `ia-web-release` marker locally, and then runs the pinned Lighthouse 13.4.1 matrix against that server through `LIGHTHOUSE_BASE_URL`.

The runner still supports `PRODUCTION_BASE_URL` as a fallback for focused/manual use, but the protected release workflow requires `LIGHTHOUSE_BASE_URL: http://127.0.0.1:3000`. This makes the Lighthouse gate WAF-independent while preserving an exact relationship to the release source under verification.

The website runtime itself does not change as part of this harness correction, so the active marker remains `web-phase-8e-lighthouse-gate`.

## Diagnostics

`tests/phase8e-performance-budget.spec.ts` prints one structured record per route:

- `PHASE8E_METRICS { ... }`

Each record includes exact resolved URLs in `belowFoldEagerImages` when the lazy-loading rule fails.

The canonical image delivery check prints:

- `PHASE8E_STATIC_ASSET { ... }`

That record includes `browserUrl`, decoded `sourceUrl`, payload bytes, received `cacheControl` and computed `cacheSeconds`.

The Lighthouse gate adds `LIGHTHOUSE_RUN_CONTEXT`, `PHASE8E_LIGHTHOUSE`, `LIGHTHOUSE_THRESHOLD_FAILURE` and `LIGHTHOUSE_EXECUTION_FAILURE` records and retains the full JSON reports as workflow artifacts. `LIGHTHOUSE_RUN_CONTEXT` records whether the audit target came from `LIGHTHOUSE_BASE_URL` or the manual fallback `PRODUCTION_BASE_URL`.

## Execution model

- ordinary Web CI runs `scripts/check-phase8e-performance-budget.mjs` and `scripts/check-phase8e-lighthouse.mjs` to protect both Phase 8E contracts without running network-sensitive production audits on pull requests;
- Production Verification checks out the exact successful Web CI SHA;
- the full Playwright production matrix continues to run directly against `https://iaempleado.com` with `PRODUCTION_BASE_URL`;
- after production browser acceptance is green, Production Verification builds the same checked-out SHA with `npm run build` and starts `next start` on `127.0.0.1:3000`;
- Lighthouse then audits that exact production build through `LIGHTHOUSE_BASE_URL`, bypassing only the externally controlled WAF while retaining the same application/runtime build and the unchanged 90/95/95/95 thresholds;
- `npm run qa:performance:production` remains the focused Playwright performance command.

## Remaining Phase 8E work

Phase 8E remains open until the WAF-independent exact-SHA Lighthouse lab completes on all six routes and every category satisfies the unchanged launch thresholds. Only then may Phase 8E close and Phase 8F — SEO/metadata/sharing finalization — become active.
