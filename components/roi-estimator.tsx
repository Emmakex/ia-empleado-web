"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../lib/i18n";
import {
  calculateRoi,
  defaultRoiInputs,
  type CurrencyCode,
  type RoiEstimatorContent,
  type RoiInputs,
  type RoiScenarioKey,
} from "../lib/roi-estimator";

type RoiEstimatorProps = {
  locale: Locale;
  content: RoiEstimatorContent;
};

const currencies: CurrencyCode[] = ["EUR", "USD", "GBP"];

export function RoiEstimator({ locale, content }: RoiEstimatorProps) {
  const [inputs, setInputs] = useState<RoiInputs>(defaultRoiInputs);
  const result = useMemo(() => calculateRoi(inputs), [inputs]);
  const localeCode = locale === "es" ? "es-ES" : "en-US";
  const baseScenario = result.scenarios.find((scenario) => scenario.key === "base") ?? result.scenarios[0];

  const number = (value: number, maximumFractionDigits = 1) =>
    new Intl.NumberFormat(localeCode, { maximumFractionDigits }).format(value);

  const money = (value: number) =>
    new Intl.NumberFormat(localeCode, {
      style: "currency",
      currency: inputs.currency,
      maximumFractionDigits: 2,
    }).format(value);

  const scenarioLabel = (key: RoiScenarioKey) => {
    if (key === "conservative") return content.conservativeLabel;
    if (key === "high") return content.highLabel;
    return content.baseLabel;
  };

  const updateNumber = (field: keyof Omit<RoiInputs, "currency">, raw: string) => {
    const value = raw === "" ? 0 : Number(raw);
    setInputs((current) => ({ ...current, [field]: Number.isFinite(value) ? value : 0 }));
  };

  return (
    <div className="roi-calculator-shell brand-roi-calculator-shell">
      <div className="roi-input-panel">
        <div className="roi-panel-heading">
          <div>
            <p className="eyebrow">{content.calculatorEyebrow}</p>
            <h2>{content.calculatorTitle}</h2>
            <p>{content.calculatorDescription}</p>
          </div>
          <span className="roi-example-chip">{content.exampleNotice}</span>
        </div>

        <div className="roi-input-grid">
          <label className="roi-field">
            <span>{content.currencyLabel}</span>
            <select
              value={inputs.currency}
              onChange={(event) => setInputs((current) => ({ ...current, currency: event.target.value as CurrencyCode }))}
            >
              {currencies.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
            </select>
          </label>

          <label className="roi-field">
            <span>{content.monthlyVolumeLabel}</span>
            <input type="number" min="0" step="1" value={inputs.monthlyVolume} onChange={(event) => updateNumber("monthlyVolume", event.target.value)} />
            <small>{content.monthlyVolumeHelp}</small>
          </label>

          <label className="roi-field">
            <span>{content.minutesPerItemLabel}</span>
            <input type="number" min="0" step="0.1" value={inputs.minutesPerItem} onChange={(event) => updateNumber("minutesPerItem", event.target.value)} />
            <small>{content.minutesPerItemHelp}</small>
          </label>

          <label className="roi-field">
            <span>{content.hourlyCostLabel}</span>
            <input type="number" min="0" step="0.5" value={inputs.hourlyCost} onChange={(event) => updateNumber("hourlyCost", event.target.value)} />
            <small>{content.hourlyCostHelp}</small>
          </label>

          <label className="roi-field roi-field-wide">
            <span>{content.improvementLabel}</span>
            <div className="roi-range-row">
              <input
                className="roi-range"
                type="range"
                min="0"
                max="90"
                step="1"
                value={Math.min(90, Math.max(0, inputs.improvementPercent))}
                onChange={(event) => updateNumber("improvementPercent", event.target.value)}
                aria-label={content.improvementLabel}
              />
              <input
                className="roi-range-number"
                type="number"
                min="0"
                max="90"
                step="1"
                value={inputs.improvementPercent}
                onChange={(event) => updateNumber("improvementPercent", event.target.value)}
              />
              <strong>%</strong>
            </div>
            <small>{content.improvementHelp}</small>
          </label>

          <label className="roi-field">
            <span>{content.monthlyOperatingCostLabel}</span>
            <input type="number" min="0" step="10" value={inputs.monthlyOperatingCost} onChange={(event) => updateNumber("monthlyOperatingCost", event.target.value)} />
            <small>{content.monthlyOperatingCostHelp}</small>
          </label>

          <label className="roi-field">
            <span>{content.implementationCostLabel}</span>
            <input type="number" min="0" step="50" value={inputs.implementationCost} onChange={(event) => updateNumber("implementationCost", event.target.value)} />
            <small>{content.implementationCostHelp}</small>
          </label>
        </div>
      </div>

      <div className="roi-results-panel" aria-live="polite">
        <div className="roi-brand-value-path" aria-hidden="true">
          <div className="roi-brand-node">
            <span>01</span>
            <strong>{locale === "es" ? "Carga actual" : "Current workload"}</strong>
            <small>{number(result.baselineHoursMonthly)} h / {locale === "es" ? "mes" : "month"}</small>
          </div>
          <i>→</i>
          <div className="roi-brand-core">
            <img src="/branding/ia-empleado-mark.svg" alt="" width={52} height={52} />
            <strong>IA Empleado</strong>
            <span style={{ width: `${Math.min(90, Math.max(0, baseScenario?.improvementPercent ?? 0))}%` }} />
          </div>
          <i>→</i>
          <div className="roi-brand-node is-outcome">
            <span>02</span>
            <strong>{locale === "es" ? "Capacidad potencial" : "Potential capacity"}</strong>
            <small>{number(baseScenario?.savedHoursMonthly ?? 0)} h / {locale === "es" ? "mes" : "month"}</small>
          </div>
        </div>

        <div className="roi-baseline-card">
          <div>
            <p className="eyebrow">{content.baselineTitle}</p>
            <strong>{number(result.baselineHoursMonthly)} h</strong>
            <span>{content.baselineHoursLabel}</span>
          </div>
          <div>
            <strong>{money(result.baselineCostMonthly)}</strong>
            <span>{content.baselineCostLabel}</span>
          </div>
        </div>

        <div className="roi-scenarios-heading">
          <h3>{content.scenariosTitle}</h3>
          <p>{content.scenarioRule}</p>
        </div>

        <div className="roi-scenario-grid">
          {result.scenarios.map((scenario) => (
            <article className={`roi-scenario-card roi-scenario-${scenario.key}`} key={scenario.key}>
              <div className="roi-scenario-title-row">
                <h4>{scenarioLabel(scenario.key)}</h4>
                <span>{number(scenario.improvementPercent, 0)}%</span>
              </div>
              <div className="roi-brand-scenario-meter" aria-hidden="true"><span style={{ width: `${Math.min(100, Math.max(0, scenario.improvementPercent))}%` }} /></div>
              <dl>
                <div>
                  <dt>{content.timeFreedLabel}</dt>
                  <dd>{number(scenario.savedHoursMonthly)} h</dd>
                </div>
                <div>
                  <dt>{content.valueCapacityLabel}</dt>
                  <dd>{money(scenario.savedValueMonthly)}</dd>
                </div>
                <div>
                  <dt>{content.annualGrossLabel}</dt>
                  <dd>{money(scenario.annualGrossValue)}</dd>
                </div>
                <div>
                  <dt>{content.annualCostLabel}</dt>
                  <dd>{money(scenario.annualEstimatedCost)}</dd>
                </div>
                <div>
                  <dt>{content.annualNetLabel}</dt>
                  <dd>{money(scenario.annualNetValue)}</dd>
                </div>
                <div className="roi-result-highlight">
                  <dt>{content.roiLabel}</dt>
                  <dd>{scenario.roiPercent === null ? "—" : `${number(scenario.roiPercent)}%`}</dd>
                </div>
              </dl>
              {scenario.roiPercent === null ? <p className="roi-unavailable-note">{content.roiUnavailable}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
