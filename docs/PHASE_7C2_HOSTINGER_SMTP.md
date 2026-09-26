# Web Phase 7C2 — Hostinger SMTP Commercial Lead Delivery

## Status

**Closed and production-verified — 2026-09-13.**

7C2 activates the production-verified 7C1 lead-intake boundary with Hostinger SMTP owned by `iaempleado.com`.

Approved production flow:

```text
prospect
→ iaempleado.com
→ Team Builder / Process Analyzer / request-demo form
→ POST /api/lead-intake
→ Hostinger SMTP for iaempleado.com
→ hola@iaempleado.com
→ human follow-up
→ live proof on kairoseth.iaempleado.com when appropriate
```

`kairoseth.iaempleado.com` is the Kairoseth reference/demo company. It is not the SMTP owner and it is not commercial staging for `iaempleado.com`.

## Transport priority

The public 7C1 contract remains provider-agnostic. Hostinger SMTP is the primary commercial transport whenever its complete server-only configuration is present.

```text
1. Hostinger SMTP when fully configured
2. existing generic webhook when SMTP is not configured
3. truthful browser email fallback when neither direct transport is available
```

The webhook remains a future CRM/orchestration boundary. SMTP does not imply Brevo, HubSpot or another CRM dependency.

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

Production Hostinger settings use:

```text
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
```

All credentials are deployment secrets. None may use `NEXT_PUBLIC_*`, enter the browser bundle, be logged, or be committed to GitHub.

## Current notification baseline

The production-accepted message is intentionally simple and human-like because Hostinger rejected the richer automated variant as junk.

Current baseline:

- plain text only;
- short neutral subject;
- no HTML alternative;
- no external `Reply-To`;
- no custom `X-IA-*` headers;
- no URLs in the body;
- bounded lead fields only.

Example shape:

```text
Subject: IA Empleado - nuevo contacto

Nuevo contacto desde IA Empleado.

Nombre: ...
Email: ...
Teléfono: ...
Empresa: ...
Interés: ...

Necesidad:
...

Referencia: lead_...
```

This profile is now the known-good production baseline. Richer email elements may only be reintroduced incrementally and must be verified against Hostinger deliverability after each change.

## Privacy and truthfulness

Direct mode is exposed publicly only when:

1. a valid public privacy-notice URL is configured; and
2. a complete direct transport is configured.

The browser may receive only the safe transport class:

```json
{
  "mode": "direct",
  "configured": true,
  "transport": "smtp",
  "privacyNoticeUrl": "https://..."
}
```

SMTP host, port, username, password, sender, recipients and webhook configuration are never returned to the browser.

A submission is shown as received only after the SMTP provider synchronously accepts every configured recipient. Connection/authentication/provider failure, partial recipient acceptance, recipient rejection or pending recipient state returns `delivery_failed` and preserves the prepared-email fallback.

This synchronous acceptance check is useful but does not prove final inbox delivery; an SMTP provider can still generate a later bounce. For that reason the final phase gate is real inbox receipt.

## Production incident — 2026-09-13

The first production version used a richer email with HTML, links, an external `Reply-To` and custom `X-IA-*` headers. Hostinger authenticated and accepted the SMTP submission, but its downstream filtering classified the message as junk and later rejected delivery to `hola@iaempleado.com` with:

```text
554 5.7.1 Spam message rejected
```

The bounce was returned to `leads@iaempleado.com`.

Important correction to the first diagnosis:

```text
leads@iaempleado.com → Saved
```

was the delivery of the bounce/DSN back to the sender mailbox, not successful delivery of the commercial lead. The original commercial message had a single recipient: `hola@iaempleado.com`.

Manual control tests proved that normal human emails between `leads@iaempleado.com` and `hola@iaempleado.com` delivered successfully in both directions. This ruled out mailbox existence, account routing and basic Hostinger SMTP authentication as the root problem.

The automated notification was then reduced to the minimal baseline above. After deployment, a real production form submission from `iaempleado.com` was successfully received in the inbox of `hola@iaempleado.com`.

Confirmed root cause:

```text
rich automated message composition
→ Hostinger junk classification / asynchronous bounce

minimal human-like automated message
→ successful inbox delivery
```

The exact individual trigger among the removed rich-message elements was not isolated because the business objective was satisfied once a reliable baseline existed. Any future enrichment must therefore use one-change-at-a-time deliverability testing.

## Failure safety

Application logs may contain:

- `leadId`;
- selected transport type;
- SMTP message ID;
- accepted/rejected/pending recipient counts;
- bounded provider response with email addresses redacted;
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
→ the commercial team receives the SMTP notification
→ the opportunity is prepared for follow-up
→ kairoseth.iaempleado.com demonstrates the corresponding live employee/workflow
```

The same pattern applies to the wider Kairoseth universe:

```text
kairoseth.com → discover
product site → convert
reference/demo environment → prove live operation
customer private runtime → production
```

## Release gates

- [x] Nodemailer server dependency installs on the supported Node runtime;
- [x] SMTP configuration is server-only and validated;
- [x] local/CI with no secrets still reports safe email mode;
- [x] production with configured Hostinger variables reports direct SMTP mode;
- [x] invalid/non-consented payloads remain rejected;
- [x] honeypot submissions are never delivered;
- [x] partial recipient acceptance is rejected rather than shown as success;
- [x] EN/ES request-demo flows remain intact;
- [x] mobile/browser QA remains green;
- [x] production serves the 7C2 release;
- [x] one synthetic production lead reached Hostinger SMTP;
- [x] the configured primary commercial inbox confirmed actual receipt;
- [x] production verification passed after the minimal-message deployment.

**Web Phase 7C2 is closed.**
