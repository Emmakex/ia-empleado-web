# Email deliverability diagnostic

## 2026-09-13 — Hostinger internal delivery test

Manual messages between `leads@iaempleado.com` and `hola@iaempleado.com` are delivered successfully in both directions.

This rules out a general mailbox-to-mailbox routing failure and makes the automated notification payload the active suspect.

The next diagnostic release intentionally uses a minimal transactional message:

- plain text only;
- short subject;
- no HTML alternative;
- no external Reply-To;
- no custom X-IA-* headers;
- no privacy/demo URLs in the message body.

If this minimal message is delivered, richer elements will be reintroduced one at a time until the Hostinger spam trigger is isolated.

This is a temporary diagnostic profile, not the final commercial email design.
