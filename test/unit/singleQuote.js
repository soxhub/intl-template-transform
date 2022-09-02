const testCase = require('../helpers/test-case');

describe('Single quote', function () {
  testCase({
    name: 'Single quote should be escaped',
    input: `
      <span>I'm a span. Aren't tests awesome?</span>
    `,
    output: `
      <span>{{format-message "I''m a span. Aren''t tests awesome?"}}</span>
    `,
  });
});
