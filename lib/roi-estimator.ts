import type { Locale } from "./i18n";

export type CurrencyCode = "EUR" | "USD" | "GBP";

export type RoiInputs = {
  monthlyVolume: number;
  minutesPerItem: number;
  hourlyCost: number;
  improvementPercent: number;
  monthlyOperatingCost: number;
  implementationCost: number;
  currency: CurrencyCode;
};

export type RoiScenarioKey = "conservative" | "base" | "high";

export type RoiScenario = {
  key: RoiScenarioKey;
  improvementPercent: number;
  savedHoursMonthly: number;
  savedValueMonthly: number;
  annualGrossValue: number;
  annualEstimatedCost: number;
  annualNetValue: number;
  roiPercent: number | null;
};

export type RoiCalculation = {
  baselineHoursMonthly: number;
  baselineCostMonthly: number;
  scenarios: RoiScenario[];
};

export type RoiEstimatorContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroNote: string;
  calculatorEyebrow: string;
  calculatorTitle: string;
  calculatorDescription: string;
  exampleNotice: string;
  currencyLabel: string;
  monthlyVolumeLabel: string;
  monthlyVolumeHelp: string;
  minutesPerItemLabel: string;
  minutesPerItemHelp: string;
  hourlyCostLabel: string;
  hourlyCostHelp: string;
  improvementLabel: string;
  improvementHelp: string;
  monthlyOperatingCostLabel: string;
  monthlyOperatingCostHelp: string;
  implementationCostLabel: string;
  implementationCostHelp: string;
  baselineTitle: string;
  baselineHoursLabel: string;
  baselineCostLabel: string;
  scenariosTitle: string;
  conservativeLabel: string;
  baseLabel: string;
  highLabel: string;
  timeFreedLabel: string;
  valueCapacityLabel: string;
  annualGrossLabel: string;
  annualCostLabel: string;
  annualNetLabel: string;
  roiLabel: string;
  roiUnavailable: string;
  scenarioRule: string;
  methodologyEyebrow: string;
  methodologyTitle: string;
  methodologyIntro: string;
  methodologyItems: Array<{ title: string; text: string }>;
  formulaTitle: string;
  formulaItems: Array<{ label: string; formula: string; explanation: string }>;
  exampleEyebrow: string;
  exampleTitle: string;
  exampleIntro: string;
  exampleItems: Array<{ label: string; value: string }>;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const pageContent: Record<Locale, RoiEstimatorContent> = {
  es: {
    seoTitle: "Calculadora ROI de IA | Estima valor potencial con IA Empleado",
    seoDescription: "Estima horas liberadas, capacidad económica y ROI potencial con escenarios transparentes basados en tus propios datos y supuestos editables.",
    eyebrow: "VALOR Y ROI · IA EMPLEADO",
    heroTitle: "Calcula el potencial con tus datos, no con promesas prefabricadas.",
    heroDescription: "Introduce volumen, tiempo manual, coste/hora y una hipótesis de reducción de tiempo. La calculadora muestra escenarios conservador, base y alto sin presentar ninguna estimación como ahorro garantizado.",
    heroNote: "Herramienta educativa. Los resultados dependen completamente de los datos y supuestos que introduzcas. No sustituyen una medición real ni una propuesta económica.",
    calculatorEyebrow: "CALCULADORA TRANSPARENTE",
    calculatorTitle: "Modela tiempo, capacidad y retorno potencial",
    calculatorDescription: "Los valores iniciales son un ejemplo editable para explicar la fórmula. Sustitúyelos por datos de tu proceso antes de interpretar cualquier resultado.",
    exampleNotice: "Ejemplo editable · no es una promesa de rendimiento",
    currencyLabel: "Moneda",
    monthlyVolumeLabel: "Volumen mensual",
    monthlyVolumeHelp: "Número de tareas, casos o transacciones similares al mes.",
    minutesPerItemLabel: "Minutos manuales por unidad",
    minutesPerItemHelp: "Tiempo humano medio actual dedicado a cada unidad del proceso.",
    hourlyCostLabel: "Coste humano por hora",
    hourlyCostHelp: "Coste horario que quieras usar para valorar capacidad. Puede ser coste interno completo o una referencia operativa.",
    improvementLabel: "Hipótesis base de reducción de tiempo manual",
    improvementHelp: "No es una predicción. Define el supuesto que quieres probar. Los escenarios usan -10, base y +10 puntos porcentuales.",
    monthlyOperatingCostLabel: "Coste operativo mensual estimado de la solución",
    monthlyOperatingCostHelp: "Opcional. Incluye solo una estimación que puedas justificar; si lo dejas en 0, no calculamos ROI porcentual.",
    implementationCostLabel: "Coste inicial de implantación estimado",
    implementationCostHelp: "Opcional. Se suma al coste operativo del primer año para calcular ROI anual.",
    baselineTitle: "Línea base actual",
    baselineHoursLabel: "Horas manuales / mes",
    baselineCostLabel: "Capacidad económica / mes",
    scenariosTitle: "Escenarios de reducción de tiempo",
    conservativeLabel: "Conservador",
    baseLabel: "Base",
    highLabel: "Alto",
    timeFreedLabel: "Horas potencialmente liberadas / mes",
    valueCapacityLabel: "Capacidad económica potencial / mes",
    annualGrossLabel: "Valor bruto potencial / año",
    annualCostLabel: "Coste estimado de solución / primer año",
    annualNetLabel: "Valor neto potencial / primer año",
    roiLabel: "ROI potencial / primer año",
    roiUnavailable: "Añade costes de solución para calcular ROI porcentual",
    scenarioRule: "Escenarios = hipótesis base -10 pp · base · base +10 pp (limitados entre 0% y 90%).",
    methodologyEyebrow: "METODOLOGÍA",
    methodologyTitle: "Qué calcula y qué no calcula esta herramienta",
    methodologyIntro: "Separamos explícitamente datos introducidos, supuestos y resultados derivados para que el visitante pueda auditar la estimación.",
    methodologyItems: [
      { title: "Datos del proceso", text: "Volumen, minutos por unidad y coste/hora proceden del usuario. La web no los infiere ni los presenta como benchmarks." },
      { title: "Hipótesis de mejora", text: "El porcentaje de reducción de tiempo manual es un supuesto editable. Los escenarios solo aplican una banda transparente de ±10 puntos porcentuales." },
      { title: "Capacidad, no ahorro garantizado", text: "Horas liberadas multiplicadas por coste/hora expresan capacidad económica potencial. Convertirla en ahorro real depende de reasignación, demanda, calidad y adopción." },
      { title: "ROI solo con coste", text: "El ROI porcentual aparece únicamente cuando el usuario introduce costes de implantación u operación. Sin inversión estimada no existe un denominador válido para ROI." },
      { title: "Validación posterior", text: "Una decisión real debe contrastar tiempos medidos, excepciones, calidad, coste de integraciones, supervisión humana y coste total de operación." },
    ],
    formulaTitle: "Fórmulas visibles",
    formulaItems: [
      { label: "Horas base / mes", formula: "volumen × minutos ÷ 60", explanation: "Convierte el trabajo manual mensual actual a horas." },
      { label: "Horas liberadas", formula: "horas base × % reducción", explanation: "Aplica el supuesto del escenario al tiempo manual actual." },
      { label: "Capacidad económica", formula: "horas liberadas × coste/hora", explanation: "Valora el tiempo potencialmente recuperado con el coste horario elegido." },
      { label: "ROI primer año", formula: "((valor bruto anual − coste anual estimado) ÷ coste anual estimado) × 100", explanation: "Solo se calcula cuando existe un coste de solución mayor que cero." },
    ],
    exampleEyebrow: "EJEMPLO SINTÉTICO",
    exampleTitle: "Cómo leer una estimación sin confundirla con un resultado real",
    exampleIntro: "Este ejemplo solo ilustra la matemática de la herramienta. No representa un cliente, sector ni benchmark de IA Empleado.",
    exampleItems: [
      { label: "Entrada", value: "500 tareas/mes · 8 min/tarea · 25 €/h" },
      { label: "Línea base", value: "66,7 h manuales/mes · 1.666,67 € de capacidad" },
      { label: "Hipótesis base", value: "30% menos tiempo manual" },
      { label: "Resultado derivado", value: "20 h potencialmente liberadas/mes · 500 € de capacidad potencial/mes" },
    ],
    faqTitle: "Preguntas frecuentes sobre la calculadora ROI",
    faq: [
      { question: "¿La calculadora predice cuánto ahorraré?", answer: "No. Calcula el resultado matemático de tus propios datos y de una hipótesis de reducción de tiempo. El ahorro real solo puede medirse después de una implantación validada." },
      { question: "¿Por qué habla de capacidad económica y no siempre de ahorro?", answer: "Porque liberar horas no significa automáticamente reducir gasto. Ese tiempo puede reasignarse, absorber crecimiento o mejorar servicio. Llamarlo capacidad evita convertir una estimación operativa en una promesa financiera." },
      { question: "¿Cómo se calcula el ROI?", answer: "Solo si introduces costes de solución. Se compara el valor bruto anual potencial con el coste estimado del primer año, incluyendo implantación y operación mensual." },
      { question: "¿Los escenarios conservador, base y alto son benchmarks?", answer: "No. Son una banda matemática alrededor de la hipótesis que introduces: diez puntos porcentuales menos, el valor base y diez puntos más, siempre entre 0% y 90%." },
      { question: "¿Se guardan mis datos?", answer: "No en esta versión. Todo el cálculo ocurre localmente en el navegador y no se envía a un backend." },
    ],
  },
  en: {
    seoTitle: "AI ROI Calculator | Estimate potential value with IA Empleado",
    seoDescription: "Estimate time capacity, economic capacity and potential ROI through transparent scenarios based on your own data and editable assumptions.",
    eyebrow: "VALUE AND ROI · IA EMPLEADO",
    heroTitle: "Estimate potential with your data, not with pre-packaged promises.",
    heroDescription: "Enter volume, current manual time, hourly cost and a manual-time reduction assumption. The calculator shows conservative, base and high scenarios without presenting any estimate as guaranteed savings.",
    heroNote: "Educational tool. Results depend entirely on the data and assumptions you enter. They are not a substitute for real measurement or a commercial proposal.",
    calculatorEyebrow: "TRANSPARENT CALCULATOR",
    calculatorTitle: "Model time, economic capacity and potential return",
    calculatorDescription: "The initial values are an editable example used to explain the formula. Replace them with your process data before interpreting any result.",
    exampleNotice: "Editable example · not a performance promise",
    currencyLabel: "Currency",
    monthlyVolumeLabel: "Monthly volume",
    monthlyVolumeHelp: "Number of similar tasks, cases or transactions per month.",
    minutesPerItemLabel: "Manual minutes per unit",
    minutesPerItemHelp: "Average current human time spent on each unit of the process.",
    hourlyCostLabel: "Human hourly cost",
    hourlyCostHelp: "The hourly cost you want to use to value capacity. It can be fully loaded internal cost or another operational reference.",
    improvementLabel: "Base manual-time reduction assumption",
    improvementHelp: "This is not a prediction. Set the assumption you want to test. Scenarios use -10, base and +10 percentage points.",
    monthlyOperatingCostLabel: "Estimated monthly solution operating cost",
    monthlyOperatingCostHelp: "Optional. Add only an estimate you can justify; if left at 0, percentage ROI is not calculated.",
    implementationCostLabel: "Estimated initial implementation cost",
    implementationCostHelp: "Optional. Added to first-year operating cost for annual ROI calculation.",
    baselineTitle: "Current baseline",
    baselineHoursLabel: "Manual hours / month",
    baselineCostLabel: "Economic capacity / month",
    scenariosTitle: "Manual-time reduction scenarios",
    conservativeLabel: "Conservative",
    baseLabel: "Base",
    highLabel: "High",
    timeFreedLabel: "Potential hours freed / month",
    valueCapacityLabel: "Potential economic capacity / month",
    annualGrossLabel: "Potential gross value / year",
    annualCostLabel: "Estimated solution cost / first year",
    annualNetLabel: "Potential net value / first year",
    roiLabel: "Potential ROI / first year",
    roiUnavailable: "Add solution costs to calculate percentage ROI",
    scenarioRule: "Scenarios = base assumption -10 pp · base · base +10 pp (capped between 0% and 90%).",
    methodologyEyebrow: "METHODOLOGY",
    methodologyTitle: "What this tool calculates — and what it does not",
    methodologyIntro: "User inputs, assumptions and derived outputs are kept explicit so the estimate can be audited.",
    methodologyItems: [
      { title: "Process data", text: "Volume, minutes per unit and hourly cost come from the user. The website does not infer them or present them as benchmarks." },
      { title: "Improvement assumption", text: "The manual-time reduction percentage is editable. Scenarios only apply a transparent ±10 percentage-point band around that assumption." },
      { title: "Capacity, not guaranteed savings", text: "Freed hours multiplied by hourly cost represent potential economic capacity. Turning that into realized savings depends on redeployment, demand, quality and adoption." },
      { title: "ROI requires cost", text: "Percentage ROI appears only after the user enters implementation or operating costs. Without an investment estimate there is no valid ROI denominator." },
      { title: "Validate afterwards", text: "Real decisions should use measured time, exceptions, quality, integration cost, human oversight and total operating cost." },
    ],
    formulaTitle: "Visible formulas",
    formulaItems: [
      { label: "Baseline hours / month", formula: "volume × minutes ÷ 60", explanation: "Converts current monthly manual work into hours." },
      { label: "Hours freed", formula: "baseline hours × reduction %", explanation: "Applies the scenario assumption to current manual time." },
      { label: "Economic capacity", formula: "hours freed × hourly cost", explanation: "Values potentially recovered time using the selected hourly cost." },
      { label: "First-year ROI", formula: "((annual gross value − estimated annual cost) ÷ estimated annual cost) × 100", explanation: "Calculated only when solution cost is greater than zero." },
    ],
    exampleEyebrow: "SYNTHETIC EXAMPLE",
    exampleTitle: "How to read an estimate without treating it as a real result",
    exampleIntro: "This example only illustrates the calculator mathematics. It is not a customer result, sector benchmark or IA Empleado benchmark.",
    exampleItems: [
      { label: "Input", value: "500 tasks/month · 8 min/task · €25/h" },
      { label: "Baseline", value: "66.7 manual h/month · €1,666.67 capacity" },
      { label: "Base assumption", value: "30% less manual time" },
      { label: "Derived output", value: "20 potentially freed h/month · €500 potential capacity/month" },
    ],
    faqTitle: "ROI calculator frequently asked questions",
    faq: [
      { question: "Does the calculator predict how much I will save?", answer: "No. It calculates the mathematical result of your own inputs and a manual-time reduction assumption. Real savings can only be measured after a validated implementation." },
      { question: "Why does it use economic capacity instead of always saying savings?", answer: "Because freeing hours does not automatically reduce spending. The time may be redeployed, absorb growth or improve service. Calling it capacity avoids turning an operational estimate into a financial promise." },
      { question: "How is ROI calculated?", answer: "Only when solution costs are entered. Potential annual gross value is compared with estimated first-year cost, including implementation and monthly operation." },
      { question: "Are conservative, base and high scenarios benchmarks?", answer: "No. They are a mathematical band around your chosen assumption: ten percentage points lower, the base value and ten points higher, always capped between 0% and 90%." },
      { question: "Are my data stored?", answer: "Not in this version. All calculation happens locally in the browser and is not sent to a backend." },
    ],
  },
};

