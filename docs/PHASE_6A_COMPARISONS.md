# Phase 6A — Comparison surfaces

## Objective

Phase 6A adds high-intent SEO/GEO comparison pages that help buyers understand when an **AI Employee** is the right pattern and when another automation approach may be a better fit.

The goal is not to publish superiority claims. The comparison contract is based on **fit, trade-offs and combination patterns**.

## Public routes

Spanish:

- `/comparativas`
- `/comparativas/chatbot`
- `/comparativas/agente-ia`
- `/comparativas/rpa`
- `/comparativas/automatizacion-tradicional`
- `/comparativas/copiloto-ia`

English:

- `/en/comparisons`
- `/en/comparisons/chatbot`
- `/en/comparisons/ai-agent`
- `/en/comparisons/rpa`
- `/en/comparisons/traditional-automation`
- `/en/comparisons/ai-copilot`

## Initial comparison set

1. AI Employee vs chatbot
2. AI Employee vs AI agent
3. AI Employee vs RPA
4. AI Employee vs traditional automation
5. AI Employee vs AI copilot

The copilot page intentionally uses the **generic product pattern** “AI copilot” rather than comparing against a specific vendor product. Vendor-specific comparison pages require current, sourced product evidence and should be created separately.

## Editorial rules

Every comparison must:

- avoid universal “better than” claims;
- explain where the alternative is a strong choice;
- explain where an AI Employee is a strong choice;
- explain when both approaches can be combined;
- use qualifiers such as “typically”, “usually”, “can” and “depends on implementation” where category boundaries are not absolute;
- distinguish product-design concepts from hard technical categories;
- preserve human authority and risk context;
- avoid claiming production integrations that are not evidenced.

## Comparison dimensions

Pages may compare dimensions such as:

- primary orientation;
- process scope;
- input variability;
- determinism;
- autonomy/delegation;
- human supervision;
- integrations;
- handoffs;
- traceability;
- maintenance;
- implementation fit.

No dimension should be scored numerically unless there is a documented, reproducible methodology.

## AI agent nuance

“AI agent” is a broad technical category. The site must not imply that AI Employee and AI agent are mutually exclusive.

The canonical explanation is:

- **AI agent** can describe a technical behavior pattern;
- **AI Employee** describes how capabilities are organized into an understandable business role with responsibilities, permissions, supervision and handoffs;
- an AI Employee may internally use one or more agentic components.

## RPA and traditional automation nuance

The site should explicitly preserve deterministic automation where it is the best tool.

Canonical principle:

> Automate with rules what can be solved with rules. Use AI where variability, language or exceptions make purely deterministic automation insufficient.

RPA and classic automation can also be tools used inside a larger AI Employee workflow.

## Chatbot nuance

A chatbot is not defined as “unable to act”. Modern chatbots can use tools and integrations.

The comparison is therefore framed around **conversation-first design vs governed operational-role design**, not a false technical boundary.

## Copilot nuance

A copilot normally keeps the human as the active operator. An AI Employee can accept a defined block of delegated work and return outcomes, exceptions or approval requests.

Both can coexist in the same organization.

## SEO / GEO contract

Each detail page must expose in server-rendered HTML:

- a direct short answer;
- a dimension-by-dimension table;
- when to choose AI Employee;
- when to choose the alternative;
- when to combine them;
- decision guidance;
- FAQ;
- links into Process Analyzer and Team Builder.

Each route must provide:

- unique metadata;
- canonical URL;
- ES/EN hreflang;
- crawlable internal links;
- sitemap coverage;
- WebPage schema;
- BreadcrumbList schema on detail pages;
- FAQPage schema where visible FAQ exists.

## Accessibility and responsive requirements

- comparison tables may scroll horizontally on narrow screens;
- column headings and row headings must use semantic table markup;
- no important distinction may rely only on color;
- all CTA and comparison navigation must remain keyboard accessible;
- page meaning must remain available without client-side JavaScript.

## Validation contract

CI runs `scripts/check-comparisons.mjs` and checks:

- exactly five canonical initial comparison records;
- ES/EN slugs;
- trade-off sections for both sides;
- explicit combination guidance;
- visible comparison table;
- non-universal-pattern disclaimer;
- bilingual index routes;
- sitemap integration.

Existing EN/ES, Employee, catalog, mobile, AI Team, collaboration, Team Builder, Process Analyzer, ROI, TypeScript and production-build gates remain required.

## Release gate

Phase 6A is complete only after:

1. feature branch implementation;
2. PR CI green;
3. merge to `main`;
4. `main` CI green;
5. Hostinger production verification of index + at least one detail route in desktop/mobile.
