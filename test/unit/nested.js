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
      src="/images/users/{{sponsor.image}}" alt={{t "{sponsor_name} website" sponsor_name=sponsor.name}} loading="lazy"
    />
    <span>
      {{t "aaa <span title='{sponsor_name} website'> test </span>" sponsor_name=sponsor.name htmlSafe=true}}
    </span>`
  })
})
