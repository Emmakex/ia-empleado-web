# iaempleado.com — Commercial Website / Web Comercial

## Purpose / Propósito

`iaempleado.com` is the commercial, educational and acquisition layer of IA Empleado. Its job is to make the product immediately understandable, demonstrate breadth and credibility, rank organically for employee/use-case intent, and continuously drive qualified prospects toward a concrete next step.

`iaempleado.com` es la capa comercial, educativa y de captación de IA Empleado. Su función es hacer que el producto se entienda de inmediato, demostrar amplitud y credibilidad, posicionarse orgánicamente para búsquedas de empleados/casos de uso y conducir de forma continua a prospectos cualificados hacia una acción concreta.

The website is not the customer production runtime. Customer private installations continue operating independently from the public site.

## Hosting and web stack / Hosting y stack web

Preferred baseline:

- Hostinger managed Node.js/Next.js hosting when the existing plan supports it;
- Next.js + React + TypeScript;
- server-rendered/static-first public pages for SEO and speed;
- client-side interactivity only where it materially improves explanation/conversion;
- automated GitHub deployment;
- image optimization and responsive formats;
- video delivery through an appropriate streaming/CDN provider when volume justifies it rather than treating the web server as a video origin for every asset.

The public site and the Reference Lab remain separate deployable systems.

```text
Hostinger
└── iaempleado.com
    ├── SEO pages
    ├── employee catalog
    ├── industries/use cases
    ├── videos
    ├── interactive explainers
    ├── lead capture
    └── CTA / demo booking

OVH
└── Kairoseth Reference Lab
    └── real governed demo runtime
```

## Core commercial message / Mensaje central

The website must explain three ideas very early:

1. **IA Empleado creates digital workers for defined business jobs, not generic chatbots.**
2. **Each company gets only the capabilities it needs, integrated with its own systems.**
3. **The runtime can be installed privately inside the customer's infrastructure or in a dedicated private environment.**

The customer should understand within the first screen that IA Empleado is adaptable, private and connected to real business operations.

## Information architecture / Arquitectura de información

Recommended public hierarchy:

```text
/
├── /empleados-ia/
│   ├── /atencion-cliente/
│   ├── /administrativo/
│   ├── /contabilidad-facturacion/
│   ├── /comercial-sdr/
│   ├── /gestor-correo/
│   ├── /recepcionista/
│   ├── /gestion-pedidos/
│   ├── /ecommerce/
│   ├── /back-office/
│   ├── /reporting/
│   ├── /marketing/
│   ├── /agente-viajes/
│   ├── /reservas/
│   ├── /logistica/
│   ├── /soporte-it/
│   ├── /qa-software/
│   ├── /documentacion/
│   ├── /gestoria/
│   ├── /asistente-juridico/
│   └── /rrhh-administrativo/
│
├── /sectores/
│   ├── /servicios-profesionales/
│   ├── /ecommerce-retail/
│   ├── /turismo/
│   ├── /software-tecnologia/
│   ├── /logistica/
│   └── future validated sectors
│
├── /integraciones/
│   ├── /crm/
│   ├── /erp/
│   ├── /email/
│   ├── /calendario/
│   ├── /ecommerce/
│   └── provider-specific pages when supported
│
├── /como-funciona/
├── /infraestructura-privada/
├── /seguridad/
├── /demo/
├── /casos-de-uso/
├── /recursos/
└── /contacto/ or /solicitar-demo/
```

Regulated/high-risk ideas such as candidate-selection decisions or regulated financial approval must not be marketed as generic self-service employee products merely because they appear in internal opportunity research.

## Employee catalog / Catálogo de empleados

The website should be architected for the complete catalog rather than hard-coded around only four pages.

The four Reference Employees receive the strongest initial content, video and demo depth:

- Customer Support AI Employee;
- Administrative AI Employee;
- Accounting & Billing AI Employee;
- Sales / SDR AI Employee.

The remaining validated catalog profiles receive structured landing pages progressively. New profiles can be added without changing global site architecture.

