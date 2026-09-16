# Phase 8G — Browser and real-device acceptance

## Status

**COMPLETE — closed on 2026-09-16 after automated browser coverage, native Safari on macOS, and manual physical iPhone/Android validation.**

Production target: `https://iaempleado.com`

Phase 8G keeps automated browser engines, emulation and physical-device evidence explicitly separated. The phase is closed because all required categories are now represented by accepted evidence; emulation was not promoted as a substitute for physical mobile testing.

## Accepted evidence baseline

Native Safari baseline: `647b94866e477f94bebe7c25d10706343a3156c2`.

CI orchestration baseline after Chromium sharding: `6ced0af649981a61d4cd341e7375f36820363163`.

Phase 8G documentation baseline before physical-device closure: `1012c3ab8e16cc927d1c9734f0bf5a44b62b4a34`.

Native Safari evidence:

- PR #108 merged the hardened native Safari acceptance into `main`;
- Phase 8G Native Safari macOS run #13: **success**;
- Web CI #302 on the same `main` SHA: **success**;
- the Safari gate uses native `safaridriver` on a macOS GitHub Actions runner rather than Playwright WebKit on Linux;
- Team Builder, Process Analyzer, ROI synchronization, ES/EN lead-form validation, keyboard focus/skip-link behavior, canonical imagery/layout and reduced-motion behavior are covered.

CI optimization evidence after PR #110:

- base Chromium browser QA is split into three Playwright shards;
- all three Chromium shards passed before merge;
- Chromium Phase 8G, Firefox, WebKit/iPhone emulation, Microsoft Edge, contracts, typecheck and build passed;
- browser assertions, retries and product acceptance criteria were not weakened.

## Evidence contract

Use these labels consistently:

- **Browser CI** — a real browser engine/binary executed by Playwright in GitHub Actions.
- **Native browser CI** — the actual browser for its operating system executed on a matching CI runner. Safari desktop uses native Safari + `safaridriver` on macOS.
- **Engine proxy** — WebKit running under Playwright on Linux. It is useful WebKit compatibility evidence but is not Safari on macOS.
- **Device emulation** — a Playwright mobile descriptor supplying representative viewport, user agent and input behavior. It is not a physical phone.
- **Physical device** — a real phone/tablet executing its browser environment, or an explicitly real-device browser-cloud session.

Never promote an engine proxy or emulation result to physical-device acceptance.

## Final acceptance matrix

| Target | Evidence | Final decision |
| --- | --- | --- |
| Chrome/Chromium desktop | Chromium Playwright browser QA + production verification | **Accepted** |
| Firefox desktop | Dedicated Firefox smoke gate from PR #95 | **Accepted** |
| Microsoft Edge desktop | Dedicated `channel: msedge` gate from PR #100 | **Accepted** |
| Safari desktop | Native Safari + `safaridriver` on macOS from PR #108; main run #13 green | **Accepted** |
| iOS Safari automation | iPhone 13 + WebKit emulation gate from PR #98 | **Accepted as emulation regression evidence** |
| iOS Safari physical | Manual production validation on physical **iPhone 17** reported by the project owner on 2026-09-16 | **Accepted physical-device evidence** |
| Android Chrome automation | Pixel 5 + Chromium emulation gate from PR #99 | **Accepted as emulation regression evidence** |
| Android Chrome physical | Manual production validation on physical **Samsung Galaxy 10** reported by the project owner on 2026-09-16 | **Accepted physical-device evidence** |
| 768px tablet geometry | Dedicated five-context no-retry stability gate from PR #97 | **Accepted automated stability evidence** |

## Permanent automated gates retained in CI

The Web CI chain preserves:

1. Chromium browser UX/accessibility QA split across three shards;
2. 768×1024 stability stress acceptance;
3. Android Chromium emulation acceptance;
4. Firefox smoke acceptance;
5. WebKit smoke acceptance;
6. iPhone WebKit emulation acceptance;
7. Microsoft Edge smoke acceptance;
8. contracts, ES/EN parity, TypeScript and production build.

