# IA Empleado — Branding workspace

This folder is the canonical source of truth for the public visual identity of **IA Empleado**.

## Approved direction

**Concept 1 — Personas. IA. Sistemas. Un mismo equipo.**

The brand should feel human, intelligent, collaborative, trustworthy and operational. The AI Employee is represented as a **humanized digital colleague**, not as a toy robot, mascot or anonymous chatbot.

Core visual metaphor:

```text
People ↔ AI Employees ↔ Business systems
              ↓
        governed outcomes
```

## Phase status

**Branding Phase 1 — Core visual system: Complete and production-verified (2026-09-12).**

**Branding Phase 2A — Role visual families: Complete and production-verified (2026-09-12).**

Phase 2A deepens the existing identity with reusable role-specific visual grammars for Clara, Alex, Sofía and Javier without replacing or redrawing the approved canonical character identities.

**Branding Phase 2B — Team and Department compositions: Complete and production-verified (2026-09-12).**

Phase 2B reuses the same role grammars inside one shared multi-role composition for deep Team and Department pages. The composition makes handoffs, shared systems and human-control boundaries visible while preserving the canonical character identities and existing product authority model. Hostinger release `branding-phase-2b-team-department-compositions` passed production verification.

**Branding Phase 2C — Sector-specific hero art: Complete and production-verified (2026-09-13).**

Phase 2C applies one shared sector-art renderer to the four actual deep-sector families in the content model: Ecommerce, Travel, Professional Services and B2B Sales. Each variant has a distinct operating signature while reusing approved character identities, Phase 2A role motifs, representative systems and explicit human-control boundaries. The current content model does not contain a standalone Retail sector, so 2C does not invent one. PR #49 merged as `3962ba00e5a8a0e7300a08ce6ce4d28bd94e2375`; Web CI #119 passed on `main`; Hostinger served `branding-phase-2c-sector-hero-art`; Production Verification #7 (`34734671808`) passed directly against `iaempleado.com`.

**Branding Phase 2D — reusable campaign/social variants: Implementation in progress.**

Phase 2D keeps the verified `1200 × 630` OG/share system intact and adds reusable generated campaign outputs at `/brand-campaign/{locale}/{format}/{surface}` for landscape `1600 × 900`, square `1080 × 1080`, portrait `1080 × 1350` and story `1080 × 1920`. It reuses the same canonical character registry and bilingual semantic surfaces, keeps ROI character-neutral, and validates invalid formats/surfaces instead of falling back silently.

## Folder contract

- `BRAND_SYSTEM.md` — strategy, visual language and usage rules.
- `ASSET_MANIFEST.md` — reusable asset inventory and where each asset belongs.
- `PHASE_1_VALIDATION.md` — CI and production-browser evidence closing Branding Phase 1.
- `PHASE_2_ROLE_VISUAL_FAMILIES.md` — role-family mapping, implementation rules and Phase 2A production-verification evidence.
- `PHASE_2B_TEAM_DEPARTMENT_COMPOSITIONS.md` — shared Team/Department composition contract and Phase 2B production-verification evidence.
- `PHASE_2C_SECTOR_HERO_ART.md` — four-sector hero-art contract, QA scope and production-verification evidence.
- `PHASE_2D_CAMPAIGN_SOCIAL_VARIANTS.md` — reusable multi-format campaign/social generation contract and release criteria.
- `SOCIAL_MEDIA_SYSTEM.md` — share, campaign, frame and export rules.
- `tokens.json` — portable design tokens for web, product, decks and future apps.
- `../public/branding/` — production-ready SVG/assets served by the website.
- `../app/brand-system.css` — active web implementation of the brand tokens and visual rules.
- `../app/brand-role-families.css` — role-specific visual grammar for the four Reference Employees.
- `../app/brand-collaboration-compositions.css` — shared Team/Department multi-role composition geometry.
- `../app/brand-sector-hero-art.css` — reusable sector-specific operating signatures and responsive geometry.

## Primary message

ES: **Personas. IA. Sistemas. Un mismo equipo.**

EN: **People. AI. Systems. One team.**

Supporting narrative remains:

```text
Empleado IA → Equipo IA → Empresa aumentada por IA
```

## Release rule

Branding is a product contract. New visual assets must preserve:

1. humanized AI representation;
2. light-first premium presentation;
3. indigo/violet intelligence layer;
4. green only for positive/approved/completed states;
5. real workflow meaning over decorative sci-fi;
6. EN/ES parity when text is embedded;
7. reduced-motion and accessibility compatibility;
8. reusable vector-first assets where possible.
