# Web Phase 4 — Interactive Collaboration

## Status

Implementation contract for the first interactive collaboration experience on `iaempleado.com`.

Phase 4 turns the collaborative ecosystem narrative into an inspectable public experience while preserving the strict separation between the commercial website and the IA Empleado private runtime.

## Objective

The visitor should be able to **see a business task move through multiple specialists, company systems and human-control points** instead of reading only abstract statements about multi-agent collaboration.

The experience must communicate:

```text
Business event
→ specialized AI Employee
→ approved system/context
→ handoff to another role
→ policy or human approval when needed
→ final business outcome
→ traceable history
```

It is an educational/commercial simulator using synthetic data. It is not a live customer runtime and does not execute actions against customer systems.

## Public routes

Spanish:

- `/como-trabajan-juntos`

English:

- `/en/see-team-work`

The global `Cómo funciona / How it works` navigation item should route directly to this experience.

## Initial scenarios

Phase 4 ships three bilingual synthetic scenarios.

### 1. Wrong invoice + cancellation

A customer reports an invoice discrepancy and asks to cancel an order.

Reference path:

```text
Customer
→ Customer Support AI
→ CRM / order systems
→ Accounting & Billing AI
→ Administrative AI
→ human approval
→ Customer Support + Reporting
```

The scenario demonstrates cross-department work, verified system context and a consequential cancellation decision reserved for a person.

### 2. Sales lead → meeting

A commercial lead submits a request and appears to fit the target profile.

Reference path:

```text
Lead
→ Sales SDR AI
→ CRM / approved knowledge
→ Sales SDR + Email Manager
→ Calendar
→ human commercial review when conditions are exceptional
→ meeting proposal + Reporting
```

The scenario demonstrates that qualification and preparation do not grant unlimited authority to commit pricing, discounts or contractual terms.

### 3. Delivery incident

An order is marked delivered but the customer reports that it was not received.

Reference path:

```text
Customer
→ Customer Support AI
→ ecommerce / logistics systems
→ Order Management AI
→ Accounting & Billing AI
→ human approval above configured thresholds
→ customer response + Reporting
```

The scenario demonstrates that technical delivery status is context, not proof that the customer physically received the order.

## Interaction contract

The simulator must support:

- scenario selection;
- explicit current step;
- direct selection of any step;
- previous / next controls;
- play / pause progression;
- reset;
- visible process progress;
- actor and role type;
- description of what happens;
- explicit next handoff;
- visible input and expected outcome.

The interaction must remain usable on mobile and tablet.

## Visual semantics

Animation should explain state and ownership rather than provide decorative motion.

Role categories are visually distinct:

- event/input;
- AI Employee;
- company system;
- human control point;
- result.

The active node may pulse or transition, but `prefers-reduced-motion` must remove non-essential motion.

## SEO / GEO contract

Interactive meaning must not exist only in client-side state.

The page therefore includes server-rendered HTML for:

- the definition of collaborative work;
- every scenario;
- input and expected outcome;
- every step and handoff;
- human-control principles;
- limitations and disclosure;
- FAQ.

This makes the content crawlable, quotable and understandable by search engines and generative answer systems without requiring the simulator to run.

Structured data baseline:

- `WebPage`;
- `ItemList` for the visible scenario set;
- `FAQPage` matching visible FAQ content.

Canonical, hreflang and sitemap coverage are mandatory in ES/EN.

## Truthfulness and safety boundaries

The public experience must state clearly that:

- all scenarios use synthetic data;
- the experience does not connect to customer production systems;
- integrations shown are representative possibilities, not universal defaults;
- an AI Employee's technical capability does not automatically grant business authority;
- sensitive or consequential actions may require human approval;
- context passed between roles should be limited to what is necessary and authorized;
- real deployments depend on customer-specific processes, data, integrations, permissions and policies.

The simulator must not present planned connectors or runtime behavior as proven production availability.

## Performance contract

Phase 4 should remain light enough for the commercial site:

- no WebGL dependency;
- no animation framework required;
- interaction implemented with React state and CSS;
- SEO-critical text server-rendered;
- no third-party scripts;
- no external media required for the initial experience.

## Accessibility contract

The experience must include:

- keyboard-operable scenario and step controls;
- `aria-selected` for scenario tabs;
- `aria-current="step"` for the active step;
- live announcement of the active step content;
- readable labels independent of color;
- reduced-motion handling;
- mobile touch targets suitable for primary controls.

## Validation

CI adds a dedicated `Interactive collaboration contract` gate that verifies:

- ES/EN routes exist;
- three initial scenarios remain present;
- required player controls remain present;
- simulator remains an explicit client boundary;
- crawlable static scenario content remains present;
- synthetic-data disclosure remains present in both languages;
- structured data remains present;
- sitemap coverage remains present;
- global navigation remains connected to the experience.

The existing gates continue to validate EN/ES parity, Employee content, catalog discovery, mobile navigation, AI Teams, TypeScript and production build.

## Phase boundary

Phase 4A is complete when the interactive collaboration page is merged, CI is green and production has been visually verified on desktop and mobile.

The next interactive product step is the guided **Team Builder / Diseña tu equipo IA**, which should reuse the Employee catalog and AI Team models rather than invent a second disconnected taxonomy.
