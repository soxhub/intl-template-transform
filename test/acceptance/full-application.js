const chai = require('chai');
const execa = require('execa');
const path = require('path');
const dircompare = require('dir-compare');

const { expect } = chai;

// resolved from the root of the project
const inputDir = path.resolve('./test/fixtures/input');
const outputDir = path.resolve('./test/fixtures/output');
const binPath = path.resolve('./bin/cli.js');
const execOpts = { cwd: inputDir, stderr: 'inherit' };

describe('Acceptance Test | run full transform on ember application', function () {
  it('should successfully migrate a full ember application', async function () {
    await execa(binPath, execOpts);

    const res = await dircompare.compare(inputDir, outputDir, {
      compareContent: true,
    })

    expect(res.same, "The input doesn't match the output").to.be.ok;
  })
});
