const { transform } = require('ember-template-recast');
const fs = require('fs/promises');
const { join } = require('path');
const glob = require('glob');
const { run: jscodeshift } = require('jscodeshift/src/Runner');
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;
const jsshift = require('./lib/jsshift');

const visitorFactory = require('./lib/transform');
const CONFIG_FILE_NAME = '.template-lintrc.js';

async function processHbs(paths) {
  try {
    for (let path of paths) {
      const excludes = await getBareStringExcludes(path);
      let template = await fs.readFile(path, { encoding: 'utf-8' });
      let { code } = transform({
        template,
        filePath: path,
        plugin: visitorFactory(excludes),
      });
      await fs.writeFile(path, code);
    }
  } catch (err) {
    console.error('Error processing hbs files', err);
  }
}

async function getBareStringExcludes(path) {
  let noBareStringsExcludes = [];

  try {
    let { findUp } = await import('find-up');
    let configPath = await findUp(CONFIG_FILE_NAME, {
      cwd: path,
    });
    let config = require(configPath);
    noBareStringsExcludes = config?.['rules']?.['no-bare-strings'] ?? [];
  } catch {
    console.warn(
      `.template-lintrc.js not found above ${path}. Not ignoring any configured bare strings.`
    );
  }

  return noBareStringsExcludes;
}

async function processJs(paths) {
  const options = {};
  const res = await jscodeshift(
    join(__dirname, 'lib', 'jsshift.js'),
    paths,
    options
  );
  console.log(res);
}

async function processFiles(globString) {
  const paths = glob.sync(globString);

  const jsPaths = paths.filter((file) => file.endsWith('.js'));
  const hbsPaths = paths.filter((file) => file.endsWith('.hbs'));

  await processHbs(hbsPaths);
  await processJs(jsPaths);
}

function applyJsTransform(source) {
  return applyTransform(jsshift, {}, source);
}

module.exports = {
  processFiles,
  processJs,
  processHbs,
  applyJsTransform,
};
