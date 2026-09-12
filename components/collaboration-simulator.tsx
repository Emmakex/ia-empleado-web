"use client";

import { useEffect, useState } from "react";
import type { CollaborationPageContent, CollaborationScenario } from "../lib/collaboration-demo";
import type { Locale } from "../lib/i18n";
import { getBrandCharacterForActorLabel } from "../lib/brand-characters";

type CollaborationSimulatorProps = {
  locale: Locale;
  content: CollaborationPageContent;
  scenarios: CollaborationScenario[];
};

export function CollaborationSimulator({ locale, content, scenarios }: CollaborationSimulatorProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = scenarios[scenarioIndex] ?? scenarios[0];
  const stepCount = scenario?.steps.length ?? 0;
  const step = scenario?.steps[stepIndex] ?? scenario?.steps[0];

  useEffect(() => {
    if (!isPlaying || stepCount === 0) return;
    if (stepIndex >= stepCount - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, stepCount - 1));
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [isPlaying, stepCount, stepIndex]);

  if (!scenario || !step) return null;

  const kindLabels = {
    event: content.triggerLabel,
    employee: content.stepLabel,
    system: content.scenarioLabel,
    human: content.handoffLabel,
    result: content.outcomeLabel,
  };
  const kindLabel = kindLabels[step.kind];
  const progress = Math.round(((stepIndex + 1) / scenario.steps.length) * 100);
  const activeCharacter = getBrandCharacterForActorLabel(step.actor, locale);

  function selectScenario(index: number) {
    setScenarioIndex(index);
    setStepIndex(0);
    setIsPlaying(false);
  }

  function goPrevious() {
    setStepIndex((current) => Math.max(current - 1, 0));
    setIsPlaying(false);
  }

  function goNext() {
    setStepIndex((current) => Math.min(current + 1, scenario.steps.length - 1));
    setIsPlaying(false);
  }

  function reset() {
    setStepIndex(0);
    setIsPlaying(false);
  }

  return (
    <div className="collaboration-simulator brand-collaboration-simulator">
      <div className="collaboration-scenario-tabs" role="tablist" aria-label={content.scenarioLabel}>
        {scenarios.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={scenarioIndex === index}
            className={scenarioIndex === index ? "scenario-tab is-active" : "scenario-tab"}
            key={item.key}
            onClick={() => selectScenario(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="collaboration-stage">
        <div className="brand-simulator-state-strip" aria-hidden="true">
          <span className="brand-state is-done">{locale === "es" ? "Entrada" : "Input"}</span>
          <i>→</i>
          <span className={`brand-state${step.kind === "employee" ? " is-active" : ""}`}>{locale === "es" ? "Empleado IA" : "AI Employee"}</span>
          <i>→</i>
          <span className={`brand-state${step.kind === "system" ? " is-active" : ""}`}>{locale === "es" ? "Sistema" : "System"}</span>
          <i>→</i>
          <span className={`brand-state${step.kind === "human" ? " is-active" : ""}`}>{locale === "es" ? "Control humano" : "Human control"}</span>
          <i>→</i>
          <span className={`brand-state${step.kind === "result" ? " is-active" : ""}`}>{locale === "es" ? "Resultado" : "Outcome"}</span>
        </div>

        <div className="collaboration-stage-copy">
          <div className="collaboration-stage-kicker">
            <span className={`kind-dot kind-${step.kind}`} aria-hidden="true" />
            <span>{kindLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{content.stepLabel} {stepIndex + 1}/{scenario.steps.length}</span>
          </div>
          <h3>{scenario.title}</h3>
          <p className="collaboration-stage-summary">{scenario.summary}</p>

          <div className="collaboration-input-output">
            <div>
              <span>{content.triggerLabel}</span>
              <p>{scenario.trigger}</p>
            </div>
            <div>
              <span>{content.outcomeLabel}</span>
              <p>{scenario.outcome}</p>
            </div>
          </div>
        </div>

        <div className="collaboration-map brand-collaboration-map" aria-label={content.progressLabel}>
          <div className="collaboration-map-line" aria-hidden="true" />
          {scenario.steps.map((item, index) => {
            const isActive = index === stepIndex;
            const isComplete = index < stepIndex;
            const character = getBrandCharacterForActorLabel(item.actor, locale);
            return (
              <button
                type="button"
                key={`${scenario.key}-${index}`}
                className={`collaboration-node kind-${item.kind}${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}${character ? " has-character" : ""}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => {
                  setStepIndex(index);
                  setIsPlaying(false);
                }}
                title={item.actor}
              >
                {character ? <img src={character.asset} alt="" width={52} height={58} /> : <span className="collaboration-node-index">{index + 1}</span>}
                <span className="collaboration-node-actor">{character?.name ?? item.actor}</span>
              </button>
            );
          })}
        </div>

        <div className={`collaboration-step-card${activeCharacter ? " has-brand-character" : ""}`} aria-live="polite">
          {activeCharacter && (
            <div className="brand-active-character" data-accent={activeCharacter.accent} aria-hidden="true">
              <img src={activeCharacter.asset} alt="" width={122} height={144} />
              <div><strong>{activeCharacter.name}</strong><span>{activeCharacter.shortRole}</span></div>
            </div>
          )}
          <div className="collaboration-step-head">
            <div>
              <span className={`collaboration-kind-badge kind-${step.kind}`}>{kindLabel}</span>
              <p className="collaboration-step-actor">{step.actor}</p>
            </div>
            <span className="collaboration-step-number">{String(stepIndex + 1).padStart(2, "0")}</span>
          </div>
          <h4>{step.title}</h4>
          <p>{step.description}</p>
          <div className="collaboration-handoff">
            <span>{content.handoffLabel}</span>
            <strong>{step.handoff}</strong>
          </div>
        </div>

        <div className="collaboration-progress" aria-label={content.progressLabel}>
          <div className="collaboration-progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="collaboration-controls">
          <button type="button" className="simulator-button secondary" onClick={goPrevious} disabled={stepIndex === 0}>
            {content.previousLabel}
          </button>
          <button
            type="button"
            className="simulator-button primary"
            onClick={() => setIsPlaying((current) => !current)}
          >
            {isPlaying ? content.pauseLabel : content.playLabel}
          </button>
          <button type="button" className="simulator-button secondary" onClick={goNext} disabled={stepIndex === scenario.steps.length - 1}>
            {content.nextLabel}
          </button>
          <button type="button" className="simulator-button ghost" onClick={reset}>
            {content.resetLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
