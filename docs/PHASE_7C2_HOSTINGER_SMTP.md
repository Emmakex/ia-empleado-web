# Web Phase 7C2 — Hostinger SMTP Commercial Lead Delivery

## Status

**Implementation in progress — 2026-09-13.**

This phase activates the already production-verified 7C1 lead-intake boundary with a real commercial delivery channel owned by `iaempleado.com`.

The approved architecture is:

```text
prospect
→ iaempleado.com
→ Team Builder / Process Analyzer / request-demo form
→ POST /api/lead-intake
→ Hostinger SMTP for iaempleado.com
→ internal commercial inbox
→ human follow-up
→ live proof on kairoseth.iaempleado.com when appropriate
```

`kairoseth.iaempleado.com` is the Kairoseth reference/demo company. It is **not** the SMTP owner and it is **not** commercial staging for `iaempleado.com`.

## Transport priority

The 7C1 public contract remains provider-agnostic. 7C2 adds Hostinger SMTP as the primary commercial transport when its complete server-only configuration is present.

Transport resolution is intentionally ordered as:

```text
1. Hostinger SMTP when fully configured
2. existing generic webhook when SMTP is not configured
3. truthful browser email fallback when neither direct transport is available
```

The generic webhook remains available as compatibility and as a future CRM/orchestration boundary. SMTP does not imply Brevo, HubSpot or any other CRM dependency.

## Required server variables

```text
APP_BASE_URL
LEAD_PRIVACY_NOTICE_URL
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASSWORD
SMTP_FROM_EMAIL
SMTP_FROM_NAME
LEAD_NOTIFICATION_TO
LEAD_NOTIFICATION_SUBJECT_PREFIX
```

Recommended Hostinger settings:

```text
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
```

Port `587` with `SMTP_SECURE=false` remains supported for STARTTLS deployments.

All credentials are deployment secrets. None may use `NEXT_PUBLIC_*`, enter the browser bundle, be logged, or be committed to GitHub.

## Notification contract

A successful lead produces an internal commercial notification containing only the bounded 7C1 payload plus server-generated delivery metadata:

- lead ID;
- received timestamp;
- locale;
- company when supplied;
- contact name and email;
- requested intent;
- bounded source and context;
- stated need/process;
- consent version and privacy notice URL;
- commercial-site origin;
- link to the Kairoseth reference/demo surface.

The SMTP sender must use the configured `iaempleado.com` mailbox. The prospect address is set as `Reply-To`; it is never used as the SMTP `From` identity.

The email is produced in both plain-text and HTML forms. Dynamic HTML values are escaped. User-controlled values are not inserted into SMTP headers without normalization.

## Privacy and truthfulness

Direct mode may be exposed publicly only when:

1. a valid public privacy-notice URL is configured; and
2. a complete direct transport is configured.

The browser receives only:

```json
{
  "mode": "direct",
  "configured": true,
  "privacyNoticeUrl": "https://..."
}
```

SMTP host, port, username, password, sender, recipients and webhook configuration are never returned to the browser.

A submission is shown as received only after the SMTP provider accepts the send operation. On connection/authentication/provider failure, the API returns `delivery_failed` and the existing prepared-email fallback remains available.

## Failure safety

Application logs may contain:

- `leadId`;
- selected transport type;
- bounded technical error reason.

They must not contain contact email, name, company, request text, SMTP password or SMTP username.

Connection, greeting and socket timeouts prevent a stalled SMTP server from holding the request indefinitely.

## Relationship to the live demo

Commercial lead delivery and live product proof are separate surfaces:

```text
iaempleado.com
  captures and qualifies the opportunity

kairoseth.iaempleado.com
  demonstrates IA Empleado operating as a real reference company
```

Example:

```text
Company X requests Accounting + Billing
→ iaempleado.com captures the qualified lead
→ the commercial team receives the structured SMTP notification
→ the opportunity is prepared for follow-up
→ kairoseth.iaempleado.com can demonstrate the corresponding live employee/workflow
```

This same pattern is intended for the wider Kairoseth product universe:

```text
kairoseth.com → discover
product site → convert
reference/demo environment → prove live operation
customer private runtime → production
```

## Release gates

7C2 implementation is not complete until all of the following are green:

- [ ] Nodemailer server dependency installs on the supported Node runtime;
- [ ] SMTP configuration is server-only and validated;
- [ ] local/CI with no secrets still reports safe email mode;
- [ ] production with the configured Hostinger variables reports direct mode;
- [ ] invalid/non-consented payloads remain rejected;
- [ ] honeypot submissions are never delivered;
- [ ] SMTP failure returns truthful fallback rather than fake success;
- [ ] EN/ES request-demo flows remain intact;
- [ ] mobile/browser QA remains green;
- [ ] production serves release marker `web-phase-7c2-hostinger-smtp`;
- [ ] one synthetic production lead is accepted through the real SMTP path;
- [ ] the configured inbox confirms receipt of that synthetic lead.

Only the final two checks confirm real end-to-end delivery. CI and capability discovery alone do not prove inbox delivery.
