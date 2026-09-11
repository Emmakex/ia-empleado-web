# IA Empleado Web — Collaborative Ecosystem Vision / Visión de Ecosistema Colaborativo

## Status

Canonical strategic extension for the public commercial website `iaempleado.com`.

Este documento amplía `COMMERCIAL_WEBSITE.md` con la visión aprobada para presentar IA Empleado no como una colección de agentes aislados, sino como un **ecosistema de Empleados IA especializados que colaboran entre sí y con personas para resolver procesos empresariales completos**.

It does not redefine the private product runtime. Public claims remain constrained by `PRODUCT_CONTEXT.md` and by the validated state of `Emmakex/ia-empleado`.

---

## 1. North star / Idea central

The website must communicate one idea immediately:

> **No contratas una IA aislada. Construyes un equipo digital que trabaja con tu empresa.**

IA Empleado should be perceived as a governed work ecosystem where specialized digital employees can:

- receive business events and requests;
- use approved company systems;
- collaborate with other AI Employees;
- pass tasks and structured context between roles;
- request human approval when policy requires it;
- complete work and preserve an auditable history;
- improve operational throughput without pretending that humans disappear from the process.

The commercial narrative progresses through three levels:

```text
Empleado IA
→ Equipo IA
→ Empresa aumentada por IA
```

### Empleado IA
A specialized digital worker for a defined business job.

### Equipo IA
Several specialized AI Employees collaborating around one process, department or business objective.

### Empresa aumentada por IA
Humans, AI Employees and company systems operating as one coordinated organization with explicit authority and supervision boundaries.

---

## 2. Core message hierarchy / Jerarquía del mensaje

The first screen and early homepage journey should make these ideas understandable without technical knowledge:

1. **IA Empleado creates digital workers for real business jobs, not generic chatbots.**
2. **Employees can work together as a team instead of operating as isolated assistants.**
3. **They connect to real company systems such as CRM, ERP, email, calendar, ecommerce, ticketing and documents.**
4. **Important actions remain governed by permissions, policies and human approvals.**
5. **Deployment can be private and adapted to the capabilities each company actually needs.**

Candidate headline direction:

> **Tu empresa. Un equipo de Empleados IA trabajando juntos.**

Candidate supporting message:

> Automatiza operaciones reales con empleados digitales especializados que colaboran entre departamentos, utilizan tus sistemas y escalan las decisiones importantes a personas.

Primary CTA families:

- `Diseñar mi equipo IA`
- `Solicitar una demo`
- `Ver cómo trabajan juntos`
- `Analizar qué procesos puedo automatizar`

---

## 3. The website as a living company / La web como empresa viva

The website should not only describe the ecosystem. It should make visitors **see and manipulate it**.

The main visual metaphor is a living organization:

| Concept | Visual representation |
|---|---|
| Company | central organizational space / nucleus |
| Department | connected functional area |
| AI Employee | specialized active node |
| CRM / ERP / email / calendar | connected business systems |
| Task | event/pulse moving through the graph |
| Collaboration | relationship or task handoff between employees |
| Human approval | visible human intervention point |
| Result | completed business outcome |
| Audit | inspectable execution trail |

Animations should represent actual business meaning, not decorative futurism.

Examples:

- a connection lights up when a task moves between employees;
- an employee changes state from `waiting → analyzing → working → approval required → completed`;
- a human supervisor appears only when the workflow reaches an approval boundary;
- a completed flow exposes measurable time/cost/result information when such values are genuinely available.

---

## 4. Flagship interactive experience — See the team work

A central public experience should let the visitor trigger or select a realistic business scenario and watch the team resolve it.

Example scenario:

> A customer writes because the invoice is incorrect and they want to cancel an order.

Illustrative flow:

```text
Customer request
→ Customer Support AI Employee
→ CRM / order lookup
→ discrepancy detected
→ task to Accounting & Billing AI Employee
→ invoice validation
→ task to Administrative AI Employee
→ record correction
→ cancellation policy check
→ human approval when required
→ Customer Support sends final response
→ Reporting records outcome
```

The visitor should be able to inspect each stage:

- what information was received;
- which employee is responsible;
- which system is consulted;
- which policy/approval boundary applies;
- why the task moves to another employee;
- what the final business result is.

This simulator must use synthetic/demo-safe data and must never imply capabilities that are not implemented or commercially available.

---

## 5. Team Builder / Diseña tu equipo IA

A high-value interactive lead-generation tool should help a visitor describe the company and visualize a recommended AI team.

Possible input journey:

```text
Sector
+ departments
+ repetitive problems
+ current systems
+ approximate workload
+ desired channels
+ privacy/deployment preference
```

The output should generate a visual recommendation such as:

