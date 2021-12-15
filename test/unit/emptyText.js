const testCase = require('../helpers/test-case');

describe('Empty text', function () {
  testCase({
    name: 'Remove empty elements from start and begining of a translation',
    input: `
        <strong></strong>
        <strong></strong>
        This is
        <strong></strong>
    `,
    output: `
        <strong></strong>
        <strong></strong>
        {{format-message "This is"}}
        <strong></strong>
    `
  });

  testCase({
    name: 'Do not remove empty elements inside translation.',
    input: `
        This is
        <strong></strong>
        text.
    `,
    output: `
        {{format-message "This is <strong></strong> text." htmlSafe=true}}
    `
  });

  testCase({
    name: 'middot',
    input: `
        Some Text
        <strong>&middot;</strong>
    `,
    output: `
        {{format-message "Some Text"}}
        <strong>&middot;</strong>
    `
  });
});