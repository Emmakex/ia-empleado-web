# Phase 8G — Browser and real-device acceptance

## Status

**ACTIVE — automated browser acceptance and native Safari on macOS are green; physical iPhone Safari and physical Android Chrome evidence are still required.**

Phase 8G must not be declared complete until the remaining physical mobile-device evidence is recorded. Playwright WebKit and mobile device descriptors remain useful regression gates, but they are not equivalent to a physical iPhone or Android device.

Production target: `https://iaempleado.com`

Latest accepted native Safari baseline: `647b94866e477f94bebe7c25d10706343a3156c2`.

Current CI orchestration baseline after Chromium sharding: `6ced0af649981a61d4cd341e7375f36820363163`.

Native Safari evidence for `647b94866e477f94bebe7c25d10706343a3156c2`:

- PR #108 merged the hardened native Safari acceptance into `main`;
- Phase 8G Native Safari macOS run #13: **success**;
- Web CI #302 on the same `main` SHA: **success**;
- the Safari gate uses native `safaridriver` on a macOS GitHub Actions runner rather than Playwright WebKit on Linux;
- the gate records macOS/Safari/safaridriver versions and preserves screenshots/reports as artifacts;
- Team Builder, Process Analyzer, ROI synchronization, ES/EN lead-form validation, keyboard focus/skip-link behavior, canonical imagery/layout and reduced-motion behavior are covered;
- successful native macOS Safari evidence does **not** substitute for physical iPhone Safari or physical Android Chrome acceptance.

CI optimization evidence after PR #110:

- base Chromium browser QA is split into three Playwright shards;
- all three Chromium shards passed before merge;
- Chromium Phase 8G, Firefox, WebKit/iPhone emulation, Microsoft Edge, contracts, typecheck and build also passed;
- browser assertions, retries and product acceptance criteria were not weakened.

## Evidence contract

Use these labels consistently:

- **Browser CI** — a real browser engine/binary executed by Playwright in GitHub Actions. This is valid browser regression evidence for that CI platform.
- **Native browser CI** — the actual browser for its operating system executed on a matching CI runner. The current Safari desktop gate uses native Safari + `safaridriver` on macOS and is valid desktop Safari acceptance evidence.
- **Engine proxy** — WebKit running under Playwright on Linux. This gives strong WebKit compatibility coverage but is not Safari on macOS.
- **Device emulation** — a Playwright device descriptor supplying representative viewport, user agent and input behavior. This is not a physical phone or tablet.
- **Physical device** — a real phone/tablet executing its native browser environment, or an explicitly real-device browser-cloud session.

Never promote an engine proxy or emulation result to physical-device acceptance.

## Current acceptance matrix

| Target | Evidence | Current decision | Remaining evidence |
| --- | --- | --- | --- |
| Chrome/Chromium desktop | Chromium Playwright browser QA + production verification | **Accepted for CI browser coverage** | None for Phase 8G |
| Firefox desktop | Dedicated Firefox smoke gate from PR #95 | **Accepted for CI browser coverage** | None for Phase 8G |
| Microsoft Edge desktop | Dedicated `channel: msedge` gate from PR #100 | **Accepted for Edge browser coverage on Linux CI** | Optional Windows sanity check only |
| Safari desktop | Native Safari + `safaridriver` on macOS from PR #108; main run #13 green | **Accepted for native desktop Safari coverage** | None for Phase 8G |
| iOS Safari | iPhone 13 + WebKit emulation gate from PR #98 | **Emulation only** | **Physical iPhone/iOS Safari still required** |
| Android Chrome | Pixel 5 + Chromium emulation gate from PR #99 | **Emulation only** | **Physical Android/Chrome still required** |
| 768px tablet geometry | Dedicated five-context no-retry stability gate from PR #97 | **Accepted automated stability evidence** | Physical tablet review only if used in final manual visual acceptance |

## Permanent automated gates now in CI

The Web CI chain currently preserves all of the following:

