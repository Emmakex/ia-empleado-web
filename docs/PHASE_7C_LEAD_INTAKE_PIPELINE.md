# Web Phase 7C — Lead Intake & Commercial Pipeline

## Status

Implementation in progress.

Phase 7C converts the production-verified Phase 7A/7B conversion handoff into a server-side lead-intake capability without inventing CRM delivery, storage or legal readiness.

The phase is intentionally split into two release milestones:

1. **7C1 — Lead Intake Foundation**: server endpoint, validation, consent contract, transport abstraction, truthful fallback and QA.
2. **7C2 — Direct Intake Activation**: configure a real receiving destination plus a published privacy notice, verify real delivery and then close the full phase.

Phase 7C belongs only to `ia-empleado-web`. It does not create a dependency on the private IA Empleado runtime.

## Current baseline

Phase 7A provides the bilingual request-demo routes:

- `/solicitar-demo`
- `/en/request-demo`

Phase 7B lets Team Builder and Process Analyzer preserve bounded non-sensitive result context through the same `intent`, `source` and `context` model.

Before Phase 7C, the form is intentionally local: it prepares a structured message to `hola@iaempleado.com` and does not claim to store or deliver a lead.

## 7C1 — Lead Intake Foundation

### Server endpoint

Canonical endpoint:

```text
GET  /api/lead-intake
POST /api/lead-intake
```

`GET` exposes only public capability state:

```json
{
  "mode": "email | direct",
  "configured": true,
  "privacyNoticeUrl": "https://..."
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

## 7C1 release criteria

7C1 is complete only when:

- `/api/lead-intake` compiles on Node.js;
- capability discovery defaults to email mode with no secrets configured;
- a valid payload is rejected from direct delivery when transport/privacy are unconfigured;
- invalid or non-consented payloads are rejected server-side;
- the existing email path remains functional;
- the form progressively enables direct mode only after capability discovery reports it configured;
- failed direct delivery exposes a truthful email fallback;
- ES/EN and 390px mobile behavior pass Playwright;
- static CI protects the server, client, consent, fallback and environment contract;
- Hostinger production verification confirms the 7C1 foundation release.

## 7C2 activation blockers

The following external facts are required before direct intake can be marked active:

1. a real receiving endpoint and ownership decision (CRM, automation layer or controlled lead service);
2. production secret/token configuration when required by that endpoint;
3. a public privacy notice with the correct legal controller information;
4. end-to-end evidence that one synthetic test lead reaches the intended receiving system;
5. a decision on retention, deletion and SDR follow-up ownership downstream.

Until those blockers are resolved, Phase 7C remains in progress even if 7C1 is production-verified.
