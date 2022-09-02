const chai = require('chai');
const execa = require('execa');
const { join, resolve } = require('path');
const dircompare = require('dir-compare');
const temp = require('temp');
const copy = require('recursive-copy');
const { readFileSync } = require('fs');

const { expect } = chai;

temp.track();

// resolved from the root of the project
const inputDir = resolve('./test/fixtures/input');
const outputDir = resolve('./test/fixtures/output');
const binPath = resolve('./bin/cli.js');

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

    const differentFiles = res.diffSet
      ?.filter((diff) => diff.reason)
      .map((diff) => {
        return {
          before: readFileSync(join(diff.path1, diff.name1), 'utf8'),
          after: readFileSync(join(diff.path2, diff.name2), 'utf8'),
          relativePath: diff.relativePath,
          name: diff.name1,
        };
      });

    differentFiles.forEach((diff) => {
      expect(diff.before, join(diff.relativePath, diff.name)).to.equal(
        diff.after
      );
    });

    expect(res.same, "The input doesn't match the output").to.be.ok;
  });
});
