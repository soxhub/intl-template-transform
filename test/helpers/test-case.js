const { expect } = require('chai');
const { transform } = require('ember-template-recast');
const visitor = require('../../lib/transform');

function testCase(options) {
  it(options.name, function () {
    let { code } = transform(options.input, visitor);
    expect(code).to.eql(options.output);
  });
}

module.exports = testCase;
