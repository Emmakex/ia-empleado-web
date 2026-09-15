# Phase 8E — Performance & Core Web Vitals Closure

## Status

**COMPLETE — closed on 2026-09-15 after exact-SHA Production Verification #46.**

Phase 8E converted performance from an informal visual check into a protected release contract covering real Hostinger delivery plus a deterministic Lighthouse lab gate tied to the exact successful release SHA.

## Closure chain

- PR #90 (`fix: stabilize Phase 8E Lighthouse threshold sampling`) passed Web CI #232.
- PR #90 merged to `main` as `783cbf5888f26056fc808a7c1fba4bdf2049c6ee`.
- main Web CI #233 passed all contracts, TypeScript, browser QA and build.
- Production Verification #46 (`34930591064`) checked out the exact SHA `783cbf5888f26056fc808a7c1fba4bdf2049c6ee`.
- Hostinger served `web-phase-8e-lighthouse-gate` before production acceptance began.
- The full production browser matrix finished **163/163 green**.
- The exact release built successfully and `next start` served the same release marker on `127.0.0.1:3000`.
- Lighthouse 13.4.1 completed the six-route bilingual launch matrix and all final stabilized category scores met the unchanged thresholds.

## Real production evidence — Hostinger

Production Verification #46 measured the six representative routes directly against `https://iaempleado.com`:

| Route | LCP | CLS | Long task max | TTFB | Total transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 312 ms | 0 | 0 ms | 41.3 ms | 450,803 B |
| `/en` | 300 ms | 0 | 0 ms | 37.8 ms | 447,891 B |
| `/disena-tu-equipo-ia` | 368 ms | 0 | 0 ms | 36.0 ms | 563,778 B |
| `/en/design-your-ai-team` | 360 ms | 0 | 0 ms | 38.5 ms | 559,795 B |
| `/calculadora-roi` | 332 ms | 0 | 0 ms | 40.6 ms | 492,345 B |
| `/en/roi-calculator` | 356 ms | 0 | 0 ms | 37.9 ms | 487,529 B |

All six routes also reported:

- zero third-party requests;
- zero broken images;
- no below-fold eager-image violations;
- `document.fonts.status === "loaded"`.

The canonical Clara browser asset remained **6,430 bytes** with `Cache-Control: public, max-age=315360000, immutable`.

## Lighthouse closure evidence

Launch thresholds remained unchanged throughout remediation:

- Performance >= **0.90**;
- Accessibility >= **0.95**;
- Best Practices >= **0.95**;
- SEO >= **0.95**.

Production Verification #45 proved that a single CPU-throttled Lighthouse sample could produce a non-reproducible TBT spike even while the bilingual counterpart used effectively the same frontend bundle and real Hostinger tests showed no long tasks. PR #90 therefore introduced an adaptive stability rule without weakening thresholds: run one sample normally; only when it misses a category, run two more and decide by the median of three. Execution errors remain hard failures.

Production Verification #46 produced the following final decisions:

| Route | Performance | Accessibility | Best Practices | SEO | Decision |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 0.96 | 1.00 | 1.00 | 1.00 | median of 3 |
| `/en` | 0.96 | 1.00 | 1.00 | 1.00 | single sample |
| `/disena-tu-equipo-ia` | 0.96 | 0.96 | 1.00 | 1.00 | single sample |
| `/en/design-your-ai-team` | 0.96 | 0.96 | 1.00 | 1.00 | single sample |
| `/calculadora-roi` | 0.96 | 0.97 | 1.00 | 1.00 | single sample |
| `/en/roi-calculator` | 0.97 | 0.97 | 1.00 | 1.00 | single sample |

Home ES was the only route that triggered the stability retry. Its Performance samples were **0.81 / 0.96 / 0.96**, with TBT **564.5 / 38 / 32.5 ms**. The median therefore closed at **0.96** and confirmed the first sample as an isolated lab outlier rather than a persistent regression.

## Permanent regression protection

Phase 8E remains protected by:

- `config/performance-budgets.json`;
- `tests/phase8e-performance-budget.spec.ts`;
- `config/lighthouse-launch.json`;
- `scripts/check-phase8e-performance-budget.mjs`;
- `scripts/check-phase8e-lighthouse.mjs`;
- `scripts/run-phase8e-lighthouse.mjs`;
- Production Verification against the exact successful Web CI SHA;
- retained structured diagnostics and Lighthouse JSON artifacts.

No performance threshold was reduced to obtain closure.

## Next phase

**Phase 8F — SEO, metadata and sharing — is now ACTIVE.**

Phase 8F must complete before Phase 8G begins, and work on `kairoseth.iaempleado.com` remains blocked until the full public-web Phase 8 roadmap is complete.