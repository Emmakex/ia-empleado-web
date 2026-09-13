# Web Phase 7C — Lead Intake & Commercial Pipeline

## Status

**7C1 complete and production-verified — 2026-09-13.**

**Full Phase 7C remains in progress.** The remaining milestone is 7C2 — Direct Intake Activation.

Phase 7C converts the production-verified Phase 7A/7B conversion handoff into a server-side lead-intake capability without inventing CRM delivery, storage or legal readiness.

The phase is intentionally split into two release milestones:

1. **7C1 — Lead Intake Foundation**: server endpoint, validation, consent contract, transport abstraction, truthful fallback and QA. **Complete and production-verified.**
2. **7C2 — Direct Intake Activation**: configure a real receiving destination plus a published privacy notice, verify real delivery and then close the full phase. **Not yet activated.**

Phase 7C belongs only to `ia-empleado-web`. It does not create a dependency on the private IA Empleado runtime.

## Current baseline

Phase 7A provides the bilingual request-demo routes:

- `/solicitar-demo`
- `/en/request-demo`

Phase 7B lets Team Builder and Process Analyzer preserve bounded non-sensitive result context through the same `intent`, `source` and `context` model.

Before Phase 7C, the form was intentionally local: it prepared a structured message to `hola@iaempleado.com` and did not claim to store or deliver a lead.

After 7C1, the site has a production-deployed server-side intake boundary, but **direct intake remains disabled by default** until 7C2 provides both a real destination and the correct public privacy notice. The existing email handoff therefore remains the truthful production behavior today.

## 7C1 — Lead Intake Foundation

### Server endpoint

Canonical endpoint:

```text
GET  /api/lead-intake
POST /api/lead-intake
```

`GET` exposes only public capability state. In direct mode the public shape may include the privacy URL:

```json
{
  "mode": "direct",
  "configured": true,
  "privacyNoticeUrl": "https://..."
}
```

With direct intake unconfigured, production returns the safe capability state:

```json
{
  "mode": "email",
  "configured": false
}
```

No secret, webhook URL or token is exposed.

`POST` accepts a bounded lead payload only when the direct-intake capability is fully configured.

### Activation rule

Direct intake MUST remain disabled unless both are valid HTTP(S) URLs:

```text
LEAD_INTAKE_WEBHOOK_URL
LEAD_PRIVACY_NOTICE_URL
```

Optional authentication:

```text
LEAD_INTAKE_WEBHOOK_TOKEN
```

If either required variable is absent or invalid, the public form stays in the production-verified email mode. The website must not display a fake success state.

### Lead schema

The browser may submit only:

- locale (`es` / `en`);
- name;
- contact email;
- optional company;
- stated need/process;
- allowlisted lead intent;
- bounded source;
- bounded context inherited from 7A/7B;
- explicit consent = `true`;
- exact consent version;
- honeypot field.

No cookies, browser fingerprint, IP address, runtime state or hidden customer data are added to the downstream lead object.

The receiving webhook gets a server-generated envelope:

```text
schemaVersion
leadId
receivedAt
locale
contact { name, email, company }
request { intent, source, context, need }
consent { accepted, version, privacyNoticeUrl }
origin = iaempleado.com
```

### Privacy and consent

Direct intake is gated by a published privacy-notice URL.

The visitor must explicitly accept the consent checkbox before direct submission. The consent version is currently:

```text
lead-intake-v1
```

The direct path is for handling the requested contact only. It must not silently opt the visitor into marketing communications.

Phase 7C does not invent the legal identity of the data controller. Production direct intake cannot be considered activated until the published privacy notice contains the correct legal information.

### Abuse controls

The initial public endpoint includes minimum sufficient controls:

- JSON body-size limit;
- strict field limits and server-side normalization;
- allowlisted intents;
- same-origin validation when the browser sends an `Origin` header;
- honeypot spam sink;
- soft in-memory per-IP rate limiting;
- bounded webhook delivery timeout;
- no PII in application error logs;
- `Cache-Control: no-store` responses.

The in-memory rate limiter is a baseline abuse control, not a substitute for provider/WAF-level protection if lead volume or attack volume grows.

### Delivery semantics

A browser success state is allowed only after the configured webhook returns a successful HTTP response.

If delivery is not configured or cannot be confirmed:

- the website must not claim that a lead was received;
- the entered data must remain in the browser;
- the user must be offered the existing structured email fallback.

### Transport abstraction

Phase 7C deliberately uses a generic authenticated webhook boundary rather than coupling the website to a specific CRM SDK.

A receiving endpoint can later be implemented by:

- CRM-native ingestion;
- an automation/orchestration layer;
- a controlled internal lead service;
- an SDR routing service.

The website contract remains stable while the downstream destination can change independently.

## 7C1 release criteria — satisfied

7C1 is production-verified with every release criterion satisfied:

- [x] `/api/lead-intake` compiles on Node.js;
- [x] capability discovery defaults to email mode with no secrets configured;
- [x] a valid payload is rejected from direct delivery when transport/privacy are unconfigured;
- [x] invalid or non-consented payloads are rejected server-side;
- [x] the existing email path remains functional;
- [x] the form progressively enables direct mode only after capability discovery reports it configured;
- [x] failed direct delivery exposes a truthful email fallback;
- [x] ES/EN and 390px mobile behavior pass Playwright;
- [x] static CI protects the server, client, consent, fallback and environment contract;
- [x] Hostinger production verification confirms the 7C1 foundation release.

## 7C1 production evidence

Implementation and release evidence:

- implementation PR: **#59 — `feat: add Web Phase 7C1 lead intake foundation`**;
- validated PR head: `a42c4cec4c793580de5a32ad499022ae79e61288`;
- PR Web CI: **#145**, run `34754040517` — success;
- squash merge to `main`: **`b8196a53986a0d4d71458c539dd2fb08cb593fa0`**;
- `main` Web CI: **#146**, run `34754252946` — success;
- production release marker: **`web-phase-7c1-lead-intake-foundation`**;
- Production Verification: **#16**, run `34754443126` — success;
- production browser step `Verify production geometry, brand systems, campaign media, conversion, contextual result handoff, lead intake foundation, responsive UX and accessibility` — success;
- production diagnostics upload — skipped because the production suite had no failures.

Production verification directly exercised `iaempleado.com`. At the time of 7C1 closure, production intentionally remains in **email mode** because 7C2 configuration has not been supplied. This is the expected safe state, not an incomplete 7C1 deployment.

## 7C2 activation blockers

The following external facts are required before direct intake can be marked active:

1. a real receiving endpoint and ownership decision (CRM, automation layer or controlled lead service);
2. production secret/token configuration when required by that endpoint;
3. a public privacy notice with the correct legal controller information;
4. end-to-end evidence that one synthetic test lead reaches the intended receiving system;
5. a decision on retention, deletion and SDR follow-up ownership downstream.

Until those blockers are resolved, **Phase 7C remains in progress even though 7C1 is complete and production-verified**.

## Next milestone — 7C2

The next implementation unit must not change the already verified 7C1 contract. It must select and configure the real commercial receiving destination, publish the correct privacy notice, configure secrets outside the repository, verify one synthetic lead end-to-end and document downstream retention/deletion/SDR ownership. Only after that evidence is green may direct mode become the production default and full Web Phase 7C be closed.
