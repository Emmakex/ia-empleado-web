"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale } from "../lib/i18n";
import {
  buildLeadMailto,
  LEAD_CONTACT_EMAIL,
  type LeadHandoffContext,
} from "../lib/conversion-handoff";
import {
  LEAD_CONSENT_VERSION,
  LEAD_INTAKE_ENDPOINT,
  type LeadIntakeCapability,
  type LeadIntakeResponse,
} from "../lib/lead-intake";

type LeadHandoffFormProps = {
  locale: Locale;
  context: LeadHandoffContext;
  labels: {
    formTitle: string;
    formDescription: string;
    directFormDescription: string;
    fields: {
      name: string;
      email: string;
      company: string;
      need: string;
    };
    submit: string;
    directSubmit: string;
    sending: string;
    privacy: string;
    directPrivacy: string;
    consent: string;
    privacyLink: string;
    successTitle: string;
    successBody: string;
    fallbackTitle: string;
    fallbackBody: string;
    fallbackAction: string;
    retry: string;
    fallback: string;
  };
};

type SubmitState = "idle" | "submitting" | "success" | "fallback";

const emailCapability: LeadIntakeCapability = { mode: "email", configured: false };

export function LeadHandoffForm({ locale, context, labels }: LeadHandoffFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [need, setNeed] = useState("");
  const [consent, setConsent] = useState(false);
  const [capability, setCapability] = useState<LeadIntakeCapability>(emailCapability);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const mailto = useMemo(
    () => buildLeadMailto(locale, context, { name, email, company, need }),
    [locale, context, name, email, company, need],
  );

  useEffect(() => {
    let cancelled = false;

    fetch(LEAD_INTAKE_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return emailCapability;
        return await response.json() as LeadIntakeCapability;
      })
      .then((nextCapability) => {
        if (!cancelled && nextCapability.configured && nextCapability.mode === "direct" && nextCapability.privacyNoticeUrl) {
          setCapability(nextCapability);
        }
      })
      .catch(() => {
        // Email handoff remains the truthful baseline if capability discovery fails.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    if (capability.mode !== "direct" || !capability.configured || !capability.privacyNoticeUrl) {
      window.location.href = mailto;
      return;
    }

    setSubmitState("submitting");

    const honeypot = new FormData(form).get("website");

    try {
      const response = await fetch(LEAD_INTAKE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          locale,
          name,
          email,
          company,
          need,
          intent: context.intent,
          source: context.source,
          context: context.context,
          consent,
          consentVersion: LEAD_CONSENT_VERSION,
          website: typeof honeypot === "string" ? honeypot : "",
        }),
      });

      const result = await response.json().catch(() => null) as LeadIntakeResponse | null;

      if (response.ok && result?.ok) {
        setSubmitState("success");
        return;
      }

      setSubmitState("fallback");
    } catch {
      setSubmitState("fallback");
    }
  }

  const directMode = capability.mode === "direct" && capability.configured && Boolean(capability.privacyNoticeUrl);
  const description = directMode ? labels.directFormDescription : labels.formDescription;
  const privacy = directMode ? labels.directPrivacy : labels.privacy;
  const formLocked = submitState === "submitting" || submitState === "success";

  return (
    <section
      className="lead-handoff-card"
      aria-labelledby="lead-form-title"
      data-lead-handoff-form
      data-lead-intake-mode={directMode ? "direct" : "email"}
      data-intent={context.intent}
      data-source={context.source}
    >
      <div className="lead-handoff-card-heading">
        <p className="eyebrow">{locale === "es" ? "CONTACTO" : "CONTACT"}</p>
        <h2 id="lead-form-title">{labels.formTitle}</h2>
        <p>{description}</p>
      </div>

      <form className="lead-handoff-form" onSubmit={handleSubmit} aria-busy={submitState === "submitting"}>
        <div className="lead-handoff-field-grid">
          <label>
            <span>{labels.fields.name}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              disabled={formLocked}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            <span>{labels.fields.email}</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={160}
              value={email}
              disabled={formLocked}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>

        <label>
          <span>{labels.fields.company}</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            maxLength={140}
            value={company}
            disabled={formLocked}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>

        <label>
          <span>{labels.fields.need}</span>
          <textarea
            name="need"
            required
            rows={6}
            maxLength={1400}
            value={need}
            disabled={formLocked}
            onChange={(event) => setNeed(event.target.value)}
          />
        </label>

        <label className="lead-handoff-honeypot" aria-hidden="true">
          <span>Website</span>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {directMode ? (
          <label className="lead-handoff-consent">
            <input
              type="checkbox"
              name="consent"
              required
              checked={consent}
              disabled={formLocked}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>
              {labels.consent}{" "}
              <a href={capability.privacyNoticeUrl} target="_blank" rel="noreferrer">
                {labels.privacyLink}
              </a>
            </span>
          </label>
        ) : null}

        <p className="lead-handoff-privacy" id="lead-handoff-privacy">
          <span aria-hidden="true">◇</span>
          {privacy}
        </p>

        {submitState === "submitting" ? (
          <p className="sr-only" role="status" aria-live="polite">{labels.sending}</p>
        ) : null}

        {submitState === "success" ? (
          <div className="lead-handoff-status lead-handoff-status-success" role="status" data-lead-intake-success>
            <strong>{labels.successTitle}</strong>
            <p>{labels.successBody}</p>
          </div>
        ) : null}

        {submitState === "fallback" ? (
          <div className="lead-handoff-status lead-handoff-status-fallback" role="alert" data-lead-intake-fallback>
            <strong>{labels.fallbackTitle}</strong>
            <p>{labels.fallbackBody}</p>
            <div className="lead-handoff-status-actions">
              <a className="button" href={mailto}>{labels.fallbackAction}</a>
              <button className="button button-ghost" type="button" onClick={() => setSubmitState("idle")}>{labels.retry}</button>
            </div>
          </div>
        ) : null}

        <div className="lead-handoff-actions">
          {submitState !== "success" && submitState !== "fallback" ? (
            <button
              className="button"
              type="submit"
              aria-describedby="lead-handoff-privacy"
              aria-busy={submitState === "submitting"}
              data-lead-submit={directMode ? "direct" : "email"}
              data-lead-prepare-email={directMode ? undefined : "true"}
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting" ? labels.sending : directMode ? labels.directSubmit : labels.submit}
            </button>
          ) : null}
          <p>
            {labels.fallback}{" "}
            <a href={`mailto:${LEAD_CONTACT_EMAIL}`}>{LEAD_CONTACT_EMAIL}</a>
          </p>
        </div>
      </form>
    </section>
  );
}
