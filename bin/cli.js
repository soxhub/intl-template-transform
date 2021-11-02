#!/usr/bin/env node
const semver = require('semver');
if (semver.lt(process.version, '14.0.0')) {
  console.error('This program requires at least Node v14 to run');
  process.exit(1);
}

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { transform } = require('ember-template-recast');
const fs = require('fs/promises');
const glob = require('glob');

const visitor = require('../lib/transform');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [path or glob]')
  .help('h')
  .alias('h', 'help').argv;

const globString = argv._.length ? argv._[0] : 'app/**/*.hbs';

async function processFiles(globString) {
  const paths = glob.sync(globString)

  try {
    for (let path of paths) {
      let template = await fs.readFile(path, { encoding: 'utf-8' });
      let { code } = transform(template, visitor);
      await fs.writeFile(path, code);
    }
  } catch (err) {
    console.error(err);
  }
}

processFiles(globString);


