# Engineering Rules — IA Empleado Web

This document is the canonical engineering contract for `Emmakex/ia-empleado-web`, the public commercial website at `iaempleado.com`.

Este documento adapta las reglas globales de IA Empleado exclusivamente a la **web comercial**. Las reglas de runtime, multi-tenancy, agentes, workers, customer deployments y lógica interna siguen perteneciendo a `Emmakex/ia-empleado` y no deben mezclarse aquí.

## 1. Repository scope is strict

This repository owns marketing, SEO, public product education, public media, interactive explainers, lead capture, analytics and website delivery.

It must not become the customer runtime, Reference Lab runtime, product API, worker or secret store.

## 2. Public website and product runtime stay independent

`iaempleado.com`, the Kairoseth Reference Lab and customer production are separate deployable surfaces. A website outage must never stop a customer AI Employee from operating.

## 3. Marketing claims must be truthful and evidence-backed

Public copy must distinguish clearly between:

- implemented and demonstrable;
- available through customer adaptation;
- planned/roadmap;
- restricted or regulatory-review-only.

Never present a conceptual employee, integration, KPI, saving or capability as production-ready or verified when the product evidence does not support that claim.

## 4. Product facts come from authoritative product documentation

Claims about employee capabilities, security, autonomy, private deployment, integrations and product status must be checked against the current `Emmakex/ia-empleado` contracts summarized in [`PRODUCT_CONTEXT.md`](PRODUCT_CONTEXT.md).

The website may simplify language, but it may not change the underlying product semantics.

## 5. EN/ES is a release gate

Every prospect-facing change ships with equivalent English and Spanish coverage in the same PR when that surface is public.

This includes:

- navigation, UI and CTA;
- page content and FAQs;
- validation/error/loading/empty states;
- SEO titles/descriptions;
- Open Graph/social metadata;
- structured data where localized;
- alt text and accessibility labels;
- video captions/transcripts/explanations;
- form and consent text;
- interactive-demo explanations.

Missing EN or ES coverage is a release blocker for the affected public scope.

## 6. Localization is structured, not scattered literals

Reusable public copy must resolve through localization/content structures rather than duplicated hard-coded strings across components.

Locale-specific URLs, canonical URLs and `hreflang` must stay coherent with visible content.

## 7. Static-first / server-rendered SEO-critical content

Critical commercial meaning must exist in crawlable HTML without requiring client-side execution.

Use client-side rendering only where interaction materially improves explanation or conversion.

No primary product claim, CTA, employee description or core FAQ may exist only inside canvas, WebGL, animation state or client-only JavaScript.

## 8. Each indexable page has one clear search intent

Avoid thin or near-duplicate landing pages created only to cover keyword variations.

Employee, sector, integration and use-case pages must contain distinct, useful and substantive content.

## 9. Technical SEO is part of Definition of Done

Relevant public changes must preserve or implement as applicable:

- unique title and meta description;
- canonical URL;
- semantic heading hierarchy;
- crawlable internal links;
- XML sitemap inclusion/exclusion;
- robots policy;
- valid EN/ES `hreflang`;
- appropriate redirects when URLs change;
- meaningful image dimensions/alt text;
- video metadata/watch-page strategy;
- truthful structured data.

## 10. Structured data must match visible reality

Schema.org/Google structured data is allowed only when it accurately represents visible page content and product reality.

Do not add markup solely to chase rich results when eligibility or visible evidence is absent.

## 11. AI-search / answer-engine readability is intentional

Important pages should expose explicit definitions, concise job descriptions, capability lists, limitations, process steps, deployment facts and evidence-backed claims in semantic HTML.

Stable URLs and understandable headings are preferred over visual-only storytelling.

## 12. Responsive UX is mandatory

Customer-facing changes require acceptance on supported desktop and mobile breakpoints.

No critical CTA, navigation, form control or explanatory content may become hidden, clipped, overlapped or unusable at supported sizes.

## 13. Accessibility is part of the feature

Public interactions must support keyboard use where relevant, semantic controls, readable focus states, accessible names, sufficient content clarity and reduced-motion preferences.

Animations and visual effects must not be required to understand or use the site.

## 14. Performance has a budget

Visual ambition must not turn the commercial site into a slow demo.

Rules:

- content before non-essential effects;
- lazy-load heavy sections;
- dynamically import WebGL/3D only where used;
- optimize responsive images and media;
- avoid multiple autoplaying high-resolution videos;
- keep navigation and CTA usable without animation;
- monitor Core Web Vitals and bundle/media regressions.

## 15. Progressive enhancement over fragile spectacle

The page must remain understandable and actionable when optional animation, video, WebGL, third-party widgets or non-critical JavaScript fail.

## 16. Browser code never contains secrets

API keys, provider credentials, private tokens, certificates, signing secrets and privileged endpoints must never be shipped to the browser bundle or committed to the repository.

Public identifiers are not secrets; privileged credentials always remain server-side or in approved deployment secret storage.

## 17. Minimize public form data

