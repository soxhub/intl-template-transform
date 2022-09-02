const testCase = require('../helpers/test-case');

describe('Positional params', function () {
  testCase({
    name: 'page-title',
    input: `
    {{page-title
      "Nice Title"
      "Second Param"}}
    `,
    output: `
    {{page-title
      (format-message "Nice Title")
      "Second Param"}}
    `,
  });

  testCase({
    name: 'attr-label',
    input: `
    {{attr-label
      "First Param"
      "Second Param"}}
    `,
    output: `
    {{attr-label
      "First Param"
      (format-message "Second Param")}}
    `,
  });

  testCase({
    name: 'tooltip',
    input: `
    <span
    {{tooltip
      "Nice Title"
      "Second Param"}}>
      Test span
    </span>
    `,
    output: `
    <span
    {{tooltip
      (format-message "Nice Title")
      "Second Param"}}>
      {{format-message "Test span"}}
    </span>
    `,
  });
});
