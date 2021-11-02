const chai = require('chai');
const execa = require('execa');
const path = require('path');
const dircompare = require('dir-compare');
const temp = require('temp');
const copy = require('recursive-copy');

const { expect } = chai;

temp.track();

// resolved from the root of the project
const inputDir = path.resolve('./test/fixtures/input');
const outputDir = path.resolve('./test/fixtures/output');
const binPath = path.resolve('./bin/cli.js');

describe('Acceptance Test | run full transform on ember application', function () {
  it('should successfully migrate a full ember application', async function () {
    const tempDir = await temp.mkdir('ember-app');

    // copy input fixture to tempDir so we don't mutate the files every time
    await copy(inputDir, tempDir, {
      dot: true,
    });

    await execa(binPath, { cwd: tempDir, stderr: 'inherit' });

    const res = await dircompare.compare(tempDir, outputDir, {
      compareContent: true,
    });

    expect(res.same, "The input doesn't match the output").to.be.ok;
  })
});
