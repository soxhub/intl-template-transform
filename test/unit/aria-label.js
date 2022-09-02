const testCase = require('../helpers/test-case');

describe('html atrributes', function () {
  testCase({
    name: 'aria-label',
    input: `
    <span aria-label='Nice Label'></span>`,
    output: `
    <span aria-label={{format-message "Nice Label"}}></span>`,
  });
});
