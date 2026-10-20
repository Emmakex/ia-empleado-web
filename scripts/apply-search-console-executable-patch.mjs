#!/usr/bin/env node

import fs from "node:fs";
import process from "node:process";
import { isDeepStrictEqual } from "node:util";

const SCHEMA = "kairoseth.search-console-executable-patch.v1";
const MANIFEST_PREFIX = ".kairoseth/search-console-auto/";
const CONTENT_PREFIX = "content/growth/";
const ALLOWED_FILES = new Set([
  "content/growth/landings.json",
  "content/growth/articles.json",
]);
const DAILY_OWNER_FILE_PATTERN =
  /^content\/growth\/daily\/\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.(landings|articles)\.json$/;
const MUTABLE_PREFIXES = [
  "/keywordVariants/",
  "/seoTitle/",
  "/seoDescription/",
  "/eyebrow/",
  "/title/",
  "/lead/",
  "/excerpt/",
  "/intro/",
  "/quickAnswer/",
  "/sections/",
  "/faq/",
  "/internalLinks/",
];
const MUTABLE_EXACT = new Set(["/updatedAt"]);
const IMMUTABLE_PREFIXES = [
  "/key",
  "/slugs",
  "/canonical",
  "/canonicalUrl",
  "/publishedAt",
  "/relatedArticleKey",
  "/relatedLandingKey",
];

function fail(message) {
  console.error(`Search Console executable patch rejected: ${message}`);
  process.exit(1);
}

