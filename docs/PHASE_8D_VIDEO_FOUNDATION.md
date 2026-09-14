# Phase 8D — Website Video System

## Status

ACTIVE.

The reusable video foundation was merged through PR #81. The first production media tranche — the homepage brand story — is now implemented on `phase8d/home-brand-story` and must pass PR CI, merge, exact production gating and production verification before that tranche is considered accepted.

Phase 8D itself remains open until the planned teams video and Team Builder / Process Analyzer walkthrough are also completed or explicitly removed from scope with documented acceptance.

## Foundation completed

- reusable `BrandVideo` client component;
- WebM primary + MP4 fallback support;
- poster support;
- explainer mode with user controls and optional captions/transcript;
- ambient-loop mode restricted to muted inline playback;
- `prefers-reduced-motion` detection and automatic pause/poster fallback;
- conservative preload behavior so non-autoplay content does not eagerly fetch video;
- responsive/forced-colors presentation layer;
- global ES/EN stylesheet loading;
- `public/branding/video/` production asset namespace;
- documented asset naming and performance budgets;
- CI contract for paired encodes, posters, WebVTT validity and transfer budgets.

## Homepage brand story implemented

Production package:

- `public/branding/video/home/ia-empleado-brand-story.webm`;
- `public/branding/video/home/ia-empleado-brand-story.mp4`;
- `public/branding/video/home/ia-empleado-brand-story-poster.webp`.

The package is generated from the canonical Clara, Alex, Sofía and Javier SVG assets plus the IA Empleado mark by `scripts/render-home-brand-story.py`. `.github/workflows/generate-home-brand-story.yml` reproduces the 1920×1080, 18-second silent-capable cut and commits the generated binaries back to the feature branch.

The production cut contains no speech and no baked-in ES/EN text, so the same binary is reused in both locales and captions/transcripts are not required for this version.

Homepage integration:

- rendered through `components/home-brand-story.tsx` and the reusable `BrandVideo` surface;
- placed after the product definition and before the workflow section, outside the initial hero/LCP path;
- explicit user controls;
- no forced autoplay;
- `preload="none"` for the explainer;
- stable 16:9 geometry with explicit 1920×1080 dimensions;
- Playwright coverage in `tests/phase8d-video.spec.ts` for ES/EN sources, controls, poster, autoplay policy, reduced motion and layout stability.

## Remaining Phase 8D work

1. Complete PR CI and merge the homepage brand-story tranche.
2. Bind that tranche to an exact release marker and production verification including Phase 8D browser acceptance.
3. Produce and integrate `teams/how-teams-work`.
4. Produce and integrate the Team Builder / Process Analyzer walkthrough.
5. Validate final mobile/network performance, reduced-motion and accessibility behavior for the complete video set.
6. Close Phase 8D only after every required production asset and verification gate is green.

No dummy `.webm` or `.mp4` files are accepted at any stage.
