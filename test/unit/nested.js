const testCase = require('../helpers/test-case');

describe('nested elements', function () {
  testCase({
    name: 'nested span',
    input: `<img
      src="/images/users/{{sponsor.image}}"
      alt="{{sponsor.name}} website"
      loading="lazy"
    />
    <span>
      aaa
      <span title="{{sponsor.name}} website">
        test
      </span>
    </span>`,
    output: `<img
      src="/images/users/{{sponsor.image}}"
      alt={{format-message "{sponsorName} website" sponsorName=sponsor.name}}
      loading="lazy"
    />
    <span>
      {{format-message "aaa <span title='{sponsorName} website'> test </span>" sponsorName=sponsor.name htmlSafe=true}}
    </span>`
  });

  testCase({
    name: 'multiple nested span',
    input: `
    <span>
      <span>
        Hello
      </span>
      <span title="{{sponsor.name}} website">
        world
      </span>
    </span>`,
    output: `
    <span>
      {{format-message "<span> Hello </span> <span title='{sponsorName} website'> world </span>" sponsorName=sponsor.name htmlSafe=true}}
    </span>`
  });

  testCase({
    name: 'nested span without text',
    input: `
    <span>
      {{this.a}}
      <span>
        {{this.b}}
      </span>
      <span title="{{sponsor.name}} website">
        {{this.c}}
      </span>
    </span>`,
    output: `
    <span>
      {{this.a}}
      <span>
        {{this.b}}
      </span>
      <span title={{format-message "{sponsorName} website" sponsorName=sponsor.name}}>
        {{this.c}}
      </span>
    </span>`,
  });

  testCase({
    name: 'nested span with text',
    input: `
    <span>
      Status
      {{this.a}}
      <strong>
        {{this.b}}
      </strong>
      <span title="{{sponsor.name}} website">
        {{this.c}}
      </span>
      is interesting.
    </span>`,
    output: `
    <span>
      {{format-message "Status {a} <strong> {b} </strong> <span title='{sponsorName} website'> {c} </span> is interesting." a=this.a b=this.b sponsorName=sponsor.name c=this.c htmlSafe=true}}
    </span>`,
  });

  testCase({
    name: 'no empty space between html tags',
    input: `
    <span>
      Status
      {{this.a}}
      <strong>
        {{this.b}}
      </strong><span title="{{sponsor.name}} website">
        {{this.c}}
      </span>
      is interesting.
    </span>`,
    output: `
    <span>
      {{format-message "Status {a} <strong> {b} </strong><span title='{sponsorName} website'> {c} </span> is interesting." a=this.a b=this.b sponsorName=sponsor.name c=this.c htmlSafe=true}}
    </span>`,
  });
})
