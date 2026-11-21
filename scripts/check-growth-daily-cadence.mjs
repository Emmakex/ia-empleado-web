#!/usr/bin/env node
/**
 * Independent editorial cadence gate: a NEW bilingual Growth record was
 * integrated into main TODAY in Europe/Madrid. HTTP delivery is separate.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const timezone = "Europe/Madrid";
const asOf = process.env.GROWTH_PUBLICATION_AS_OF || new Date().toISOString();
const asOfDate = /^\d{4}-\d{2}-\d{2}$/.test(asOf) ? asOf + "T12:00:00Z" : asOf;
if (!Number.isFinite(Date.parse(asOfDate))) {
  throw new Error("GROWTH_PUBLICATION_AS_OF must be a valid ISO date/time");
}

function madridDay(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date(date));
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return [part("year"), part("month"), part("day")].join("-");
}

const today = madridDay(asOfDate);
const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).trim();
const matchingFile = (file) => /^content\/growth\/daily\/[^/]+\.(articles|landings)\.json$/.test(file);

function recordsAt(sha, file) {
  try {
    const records = JSON.parse(git("show", sha + ":" + file));
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

const entries = git("log", "--first-parent", "-n", "400", "--format=%H%x09%cI", "--", "content/growth/daily")
  .split("\n").filter(Boolean);
const additions = [];
let matchingCommits = 0;

for (const entry of entries) {
  const [sha, timestamp] = entry.split("\t");
  if (madridDay(timestamp) !== today) continue;
  matchingCommits++;
  const changes = git("diff", "--name-status", sha + "^1", sha, "--", "content/growth/daily");
  for (const line of changes.split("\n").filter(Boolean)) {
    const [status, file] = line.split("\t");
    if (!["A", "M"].includes(status) || !matchingFile(file)) continue;
    const oldKeys = new Set(status === "A" ? [] : recordsAt(sha + "^1", file).map((r) => r.key));
    for (const record of recordsAt(sha, file)) {
      if (!record?.key || oldKeys.has(record.key)) continue;
      if (!["es", "en"].every((locale) => typeof record.slugs?.[locale] === "string"
        && typeof record.title?.[locale] === "string" && record.title[locale].trim())) continue;
      additions.push({ sha, file, key: record.key, slugs: record.slugs });
    }
  }
}

const unique = [...new Map(additions.map((entry) => [entry.key, entry])).values()];
const ok = unique.length > 0;
const report = {
  day: today, timezone, status: ok ? "NEW_CONTENT_IN_MAIN" : "NO_NEW_CONTENT_IN_MAIN",
  new_records: unique.length, commits_checked_today: matchingCommits, records: unique,
};
console.log(JSON.stringify(report, null, 2));

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = unique.map(({ key, file, sha }) => "| " + key + " | " + file + " | " + sha.slice(0, 10) + " |").join("\n");
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    "\n### IA Empleado - publicación nueva " + today + " (" + timezone + ")\n" +
    "**" + report.status + "** · Nuevas piezas bilingües integradas: **" + unique.length + "**\n\n" +
    (rows ? "| Pieza | Archivo | Commit |\n|---|---|---|\n" + rows + "\n" :
      "No se integró ninguna pieza bilingüe nueva en main durante el día local.\n") +
    "\nEsto no certifica entrega HTTP: la validación de producción es independiente.\n");
}

if (!ok) process.exitCode = 1;
