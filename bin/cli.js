#!/usr/bin/env node

const mochaLine = require('../lib');
const fileAndNumber = process.argv.slice(-1)[0] || '';
const split = fileAndNumber.split(':');
const filename = split[0];
const lineNumber = split[1];

const grep = mochaLine(filename, lineNumber);

if (!grep) {
  console.log('Unable to find matching test');
  console.log('');
  console.log('Usage: mocha-line <filename>:<line>');
  process.exit(1);
}

console.log(grep);
process.exit(0);
