import path from 'path';
import { readFileSync, readdirSync } from 'fs';
import { expect } from 'chai';
import getParser from 'jscodeshift/src/getParser.js';
import babelParser from '@babel/parser';


import transform from '../../lib/jsshift.js';
const parser = transform.parser;

// const = jsshift;

// import { applyTransform } from 'jscodeshift/dist/testUtils.js';

async function applyTransform(module, options, input, testOptions = {}) {
  // Handle ES6 modules using default export for the transform
  // const transform = module.default ? module.default : module;


  // Jest resets the module registry after each test, so we need to always get
  // a fresh copy of jscodeshift on every test run.
  let jscodeshift = await import('jscodeshift/src/core.js');

  jscodeshift = jscodeshift.default;

  jscodeshift = jscodeshift.withParser(parser);


  const output = transform(
    input,
    {
      jscodeshift,
      stats: () => { },
    },
    options || {}
  );

  return (output || '').trim();
}

function runTest(testFilePrefix, testName) {
  const fixtureDir = path.join('test', 'codeshift-fixtures');
  const inputPath = path.join(fixtureDir, testFilePrefix + `.input.js`);
  const source = readFileSync(inputPath, 'utf8');
  const expectedOutput = readFileSync(
    path.join(fixtureDir, testFilePrefix + `.output.js`),
    'utf8'
  );

  it(testName, async () => {
    const output = await applyTransform(transform, {}, {
      path: inputPath,
      source
    }, {});

    expect(output.replace(/\n\s+/g, '\n')).equal(expectedOutput.replace(/\n\s+/g, '\n').trim());
    return output;
  });
}

let fixtureFiles = readdirSync('test/codeshift-fixtures')
  .map(fileName => fileName.replace(/\.(input|output)\.js$/, ''));
// fixtureFiles = ['templateString'];

describe('jscodeshift tests on fixtures', function () {
  [...new Set(fixtureFiles)].forEach(testFilePrefix => {
    const testName = testFilePrefix
      ? `transforms correctly using "${testFilePrefix}" data`
      : 'transforms correctly';


    runTest(testFilePrefix, testName);
  })
})
