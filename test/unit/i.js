const testCase = require('../helpers/test-case');

describe('test of auditboard-icons', function() {
    testCase({
        name: 'icon not translated',
        input: `
    <i class="auditboard-icons fs-14 mr-3">lock_fill</i> Changes
    `,
        output: `
    <i class="auditboard-icons fs-14 mr-3">lock_fill</i> {{t "Changes"}}
    `
    });

    testCase({
        name: 'i translated',
        input: `
    <i class="fs-14 mr-3">This is</i> nice text.
    `,
        output: `
    {{t "<i class='fs-14 mr-3'>This is</i> nice text." htmlSafe=true}}
    `
    });

    testCase({
        name: 'i translated',
        input: `<i class="fs-14 mr-3">This is nice text.</i>`,
        output: `<i class="fs-14 mr-3">{{t "This is nice text."}}</i>`
    });
});