1. Chromium browser UX/accessibility QA split across three shards;
2. 768×1024 stability stress acceptance;
3. Android Chromium emulation acceptance;
4. Firefox smoke acceptance;
5. WebKit smoke acceptance;
6. iPhone WebKit emulation acceptance;
7. Microsoft Edge smoke acceptance;
8. contracts, ES/EN parity, TypeScript and production build.

A separate permanent macOS workflow additionally runs native Safari acceptance with `safaridriver`, including a reduced-motion session.

## Accepted Safari desktop — macOS

Native Safari desktop acceptance is now green on the hardened Phase 8G gate.

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

Evidence baseline: `647b94866e477f94bebe7c25d10706343a3156c2`, native Safari workflow run #13, result **PASS**.

## Remaining physical-device acceptance checklist

Run these checks against the production URL. Capture device/OS/browser version plus pass/fail notes and screenshots/video where practical.

### A. iOS Safari — physical iPhone

Minimum session:

- current supported iOS Safari on a physical iPhone;
- portrait orientation, plus one landscape sanity check.

Required checks:

- [ ] record iPhone model and iOS/Safari version context;
- [ ] Home ES and EN render without horizontal overflow;
- [ ] mobile menu opens by touch and traps/restores focus correctly;
- [ ] menu CTA reaches the demo/contact route;
- [ ] body scroll lock releases after navigation;
- [ ] language switch works;
- [ ] Home canonical Clara, Alex, Sofía and Javier cards remain visible and bounded;
- [ ] Team Builder works by touch;
- [ ] Process Analyzer works by touch;
- [ ] ROI controls remain synchronized;
- [ ] form fields, software keyboard and validation remain usable;
- [ ] orientation change does not leave clipped/overlapping content;
- [ ] reduced-motion behavior remains readable and complete;
- [ ] no user-flow-blocking runtime failure is observed;
- [ ] attach screenshot(s) or screen recording.

### B. Android Chrome — physical Android phone

Minimum session:

- current supported Android Chrome on a physical phone;
- portrait orientation, plus one landscape sanity check.

Required checks:

- [ ] record device model, Android version and Chrome version;
- [ ] Home ES and EN render without horizontal overflow;
- [ ] mobile navigation works by touch and restores coherent state;
- [ ] language switch works;
- [ ] Home canonical character cards remain visible and bounded;
- [ ] Team Builder works by touch;
- [ ] Process Analyzer works by touch;
- [ ] ROI controls remain synchronized;
- [ ] form fields and validation remain usable with the native keyboard;
- [ ] back navigation returns to a coherent page state;
- [ ] orientation change does not leave clipped/overlapping content;
- [ ] reduced-motion behavior remains readable and complete where supported;
- [ ] no user-flow-blocking runtime failure is observed;
- [ ] attach screenshot(s) or screen recording.

## Evidence record template

For each physical-device session, record:

```text
Target:
Device/model:
OS version:
Browser/version:
Date:
Production URL:
Release SHA:
Result: PASS | FAIL
Checks completed:
Observed issues:
Screenshots/video reference:
Tester:
```

A PASS may be recorded only when all required checks for that target are completed against the intended production release SHA. Any blocking failure keeps Phase 8G open until corrected and re-verified.

## Closure rule

Phase 8G now has **two** outstanding physical-device rows:

- iOS Safari on a physical iPhone;
- Android Chrome on a physical Android device.

Safari desktop on macOS is no longer an outstanding row because native Safari acceptance is green on the hardened macOS gate.

After both remaining physical mobile targets pass:

1. update this document with the exact device evidence and release SHA;
2. update `docs/PHASE_8_WEB_FINALIZATION.md` to mark cross-browser/device acceptance green and correct stale Phase 8F/8G status text;
3. close issue #103;
4. activate Phase 8H final commercial/content/legal review;
5. keep `kairoseth.iaempleado.com` implementation blocked until Phase 8H and the final Phase 8 release gate are green.

Until then, **Phase 8G stays ACTIVE**.
