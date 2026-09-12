import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { collaborationDemoPath } from "../lib/collaboration-demo";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { roiEstimatorPath } from "../lib/roi-estimator";

type BrandEvidencePanelProps = {
  locale: Locale;
};

export function BrandEvidencePanel({ locale }: BrandEvidencePanelProps) {
  const items = locale === "es"
    ? [
        {
          status: "DEMOSTRABLE",
          title: "Handoffs, sistemas y aprobación humana",
          text: "El simulador muestra cómo una solicitud pasa por Empleados IA, sistemas y puntos de control. Es una demostración de diseño y comportamiento visual, no una afirmación de runtime productivo.",
          href: collaborationDemoPath(locale),
          cta: "Ver simulador",
        },
        {
          status: "ANÁLISIS ORIENTATIVO",
          title: "Antes y después de un proceso",
          text: "El Process Analyzer separa pasos automatizables, asistidos y humanos para discutir arquitectura y prioridades. El resultado requiere discovery técnico antes de considerarse una propuesta real.",
          href: processAnalyzerPath(locale),
          cta: "Analizar proceso",
        },
        {
          status: "ESTIMACIÓN",
          title: "Capacidad y ROI con supuestos visibles",
          text: "La calculadora usa volumen, tiempo, coste y mejora esperada para construir escenarios. No presenta el resultado como ahorro garantizado ni como métrica medida.",
          href: roiEstimatorPath(locale),
          cta: "Calcular escenario",
        },
      ]
    : [
        {
          status: "DEMONSTRABLE",
          title: "Handoffs, systems and human approval",
          text: "The simulator shows how a request moves through AI Employees, systems and control points. It is a design and behavior demonstration, not a production-runtime claim.",
          href: collaborationDemoPath(locale),
          cta: "Open simulator",
        },
        {
          status: "INDICATIVE ANALYSIS",
          title: "Before and after a process",
          text: "Process Analyzer separates automatable, assisted and human steps for architecture and prioritization discussions. Technical discovery is required before treating the result as a real proposal.",
          href: processAnalyzerPath(locale),
          cta: "Analyze process",
        },
        {
          status: "ESTIMATE",
          title: "Capacity and ROI with visible assumptions",
          text: "The calculator uses volume, time, cost and expected improvement to build scenarios. It does not present the result as guaranteed savings or a measured metric.",
          href: roiEstimatorPath(locale),
          cta: "Calculate scenario",
        },
      ];

  return (
    <div className="brand-evidence-grid">
      {items.map((item) => (
        <article className="brand-evidence-card" key={item.title}>
          <span className="brand-evidence-status">{item.status}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <Link href={item.href}>{item.cta}<span aria-hidden="true">→</span></Link>
        </article>
      ))}
    </div>
  );
}
