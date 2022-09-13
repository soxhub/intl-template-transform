const testCase = require('../helpers/test-case');

describe('explicit helper syntax', function () {
  testCase({
    name: 'helpers work when wrapped with ()',
    input: `<div  @disabled={{(or
  (this.oneThing) (not this.otherThing)
)}}>
  Some content
</div>`,
    output: `<div  @disabled={{(or
  (this.oneThing) (not this.otherThing)
)}}>
  {{format-message "Some content"}}
</div>`,
  });

  testCase({
    name: 'helpers work when not wrapped with ()',
    input: `<div  @disabled={{or
  (this.oneThing) (not this.otherThing)
}}>
  Some content
</div>`,
    output: `<div  @disabled={{or
  (this.oneThing) (not this.otherThing)
}}>
  {{format-message "Some content"}}
</div>`,
  });
});
