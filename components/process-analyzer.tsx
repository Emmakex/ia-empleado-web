"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  ProcessAnalyzerPageContent,
  ProcessPainKey,
  ProcessTemplateKey,
  ProcessTemplateView,
} from "../lib/process-analyzer";
import type { Locale } from "../lib/i18n";
import { getBrandCharacterForProfileKey } from "../lib/brand-characters";
import { BrandCharacterImage } from "./brand-character-image";

type ProcessAnalyzerProps = {
  locale: Locale;
  content: ProcessAnalyzerPageContent;
  templates: ProcessTemplateView[];
  painOptions: Array<{ value: ProcessPainKey; label: string }>;
};

export function ProcessAnalyzer({ locale, content, templates, painOptions }: ProcessAnalyzerProps) {
  const [processKey, setProcessKey] = useState<ProcessTemplateKey>(templates[0]?.key ?? "customer-issue");
  const [selectedPains, setSelectedPains] = useState<ProcessPainKey[]>([]);
  const [bottlenecks, setBottlenecks] = useState<string[]>([]);

  const process = useMemo(
    () => templates.find((template) => template.key === processKey) ?? templates[0],
    [processKey, templates],
  );

  if (!process) return null;

  const togglePain = (pain: ProcessPainKey) => {
    setSelectedPains((current) => current.includes(pain) ? current.filter((item) => item !== pain) : [...current, pain]);
  };

  const toggleBottleneck = (id: string) => {
    setBottlenecks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const changeProcess = (key: ProcessTemplateKey) => {
    setProcessKey(key);
    setBottlenecks([]);
  };

  const relevantStepIds = new Set(
    process.steps
      .filter((step) => bottlenecks.includes(step.id) || step.painKeys.some((pain) => selectedPains.includes(pain)))
      .map((step) => step.id),
  );

  const counts = process.steps.reduce(
    (acc, step) => ({ ...acc, [step.mode]: acc[step.mode] + 1 }),
    { automated: 0, assisted: 0, human: 0 },
  );

  const processCharacters = process.employees
    .map((employee) => getBrandCharacterForProfileKey(employee.key, locale))
    .filter((character): character is NonNullable<typeof character> => Boolean(character));
  const selectedPainLabels = painOptions.filter((option) => selectedPains.includes(option.value)).map((option) => option.label);
  const bottleneckLabels = process.steps.filter((step) => bottlenecks.includes(step.id)).map((step) => step.currentTitle);
  const emailBody = [
    locale === "es" ? "Análisis orientativo de proceso - IA Empleado" : "Indicative process analysis - IA Empleado",
    "",
    `${locale === "es" ? "Proceso" : "Process"}: ${process.label}`,
    `${locale === "es" ? "Cuellos generales" : "General bottlenecks"}: ${selectedPainLabels.length ? selectedPainLabels.join(", ") : "-"}`,
    `${locale === "es" ? "Pasos marcados" : "Marked steps"}: ${bottleneckLabels.length ? bottleneckLabels.join(" | ") : "-"}`,
    `${locale === "es" ? "Empleados IA" : "AI Employees"}: ${process.employees.map((employee) => employee.shortName).join(", ")}`,
    `${locale === "es" ? "Sistemas a evaluar" : "Systems to evaluate"}: ${process.systems.join(", ")}`,
    "",
    locale === "es"
      ? "Quiero revisar este flujo con un discovery técnico y validar datos, integraciones, excepciones, permisos y aprobaciones."
      : "I want to review this workflow through technical discovery and validate data, integrations, exceptions, permissions and approvals.",
  ].join("\n");
  const mailto = `mailto:hola@iaempleado.com?subject=${encodeURIComponent(`IA Empleado - ${process.label}`)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="process-analyzer-shell brand-process-analyzer-shell">
      <div className="process-analyzer-controls" aria-labelledby="process-analyzer-controls-title">
        <div className="process-control-heading">
          <p className="eyebrow">{content.analyzerEyebrow}</p>
          <h2 id="process-analyzer-controls-title">{content.analyzerTitle}</h2>
          <p>{content.analyzerDescription}</p>
        </div>

        <fieldset className="process-fieldset">
          <legend>{content.processLabel}</legend>
          <p>{content.processHelp}</p>
          <div className="process-template-grid">
            {templates.map((template) => (
              <button
                type="button"
                className={template.key === process.key ? "process-template-option is-active" : "process-template-option"}
                aria-pressed={template.key === process.key}
                onClick={() => changeProcess(template.key)}
                key={template.key}
              >
                <strong>{template.label}</strong>
                <span>{template.description}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="process-fieldset">
          <legend>{content.painLabel}</legend>
          <p>{content.painHelp}</p>
          <div className="process-pain-list">
            {painOptions.map((option) => (
              <button
                type="button"
                className={selectedPains.includes(option.value) ? "process-pain-chip is-active" : "process-pain-chip"}
                aria-pressed={selectedPains.includes(option.value)}
                onClick={() => togglePain(option.value)}
                key={option.value}
              >
                <span aria-hidden="true">{selectedPains.includes(option.value) ? "✓" : "+"}</span>
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="process-context-card" aria-live="polite">
        <div><span>{locale === "es" ? "Entrada" : "Trigger"}</span><strong>{process.trigger}</strong></div>
        <div><span>{locale === "es" ? "Resultado" : "Outcome"}</span><strong>{process.outcome}</strong></div>
      </div>

      <div className="process-brand-map" aria-hidden="true">
        <div className="process-brand-core">
          <img src="/branding/ia-empleado-mark.svg" alt="" width={48} height={48} />
          <span>{locale === "es" ? "Proceso coordinado" : "Coordinated process"}</span>
        </div>
        <div className="process-brand-people">
          {processCharacters.map((character) => (
            <div className="process-brand-person" data-accent={character.accent} key={character.id}>
              <BrandCharacterImage character={character} sizes="88px" />
              <span>{character.name}</span>
            </div>
          ))}
          {process.employees.filter((employee) => !getBrandCharacterForProfileKey(employee.key, locale)).slice(0, 2).map((employee) => (
            <div className="process-brand-neutral" key={employee.key}><i>◇</i><span>{employee.shortName}</span></div>
          ))}
        </div>
        <div className="process-brand-systems">{process.systems.slice(0, 4).map((system) => <span key={system}>{system}</span>)}</div>
        <div className="process-brand-human"><span>✓</span>{locale === "es" ? "Control humano explícito" : "Explicit human control"}</div>
      </div>

      <div className="process-before-after-grid">
        <section className="process-flow-column current-flow" aria-labelledby="current-process-title">
          <div className="process-flow-heading">
            <span className="process-flow-index">01</span>
            <div><h3 id="current-process-title">{content.currentTitle}</h3><p>{content.currentIntro}</p></div>
          </div>
          <ol className="process-step-list">
            {process.steps.map((step, index) => {
              const marked = bottlenecks.includes(step.id);
              const painMatch = step.painKeys.some((pain) => selectedPains.includes(pain));
              return (
                <li className={`process-current-step${marked ? " is-marked" : ""}${painMatch ? " has-pain-match" : ""}`} key={step.id}>
                  <div className="process-step-topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="process-owner-chip">{step.currentOwner}</span>
                  </div>
                  <h4>{step.currentTitle}</h4>
                  <p>{step.currentText}</p>
                  <button type="button" className="process-bottleneck-button" aria-pressed={marked} onClick={() => toggleBottleneck(step.id)}>
                    <span aria-hidden="true">{marked ? "●" : "○"}</span>
                    {marked ? content.bottleneckMarked : content.markBottleneck}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="process-transform-arrow" aria-hidden="true">→</div>

        <section className="process-flow-column proposed-flow" aria-labelledby="proposed-process-title">
          <div className="process-flow-heading">
            <span className="process-flow-index">02</span>
            <div><h3 id="proposed-process-title">{content.proposedTitle}</h3><p>{content.proposedIntro}</p></div>
          </div>
          <ol className="process-step-list">
            {process.steps.map((step, index) => {
              const label = step.mode === "automated" ? content.automatedLabel : step.mode === "assisted" ? content.assistedLabel : content.humanLabel;
              return (
                <li className={`process-proposed-step mode-${step.mode}${relevantStepIds.has(step.id) ? " is-priority" : ""}`} key={step.id}>
                  <div className="process-step-topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className={`process-mode-badge mode-${step.mode}`}>{label}</span>
                  </div>
                  <h4>{step.proposedTitle}</h4>
                  <p>{step.proposedText}</p>
                  <div className="process-step-employees brand-process-step-employees">
                    {step.employees.map((employee) => {
                      const character = getBrandCharacterForProfileKey(employee.key, locale);
                      const inner = <>{character && <BrandCharacterImage character={character} sizes="28px" />}<span>{character?.name ?? employee.shortName}</span></>;
                      return employee.href ? <Link href={employee.href} key={employee.key}>{inner}</Link> : <span key={employee.key}>{inner}</span>;
                    })}
                  </div>
                  <div className="process-control-note"><strong>{content.controlLabel}:</strong> {step.humanControl}</div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <section className="process-analysis-summary" aria-labelledby="process-summary-title">
        <div className="process-summary-heading">
          <p className="eyebrow">{content.summaryLabel}</p>
          <h3 id="process-summary-title">{process.label}</h3>
          <p>{bottlenecks.length ? `${bottlenecks.length} ${content.selectedBottlenecksLabel}` : content.noBottlenecksLabel}</p>
        </div>
        <div className="process-mode-summary" aria-label={content.summaryLabel}>
          <div className="mode-automated"><strong>{counts.automated}</strong><span>{content.automatedLabel}</span></div>
          <div className="mode-assisted"><strong>{counts.assisted}</strong><span>{content.assistedLabel}</span></div>
          <div className="mode-human"><strong>{counts.human}</strong><span>{content.humanLabel}</span></div>
        </div>
        <div className="process-summary-columns">
          <div>
            <h4>{content.employeesLabel}</h4>
            <div className="process-summary-chips brand-process-summary-chips">
              {process.employees.map((employee) => {
                const character = getBrandCharacterForProfileKey(employee.key, locale);
                const inner = <>{character && <BrandCharacterImage character={character} sizes="30px" />}<span>{character?.name ?? employee.shortName}</span></>;
                return employee.href ? <Link href={employee.href} key={employee.key}>{inner}</Link> : <span key={employee.key}>{inner}</span>;
              })}
            </div>
          </div>
          <div>
            <h4>{content.systemsLabel}</h4>
            <div className="process-summary-chips muted">
              {process.systems.map((system) => <span key={system}>{system}</span>)}
            </div>
          </div>
        </div>
        <div className="process-summary-actions">
          <a className="button" href={mailto}>{content.emailLabel}</a>
          <button type="button" className="button button-ghost" onClick={() => { setSelectedPains([]); setBottlenecks([]); }}>{content.resetLabel}</button>
        </div>
        <p className="process-privacy-note">{content.privacyNote}</p>
      </section>
    </div>
  );
}
