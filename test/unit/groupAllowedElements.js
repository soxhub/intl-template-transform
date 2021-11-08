
const testCase = require('../helpers/test-case');

describe('grouping allowed elements', function() {
    testCase({
        name: 'merge html elements without element-modifiers',
        input: `
        <div>
            <i>a</i>
            <em>b</em>
            <b>c</b>
            <strong>d</strong>
            <bold>e</bold>
            <span>f</span>
            <a>g</a>
            <div>Not Formatting Element</div>
            <code>h</code>
            <br />
            <sup>i</sup>
            <sub>j</sub>
        </div>
    `,
        output: `
        <div>
            {{t "<i>a</i> <em>b</em> <b>c</b> <strong>d</strong> <bold>e</bold> <span>f</span> <a>g</a>" htmlSafe=true}}
            <div>{{t "Not Formatting Element"}}</div>
            {{t "<code>h</code> <br /> <sup>i</sup> <sub>j</sub>" htmlSafe=true}}
        </div>
    `
    });

});