## Employee page template / Plantilla de página de empleado

Every employee landing page should answer, in plain business language:

1. What job does this employee perform?
2. Which repetitive tasks can it handle?
3. What remains under human control?
4. Which company systems can it connect to?
5. Which modalities are optional (chat, voice, documents, images, browser)?
6. How is it installed privately?
7. What measurable outcomes can be tracked?
8. What does the workflow look like?
9. Which risks/limitations exist?
10. What should the prospect do next?

Recommended page structure:

```text
Hero + direct value proposition + CTA
↓
Problem / repetitive workload
↓
What the employee does
↓
Interactive workflow
↓
Realistic video demonstration
↓
Tools/integrations
↓
Capabilities enabled/optional
↓
Human approvals and security
↓
Private deployment options
↓
KPIs / measurable outcomes
↓
FAQ / objections
↓
Final CTA
```

## CTA architecture / Arquitectura de CTA

CTAs should be present throughout the site but remain contextual rather than visually spammy.

Primary CTA examples:

- `Solicitar una demo`
- `Diseñar mi Empleado IA`
- `Analizar qué procesos puedo automatizar`
- `Hablar sobre una instalación privada`

Secondary CTAs:

- `Ver cómo trabaja`
- `Explorar empleados IA`
- `Ver integraciones`
- `Ver arquitectura privada`

Every major landing page should expose a clear next step above the fold and after major proof sections.

## Interactive storytelling / Narrativa interactiva

Interactive components should explain the product, not merely decorate it.

High-value examples:

### Employee Builder

Prospect selects:

```text
Job
+ channels
+ systems
+ allowed actions
+ approval thresholds
+ private deployment preference
```

The UI visualizes a resulting capability/infrastructure profile.

### Live workflow simulator

A synthetic event moves through:

```text
Email → Employee → Knowledge/ERP → Policy → Approval → Action → Audit
```

Users can inspect each step.

### Company map

Show four Reference Employees collaborating around CRM, ERP, email, calendar, support and documents.

### Before / after process

Interactive comparison:

```text
manual workflow → repetitive steps / delays / handoffs
versus
IA Empleado → automated path + exceptions to human
```

### Capability configurator

Show that voice, OCR, vision, image generation, browser automation and local models are optional modules rather than mandatory dependencies.

## Video strategy / Estrategia de vídeo

Video should prove real workflows rather than rely on abstract AI animation.

Initial video set:

1. `What is IA Empleado?` — 60–90 seconds.
2. Customer Support workflow.
3. Administrative workflow.
4. Accounting & Billing invoice workflow.
5. Sales/SDR lead-to-meeting workflow.
6. `Private deployment: inside your infrastructure`.
7. Executive Reference Lab overview.
8. Technical Reference Lab audit/policy walkthrough.

Each public video page should include useful surrounding text/transcript/summary and structured metadata where appropriate so the page remains understandable and indexable without relying only on video playback.

## Images and diagrams / Imágenes y gráficos

Use original visual assets that communicate architecture, workflows and outcomes:

- employee cards;
- company department map;
- process timelines;
- capability maps;
- integration ecosystem diagrams;
- private-deployment diagrams;
- audit/approval examples;
- KPI dashboards;
- screenshots/video stills from the Reference Lab.

Decorative images must not replace explanatory text.

## SEO architecture

### Search intent model

Build content around business problems and employee/job intent rather than generic high-volume AI terms alone.

Examples:

- empleado IA atención al cliente
- administrativo con inteligencia artificial
- IA para facturación
- automatizar gestión de facturas con IA
- comercial SDR con IA
- automatizar seguimiento de leads
- recepcionista IA
- IA para gestionar pedidos
- IA para back office
- IA para soporte IT

Each page must have a distinct search intent and substantive content; avoid generating thin near-duplicate pages simply to cover keywords.

### Technical SEO requirements

