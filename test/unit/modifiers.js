const testCase = require('../helpers/test-case');

describe('test modifiers', function() {
    testCase({
        name: 'merge html elements without element-modifiers',
        input: `
        This is
        <strong>interesting</strong>
        text.
    `,
        output: `
        {{t "This is <strong>interesting</strong> text." htmlSafe=true}}
    `
    });

    testCase({
        name: 'do not merge html elements if they have element-modifiers',
        input: `
        This is
        <strong {{on 'click' this.doSomething}}>interesting</strong>
        text.
    `,
        output: `
        {{t "This is"}}
        <strong {{on 'click' this.doSomething}}>{{t "interesting"}}</strong>
        {{t "text."}}
    `
    });
});