Lead/demo/contact forms collect only data needed for the stated commercial purpose. Sensitive operational or customer-production data must not be requested casually through public forms.

Consent, privacy and analytics behavior must match applicable policy and the visible disclosure.

## 18. Third-party scripts are reviewed dependencies

Analytics, chat, booking, video, tag-manager, A/B testing and other third-party scripts must be justified by commercial value, privacy impact and performance cost.

Do not add trackers or remote scripts merely because a vendor snippet is available.

## 19. Lead capture boundaries are explicit

Public lead capture may send approved lead/context data to the commercial CRM/SDR workflow, but the website must not gain customer-runtime privileges.

Failures in CRM/booking integrations must degrade safely and present a useful user-facing recovery path.

## 20. Value metrics distinguish measured from estimated

Public dashboards, calculators, case studies and demos must distinguish:

- measured values;
- estimated human time avoided;
- estimated operational value;
- potential exposure/opportunity;
- verified/realized savings when evidence exists.

Potential or estimated value must never be presented as guaranteed savings.

## 21. Regulated/high-impact profiles require explicit gating

Candidate-selection decisions, regulated financial eligibility/risk decisions and other high-impact concepts must not be marketed as generic self-service products unless the product/legal/risk contract explicitly permits it.

## 22. Minimum sufficient validation

Run the gates required by the changed contract, not unrelated work.

Examples:

- copy/content only → content/link/locale checks;
- public component → type/lint + relevant component/e2e + EN/ES + responsive/accessibility acceptance;
- routing/SEO → build + route/canonical/sitemap/hreflang checks;
- form/integration → schema + success/failure + privacy/consent + integration contract checks;
- media/animation → responsive + reduced-motion + performance regression checks;
- deployment change → build artifact + Hostinger/deployment smoke + production verification.

## 23. Finish before advancing

Phase N+1 cannot begin until Phase N implementation, required gates, acceptance criteria, blockers and documentation are complete.

Partial work must stay explicitly marked as partial. Documentation and roadmap status must reflect reality.

## 24. Delivery workflow is mandatory

Normal functional delivery is:

```text
feature/fix/chore branch
→ pull request
→ CI
→ merge
→ Hostinger deployment
→ production verification
```

No direct-to-`main` functional delivery except a documented emergency procedure.

## 25. CI validates the current change

Required evidence must correspond to the current PR head. Stale runs must not be treated as proof for newer commits.

Use concurrency/cancel-in-progress or equivalent behavior when CI is introduced so obsolete runs do not obscure the current result.

## 26. Observable failures, not raw-log archaeology

Every CI, build, test and deploy failure must produce an actionable structured diagnosis whenever technically possible.

Minimum diagnostic contract:

```text
pipeline / job / step
command
exit code
primary error
file + line when available
expected / received when applicable
error signature
root cause: confirmed or clearly marked hypothesis
fix applied
validation performed
regression/prevention reference
```

A large failed log without a surfaced failure summary is an engineering defect.

## 27. Engineering learning and regression prevention

Meaningful defects are recorded as:

```text
symptom
→ context / reproduction
→ error signature
→ root cause
→ fix
→ validation
→ prevention
→ regression test/reference
```

Recurring defects with the same root cause mean prevention is incomplete.

## 28. Supply-chain execution is explicit

Commit lockfiles once the production web stack is introduced. Review dependency build scripts and privileged installers. Do not disable package-manager protections globally merely to make CI green.

Prefer the smallest dependency set that satisfies the website contract.

## 29. Runtime and deployment assumptions are version-specific

Pin/support tested Node/framework/package-manager versions and document Hostinger deployment assumptions. Do not rely blindly on floating `latest` behavior for production builds.

## 30. Changes update the documentation they affect

A change is incomplete if it changes public information architecture, SEO behavior, deployment, localization, analytics, forms, performance policy or product claims while leaving the corresponding documentation stale.

## 31. Execution size must match task size

Small/medium work should be completed end-to-end rather than fragmented into ceremonial microphases.

Large or timeout-risk work should be split only into the minimum durable phases necessary to avoid lost progress. Microphases are reserved for genuine bottlenecks where each step materially reduces uncertainty.

## 32. The objective is authoritative; the mechanism is replaceable

Preserve the required outcome and contract, not attachment to the first implementation choice.

If an implementation path repeatedly fails, adds unnecessary complexity or stops reducing uncertainty, replace it with the simplest safe deterministic alternative that satisfies the same acceptance criteria.

## Definition of Done / Definición de terminado

A commercial-web change is Done only when:

1. implementation/content is complete;
2. EN/ES parity is complete for public scope;
3. relevant SEO metadata/routing is correct;
4. responsive and accessibility acceptance passes;
5. required performance checks pass;
6. security/privacy boundaries are preserved;
7. public claims remain truthful and product-aligned;
8. relevant tests/gates pass;
9. failures are diagnosable;
10. documentation is current;
11. the PR is merged through the standard workflow;
12. production behavior is verified when deployed.
