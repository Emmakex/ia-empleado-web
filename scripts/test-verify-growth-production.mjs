import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const verifier = fileURLToPath(new URL("./verify-growth-production.mjs", import.meta.url));

function exec(cwd, command, args) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

function writeJson(cwd, file, records) {
  const full = path.join(cwd, file);
  mkdirSync(path.dirname(full), { recursive: true });
  writeFileSync(full, JSON.stringify(records, null, 2));
}

function repoFixture() {
  const cwd = mkdtempSync(path.join(tmpdir(), "growth-release-"));
  for (const file of [
    "content/growth/landings.json",
    "content/growth/incremental-landings.json",
    "content/growth/articles.json",
    "content/growth/incremental-articles.json",
  ]) writeJson(cwd, file, []);
  writeJson(cwd, "content/growth/daily/2026-11-03-newer.landings.json", [
    { key: "newer", slugs: { es: "newer-es", en: "newer-en" },
      updatedAt: "2026-11-03", title: { es: "Page newer in ES", en: "Page newer in EN" } },
  ]);
  exec(cwd, "git", ["init", "-q"]);
  exec(cwd, "git", ["add", "."]);
  exec(cwd, "git", ["-c", "user.name=Release QA", "-c", "user.email=qa@example.test",
    "commit", "-qm", "baseline"]);
  return cwd;
}

test("verifies records from the release diff rather than newest content date", () => {
  const cwd = repoFixture();
  try {
    writeJson(cwd, "content/growth/daily/2026-10-31-backdated.landings.json", [
      { key: "backdated", slugs: { es: "compra-ia", en: "ai-procurement" },
        updatedAt: "2026-10-31", title: { es: "Purchase", en: "Procurement" } },
    ]);
    exec(cwd, "git", ["add", "."]);
    exec(cwd, "git", ["-c", "user.name=Release QA", "-c", "user.email=qa@example.test",
      "commit", "-qm", "publish backdated landing"]);
    const data = JSON.parse(exec(cwd, process.execPath, [verifier, "--list-targets"]));
    assert.equal(data.mode, "release-diff");
    assert.deepEqual(data.urls, [
      "https://iaempleado.com/compra-ia",
      "https://iaempleado.com/en/ai-procurement",
    ]);
    assert.equal(data.urls.some((url) => url.includes("newer")), false);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("explicitly labels the newest-date fallback without a release parent", () => {
  const cwd = repoFixture();
  try {
    const data = JSON.parse(exec(cwd, process.execPath, [verifier, "--list-targets"]));
    assert.equal(data.mode, "latest-fallback");
    assert.deepEqual(data.urls, [
      "https://iaempleado.com/newer-es",
      "https://iaempleado.com/en/newer-en",
    ]);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
