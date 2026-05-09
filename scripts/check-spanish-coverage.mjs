import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const appPath = path.resolve("src/App.jsx");
const source = fs.readFileSync(appPath, "utf8");

function decodeStringLiteral(rawValue) {
  return JSON.parse(`"${rawValue}"`);
}

function findBalancedBlock(startIndex) {
  const opener = source[startIndex];
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        inString = false;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      inString = true;
      quote = character;
      continue;
    }

    if (character === opener) {
      depth += 1;
    } else if (character === closer) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  throw new Error(`Unable to find balanced block starting at ${startIndex}`);
}

function getConstBlock(name) {
  const match = new RegExp(`const\\s+${name}\\s*=\\s*([\\[{])`).exec(source);

  if (!match) {
    throw new Error(`Unable to find const ${name}`);
  }

  return findBalancedBlock(match.index + match[0].length - 1);
}

function collectQuotedValues(text, pattern, target) {
  for (const match of text.matchAll(pattern)) {
    target.add(decodeStringLiteral(match[1]));
  }
}

function getSpanishCopyKeys() {
  const block = getConstBlock("spanishCopy");
  const keys = new Set();

  collectQuotedValues(block, /"((?:\\.|[^"\\])*)"\s*:/g, keys);

  for (const match of block.matchAll(/(?:^|[,{]\s*)([A-Za-z_$][\w$]*)\s*:/g)) {
    keys.add(match[1]);
  }

  return keys;
}

function getRequiredSpanishKeys() {
  const required = new Set();

  collectQuotedValues(source, /\bt\(\s*"((?:\\.|[^"\\])*)"/g, required);
  collectQuotedValues(source, /set(?:AdminStatus|FormMessage)\(\s*"((?:\\.|[^"\\])*)"\s*\)/g, required);

  collectQuotedValues(getConstBlock("navItems"), /\[\s*"((?:\\.|[^"\\])*)"\s*,/g, required);
  collectQuotedValues(getConstBlock("reviews"), /"((?:\\.|[^"\\])*)"/g, required);
  collectQuotedValues(getConstBlock("cateringEventTypes"), /"((?:\\.|[^"\\])*)"/g, required);

  for (const blockName of ["seoPages", "offers", "googleReviewCards", "localSearchCards", "cateringPackages"]) {
    collectQuotedValues(
      getConstBlock(blockName),
      /\b(?:title|description|eyebrow|copy|action|meta|quote|tag|detail):\s*"((?:\\.|[^"\\])*)"/g,
      required,
    );
  }

  return [...required].filter((value) => value && !value.startsWith("/") && !value.startsWith("#"));
}

const spanishKeys = getSpanishCopyKeys();
const missingKeys = getRequiredSpanishKeys()
  .filter((value) => !spanishKeys.has(value))
  .sort((left, right) => left.localeCompare(right));

if (missingKeys.length) {
  console.error(`Missing ${missingKeys.length} Spanish translation entries:`);
  for (const key of missingKeys) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log("Spanish translation coverage is complete.");
