# Branding Phase 1 validation

Status: Complete and production-verified
Date: 2026-09-12
Release marker: branding-phase-1
Production: iaempleado.com

## Scope closed

Branding Phase 1 establishes the approved Concept 1 visual system: Personas. IA. Sistemas. Un mismo equipo. / People. AI. Systems. One team.

Closed scope includes the collaboration mark, light-first indigo/violet identity, Clara/Alex/Sofia/Javier canonical characters, reusable workflow/system/orbit language, responsive portrait delivery, CSS/SVG-first motion, reduced-motion support, responsive/reflow/accessibility hardening, desktop collision protection and EN/ES visual parity.

## CI evidence

Release commit: bfcfc1d97c82bdceddd36b7cf82bf993443f4ec0

Web CI #103 completed successfully. It validated EN/ES parity, employee/team/interactive content contracts, comparison/sector/use-case/organization contracts, branding and image-delivery contracts, motion/accessibility, TypeScript, Playwright browser QA and production build.

## Production evidence

Production Verification #1, run 34716325834, completed successfully after Web CI #103.

The workflow first waited until Hostinger served the expected ia-web-release=branding-phase-1 marker. It then ran Playwright against the public production domain.

Production browser validation covered desktop hero alignment, employee portrait/footer separation, Team hero geometry, Sector/Use Case collision protection, Comparison portrait containment, desktop/mobile heading scales, navigation, home geometry at 320/360/390/430/768 px, 200% text reflow, commercial-route overflow checks and critical/serious accessibility checks.

Result: success. No failure diagnostics artifact was generated because the production suite passed.

## Closure rule

Branding Phase 1 is closed because implementation is on main, required CI gates pass, Hostinger is serving the expected release, production browser QA passes and the evidence is recorded in the repository.

## Next phase

Branding Phase 2: role-specific visual families for Clara, Alex, Sofia and Javier, followed by richer Team/Department motion scenes, sector-specific hero art and reusable campaign/social resources. New work must preserve the canonical character identities and Phase 1 release rules.
