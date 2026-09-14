# Homepage Brand Story — Production Storyboard

## Goal

Explain the IA Empleado model visually in one short silent-capable sequence: **people + AI employees + connected systems working as one coordinated team, with human control visible**.

The production master must not bake Spanish or English text into the video. The same binary is used in both locales; localized page copy around the video provides the language layer.

## Format

- target duration: 18–22 seconds;
- master aspect ratio: 16:9;
- master production size: 1920×1080;
- website delivery: optimized WebM + MP4 fallback;
- no narration required;
- no music required for comprehension;
- no flashing/status UI that implies a live system;
- no baked-in marketing copy;
- canonical characters only: Clara, Alex, Sofía and Javier;
- visual style must match the approved IA Empleado light/futurist brand system already used on the public website.

## Sequence

### 00:00–00:03 — People first

Start from a quiet light background with restrained orbital/connection geometry. Bring the canonical people into the scene with the same subtle presence movement used on the website.

Meaning: the system begins with the team, not with an autonomous machine.

### 00:03–00:07 — AI employees join the workflow

Reveal the IA Empleado core between the people and show four clear role nodes derived from the canonical characters. Connections appear progressively rather than all at once.

Meaning: specialized AI employees become part of the operating model.

### 00:07–00:11 — Systems connect

Introduce restrained system/integration nodes around the team. Use directional paths to show information moving into the shared workflow. Avoid fake dashboards, fake percentages and fake live activity.

Meaning: the AI employees work with the company's existing systems rather than replacing the whole environment.

### 00:11–00:15 — Handoff and human approval

Show one clear task handoff through two role nodes and then a visible human-control checkpoint before the flow continues.

Meaning: coordination is automated where appropriate, while meaningful control remains human.

### 00:15–00:19 — One coordinated team

Pull the camera/composition back slightly so the four canonical characters, IA core and system nodes read as one coherent network. Reduce movement rather than increasing spectacle.

Meaning: people, AI and systems are now operating as one coordinated structure.

### 00:19–00:22 — Resolve to brand mark

Settle the motion into the IA Empleado mark / core composition. No text needs to be baked into the video; the surrounding homepage carries the localized proposition and CTA.

Meaning: leave a clean branded endpoint suitable for looping back to the poster or stopping completely.

## Motion rules

- use transforms, opacity and SVG/path effects rather than layout movement;
- no fast camera moves;
- no mascot-like bouncing;
- no continuous high-frequency motion;
- handoff motion must communicate direction, not decoration;
- human approval must remain visually distinct from automatic system activity;
- final frame should closely match the poster so stopping the video does not feel broken.

## Poster

The poster should represent the resolved coordinated-team composition, not a random first frame. It must remain useful as the complete reduced-motion fallback.

Required file:

`public/branding/video/home/ia-empleado-brand-story-poster.webp`

## Delivery files

- `public/branding/video/home/ia-empleado-brand-story.webm`
- `public/branding/video/home/ia-empleado-brand-story.mp4`
- `public/branding/video/home/ia-empleado-brand-story-poster.webp`

Because the approved cut contains no spoken or baked-in linguistic content, the first homepage version does not require captions or a transcript. If narration is added later, ES/EN captions and meaningful transcripts become mandatory before release.

## Website placement

The video should be introduced below the initial hero or at the first explanatory transition rather than becoming the homepage LCP element. The hero copy and primary CTA remain immediately available independent of video loading.

## Acceptance

- same meaning with audio muted;
- same meaning when video is replaced by poster under reduced motion;
- no layout shift on load;
- no autoplay sound;
- no required information exclusive to the video;
- transfer budgets from `branding/VIDEO_SYSTEM.md` pass;
- mobile and desktop production behavior pass browser acceptance before Phase 8D can close.