- SSR/static-first HTML for critical landing-page content;
- unique metadata/canonical URLs;
- XML sitemap(s);
- robots policy;
- semantic headings;
- crawlable internal links;
- localized EN/ES architecture with valid `hreflang` when both languages launch;
- responsive images with dimensions/alt text;
- video metadata and watch-page strategy;
- structured data only when it accurately matches visible page content;
- fast loading and controlled JavaScript bundles;
- no critical commercial text hidden behind client-only interactions;
- redirects/versioning governed when URLs change.

### Structured data baseline

Where applicable and truthful:

- `Organization` for IA Empleado/Kairoseth organizational identity;
- `SoftwareApplication` / appropriate web-application representation for the product when eligibility/content matches;
- `VideoObject` on public video/watch pages;
- breadcrumbs and other Google-supported types when relevant.

Structured data is an enhancement, not a substitute for strong content.

## AI-search / answer-engine readiness

Content should also be easy for search/answer systems to understand:

- explicit definitions;
- concise job descriptions;
- clear capability lists;
- named limitations;
- process steps;
- evidence-backed claims;
- factual integration/deployment information;
- accessible transcripts for important videos;
- stable URLs;
- structured semantic HTML;
- no critical meaning contained only in canvas/WebGL animation.

## Conversion architecture / Arquitectura de conversión

Every qualified lead should be attributable to context:

- landing page/employee viewed;
- industry/use case;
- CTA clicked;
- demo/configurator state where consent and privacy allow;
- form completion;
- meeting booked;
- qualified/unqualified result in CRM.

The website should integrate cleanly with the Reference Sales/SDR Employee so demo leads can flow through the same product story we sell.

```text
iaempleado.com lead
  → CRM
  → Sales/SDR AI Employee
  → qualification/follow-up
  → meeting
  → human sales process
```

This creates a strong dogfooding loop without making public-site availability a dependency of customer runtime.

## Analytics and experimentation

Measure business outcomes rather than page views alone:

- organic qualified leads;
- CTA conversion by employee page;
- demo requests;
- configurator completion;
- meeting-book rate;
- lead-to-opportunity rate;
- engagement with workflow/video proof;
- SEO landing-page conversion;
- search query coverage;
- Core Web Vitals/performance diagnostics.

Experiments must preserve truthful messaging and accessibility.

## Performance budget / Presupuesto de rendimiento

The site's visual ambition must not turn it into a slow interactive demo.

Rules:

- load text/content before non-essential visual effects;
- lazy-load heavy interactive sections;
- dynamically import WebGL/3D only on pages/components that need it;
- respect reduced-motion preferences;
- optimize poster images and video embeds;
- avoid autoplaying multiple high-resolution videos;
- keep critical CTA/navigation usable without animation;
- track bundle and media regressions in CI.

## Separation of concerns / Separación de responsabilidades

```text
iaempleado.com
= marketing + SEO + education + lead capture

Kairoseth Reference Lab
= real demo execution + proofs + screenshots/videos

Customer deployment
= private production runtime
```

None of these three should become an accidental runtime dependency of another.

## Acceptance criteria / Criterios de aceptación

The first commercial release is accepted when:

1. EN/ES public information architecture is defined and technically supported;
2. the four Reference Employee pages are complete and differentiated;
3. the broader employee catalog is discoverable and extensible;
4. primary CTA is available throughout major commercial journeys;
5. SEO-critical content is server-rendered/static-first;
6. video/image/interactive components do not hide essential information;
7. lead capture integrates with the Reference CRM/SDR workflow;
8. structured data is validated and truthful;
9. performance/responsive/accessibility gates pass;
10. the public website remains independent from customer production runtimes.

## Current external technical references / Referencias técnicas actuales

Baseline reviewed: 2026-09-10.

- Hostinger supports Node.js/Next.js deployment from GitHub on supported web/cloud hosting plans: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- Google SoftwareApplication structured data guidance: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Google VideoObject guidance: https://developers.google.com/search/docs/appearance/structured-data/video
- Google Organization structured data guidance: https://developers.google.com/search/docs/appearance/structured-data/organization
