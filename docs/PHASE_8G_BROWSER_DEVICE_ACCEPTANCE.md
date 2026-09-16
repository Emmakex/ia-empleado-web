# Phase 8G — Browser and real-device acceptance

## Status

**ACTIVE — automated browser acceptance is green; real Safari/iOS/Android device evidence is still required.**

Phase 8G must not be declared complete until the evidence types below remain clearly separated. Playwright WebKit and mobile device descriptors are useful regression gates, but they are not equivalent to a physical Apple or Android device.

Production target: `https://iaempleado.com`

Current accepted repository baseline: `5f5e418313e4ab4eba6c643ad49da0af791309e3`

Post-merge release evidence for that baseline:

- Web CI #278: **success**;
- Production Verification #57: **success**;
- exact production verification covered geometry, brand systems, conversion, accessibility, motion, canonical fidelity, performance and SEO;
- exact release build and Lighthouse launch gate also passed.

## Evidence contract

Use these labels consistently:

- **Browser CI** — a real browser engine/binary executed by Playwright in GitHub Actions. This is valid browser regression evidence for that CI platform, but not physical-device evidence.
- **Engine proxy** — WebKit running under Playwright on Linux. This gives strong WebKit compatibility coverage but is not desktop Safari on macOS.
- **Device emulation** — a Playwright device descriptor supplying representative viewport, user agent and input behavior. This is not a physical phone or tablet.
- **Real device** — a physical device, or a browser-cloud session explicitly backed by a real device/OS/browser combination.

Never promote an engine proxy or emulation result to real-device acceptance.

## Current acceptance matrix

| Target | Automated evidence | Current decision | Remaining evidence |
| --- | --- | --- | --- |
| Chrome/Chromium desktop | Chromium Playwright browser QA and production verification | **Accepted for CI browser coverage** | No additional Phase 8G CI work required |
| Firefox desktop | Dedicated Firefox smoke gate from PR #95 | **Accepted for CI browser coverage** | No additional Phase 8G CI work required |
| Microsoft Edge desktop | Dedicated `channel: msedge` gate from PR #100 | **Accepted for Edge browser coverage on Linux CI** | Optional Windows-specific manual sanity check; not required to claim the Edge binary gate itself passed |
| Safari desktop | Dedicated Playwright WebKit smoke gate from PR #96 | **Proxy only** | **Real Safari on macOS still required** |
| iOS Safari | iPhone 13 + WebKit emulation gate from PR #98 | **Emulation only** | **Real iPhone/iOS Safari still required** |
| Android Chrome | Pixel 5 + Chromium emulation gate from PR #99 | **Emulation only** | **Real Android/Chrome still required** |
| 768px tablet geometry | Dedicated five-context no-retry stability gate from PR #97 | **Accepted automated stability evidence** | Physical tablet review only if used as final manual visual acceptance |

## Permanent automated gates now in CI

The Web CI chain currently preserves all of the following:

1. base Chromium browser UX/accessibility QA;
2. 768×1024 stability stress acceptance;
3. Firefox smoke acceptance;
4. WebKit smoke acceptance;
5. iPhone WebKit emulation acceptance;
6. Android Chromium emulation acceptance;
7. Microsoft Edge smoke acceptance;
8. production build.

The CI job timeout was increased from 15 to 25 minutes in PR #101 after the expanded browser matrix legitimately exceeded the previous global limit during the final Build step. No browser assertions or product behavior were weakened.

## Real-device acceptance checklist

Run these checks against the production URL, not a local build. Capture device/OS/browser version plus pass/fail notes.

### A. Safari desktop — macOS

Minimum session:

- current supported macOS Safari;
- production Home in ES and EN;
- one employee/team index;
- Team Builder;
- Process Analyzer;
- ROI calculator;
- demo/contact conversion route.

Required checks:

- [ ] navigation and language switch work;
- [ ] hero and canonical character art remain inside layout bounds;
- [ ] no horizontal overflow at representative desktop width;
- [ ] Team Builder state changes correctly;
- [ ] Process Analyzer state changes correctly;
- [ ] ROI controls remain synchronized after interaction;
- [ ] demo/contact form is usable and validation feedback is visible;
- [ ] keyboard focus remains visible and ordered;
- [ ] reduced-motion preference does not hide content;
- [ ] no user-flow-blocking console/runtime error is observed.

### B. iOS Safari — physical iPhone

Minimum session:

- current supported iOS Safari on a physical iPhone;
- portrait orientation, plus one landscape sanity check.

Required checks:

- [ ] mobile menu opens by touch and traps/restores focus correctly;
- [ ] menu CTA reaches the demo/contact route;
- [ ] body scroll lock releases after navigation;
- [ ] Home canonical Clara, Alex, Sofía and Javier cards remain visible and bounded;
- [ ] no horizontal overflow on critical routes;
- [ ] Team Builder, Process Analyzer and ROI controls respond after page load;
- [ ] form fields, native keyboard and validation remain usable;
- [ ] orientation change does not leave clipped/overlapping content;
- [ ] reduced-motion behavior remains readable and complete;
- [ ] no user-flow-blocking runtime failure is observed.

### C. Android Chrome — physical Android phone

Minimum session:

- current supported Android Chrome on a physical phone;
- portrait orientation, plus one landscape sanity check.

Required checks:

- [ ] mobile navigation works by touch;
- [ ] Home canonical character cards remain visible and bounded;
- [ ] no horizontal overflow on critical routes;
- [ ] Team Builder, Process Analyzer and ROI controls work after load;
- [ ] form fields and validation remain usable with the native keyboard;
- [ ] back navigation returns to a coherent page state;
- [ ] orientation change does not leave clipped/overlapping content;
- [ ] reduced-motion behavior remains readable and complete when enabled at OS level;
- [ ] no user-flow-blocking runtime failure is observed.

## Evidence record template

For each real-device session, record:

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

Phase 8G closes only when all three currently outstanding rows are green with real-device evidence:

- Safari desktop on macOS;
- iOS Safari on a physical iPhone;
- Android Chrome on a physical Android device.

After those three pass, update `docs/PHASE_8_WEB_FINALIZATION.md` to mark cross-browser/device acceptance green and record the exact evidence. Until then, the automated browser gates remain permanent regression protection but **Phase 8G stays ACTIVE**.