```text
Recommended initial team
├── Customer Support AI Employee
├── Administrative AI Employee
├── Email Manager
└── Reporting AI Employee

Connections
Email → Customer Support → CRM
                   ↓
            Administrative → ERP
                   ↓
               Reporting
```

The builder is initially an educational/commercial configurator, not a promise that every generated combination can be deployed automatically.

Lead capture should retain useful context, subject to consent and privacy rules:

- selected sector;
- chosen problems;
- systems/integrations;
- proposed employees/team;
- deployment preference;
- CTA/source page.

---

## 6. New commercial object — Equipo IA

`Equipo IA` becomes a first-class public concept alongside `Empleado IA`.

An employee solves a defined job. A team solves a cross-functional process or business objective.

Initial commercial team examples:

### Equipo Ventas

```text
Marketing Operations
+ Sales / SDR
+ Email Manager
+ Reporting
```

### Equipo Ecommerce

```text
Customer Support
+ Order Management
+ Ecommerce Operations
+ Accounting & Billing
+ Reporting
```

### Equipo Administración

```text
Email Manager
+ Administrative
+ Documentation
+ Accounting & Billing
```

### Equipo Turismo

```text
Travel Agent
+ Reservations
+ Customer Support
+ Administrative
+ Accounting & Billing
```

Future team pages should explain:

- the business problem;
- the participating employees;
- how tasks move between them;
- systems and integrations;
- human control points;
- measurable outcomes;
- realistic limitations;
- relevant employee pages and use cases;
- CTA to configure a similar team.

---

## 7. Expanded information architecture

The existing commercial architecture is extended to support the ecosystem model and a large SEO/GEO content surface.

```text
/
├── /empleados-ia/
├── /equipos-ia/
│   ├── /ventas/
│   ├── /ecommerce/
│   ├── /administracion/
│   └── /turismo/
├── /departamentos/
│   ├── /atencion-cliente/
│   ├── /administracion/
│   ├── /finanzas/
│   ├── /ventas/
│   └── /operaciones/
├── /sectores/
├── /casos-de-uso/
├── /automatizaciones/
├── /integraciones/
├── /comparativas/
├── /como-funciona/
├── /infraestructura-privada/
├── /seguridad/
├── /demo/
├── /disena-tu-equipo-ia/
├── /calculadora-roi/
├── /recursos/
├── /guias/ or /academia/
└── /contacto/ or /solicitar-demo/
```

The exact public slugs can be refined through SEO research before launch. URL stability becomes a contract after indexing begins.

---

## 8. SEO strategy — broad coverage without thin content

The website should become a large organic acquisition surface, but scale through useful intent coverage rather than mass-generated near-duplicate pages.

Core search-intent dimensions:

### By profession / employee

Examples:

- empleado IA atención al cliente;
- administrativo con inteligencia artificial;
- comercial SDR con IA;
- recepcionista IA;
- agente de viajes IA.

### By task / automation

Examples:

- automatizar gestión de facturas;
- automatizar seguimiento de leads;
- responder correos automáticamente con control humano;
- automatizar gestión de pedidos;
- automatizar back office.

### By department

Examples:

- IA para administración;
- IA para ventas;
- IA para atención al cliente;
- IA para operaciones;
- IA para contabilidad.

### By sector

Examples:

- IA para ecommerce;
- IA para turismo;
- IA para empresas de servicios;
- IA para logística;
- IA para software/tecnología.

### By problem

Examples:

- reducir tareas administrativas repetitivas;
- gestionar alto volumen de emails;
- reducir tiempos de respuesta;
- automatizar conciliaciones básicas;
- mejorar seguimiento comercial.

### By integration

Examples:

- IA conectada a CRM;
- IA para ERP;
- IA para WooCommerce / PrestaShop / Shopify when supported;
- IA para email y calendario;
- IA para ticketing.

### By team

Examples:

- equipo IA para ecommerce;
- equipo IA para ventas;
- equipo IA para administración y facturación;
- agentes IA que trabajan juntos.

Every indexable page must have a distinct intent, substantive original content, useful internal links and a clear reason to exist.

---

## 9. GEO / AI-search readiness

The website must be easy for search engines and generative answer systems to understand, extract and cite.

Important pages should expose explicit semantic sections such as:

```text
What it is
What it does
Who it is for
Typical tasks
How the process works
Systems/integrations
What remains under human control
Limitations
Example workflow
Expected/measurable outcomes
FAQ
Evidence / methodology when relevant
```

Content rules:

- explicit definitions instead of vague slogans;
- concise factual summaries near the top of important pages;
- stable entity names and terminology;
- semantic HTML and crawlable text;
- critical meaning must not exist only inside animation/canvas/WebGL;
- accessible transcripts/summaries for videos;
- evidence-backed claims;
- structured data only when it matches visible content;
- clear statements of limitations and approval boundaries;
- stable canonical URLs;
- strong contextual internal linking.

Core entities to build consistently:

- IA Empleado;
- Empleado IA;
- Equipo IA;
- private deployment / infraestructura privada;
- governed work / trabajo gobernado;
- human supervision / supervisión humana;
- AI Employee collaboration / colaboración entre Empleados IA.

---

## 10. Comparison content cluster

Comparisons should become a major educational and SEO cluster.

Candidate pages:

- Empleado IA vs chatbot;
- Empleado IA vs agente IA;
- Empleado IA vs RPA;
- Empleado IA vs automatización tradicional;
- Empleado IA vs Copilot;
- agente IA vs workflow automatizado;
- IA privada vs SaaS compartido;
- IA colaborativa vs asistentes aislados.

The comparison experience should be visual and factual rather than adversarial marketing.

Useful interaction: a before/after process slider.

```text
Traditional/manual
Email → copy data → CRM → ERP → spreadsheet → reply → follow-up

IA Empleado
Email → Employee → CRM/ERP → deterministic policy → human exception → action/reply
```

Comparisons must state tradeoffs, prerequisites and limits rather than claiming that IA Empleado is universally superior.

---

## 11. Process Improvement experience / Mejora tu proceso

A future interactive experience should let visitors describe a current workflow and receive an educational visualization of how it could be improved.

Example input:

> “We receive orders by email, enter them into the ERP, check stock and then notify the customer.”

Possible output:

```text
Current process
→ manual intake
→ manual ERP entry
→ stock check
→ manual customer response

Potential IA Empleado process
→ Email Manager / Order Management
→ structured extraction
→ ERP lookup/update
→ exception/policy check
→ human approval if required
→ Customer Support response
```

The initial version may use predefined workflow patterns. A later version can use product-backed analysis when the runtime and safety contracts support it.

---

## 12. Video as proof, not decoration

Video should demonstrate concrete work.

Initial editorial/video system:

1. **What is IA Empleado?** — 60–90 seconds.
2. **A day inside a company with IA Employees** — team collaboration end-to-end.
3. Customer Support workflow.
4. Administrative workflow.
5. Accounting & Billing workflow.
6. Sales / SDR workflow.
7. Team Ecommerce example.
8. Private deployment / infrastructure explanation.
9. Human approvals and governance.
10. Reference Lab executive overview when ready.

Every important video should have an indexable companion page containing:

- title and summary;
- transcript/captions;
- workflow steps;
- participating employees;
- systems/integrations shown;
- limitations/disclaimers where required;
- relevant links and CTA;
- `VideoObject` structured data only when valid.

---

## 13. Animation principles

The website can be visually ambitious, but animation must explain the product.

Good animation communicates:

- work moving;
- employees collaborating;
- systems being queried;
- approvals being requested;
- exceptions being escalated;
- tasks reaching completion;
- organization-wide coordination.

Avoid visual effects that obscure content or create a generic “AI particles” aesthetic without business meaning.

Performance contract:

- critical copy and navigation load before non-essential effects;
- interactions progressively enhance server/static content;
- heavy visual libraries are dynamically loaded only where needed;
- reduced-motion preferences are respected;
- mobile receives an equally understandable but potentially simpler visualization;
- no critical CTA or explanation depends on animation;
- Core Web Vitals and bundle/media regressions are treated as release concerns.

---

## 14. Content density and editorial model

`iaempleado.com` should become a deep educational resource, not a five-page brochure.

Content families:

- employee profile pages;
- team pages;
- department pages;
- sector pages;
- automation/task pages;
- integration pages;
- use-case pages;
- comparisons;
- implementation/private-infrastructure guides;
- security/governance explanations;
- video watch pages;
- practical guides/academy resources;
- FAQ and objection pages;
- case studies when real evidence exists.

Quality rules:

- no keyword-stuffed thin pages;
- no mass-published synthetic testimonials or fabricated cases;
- one clear search/user intent per landing page;
- EN/ES parity for released public scope;
- internal links should create meaningful topic clusters;
- content should answer real buyer questions at executive, operational and technical levels.

---

## 15. Conversion architecture

The website should support different levels of buyer readiness.

### Discovery CTAs

- `Ver cómo funciona`
- `Explorar Empleados IA`
- `Ver Equipos IA`
- `Comparar enfoques`

### Evaluation CTAs

- `Diseñar mi equipo IA`
- `Analizar mi proceso`
- `Calcular potencial de automatización`
- `Ver infraestructura privada`

### High-intent CTAs

