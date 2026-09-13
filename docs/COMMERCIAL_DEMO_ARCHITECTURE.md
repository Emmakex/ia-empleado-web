# Commercial → Live Demo Architecture

## Purpose

This document defines the commercial and demonstration boundary for `iaempleado.com` and the wider Kairoseth product universe.

The core rule is simple:

> The commercial website captures and qualifies demand. A separate live demo environment proves the product actually works.

The commercial surface and the live demo surface are complementary, but they are not the same system and must not be confused in code, deployment or messaging.

## IA Empleado surfaces

### 1. `iaempleado.com` — commercial entry point

`iaempleado.com` owns:

- public product discovery;
- SEO and public education;
- employee/team/process exploration;
- Team Builder and Process Analyzer journeys;
- commercial lead qualification;
- lead capture;
- commercial email notification;
- future CRM/SDR routing;
- handoff into an appropriate live demonstration.

A typical journey is:

```text
Company X
→ iaempleado.com
→ explores employees / teams / processes
→ requests Accounting + Billing
→ submits commercial form
→ /api/lead-intake validates and structures the lead
→ commercial notification through iaempleado.com Hostinger SMTP
→ Kairoseth commercial team receives the qualified lead
→ appropriate live demo is prepared / presented
```

The website must preserve bounded context that is useful for commercial follow-up, such as:

- requested employee(s);
- source journey;
- stated process/need;
- bounded Team Builder / Process Analyzer context;
- locale;
- lead identifier;
- consent version.

It must not collect or send customer-runtime secrets or sensitive operational data.

## 2. `kairoseth.iaempleado.com` — live Kairoseth reference company

`kairoseth.iaempleado.com` is **not a staging copy of the commercial website**.

It is the real Kairoseth reference/demo company used to demonstrate IA Empleado working in realistic business workflows.

Its purpose is to let a prospect see an operating AI workforce instead of only reading product claims.

Example:

```text
Prospect request:
Accounting + Billing

Commercial qualification:
iaempleado.com

Live proof:
kairoseth.iaempleado.com

Demonstrated capabilities may include:
- Accounting AI Employee
- Billing AI Employee
- invoice intake
- extraction and checks
- reconciliation support
- reporting
- approval / human control
```

The reference environment may use synthetic, controlled or specifically approved demo data. It must never expose unrelated customer data.

## 3. Customer private runtime — production delivery

The customer deployment remains a separate surface:

```text
Customer Private Runtime
→ customer-selected AI Employees
→ customer-approved integrations
→ customer-approved credentials and policies
→ customer-controlled or dedicated infrastructure
```

Neither `iaempleado.com` nor `kairoseth.iaempleado.com` is a mandatory runtime dependency for customer production.

## Lead-routing architecture

SMTP and CRM are different concerns and must remain decoupled.

Initial architecture:

```text
                        iaempleado.com
                              │
                       /api/lead-intake
                              │
                      validated lead
                              │
                    commercial routing
                       /             \
                      /               \
        Hostinger SMTP                 CRM / SDR
        iaempleado.com                 optional/future
              │
              ▼
      commercial notification
              │
              ▼
       live-demo selection
              │
              ▼
   kairoseth.iaempleado.com
```

Hostinger SMTP provides the first real delivery path for commercial leads. A CRM such as Brevo can be added later as a second destination without changing the browser form or the public `Lead Intake` schema.

## SMTP ownership

SMTP credentials belong to the **`iaempleado.com` commercial environment**.

They do not belong to `kairoseth.iaempleado.com` merely because that environment is used for demonstrations.

The reference/demo environment may have its own notification requirements in the future, but those are a separate contract.

## Commercial lead email contract

The notification should be structured enough for immediate follow-up instead of forwarding an unprocessed form dump.

Example logical content:

```text
New IA Empleado lead

Company: Company X
Contact: Jane Doe
Email: jane@example.com

Requested solution:
Accounting + Billing

Employees of interest:
- Accounting AI Employee
- Billing AI Employee

Source:
Team Builder

Qualified context:
- invoice management
- reconciliation
- collections follow-up
- reporting

Stated need:
Reduce administrative work and automate monthly invoicing.

Locale: EN
Lead ID: lead_...
Received at: ...
```

The exact template may evolve, but it must preserve the existing privacy, data minimization and truthfulness rules.

## Kairoseth universe pattern

The same architecture applies to `kairoseth.com` and the wider Kairoseth product universe.

`kairoseth.com` is the central discovery/showroom surface. The visual universe / galaxy is not only decorative navigation: each product planet should lead toward a real product journey.

Canonical three-layer pattern:

```text
1. DISCOVERY
   kairoseth.com

2. CONVERSION
   product-specific commercial website / product page

3. PROOF
   real functional demo / reference environment
```

Example:

```text
kairoseth.com
→ IA planet
→ IA Empleado
→ iaempleado.com
→ qualified commercial journey
→ kairoseth.iaempleado.com live proof
```

Future Kairoseth products should follow the same principle where technically and commercially appropriate:

```text
Discover → Understand → Qualify → See it working → Buy / Deploy
```

## Product claim rule

The existence of a demo route must never be used to imply capabilities that are not implemented and demonstrable.

Every demo claim still follows the repository truthfulness classification:

```text
IMPLEMENTED_AND_DEMONSTRABLE
AVAILABLE_BY_CUSTOMER_ADAPTATION
PLANNED_OR_ROADMAP
RESTRICTED_OR_REQUIRES_REVIEW
```

## Environment naming rule

Do not describe `kairoseth.iaempleado.com` as generic website staging in product documentation or public copy.

Preferred terms:

- Kairoseth Reference Company
- Kairoseth Live Demo
- Kairoseth Reference Lab

Use `staging` only for a true pre-production copy of the commercial website when such an environment exists.

## Current implementation sequence

1. Keep Web Phase 7C1 provider-agnostic lead intake contract unchanged.
2. Add server-side Hostinger SMTP delivery for commercial lead notifications on `iaempleado.com`.
3. Preserve email fallback and truthful failure states.
4. Verify one synthetic lead end-to-end through the real `iaempleado.com` mail infrastructure.
5. Build/activate `kairoseth.iaempleado.com` as the live reference company independently from the commercial SMTP path.
6. Add CRM/SDR routing later without coupling the browser form to a specific vendor.
