import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const es = JSON.parse(fs.readFileSync(path.join(root, "content/es.json"), "utf8"));
const en = JSON.parse(fs.readFileSync(path.join(root, "content/en.json"), "utf8"));
const errors = [];

function compareShape(left, right, trail = "root") {
  if (Array.isArray(left)) {
    if (!Array.isArray(right)) {
      errors.push(`${trail}: expected array in EN`);
      return;
    }
    if (left.length !== right.length) {
      errors.push(`${trail}: array length differs ES=${left.length} EN=${right.length}`);
      return;
    }
    left.forEach((value, index) => compareShape(value, right[index], `${trail}[${index}]`));
    return;
  }

  if (left && typeof left === "object") {
    if (!right || typeof right !== "object" || Array.isArray(right)) {
      errors.push(`${trail}: expected object in EN`);
      return;
    }
    const leftKeys = Object.keys(left).sort();
    const rightKeys = Object.keys(right).sort();
    const missingInEn = leftKeys.filter((key) => !rightKeys.includes(key));
    const missingInEs = rightKeys.filter((key) => !leftKeys.includes(key));
    for (const key of missingInEn) errors.push(`${trail}.${key}: missing in EN`);
    for (const key of missingInEs) errors.push(`${trail}.${key}: missing in ES`);
    for (const key of leftKeys.filter((key) => rightKeys.includes(key))) {
      compareShape(left[key], right[key], `${trail}.${key}`);
    }
    return;
  }

  if (typeof left !== typeof right) {
    errors.push(`${trail}: type differs ES=${typeof left} EN=${typeof right}`);
  }

  if (typeof left === "string" && left.trim().length === 0) errors.push(`${trail}: empty ES string`);
  if (typeof right === "string" && right.trim().length === 0) errors.push(`${trail}: empty EN string`);
}

compareShape(es, en);

if (errors.length) {
  console.error("[i18n] EN/ES parity failed");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("[i18n] EN/ES parity OK");