- `Solicitar una demo`
- `Hablar con un especialista`
- `Preparar una propuesta de implantación`

Attribution should preserve landing context, employee/team/use case and meaningful configurator state where consent allows.

---

## 16. Truthfulness and product-state contract

The commercial website may communicate breadth and future direction, but every claim must distinguish the state of the capability.

Canonical states:

- **Implemented and demonstrable**;
- **Available through customer adaptation**;
- **Planned / roadmap**;
- **Restricted / regulatory review required**.

The website must not present conceptual collaboration, integrations or employee profiles as production-ready merely because the visual design can simulate them.

Regulated/high-impact employee ideas remain explicitly controlled and must not be marketed as generic autonomous products.

Metrics must distinguish:

- measured results;
- estimates;
- potential improvement;
- verified realized outcomes.

---

## 17. Initial homepage experience

Recommended narrative flow:

```text
1. Hero
   "Tu empresa. Un equipo de Empleados IA trabajando juntos."
   + primary CTA
   + lightweight live ecosystem visual

2. What is IA Empleado?
   clear definition, not generic chatbot copy

3. See the team work
   interactive end-to-end scenario

4. From one employee to a complete team
   Empleado IA → Equipo IA → Empresa aumentada

5. Reference employees
   Customer Support / Administrative / Accounting / Sales SDR

6. Team examples
   Sales / Ecommerce / Administration / Tourism

7. How work moves
   systems + policy + approval + audit

8. Before / after comparison

9. Integrations

10. Private deployment + security

11. Video proof

12. Build your team

13. SEO-rich questions / FAQ

14. Final high-intent CTA
```

The homepage should be visually impressive while remaining understandable, crawlable and useful with JavaScript or animation reduced.

---

## 18. Delivery roadmap for the commercial web

This roadmap concerns `ia-empleado-web` only and must not be confused with the runtime roadmap in `Emmakex/ia-empleado`.

### Web Phase 0 — Foundation

- Hostinger + Next.js deployment;
- website-specific engineering rules;
- EN/ES architecture decision;
- SEO/GEO information architecture;
- design system foundation;
- analytics/consent baseline;
- CI and production verification.

### Web Phase 1 — Core commercial shell

- global navigation/footer;
- homepage V1;
- core design language;
- localized metadata;
- sitemap/robots/canonical baseline;
- responsive/accessibility/performance gates.

### Web Phase 2 — Employee content engine

- reusable employee page template;
- four Reference Employee pages;
- employee catalog index;
- structured content model for progressive catalog expansion.

### Web Phase 3 — Collaborative ecosystem

- Team IA concept pages;
- living-company visualization;
- employee-to-employee handoff visualization;
- first end-to-end interactive scenario.

### Web Phase 4 — SEO/GEO expansion

- departments;
- sectors;
- automation/task pages;
- integration clusters;
- comparison cluster;
- guides/academy;
- structured internal linking.

### Web Phase 5 — Interactive conversion tools

- Team Builder;
- process improvement explorer;
- ROI/value estimator with transparent methodology;
- richer lead attribution.

### Web Phase 6 — Proof media and optimization

- video library and transcripts;
- Reference Lab proof assets as they become valid;
- experimentation;
- conversion optimization;
- content expansion from real search/query evidence.

Each phase must satisfy relevant engineering, EN/ES, SEO, responsive, accessibility, performance and truthfulness gates before being marked complete.

---

## 19. Success metrics

The web should optimize for qualified business outcomes, not raw traffic alone.

Key metrics:

- organic qualified leads;
- AI-search/referral visibility where measurable;
- non-branded organic query coverage;
- conversion by employee/team/use-case page;
- demo requests;
- Team Builder completion;
- process-analysis CTA completion;
- meeting-book rate;
- lead-to-opportunity rate;
- engagement with interactive workflows;
- video proof engagement;
- internal navigation from educational content to commercial pages;
- Core Web Vitals;
- crawl/index coverage;
- EN/ES search performance.

---

## 20. Definition of strategic success

The website succeeds when a qualified visitor can understand, without needing a sales explanation, that:

1. IA Empleado is not merely a chatbot;
2. an Empleado IA performs a defined business role;
3. several employees can collaborate as an Equipo IA;
4. teams can coordinate across departments and business systems;
5. human supervision remains visible for important decisions;
6. deployment can be adapted/private;
7. the visitor can see realistic workflows, comparisons and proof;
8. the site offers deep content for their role, sector, problem and integrations;
9. there is a clear next step to configure, evaluate or request a demo;
10. public claims remain consistent with what the product can actually demonstrate.

The target perception is not “another AI tool”. It is:

> **A platform for building coordinated digital workforces that operate with people, systems, policies and measurable business processes.**