export const defaultRoiInputs: RoiInputs = {
  monthlyVolume: 500,
  minutesPerItem: 8,
  hourlyCost: 25,
  improvementPercent: 30,
  monthlyOperatingCost: 0,
  implementationCost: 0,
  currency: "EUR",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : 0));
}

export function calculateRoi(inputs: RoiInputs): RoiCalculation {
  const monthlyVolume = Math.max(0, inputs.monthlyVolume || 0);
  const minutesPerItem = Math.max(0, inputs.minutesPerItem || 0);
  const hourlyCost = Math.max(0, inputs.hourlyCost || 0);
  const monthlyOperatingCost = Math.max(0, inputs.monthlyOperatingCost || 0);
  const implementationCost = Math.max(0, inputs.implementationCost || 0);
  const base = clamp(inputs.improvementPercent, 0, 90);
  const baselineHoursMonthly = (monthlyVolume * minutesPerItem) / 60;
  const baselineCostMonthly = baselineHoursMonthly * hourlyCost;
  const annualEstimatedCost = monthlyOperatingCost * 12 + implementationCost;
  const scenarioRates: Array<{ key: RoiScenarioKey; value: number }> = [
    { key: "conservative", value: clamp(base - 10, 0, 90) },
    { key: "base", value: base },
    { key: "high", value: clamp(base + 10, 0, 90) },
  ];

  const scenarios = scenarioRates.map(({ key, value }) => {
    const savedHoursMonthly = baselineHoursMonthly * (value / 100);
    const savedValueMonthly = savedHoursMonthly * hourlyCost;
    const annualGrossValue = savedValueMonthly * 12;
    const annualNetValue = annualGrossValue - annualEstimatedCost;
    const roiPercent = annualEstimatedCost > 0 ? (annualNetValue / annualEstimatedCost) * 100 : null;
    return {
      key,
      improvementPercent: value,
      savedHoursMonthly,
      savedValueMonthly,
      annualGrossValue,
      annualEstimatedCost,
      annualNetValue,
      roiPercent,
    };
  });

  return { baselineHoursMonthly, baselineCostMonthly, scenarios };
}

export function getRoiEstimatorPageContent(locale: Locale) {
  return pageContent[locale];
}

export function roiEstimatorPath(locale: Locale) {
  return locale === "es" ? "/calculadora-roi" : "/en/roi-calculator";
}
