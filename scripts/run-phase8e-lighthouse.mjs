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

console.log(`LIGHTHOUSE_RUN_CONTEXT ${JSON.stringify({ chromePath, formFactor: config.formFactor, emulatedUserAgent: config.emulatedUserAgent, baseUrl: lighthouseBaseUrl, baseUrlSource })}`);

for (const route of config.routes) {
  const url = new URL(route, lighthouseBaseUrl).toString();
  const slug = route === "/" ? "home-es" : route.replace(/^\//, "").replaceAll("/", "-") || "home";
  const reportPath = path.join(artifactDir, `${slug}.json`);
  const packageSpec = `${config.tool.package}@${config.tool.version}`;

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
      exitCode: result.status,
      baseUrlSource,
      emulatedUserAgent: config.emulatedUserAgent,
      stdout: result.stdout?.slice(-4000) ?? "",
      stderr: result.stderr?.slice(-4000) ?? "",
    };
    console.error(`LIGHTHOUSE_EXECUTION_FAILURE ${JSON.stringify(diagnostic)}`);
    failures.push({ route, category: "execution", score: null, minimum: null });
    continue;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const scores = Object.fromEntries(
    categories.map((category) => [category, report.categories?.[category]?.score ?? null]),
  );

  const metrics = {
    route,
    url,
    finalUrl: report.finalUrl,
    lighthouseVersion: report.lighthouseVersion,
    fetchTime: report.fetchTime,
    scores,
    audits: {
      firstContentfulPaintMs: report.audits?.["first-contentful-paint"]?.numericValue ?? null,
      largestContentfulPaintMs: report.audits?.["largest-contentful-paint"]?.numericValue ?? null,
      totalBlockingTimeMs: report.audits?.["total-blocking-time"]?.numericValue ?? null,
      cumulativeLayoutShift: report.audits?.["cumulative-layout-shift"]?.numericValue ?? null,
      speedIndexMs: report.audits?.["speed-index"]?.numericValue ?? null,
    },
  };

  console.log(`PHASE8E_LIGHTHOUSE ${JSON.stringify(metrics)}`);
  summary.push(metrics);

  for (const [category, minimum] of Object.entries(config.categories)) {
    const score = scores[category];
    if (typeof score !== "number" || score < minimum) {
      const failure = { route, category, score, minimum };
      failures.push(failure);
      console.error(`LIGHTHOUSE_THRESHOLD_FAILURE ${JSON.stringify(failure)}`);
    }
  }
}

fs.writeFileSync(
  path.join(artifactDir, "summary.json"),
  `${JSON.stringify({ config, lighthouseBaseUrl, baseUrlSource, chromePath, summary, failures }, null, 2)}\n`,
);

if (failures.length) {
  process.exitCode = 1;
} else {
  console.log(`Phase 8E Lighthouse launch gate OK: ${summary.length} routes satisfy all category thresholds.`);
}
