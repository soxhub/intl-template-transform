const testCase = require('../helpers/test-case');

describe('nested elements', function() {
  testCase({
    name: 'Br inside text',
    input: `
    <span>
      Hello
      <br />
      world
    </span>`,
    output: `
    <span>
      {{t "Hello <br /> world" htmlSafe=true}}
    </span>`
  });

  testCase({
    name: 'No br at the end of the translation',
    input: `
    <span>
      Hello
      <br />
      world
      <br />
    </span>`,
    output: `
    <span>
      {{t "Hello <br /> world" htmlSafe=true}}
      <br />
    </span>`
  });

  testCase({
    name: 'No br at the start of the translation',
    input: `
    <span>
      <br />
      Hello
      <br />
      world
    </span>`,
    output: `
    <span>
      <br />
      {{t "Hello <br /> world" htmlSafe=true}}
    </span>`
  });

  testCase({
    name: 'No br at the start/end of the translation',
    input: `
    <span>
      <br />
      <br />
      Hello
      <br />
      world
      <br />
    </span>`,
    output: `
    <span>
      <br />
      <br />
      {{t "Hello <br /> world" htmlSafe=true}}
      <br />
    </span>`
  });
})
