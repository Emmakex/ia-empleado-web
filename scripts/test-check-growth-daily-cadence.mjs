import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./check-growth-daily-cadence.mjs", import.meta.url));
function git(cwd, ...args) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
}
function fixture() {
  const cwd = mkdtempSync(path.join(tmpdir(), "growth-cadence-"));
  git(cwd, "init", "-q");
  git(cwd, "config", "user.email", "qa@example.test");
  git(cwd, "config", "user.name", "Growth QA");
  mkdirSync(path.join(cwd, "content/growth/daily"), { recursive: true });
  writeFileSync(path.join(cwd, "README.md"), "baseline");
  git(cwd, "add", ".");
  git(cwd, "commit", "-qm", "baseline");
  return cwd;
}
function commit(cwd, filename, content, date) {
  writeFileSync(path.join(cwd, filename), content);
  git(cwd, "add", ".");
  const env = { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date };
  const result = spawnSync("git", ["commit", "-qm", "test update"], { cwd, encoding: "utf8", env });
  assert.equal(result.status, 0, result.stderr);
}
function check(cwd, day) {
  const result = spawnSync(process.execPath, [script], {
    cwd, encoding: "utf8", env: { ...process.env, GROWTH_PUBLICATION_AS_OF: day },
  });
  return { status: result.status, report: JSON.parse(result.stdout) };
}
const bilingual = JSON.stringify([{
  key: "fresh-article", slugs: { es: "articulo-nuevo", en: "new-article" },
  title: { es: "Artículo nuevo", en: "New article" },
}]);

test("counts one new bilingual article integrated today in Madrid", () => {
  const cwd = fixture();
  try {
    commit(cwd, "content/growth/daily/2026-11-19-demo.articles.json", bilingual, "2026-11-19T15:10:00+01:00");
    const result = check(cwd, "2026-11-19");
    assert.equal(result.status, 0);
    assert.equal(result.report.new_records, 1);
    assert.equal(result.report.status, "NEW_CONTENT_IN_MAIN");
  } finally { rmSync(cwd, { recursive: true, force: true }); }
});

test("rejects yesterday's publication even if the file remains in main", () => {
  const cwd = fixture();
  try {
    commit(cwd, "content/growth/daily/2026-11-18-demo.articles.json", bilingual, "2026-11-18T16:00:00+01:00");
    const result = check(cwd, "2026-11-19");
    assert.equal(result.status, 1);
    assert.equal(result.report.status, "NO_NEW_CONTENT_IN_MAIN");
  } finally { rmSync(cwd, { recursive: true, force: true }); }
});

test("rejects a same-day edit without a new editorial record", () => {
  const cwd = fixture();
  try {
    commit(cwd, "content/growth/daily/2026-11-18-demo.articles.json", bilingual, "2026-11-18T15:00:00+01:00");
    commit(cwd, "content/growth/daily/2026-11-18-demo.articles.json",
      bilingual.replace("New article", "New article updated"), "2026-11-19T15:00:00+01:00");
    const result = check(cwd, "2026-11-19");
    assert.equal(result.status, 1);
    assert.equal(result.report.new_records, 0);
  } finally { rmSync(cwd, { recursive: true, force: true }); }
});
