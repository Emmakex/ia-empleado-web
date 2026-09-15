import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const configPath = path.join(root, "config/lighthouse-launch.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const lighthouseBaseUrl = process.env.LIGHTHOUSE_BASE_URL ?? process.env.PRODUCTION_BASE_URL;
const baseUrlSource = process.env.LIGHTHOUSE_BASE_URL ? "LIGHTHOUSE_BASE_URL" : "PRODUCTION_BASE_URL";

if (!lighthouseBaseUrl) {
  throw new Error("LIGHTHOUSE_BASE_URL or PRODUCTION_BASE_URL is required for the Phase 8E Lighthouse launch gate");
}

if (typeof config.emulatedUserAgent !== "string" || !config.emulatedUserAgent.includes("Chrome/")) {
  throw new Error("LIGHTHOUSE_USER_AGENT_MISSING: config.emulatedUserAgent must be a normal Chrome browser user agent");
}

const samplesOnThresholdFailure = config.stability?.samplesOnThresholdFailure;
if (samplesOnThresholdFailure !== 3 || config.stability?.decision !== "median") {
  throw new Error("LIGHTHOUSE_STABILITY_CONFIG_INVALID: Phase 8E requires a median decision over 3 samples after an initial threshold miss");
}

const artifactDir = path.join(root, ".artifacts", "lighthouse");
fs.mkdirSync(artifactDir, { recursive: true });

const findChrome = () => {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  for (const candidate of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const result = spawnSync("which", [candidate], { encoding: "utf8" });
    const resolved = result.status === 0 ? result.stdout.trim() : "";
    if (resolved) return resolved;
  }
  throw new Error("LIGHTHOUSE_CHROME_MISSING: no supported Chrome/Chromium executable found in PATH");
};

const chromePath = findChrome();
const failures = [];
const summary = [];
const categories = Object.keys(config.categories);
const packageSpec = `${config.tool.package}@${config.tool.version}`;

const median = (values) => {
  const numeric = values.filter((value) => typeof value === "number" && Number.isFinite(value));
  if (numeric.length !== values.length || numeric.length === 0) return null;
  const sorted = [...numeric].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

const thresholdMisses = (scores) => Object.entries(config.categories)
  .filter(([category, minimum]) => typeof scores[category] !== "number" || scores[category] < minimum)
  .map(([category, minimum]) => ({ category, score: scores[category] ?? null, minimum }));

const reportMetrics = (report, route, url, sample) => ({
  route,
  url,
  sample,
  finalUrl: report.finalUrl,
  lighthouseVersion: report.lighthouseVersion,
  fetchTime: report.fetchTime,
  scores: Object.fromEntries(
    categories.map((category) => [category, report.categories?.[category]?.score ?? null]),
  ),
  audits: {
    firstContentfulPaintMs: report.audits?.["first-contentful-paint"]?.numericValue ?? null,
    largestContentfulPaintMs: report.audits?.["largest-contentful-paint"]?.numericValue ?? null,
    totalBlockingTimeMs: report.audits?.["total-blocking-time"]?.numericValue ?? null,
    cumulativeLayoutShift: report.audits?.["cumulative-layout-shift"]?.numericValue ?? null,
    speedIndexMs: report.audits?.["speed-index"]?.numericValue ?? null,
  },
});

const runSample = (route, url, slug, sample) => {
  const reportName = sample === 1 ? `${slug}.json` : `${slug}.sample-${sample}.json`;
  const reportPath = path.join(artifactDir, reportName);
  const args = [
    "--yes",
    packageSpec,
    url,
    "--quiet",
    `--chrome-path=${chromePath}`,
    "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage",
    `--emulatedUserAgent=${config.emulatedUserAgent}`,
    "--output=json",
    `--output-path=${reportPath}`,
    `--only-categories=${categories.join(",")}`,
  ];

  if (config.formFactor === "desktop") args.push("--preset=desktop");

  const result = spawnSync("npx", args, {
    cwd: root,
    env: process.env,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });

  if (result.status !== 0) {
    const diagnostic = {
      route,
      url,
      sample,
      exitCode: result.status,
      baseUrlSource,
      emulatedUserAgent: config.emulatedUserAgent,
      stdout: result.stdout?.slice(-4000) ?? "",
      stderr: result.stderr?.slice(-4000) ?? "",
    };
    console.error(`LIGHTHOUSE_EXECUTION_FAILURE ${JSON.stringify(diagnostic)}`);
    return { ok: false, diagnostic };
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const metrics = reportMetrics(report, route, url, sample);
  console.log(`PHASE8E_LIGHTHOUSE_SAMPLE ${JSON.stringify(metrics)}`);

  const misses = thresholdMisses(metrics.scores);
  if (misses.length) {
    console.log(`LIGHTHOUSE_SAMPLE_THRESHOLD_MISS ${JSON.stringify({ route, sample, misses })}`);
  }

  return { ok: true, metrics, misses };
};

console.log(`LIGHTHOUSE_RUN_CONTEXT ${JSON.stringify({
  chromePath,
  formFactor: config.formFactor,
  emulatedUserAgent: config.emulatedUserAgent,
  baseUrl: lighthouseBaseUrl,
  baseUrlSource,
  samplesOnThresholdFailure,
  stabilityDecision: config.stability.decision,
})}`);

for (const route of config.routes) {
  const url = new URL(route, lighthouseBaseUrl).toString();
  const slug = route === "/" ? "home-es" : route.replace(/^\//, "").replaceAll("/", "-") || "home";
  const samples = [];

  const first = runSample(route, url, slug, 1);
  if (!first.ok) {
    failures.push({ route, category: "execution", score: null, minimum: null, sample: 1 });
    summary.push({ route, url, decision: "execution-failure", samples });
    continue;
  }
  samples.push(first.metrics);

  if (first.misses.length) {
    console.log(`LIGHTHOUSE_STABILITY_RETRY ${JSON.stringify({
      route,
      samplesOnThresholdFailure,
      decision: config.stability.decision,
      initialMisses: first.misses,
    })}`);

    let retryExecutionFailed = false;
    for (let sample = 2; sample <= samplesOnThresholdFailure; sample += 1) {
      const retry = runSample(route, url, slug, sample);
      if (!retry.ok) {
        failures.push({ route, category: "execution", score: null, minimum: null, sample });
        retryExecutionFailed = true;
        break;
      }
      samples.push(retry.metrics);
    }

    if (retryExecutionFailed) {
      summary.push({ route, url, decision: "execution-failure", samples });
      continue;
    }
  }

  const usedMedian = samples.length === samplesOnThresholdFailure;
  const finalScores = Object.fromEntries(
    categories.map((category) => [category, median(samples.map((sample) => sample.scores[category]))]),
  );
  const auditKeys = Object.keys(samples[0].audits);
  const finalAudits = Object.fromEntries(
    auditKeys.map((audit) => [audit, median(samples.map((sample) => sample.audits[audit]))]),
  );

  const decision = usedMedian ? "median-of-3" : "single-sample";
  const finalMetrics = {
    route,
    url,
    finalUrl: samples[0].finalUrl,
    lighthouseVersion: samples[0].lighthouseVersion,
    decision,
    samples: samples.length,
    scores: finalScores,
    audits: finalAudits,
    sampleScores: samples.map((sample) => ({ sample: sample.sample, scores: sample.scores, audits: sample.audits })),
  };

  console.log(`PHASE8E_LIGHTHOUSE ${JSON.stringify(finalMetrics)}`);
  summary.push(finalMetrics);

  for (const miss of thresholdMisses(finalScores)) {
    const failure = { route, category: miss.category, score: miss.score, minimum: miss.minimum, decision, samples: samples.length };
    failures.push(failure);
    console.error(`LIGHTHOUSE_THRESHOLD_FAILURE ${JSON.stringify(failure)}`);
  }
}

fs.writeFileSync(
  path.join(artifactDir, "summary.json"),
  `${JSON.stringify({ config, lighthouseBaseUrl, baseUrlSource, chromePath, summary, failures }, null, 2)}\n`,
);

if (failures.length) {
  process.exitCode = 1;
} else {
  console.log(`Phase 8E Lighthouse launch gate OK: ${summary.length} routes satisfy all unchanged category thresholds; threshold misses are stabilized by an adaptive median-of-three decision.`);
}
