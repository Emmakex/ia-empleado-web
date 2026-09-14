# Phase 8D — Website Video System Foundation

## Status

ACTIVE — foundation tranche implemented on `phase8d/video-system-foundation`.

This tranche does not claim that the production videos already exist. It establishes the reusable runtime, accessibility rules, media budgets and CI contract required before real MP4/WebM assets are integrated.

## Implemented

- reusable `BrandVideo` client component;
- WebM primary + MP4 fallback support;
- poster support;
- explainer mode with user controls and optional captions/transcript;
- ambient-loop mode restricted to muted inline playback;
- `prefers-reduced-motion` detection and automatic pause/poster fallback;
- conservative preload behavior so reduced-motion and non-autoplay content do not eagerly fetch video;
- responsive/forced-colors presentation layer;
- global ES/EN stylesheet loading;
- `public/branding/video/` production asset namespace;
- documented asset naming and performance budgets;
- CI contract that validates required files, playback behavior, paired encodes, poster presence, WebVTT validity and transfer budgets.

## Deliberately not implemented yet

- no dummy `.webm` or `.mp4` files;
- no homepage video placement before the real homepage brand-story asset exists;
- no release-marker advance;
- no Phase 8D production closure claim.

## Next tranche

Produce the real homepage brand-story package:

- `public/branding/video/home/ia-empleado-brand-story.webm`
- `public/branding/video/home/ia-empleado-brand-story.mp4`
- `public/branding/video/home/ia-empleado-brand-story-poster.webp`
- ES/EN captions if the final cut contains speech;
- ES/EN transcript routes if narration carries meaningful information.

After the real media package exists, integrate it into both homepage locales through `BrandVideo`, add browser acceptance for controls/reduced-motion/network behavior, then proceed through CI and production verification.
