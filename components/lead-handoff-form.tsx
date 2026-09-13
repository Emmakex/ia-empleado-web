"use client";

import { type FormEvent, useMemo, useState } from "react";
import type { Locale } from "../lib/i18n";
import {
  buildLeadMailto,
  LEAD_CONTACT_EMAIL,
  type LeadHandoffContext,
} from "../lib/conversion-handoff";

type LeadHandoffFormProps = {
  locale: Locale;
  context: LeadHandoffContext;
  labels: {
    formTitle: string;
    formDescription: string;
    fields: {
      name: string;
      email: string;
      company: string;
      need: string;
    };
    submit: string;
    privacy: string;
    fallback: string;
  };
};

export function LeadHandoffForm({ locale, context, labels }: LeadHandoffFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [need, setNeed] = useState("");

  const mailto = useMemo(
    () => buildLeadMailto(locale, context, { name, email, company, need }),
    [locale, context, name, email, company, need],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    window.location.href = mailto;
  }

  return (
    <section className="lead-handoff-card" aria-labelledby="lead-form-title" data-lead-handoff-form data-intent={context.intent} data-source={context.source}>
      <div className="lead-handoff-card-heading">
        <p className="eyebrow">{locale === "es" ? "CONTACTO" : "CONTACT"}</p>
        <h2 id="lead-form-title">{labels.formTitle}</h2>
        <p>{labels.formDescription}</p>
      </div>

      <form className="lead-handoff-form" onSubmit={handleSubmit}>
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
            onChange={(event) => setNeed(event.target.value)}
          />
        </label>

        <p className="lead-handoff-privacy" id="lead-handoff-privacy">
          <span aria-hidden="true">◇</span>
          {labels.privacy}
        </p>

        <div className="lead-handoff-actions">
          <button className="button" type="submit" aria-describedby="lead-handoff-privacy" data-lead-prepare-email>
            {labels.submit}
          </button>
          <p>
            {labels.fallback}{" "}
            <a href={`mailto:${LEAD_CONTACT_EMAIL}`}>{LEAD_CONTACT_EMAIL}</a>
          </p>
        </div>
      </form>
    </section>
  );
}
