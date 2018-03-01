'use strict';

const fs = require('fs');

function buildGrep(filename, lineNumber) {
  if (!filename || !lineNumber) {
    return;
  }

  const contents = fs.readFileSync(filename, 'utf8');
  const lines = contents.split(/\r?\n/);

  let currentLine = 0;
  let lastDescribe; // TODO: Nested describes?
  let lastBlock;
  let found = false; // TODO: fail easier

  lines.forEach((line) => {
    if (found) {
      return;
    }

    let trimmed = line.replace(/\s+/, '');

    if (trimmed.startsWith('describe(')) {
      lastDescribe = line;
    } else if (trimmed.startsWith('it(')) {
      lastBlock = line;
    }

    if (++currentLine === Number(lineNumber)) {
      found = true;
    }
  });

  if (!found) {
    return;
  }

  lastDescribe = stripExtras(lastDescribe.trim().replace(/^(describe)/, '').trim()) || '';
  lastBlock = stripExtras(lastBlock.trim().replace(/^(it)/, '').trim()) || '';

  let str = escapeRegExp(`${lastDescribe} ${lastBlock}`);

  return `${str.replace(/'/g, '\\\'')}$`;
}

function stripExtras(str) {
  let single = str.indexOf('\'');
  let double = str.indexOf('"');
  let tick = str.indexOf('`');
  let quoteIndex;
  let quoteChar;

  if (single < 0) { single = Infinity; }
  if (double < 0) { double = Infinity; }
  if (tick < 0) { tick = Infinity; }

  quoteIndex = Math.min(single, double, tick);

  if (quoteIndex === Infinity) {
    return;
  }

  quoteChar = str.charAt(quoteIndex);
  str = str.slice(quoteIndex + 1);
  quoteIndex = str.indexOf(quoteChar);
  str = str.slice(0, quoteIndex);

  return str;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = buildGrep;
