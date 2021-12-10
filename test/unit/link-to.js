const testCase = require('../helpers/test-case');

describe('Exclude curly components', function () {
  testCase({
    name: '{{link-to}} cannot be used in translation',
    input: `
        <span>
            Click {{link-to "Contact Support" "zendesk.index"}}
        </span>
    `,
    output: `
        <span>
            {{format-message "Click"}} {{link-to "Contact Support" "zendesk.index"}}
        </span>
    `
  });

  testCase({
    name: 'Content of {{link-to}} should be translated',
    input: `
        <span>
            {{#link-to "zendesk.index"}}
                Click here
            {{/link-to}}
        </span>
    `,
    output: `
        <span>
            {{#link-to "zendesk.index"}}
                {{format-message "Click here"}}
            {{/link-to}}
        </span>
    `
  });

  testCase({
    name: '{{input}} cannot be used in translation',
    input: `
        <span>
            Text {{input value=this.val}}
        </span>
    `,
    output: `
        <span>
            {{format-message "Text"}} {{input value=this.val}}
        </span>
    `
  });
});