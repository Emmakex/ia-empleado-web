import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const es = JSON.parse(read("content/es.json"));
const en = JSON.parse(read("content/en.json"));
const comparisons = read("lib/comparison-content.ts");
const sectors = read("lib/sector-use-cases.ts");
const employees = read("lib/employee-catalog.ts");
const teams = read("lib/team-content-engine.ts");

// Home positioning must describe the same commercial scope in both locales.
assert(
  es.employees.title === "Cuatro perfiles de referencia para representar necesidades empresariales frecuentes.",
  "ES reference-suite title drifted into a broader claim",
);
assert(
  en.employees.title === "Four reference profiles illustrating common business needs.",
  "EN reference-suite title drifted into a broader claim",
);
assert(
  es.principles[3]?.text === "La arquitectura admite opciones de despliegue privado o dedicado adaptadas a cada empresa.",
  "ES private-deployment copy must remain an option rather than a universal promise",
);
assert(
  en.principles[3]?.text === "The architecture supports private or dedicated deployment options adapted to each company.",
  "EN private-deployment copy must remain an option rather than a universal promise",
);
assert(es.security.description.includes("opciones de despliegue privado"), "ES security copy lost scoped private-deployment language");
assert(en.security.description.includes("private-deployment options"), "EN security copy lost scoped private-deployment language");
assert(
  es.footer.legal === "IA Empleado es una metáfora de producto; no implica una relación laboral.",
  "ES product-metaphor disclaimer drifted",
);
assert(
  en.footer.legal === "IA Empleado is a product metaphor; it does not imply an employment relationship.",
  "EN product-metaphor disclaimer must use the IA Empleado brand consistently",
);

// Comparison pages must remain explanatory rather than claiming an absolute technical boundary.
for (const token of [
  "La diferencia aquí no es técnica absoluta",
  "The distinction here is not an absolute technical boundary",
  "chooseAlternativeWhen",
  "combineWhen",
]) {
  assert(comparisons.includes(token), `Comparison qualification contract missing token: ${token}`);
}

// Sector/use-case pages must keep explicit scope and non-guarantee language.
for (const token of [
  "sin prometer automatización universal",
  "without promising universal automation",
  "los ejemplos no son resultados garantizados",
  "examples are not guaranteed outcomes",
]) {
  assert(sectors.includes(token), `Sector/use-case qualification contract missing token: ${token}`);
}

// Employee detail pages must retain realistic boundaries in both languages.
for (const token of [
  'limitsTitle: "Lo que no debe prometerse"',
  'limitsTitle: "What should not be promised"',
  "No significa que todas las consultas puedan automatizarse al 100%.",
  "It does not mean every customer request can be automated 100%.",
]) {
  assert(employees.includes(token), `Employee claim-boundary contract missing token: ${token}`);
}

// Team pages must keep measurable outcomes separate from guaranteed results.
for (const token of [
  'limitsTitle: "Límites realistas"',
  'limitsTitle: "Realistic limits"',
  "No garantiza ventas, reuniones ni conversión.",
  "It does not guarantee sales, meetings or conversion.",
]) {
  assert(teams.includes(token), `Team claim-boundary contract missing token: ${token}`);
}

console.log("Phase 8H commercial parity OK: ES/EN scope, brand naming and qualification language remain aligned across home, comparisons, sectors, employees and teams.");
