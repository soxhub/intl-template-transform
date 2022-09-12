const { expect } = require('chai');
const { transform } = require('ember-template-recast');
const visitorFactory = require('../../lib/transform');

function testCase(options) {
  it(options.name, function () {
    let { code } = transform(options.input, visitorFactory());
    expect(code).to.eql(options.output);
  });
}

module.exports = testCase;
