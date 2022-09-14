#!/usr/bin/env node
const semver = require('semver');
if (semver.lt(process.version, '14.0.0')) {
  console.error('This program requires at least Node v14 to run');
  process.exit(1);
}

const { processFiles } = require('../');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [path or glob]')
  .help('h')
  .alias('h', 'help').argv;

const globString = argv._.length ? argv._[0] : 'app/**/*.{hbs,js}';

processFiles(globString);
