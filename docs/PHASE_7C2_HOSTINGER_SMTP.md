# Web Phase 7C2 — Hostinger SMTP Commercial Lead Delivery

## Status

**Implementation deployed; end-to-end acceptance still open — 2026-09-13.**

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

The browser may receive the safe transport class for diagnostics:

```json
{
  "mode": "direct",
  "configured": true,
  "transport": "smtp",
  "privacyNoticeUrl": "https://..."
}
```

SMTP host, port, username, password, sender, recipients and webhook configuration are never returned to the browser.

A successful `sendMail()` result proves that the configured SMTP submission server accepted the message for processing. It does **not** by itself prove final inbox delivery: a downstream MX can reject the message later and generate an asynchronous DSN/bounce.

The implementation still requires every recipient returned synchronously by Nodemailer to be accepted and treats synchronous rejection or pending state as `delivery_failed`. This prevents one class of false-positive delivery, but it cannot detect a later provider-generated bounce within the original HTTP request.

## Production incident — 2026-09-13

A real production test exposed the difference between SMTP submission acceptance and final mailbox delivery.

The original lead message had a single destination:

```text
From: leads@iaempleado.com
To: hola@iaempleado.com
SMTP authentication: leads@iaempleado.com
```

The Hostinger submission server accepted the message over authenticated ESMTPSA. Hostinger also DKIM-signed it with `d=iaempleado.com` and selector `hostingermail-a`.

The destination server then rejected the message after DATA:

```text
mx1.hostinger.com
554 5.7.1 Spam message rejected
```

The original message was classified by Hostinger as:

```text
X-Hostinger-Verdict: junk
X-Spam: Yes
```

After that downstream rejection, Hostinger generated an asynchronous `Undelivered Mail Returned to Sender` DSN. That bounce was delivered to `leads@iaempleado.com` because it was the authenticated sender/return path.

Therefore the earlier interpretation of the delivery logs was incorrect:

```text
leads@iaempleado.com → Saved
```

was the bounce/DSN being saved to the sender mailbox, **not** the original commercial lead being successfully delivered to a second configured recipient.

Correct root cause:

```text
SMTP submission accepted by Hostinger
+ downstream Hostinger MX classified the message as spam
+ asynchronous 554 5.7.1 rejection after sendMail() had already resolved
= browser showed success before final inbox delivery was known
```

The full-recipient acceptance check introduced after the first investigation remains valuable for synchronous SMTP failures, but it cannot catch this asynchronous rejection path.

### Operational acceptance rule

7C2 is not considered end-to-end complete until a synthetic lead is visible in the intended commercial inbox. SMTP submission acceptance alone is insufficient evidence.

If a provider supports DSN/webhook delivery events in the future, those events may become an additional delivery signal. Until then, inbox confirmation is the final acceptance gate.

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

- [x] Nodemailer server dependency installs on the supported Node runtime;
- [x] SMTP configuration is server-only and validated;
- [x] local/CI with no secrets still reports safe email mode;
- [x] production with the configured Hostinger variables reports direct mode;
- [x] invalid/non-consented payloads remain rejected;
- [x] honeypot submissions are never delivered;
- [x] synchronous partial SMTP acceptance returns truthful fallback rather than fake success;
- [x] EN/ES request-demo flows remain intact;
- [x] mobile/browser QA remains green;
- [x] production serves release marker `web-phase-7c2-hostinger-smtp`;
- [x] one synthetic production lead reached the real Hostinger SMTP submission service;
- [ ] the intended commercial inbox confirms receipt of a synthetic lead;
- [ ] Hostinger no longer returns an asynchronous `5.7.1 Spam message rejected` DSN for the production template.

Only final inbox delivery closes 7C2. CI, capability discovery and SMTP submission acceptance alone do not prove inbox delivery.
