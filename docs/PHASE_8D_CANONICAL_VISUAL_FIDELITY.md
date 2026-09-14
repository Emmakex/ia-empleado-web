# Phase 8D — Canonical Visual Fidelity Decision

## Status

ACTIVE — canonical visual rollback and production verification in progress.

This decision supersedes the earlier Phase 8D website-video direction for the public IA Empleado website.

## Decision

The homepage video experiment rejected on 2026-09-14 is removed from the public website because it did not preserve the approved character identities with sufficient fidelity.

The public site will not ship generated `.mp4` or `.webm` brand-story videos while character identity cannot be guaranteed exactly.

Customer-facing character visuals must use the approved canonical WebP assets directly:

- `public/branding/characters/clara-canonical.webp`
- `public/branding/characters/alex-canonical.webp`
- `public/branding/characters/sofia-canonical.webp`
- `public/branding/characters/javier-canonical.webp`

Motion remains allowed only as controlled CSS/SVG motion around the canonical assets and existing approved compositions. Motion may explain coordination, handoff, system activity and human control, but it must not redraw or reinterpret the canonical people.

## Root cause of the rejected experiment

The reproducible homepage renderer used the role-illustration SVG variants (`clara-customer-support.svg`, `alex-administrative.svg`, `sofia-accounting.svg`, `javier-sales.svg`) as frame sources. Those assets are useful role illustrations but are not the canonical identity assets referenced by `lib/brand-characters.ts`.

The resulting video therefore created a visually different character family even though the media pipeline itself was technically valid.

## Required rollback

- remove the Home brand-story video section in ES and EN;
- remove the `BrandVideo` runtime and video-specific CSS;
- remove generated WebM/MP4/poster delivery assets;
- remove the video renderer and generation workflow;
- remove the obsolete video acceptance test and video-system documentation;
- restore the pre-video homepage flow;
- retain the approved canonical hero, employee cards and CSS/SVG motion system;
- protect this decision with browser and release-gate regressions.

## Acceptance

Phase 8D canonical visual fidelity is accepted only when:

- no `.mp4` or `.webm` files are shipped under `public/`;
- ES and EN Home contain no `<video>` surface;
- both Home locales render all four canonical character identities;
- `BrandVideo`, `HomeBrandStory` and their generation infrastructure are absent;
- reduced-motion behavior remains complete and usable;
- the active release marker is `web-phase-8d-canonical-visuals`;
- Production Verification runs `tests/phase8d-canonical-visual.spec.ts` against `https://iaempleado.com`;
- all permanent Phase 8A, Phase 8B and Phase 8C regressions remain green.

## Future policy

Video can only be reconsidered as a separate future product decision if the production method preserves the exact approved character identity and passes explicit visual acceptance before integration. Until then, the public IA Empleado website is intentionally a canonical static-art + CSS/SVG motion experience.
