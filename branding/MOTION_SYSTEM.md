# IA Empleado — Motion System

Motion is part of the IA Empleado product language. It must explain **coordination, handoff, system activity and human control**. It must never exist only to make the interface look busy.

## Principles

1. **Meaning before spectacle.** Motion reinforces a state or relationship already understandable in static UI.
2. **CSS/SVG first.** Prefer transforms, opacity, SVG stroke motion and native CSS timelines before adding JavaScript animation libraries.
3. **Canonical people are colleagues, not mascots.** Clara, Alex, Sofía and Javier can have subtle presence motion, but no exaggerated bouncing, spinning or game-like reactions.
4. **Human control is visually separate.** Approval and escalation cues use their own semantic treatment and never look like an automated system pulse.
5. **No fake live status.** A breathing dot or system-chip hover is atmosphere, not a claim that a production integration is currently online.
6. **Mobile is intentionally lighter.** Continuous character drift is removed on narrow screens; core, handoff and orbital cues remain sufficient to preserve the story.
7. **Reduced motion is complete.** `prefers-reduced-motion: reduce` disables non-essential animation while keeping all information, controls and states visible.

## Motion vocabulary

### Reveal

Used when a page or branded scene enters view. Content moves only a short distance and settles quickly.

- duration: `720ms`
- easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- properties: `opacity`, `translate`, occasionally `scale`

The homepage choreography reveals copy before the collaboration scene so meaning arrives before atmosphere.

### Handoff

Used to show work moving between roles, systems or process stages.

- reference duration: `4.2s`
- preferred representation: moving SVG stroke/dash, sequential state emphasis or process-step focus
- never use handoff motion to imply that a real customer system is executing in production when the surface is only a demo

### Core activity

The IA Empleado mark can breathe slightly to show it as the coordination center.

- reference duration: `4.8s`
- maximum scale change: approximately 4–5%
- core-ring pulses remain low contrast

### Ambient depth

Mist, glows and orbit geometry move slowly to give the visual system depth.

- ambient drift: `14s+`
- orbit: `26s+`
- mobile uses slower ambient motion

### Character presence

Canonical characters may drift vertically by only a few pixels in large branded scenes.

- reference duration: `8.4s`
- maximum vertical amplitude: `4px`
- disabled on screens `<= 760px`

### Microinteraction

Cards, system chips and approval controls can lift slightly on hover-capable devices.

- duration: `160–220ms`
- movement: `2–4px`
- touch layouts must not depend on hover to communicate state

## Scroll reveal

The global stylesheet uses CSS `animation-timeline: view()` only as progressive enhancement. Unsupported browsers render the final static state immediately.

No JavaScript IntersectionObserver is required for the base system.

## Performance rules

Prefer animating:

- `opacity`
- `translate`
- `rotate`
- `scale`
- SVG `stroke-dashoffset`

Avoid continuous animation of layout properties such as width, height, top, left, margin or padding. Avoid adding new animated blur filters; existing blurred atmospheric layers may move only through transforms.

Do not add a third-party animation runtime unless a future interaction cannot be expressed safely with CSS/SVG and the added bundle/runtime cost is justified.

## Accessibility

All motion must satisfy these rules:

- no essential information exists only during an animation;
- no auto-running rapid flashes;
- no forced smooth scrolling under reduced-motion preference;
- focus, labels, system states and approval semantics remain visible when animation is disabled;
- hover motion is progressive enhancement only.

## Canonical implementation

Global implementation: `app/brand-motion.css`

Motion tokens: `branding/tokens.json`

Loaded by both root locale layouts:

- `app/(es)/layout.tsx`
- `app/(en)/en/layout.tsx`

The branding CI contract must fail if the global motion stylesheet loses reduced-motion support, mobile simplification, progressive view-timeline handling or the core handoff/orbit vocabulary.
