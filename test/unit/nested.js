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
      alt={{t "{sponsor_name} website" sponsor_name=sponsor.name}}
      loading="lazy"
    />
    <span>
      {{t "aaa <span title='{sponsor_name} website'> test </span>" sponsor_name=sponsor.name htmlSafe=true}}
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
      {{t "<span> Hello </span> <span title='{sponsor_name} website'> world </span>" sponsor_name=sponsor.name htmlSafe=true}}
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
      <span title={{t "{sponsor_name} website" sponsor_name=sponsor.name}}>
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
      {{t "Status {a} <strong> {b} </strong> <span title='{sponsor_name} website'> {c} </span> is interesting." a=this.a b=this.b sponsor_name=sponsor.name c=this.c htmlSafe=true}}
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
      {{t "Status {a} <strong> {b} </strong><span title='{sponsor_name} website'> {c} </span> is interesting." a=this.a b=this.b sponsor_name=sponsor.name c=this.c htmlSafe=true}}
    </span>`,
    });
})
