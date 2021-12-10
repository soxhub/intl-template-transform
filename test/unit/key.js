const testCase = require('../helpers/test-case');

describe('Placeholders in translations', function () {
  testCase({
    name: 'no this keyword',
    input: `
    <span>
        Hello {{this.world}}
    </span>`,
    output: `
    <span>
        {{format-message "Hello {world}" world=this.world}}
    </span>`
  });

  testCase({
    name: 'no @ in keyword',
    input: `
    <span>
        Hello {{@world}}
    </span>`,
    output: `
    <span>
        {{format-message "Hello {world}" world=@world}}
    </span>`
  });
});