A separate permanent macOS workflow runs native Safari acceptance with `safaridriver`, including a reduced-motion session.

## Safari desktop — accepted

Native Safari desktop acceptance is green on the hardened Phase 8G gate.

Covered checks:

- [x] ES and EN critical routes render without horizontal overflow;
- [x] navigation and language switch are usable;
- [x] canonical character imagery loads and remains bounded;
- [x] Team Builder state changes correctly;
- [x] Process Analyzer state changes correctly;
- [x] ROI numeric/range controls remain synchronized after interaction;
- [x] ES/EN Request Demo fields and required-field validation are usable;
- [x] keyboard focus behavior and skip-link structure are verified;
- [x] macOS full keyboard navigation is enabled explicitly for acceptance evidence;
- [x] macOS Reduce Motion is enabled in a second native Safari session and `prefers-reduced-motion: reduce` is verified;
- [x] no acceptance assertion was weakened to obtain the passing result.

Evidence baseline: `647b94866e477f94bebe7c25d10706343a3156c2`, native Safari workflow run #13 — **PASS**.

## Physical iPhone Safari — accepted

Manual validation was performed by the project owner against the production website on a physical **iPhone 17** on 2026-09-16.

The project owner confirmed completion of the Phase 8G mobile validation flow. The exact iOS/Safari version was not recorded during the session and is intentionally left unclaimed rather than inferred.

Accepted checks:

- [x] physical iPhone model recorded: iPhone 17;
- [x] Home ES and EN render without blocking horizontal overflow;
- [x] touch navigation is usable and closes/restores page state correctly;
- [x] language switching is usable;
- [x] canonical character content remains inside the usable viewport;
- [x] Team Builder works by touch;
- [x] Process Analyzer works by touch;
- [x] ROI controls remain usable and synchronized;
- [x] Request Demo form is usable with the software keyboard;
- [x] orientation/mobile layout sanity was validated;
- [x] no user-flow-blocking runtime failure was reported.

Evidence record:

```text
Target: iOS Safari physical device
Device/model: iPhone 17
OS version: not recorded during manual session
Browser/version: Safari; exact version not recorded during manual session
Date: 2026-09-16
Production URL: https://iaempleado.com
Release SHA: not captured on-device; production runtime manually validated
Result: PASS
Observed blocking issues: none reported
Tester: project owner
```

## Physical Android Chrome — accepted

Manual validation was performed by the project owner against the production website on a physical **Samsung Galaxy 10** on 2026-09-16.

The exact Android/Chrome versions were not recorded during the session and are intentionally left unclaimed rather than inferred.

Accepted checks:

- [x] physical Android model recorded: Samsung Galaxy 10;
- [x] Home ES and EN render without blocking horizontal overflow;
- [x] touch navigation is usable and returns to coherent state;
- [x] language switching is usable;
- [x] canonical character content remains inside the usable viewport;
- [x] Team Builder works by touch;
- [x] Process Analyzer works by touch;
- [x] ROI controls remain usable and synchronized;
- [x] Request Demo form is usable with the software keyboard;
- [x] back/orientation/mobile layout sanity was validated;
- [x] no user-flow-blocking runtime failure was reported.

Evidence record:

```text
Target: Android Chrome physical device
Device/model: Samsung Galaxy 10
OS version: not recorded during manual session
Browser/version: Chrome; exact version not recorded during manual session
Date: 2026-09-16
Production URL: https://iaempleado.com
Release SHA: not captured on-device; production runtime manually validated
Result: PASS
Observed blocking issues: none reported
Tester: project owner
```

## Closure decision

All Phase 8G browser/device rows are now green at the required evidence level:

- automated Chromium, Firefox, Edge, WebKit and mobile emulation regressions are green;
- native Safari on macOS is green;
- physical iPhone Safari validation is green;
- physical Android Chrome validation is green.

**Phase 8G is COMPLETE as of 2026-09-16.**

The next permitted gate is **Phase 8H — final content, commercial and legal readiness review**. Implementation of `kairoseth.iaempleado.com` remains blocked until Phase 8H and the final Phase 8 release gate are complete.