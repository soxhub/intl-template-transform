const testCase = require('../helpers/test-case');

describe('test of auditboard-icons', function () {
  testCase({
    name: 'icon not translated',
    input: `
    <i class="auditboard-icons fs-14 mr-3">lock_fill</i> Changes
    `,
    output: `
    <i class="auditboard-icons fs-14 mr-3">lock_fill</i> {{format-message "Changes"}}
    `
  });

  testCase({
    name: 'i translated',
    input: `
    <i class="fs-14 mr-3">This is</i> nice text.
    `,
    output: `
    {{format-message "<i class='fs-14 mr-3'>This is</i> nice text." htmlSafe=true}}
    `
  });

  testCase({
    name: 'i translated',
    input: `<i class="fs-14 mr-3">This is nice text.</i>`,
    output: `<i class="fs-14 mr-3">{{format-message "This is nice text."}}</i>`
  });

  testCase({
    name: 'material-icons',
    input: `
        <i class='material-icons'> content_cut </i> <span> Cut </span>
    `,
    output: `
        <i class='material-icons'> content_cut </i> <span> {{format-message "Cut"}} </span>
    `
  });
});