# Phase 8E — Performance Baseline & Core Web Vitals Gate

## Status

ACTIVE — the measurable production budget is integrated. Production Verification #41 confirmed the lazy-loading remediation and every representative route budget, while isolating the remaining cache problem to Hostinger's raw `/public` static-asset delivery layer.

## Objective

Turn performance from an informal visual check into an explicit release contract for `iaempleado.com`.

The first Phase 8E tranches deliberately use the existing Playwright production stack so the same deployment verification can emit actionable per-route measurements without adding a parallel browser harness.

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

These are launch guardrails, not aspirational final numbers. They remain unchanged while the delivery implementation is corrected.

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

The lazy-loading remediation is fully accepted in production. Every representative route reported `belowFoldEagerImages: []`, with no broken images, no third-party requests and fonts loaded. Measured results remained comfortably inside budget:

- LCP: **460–764 ms**;
- CLS: **0** on all six routes;
- longest observed long task: **0 ms** in this run;
- TTFB: approximately **60.6–156 ms**;
- total transfer: approximately **436–547 KB**;
- JavaScript: approximately **219–313 KB**;
- CSS: approximately **81.5 KB**;
- third-party requests: **0**;
- below-fold eager images: **0** on all six routes.

The sole remaining failure was the raw file `/branding/characters/clara-canonical.webp`: payload **6,430 bytes**, but `Cache-Control` remained an empty string even after the Next `headers()` rule. The repeated result proves that the Hostinger-managed static delivery path for this `/public` asset is not honoring the application-level header rule used in PR #85.

## Static-image cache remediation after #41

The release contract now follows the image request that the browser actually uses instead of the mutable raw `/public` URL.

The approved character WebPs are unchanged. `lib/brand-characters.ts` remains a pure data/source-path catalog for server-side consumers such as campaign rendering. `components/brand-character-image.tsx` alone imports Clara, Alex, Sofía and Javier as Next static image modules and maps the character IDs to those `StaticImageData` assets for browser delivery. That keeps campaign/test code independent of binary module loaders while making the Next build emit content-hashed assets under `/_next/static/media/...` for the public renderer.

`next.config.ts` sets `images.minimumCacheTTL` to **604800 seconds (7 days)** for optimized image delivery. The Phase 8D canonical-fidelity test now requires the four canonical character identities to resolve through hashed `/_next/static/media/...` sources. The Phase 8E production test discovers Clara's real `currentSrc`, verifies that its underlying source is the hashed canonical WebP, requests the actual browser URL and requires:

- payload <= 500 KB;
- no `no-store` directive;
- reusable `max-age` or `s-maxage` >= 604800 seconds.

This is not a relaxed cache requirement. It removes an implementation-specific assertion against an unused mutable source path and replaces it with a stronger assertion against the actual browser-delivered canonical image.

The exact release marker for this remediation is `web-phase-8e-static-image-cache`, so Production Verification cannot approve the earlier #41 deployment.

## Diagnostics

`tests/phase8e-performance-budget.spec.ts` prints one structured record per route:

- `PHASE8E_METRICS { ... }`

Each record includes exact resolved URLs in `belowFoldEagerImages` when the lazy-loading rule fails.

The canonical image delivery check prints:

- `PHASE8E_STATIC_ASSET { ... }`

That record includes `browserUrl`, decoded `sourceUrl`, payload bytes, received `cacheControl` and computed `cacheSeconds`.

## Execution model

- ordinary Web CI runs `scripts/check-phase8e-performance-budget.mjs` to protect the budget, renderer-scoped static imports, optimized-image TTL and lazy-loading contracts;
- numeric network and Core Web Vitals budgets run only when `PRODUCTION_BASE_URL` is set;
- Production Verification includes `tests/phase8e-performance-budget.spec.ts` against `https://iaempleado.com`;
- `npm run qa:performance:production` provides the same focused production check when needed manually.

## Remaining Phase 8E work

Phase 8E remains open. The immediate acceptance gate is a green exact-marker production verification of `web-phase-8e-static-image-cache`. Only after that gate is green may Phase 8E advance to the Lighthouse launch-score gate for performance, accessibility, best practices and SEO, with documented exceptions only where a score cannot be made deterministic.
