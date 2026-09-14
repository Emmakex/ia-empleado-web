# IA Empleado — Website Video System

## Purpose

Website video must explain coordination between people, AI employees and connected systems. It is product communication, not decorative motion for its own sake.

Phase 8D begins only after Phase 8C motion acceptance is closed. It remains open until final media exists, is integrated in ES/EN, and passes production acceptance.

## Planned production set

1. `home/ia-empleado-brand-story` — homepage explainer / brand story.
2. `teams/how-teams-work` — human approval, handoff and team coordination.
3. `products/team-builder-process-analyzer` — concise product walkthrough.
4. Optional short role/use-case loops only where they materially improve comprehension.

## Required deliverables per video

Every published video requires:

- WebM primary asset;
- MP4 fallback;
- optimized poster image;
- explicit width and height / stable aspect ratio;
- no audio-dependent meaning;
- captions for spoken content;
- transcript for meaningful narration;
- controls for explainer / long-form content;
- no autoplay with sound;
- mobile transfer-size acceptance;
- reduced-motion behavior;
- production verification before the asset is considered complete.

## Playback modes

### `ambient-loop`

For short, silent, non-essential visual explanation only.

- muted;
- `playsInline`;
- loop allowed;
- poster is the complete fallback;
- autoplay may start only when `prefers-reduced-motion` is not `reduce`;
- the video pauses and the poster remains visible when reduced motion is requested;
- must never contain information unavailable in the poster/page copy.

### `explainer`

For brand story and product walkthrough content.

- user controls required;
- no forced autoplay;
- captions required when speech is present;
- transcript required when narration carries meaningful content;
- poster must communicate the subject before playback.

## Performance budgets

Initial Phase 8D delivery budgets:

- ambient loop WebM target: <= 2.5 MB;
- ambient loop MP4 fallback target: <= 3.5 MB;
- explainer WebM target: <= 6 MB unless an explicit measured exception is recorded;
- explainer MP4 fallback target: <= 8 MB unless an explicit measured exception is recorded;
- poster target: <= 350 KB;
- video must not become LCP unless deliberately measured and accepted;
- below-the-fold explainers use conservative preload behavior;
- mobile acceptance must confirm that unused video is not eagerly transferred without need.

## Asset tree

```text
public/branding/video/
  home/
    ia-empleado-brand-story.webm
    ia-empleado-brand-story.mp4
    ia-empleado-brand-story-poster.webp
    ia-empleado-brand-story.es.vtt
    ia-empleado-brand-story.en.vtt
  teams/
    how-teams-work.webm
    how-teams-work.mp4
    how-teams-work-poster.webp
    how-teams-work.es.vtt
    how-teams-work.en.vtt
  products/
    team-builder-process-analyzer.webm
    team-builder-process-analyzer.mp4
    team-builder-process-analyzer-poster.webp
    team-builder-process-analyzer.es.vtt
    team-builder-process-analyzer.en.vtt
```

Final transcripts may live as localized public pages rather than downloadable files when that gives a better user experience.

## Engineering contract

`components/brand-video.tsx` is the reusable playback surface. `app/brand-video.css` owns presentation and reduced-motion fallback. `scripts/check-brand-video.mjs` blocks missing contracts and validates any video binaries once they are added.

Do not add dummy MP4/WebM files to satisfy the contract. A production media item is considered ready only after the real encoded asset, poster and required accessibility media exist.

## Acceptance order

1. Video system foundation and static contract.
2. Produce and encode the homepage brand story.
3. Integrate ES/EN homepage placement and browser acceptance.
4. Produce and integrate the teams video.
5. Produce and integrate the product walkthrough.
6. Validate performance, reduced motion, captions/transcripts and mobile behavior.
7. Advance the exact production release marker and run production verification.
8. Close Phase 8D only after production acceptance is green.
