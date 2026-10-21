#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

const executor = path.resolve("scripts/apply-search-console-executable-patch.mjs");

function fixtureRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ia-empleado-seo-auto-"));
  fs.mkdirSync(path.join(root, ".kairoseth/search-console-auto"), { recursive: true });
  fs.mkdirSync(path.join(root, "content/growth"), { recursive: true });
  return root;
}

function writeFixture(root, operations, options = {}) {
  const targetFile = options.targetFile ?? "content/growth/landings.json";
  const executionPolicy = options.executionPolicy ?? "AUTO";
  fs.mkdirSync(path.dirname(path.join(root, targetFile)), { recursive: true });
  fs.writeFileSync(
    path.join(root, targetFile),
    `${JSON.stringify([
      {
        key: "invoice-automation",
        slugs: { es: "automatizacion-facturas", en: "invoice-automation" },
        seoDescription: { es: "Anterior", en: "Before" },
        lead: { es: "Texto", en: "Copy" },
        sections: [{ title: { es: "Uno", en: "One" }, paragraphs: { es: ["Uno"], en: ["One"] } }],
        publishedAt: "2026-09-17",
        updatedAt: "2026-09-17",
      },
    ], null, 2)}\n`,
  );
  const manifestPath = ".kairoseth/search-console-auto/SEO-20261020-ABCDEF12.json";
  const reviewEvidence = executionPolicy === "REVIEW"
    ? {
        reviewApproved: options.reviewApproved ?? true,
        reviewActor: options.reviewActor ?? "chatgpt:user-approved",
        reviewedAt: options.reviewedAt ?? "2026-10-20T19:45:00.000Z",
      }
    : {};
  fs.writeFileSync(
    path.join(root, manifestPath),
    `${JSON.stringify({
      schema: "kairoseth.search-console-executable-patch.v1",
      runId: "SEO-20261020-ABCDEF12",
      organizationId: "test-org",
      executionPolicy,
      ...reviewEvidence,
      targetRepository: "Emmakex/ia-empleado-web",
      targetOwnerUrl: "https://iaempleado.com/automatizacion-facturas",
      targetFile,
      ownerKey: "invoice-automation",
      preserveOwnerUrl: true,
      createNewUrl: false,
      operations,
    }, null, 2)}\n`,
  );
  return { targetFile, manifestPath };
}

{
  const root = fixtureRoot();
  const { targetFile, manifestPath } = writeFixture(root, [
    { op: "test", path: "/updatedAt", value: "2026-09-17" },
    { op: "replace", path: "/updatedAt", value: "2026-10-20" },
    { op: "replace", path: "/lead/es", value: "Texto mejorado" },
  ]);
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const [owner] = JSON.parse(fs.readFileSync(path.join(root, targetFile), "utf8"));
  assert.equal(owner.updatedAt, "2026-10-20");
  assert.equal(owner.lead.es, "Texto mejorado");
  assert.equal(owner.slugs.es, "automatizacion-facturas");
}

{
  const root = fixtureRoot();
  const dailyFile = "content/growth/daily/2026-10-10-day25-ai-sales-order-processing.landings.json";
  const editorial = {
    primaryKeyword: { es: "automatización de pedidos", en: "ai order processing automation" },
    supportingKeywords: {
      es: ["automatizacion de pedidos", "procesamiento de pedidos", "automatizar pedidos"],
      en: ["sales order processing automation", "order processing automation", "ai order processing"],
    },
    searchIntent: "commercial",
    cluster: "sales-order-automation",
    canonicalRole: "landing",
    conversionRole: "evaluation",
    researchBasis: ["Search Console + Semrush reviewed evidence."],
  };
  const { targetFile, manifestPath } = writeFixture(
    root,
    [
      { op: "test", path: "/updatedAt", value: "2026-09-17" },
      { op: "replace", path: "/updatedAt", value: "2026-10-20" },
      { op: "replace", path: "/seoDescription/en", value: "AI order processing for ERP with human review." },
      { op: "add", path: "/editorial", value: editorial },
    ],
    { targetFile: dailyFile, executionPolicy: "REVIEW" },
  );
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const [owner] = JSON.parse(fs.readFileSync(path.join(root, targetFile), "utf8"));
  assert.equal(owner.updatedAt, "2026-10-20");
  assert.match(owner.seoDescription.en, /AI order processing/);
  assert.equal(owner.editorial.primaryKeyword.en, "ai order processing automation");
  assert.equal(owner.editorial.canonicalRole, "landing");
  assert.equal(owner.slugs.en, "invoice-automation");
}

{
  const root = fixtureRoot();
  const { manifestPath } = writeFixture(
    root,
    [
      { op: "test", path: "/updatedAt", value: "2026-09-17" },
      { op: "replace", path: "/updatedAt", value: "2026-10-20" },
    ],
    { executionPolicy: "REVIEW", reviewApproved: false },
  );
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /reviewApproved=true/);
}

{
  const root = fixtureRoot();
  const { manifestPath } = writeFixture(root, [
    { op: "test", path: "/updatedAt", value: "2026-09-17" },
    { op: "replace", path: "/slugs/es", value: "url-nueva" },
  ]);
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /immutable owner field/);
}

{
  const root = fixtureRoot();
  const { manifestPath } = writeFixture(root, [
    { op: "test", path: "/updatedAt", value: "2026-09-17" },
    { op: "add", path: "/metrics/internalScore", value: 99 },
  ]);
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /outside the guarded mutable allowlist/);
}

{
  const root = fixtureRoot();
  const { manifestPath } = writeFixture(root, [
    { op: "test", path: "/updatedAt", value: "2025-01-01" },
    { op: "replace", path: "/updatedAt", value: "2026-10-20" },
  ]);
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /stale precondition/);
}

{
  const root = fixtureRoot();
  const { manifestPath } = writeFixture(
    root,
    [
      { op: "test", path: "/updatedAt", value: "2026-09-17" },
      { op: "replace", path: "/updatedAt", value: "2026-10-20" },
    ],
    { targetFile: "content/growth/daily/unscoped.json" },
  );
  const result = spawnSync(process.execPath, [executor, manifestPath], { cwd: root, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /dated daily/);
}

console.log("IA Empleado Search Console executable patch tests passed.");