function normalizeRepoPath(value, label) {
  if (typeof value !== "string" || !value.trim()) fail(`${label} is required`);
  const normalized = value.replaceAll("\\", "/").replace(/^\.\//, "");
  if (normalized.startsWith("/") || normalized.split("/").includes("..")) {
    fail(`${label} must stay inside the repository`);
  }
  return normalized;
}

function isAllowedTargetFile(targetFile) {
  return ALLOWED_FILES.has(targetFile) || DAILY_OWNER_FILE_PATTERN.test(targetFile);
}

function assertExecutionApproval(manifest) {
  if (manifest.executionPolicy === "AUTO") return;
  if (manifest.executionPolicy !== "REVIEW") {
    fail(`unsupported executionPolicy: ${String(manifest.executionPolicy)}`);
  }
  if (manifest.reviewApproved !== true) {
    fail("REVIEW manifests require explicit reviewApproved=true evidence");
  }
  if (typeof manifest.reviewActor !== "string" || !manifest.reviewActor.trim()) {
    fail("REVIEW manifests require reviewActor");
  }
  if (typeof manifest.reviewedAt !== "string" || Number.isNaN(Date.parse(manifest.reviewedAt))) {
    fail("REVIEW manifests require a valid reviewedAt timestamp");
  }
}

function decodePointerToken(token) {
  return token.replaceAll("~1", "/").replaceAll("~0", "~");
}

function pointerTokens(pointer) {
  if (typeof pointer !== "string" || !pointer.startsWith("/")) {
    fail(`invalid JSON pointer: ${String(pointer)}`);
  }
  return pointer.slice(1).split("/").map(decodePointerToken);
}

function readAt(root, pointer) {
  let current = root;
  for (const token of pointerTokens(pointer)) {
    if (Array.isArray(current)) {
      if (!/^\d+$/.test(token)) fail(`array pointer must use numeric index: ${pointer}`);
      const index = Number(token);
      if (index < 0 || index >= current.length) fail(`pointer does not exist: ${pointer}`);
      current = current[index];
      continue;
    }
    if (!current || typeof current !== "object" || !(token in current)) {
      fail(`pointer does not exist: ${pointer}`);
    }
    current = current[token];
  }
  return current;
}

function parentAt(root, pointer) {
  const tokens = pointerTokens(pointer);
  if (tokens.length === 0) fail("root replacement is not allowed");
  const finalToken = tokens.pop();
  let current = root;
  for (const token of tokens) {
    if (Array.isArray(current)) {
      if (!/^\d+$/.test(token)) fail(`array pointer must use numeric index: ${pointer}`);
      const index = Number(token);
      if (index < 0 || index >= current.length) fail(`pointer parent does not exist: ${pointer}`);
      current = current[index];
      continue;
    }
    if (!current || typeof current !== "object" || !(token in current)) {
      fail(`pointer parent does not exist: ${pointer}`);
    }
    current = current[token];
  }
  return { parent: current, token: finalToken };
}

function assertMutable(pointer) {
  if (IMMUTABLE_PREFIXES.some((prefix) => pointer === prefix || pointer.startsWith(`${prefix}/`))) {
    fail(`immutable owner field cannot be changed: ${pointer}`);
  }
  if (!MUTABLE_EXACT.has(pointer) && !MUTABLE_PREFIXES.some((prefix) => pointer.startsWith(prefix))) {
    fail(`path is outside the guarded mutable allowlist: ${pointer}`);
  }
}

function applyMutation(root, operation) {
  assertMutable(operation.path);
  const { parent, token } = parentAt(root, operation.path);
  if (operation.op === "replace") {
    if (Array.isArray(parent)) {
      if (!/^\d+$/.test(token)) fail(`replace requires numeric array index: ${operation.path}`);
      const index = Number(token);
      if (index < 0 || index >= parent.length) fail(`replace target does not exist: ${operation.path}`);
      parent[index] = operation.value;
      return;
    }
    if (!parent || typeof parent !== "object" || !(token in parent)) {
      fail(`replace target does not exist: ${operation.path}`);
    }
    parent[token] = operation.value;
    return;
  }
  if (operation.op === "add") {
    if (Array.isArray(parent)) {
      if (token === "-") {
        parent.push(operation.value);
        return;
      }
      if (!/^\d+$/.test(token)) fail(`add requires numeric array index or '-': ${operation.path}`);
      const index = Number(token);
      if (index < 0 || index > parent.length) fail(`add index is out of range: ${operation.path}`);
      parent.splice(index, 0, operation.value);
      return;
    }
    if (!parent || typeof parent !== "object") fail(`add parent is not an object: ${operation.path}`);
    parent[token] = operation.value;
    return;
  }
  fail(`unsupported mutation operation: ${String(operation.op)}`);
}

const manifestArgument = process.argv[2];
if (!manifestArgument) fail("usage: node scripts/apply-search-console-executable-patch.mjs <manifest.json>");
const manifestPath = normalizeRepoPath(manifestArgument, "manifest path");
if (!manifestPath.startsWith(MANIFEST_PREFIX) || !manifestPath.endsWith(".json")) {
  fail(`manifest must live under ${MANIFEST_PREFIX}`);
}
if (!fs.existsSync(manifestPath)) fail(`manifest not found: ${manifestPath}`);

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (error) {
  fail(`manifest is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}

if (manifest.schema !== SCHEMA) fail(`unsupported schema: ${String(manifest.schema)}`);
assertExecutionApproval(manifest);
if (manifest.preserveOwnerUrl !== true || manifest.createNewUrl !== false) {
  fail("executable manifest must preserve the owner URL and forbid new URL creation");
}
if (manifest.targetRepository !== "Emmakex/ia-empleado-web") {
  fail("manifest targetRepository must be Emmakex/ia-empleado-web");
}
if (typeof manifest.runId !== "string" || !/^SEO-\d{8}-[A-F0-9]{8}$/.test(manifest.runId)) {
  fail("runId must use the persisted SEO_RUN identifier format");
}
if (typeof manifest.ownerKey !== "string" || !manifest.ownerKey) fail("ownerKey is required");
if (!Array.isArray(manifest.operations) || manifest.operations.length < 2) {
  fail("operations must include stale-data tests and at least one mutation");
}

const targetFile = normalizeRepoPath(manifest.targetFile, "targetFile");
if (!targetFile.startsWith(CONTENT_PREFIX) || !targetFile.endsWith(".json") || !isAllowedTargetFile(targetFile)) {
  fail("targetFile must be a canonical Growth owner file or a dated daily .landings/.articles owner file");
}
if (!fs.existsSync(targetFile)) fail(`target file not found: ${targetFile}`);

let document;
try {
  document = JSON.parse(fs.readFileSync(targetFile, "utf8"));
} catch (error) {
  fail(`target file is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}
if (!Array.isArray(document)) fail("target Growth file must contain an array of owners");

const matches = document.filter((entry) => entry && typeof entry === "object" && entry.key === manifest.ownerKey);
if (matches.length !== 1) fail(`ownerKey must resolve exactly once; found ${matches.length}`);
const owner = matches[0];
const ownerCountBefore = document.length;
const immutableBefore = {
  key: owner.key,
  slugs: structuredClone(owner.slugs ?? null),
  publishedAt: owner.publishedAt ?? null,
  relatedArticleKey: owner.relatedArticleKey ?? null,
  relatedLandingKey: owner.relatedLandingKey ?? null,
};

let testCount = 0;
let mutationCount = 0;
for (const operation of manifest.operations) {
  if (!operation || typeof operation !== "object") fail("every operation must be an object");
  if (operation.op === "test") {
    const actual = readAt(owner, operation.path);
    if (!isDeepStrictEqual(actual, operation.value)) fail(`stale precondition at ${operation.path}`);
    testCount += 1;
    continue;
  }
  if (operation.op !== "replace" && operation.op !== "add") {
    fail(`unsupported operation: ${String(operation.op)}`);
  }
  applyMutation(owner, operation);
  mutationCount += 1;
}

if (testCount === 0) fail("at least one test operation is required to prevent stale writes");
if (mutationCount === 0) fail("at least one mutation operation is required");
if (document.length !== ownerCountBefore) fail("guarded execution may not add or remove intent owners");
for (const [field, value] of Object.entries(immutableBefore)) {
  if (!isDeepStrictEqual(owner[field] ?? null, value)) fail(`${field} changed unexpectedly`);
}

fs.writeFileSync(targetFile, `${JSON.stringify(document, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  ok: true,
  schema: SCHEMA,
  runId: manifest.runId,
  executionPolicy: manifest.executionPolicy,
  reviewApproved: manifest.executionPolicy === "REVIEW" ? true : null,
  targetFile,
  ownerKey: manifest.ownerKey,
  operations: mutationCount,
  tests: testCount,
}));
