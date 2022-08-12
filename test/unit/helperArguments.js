const testCase = require('../helpers/test-case');

describe('Helper Arguments', function () {
  testCase({
    name: 'Helper Arguments',
    input: `<span title="{{fn this.testFunction 2.2 '{3}'}} website {4}">
        test
      </span>`,
    output: `<span title={{format-message "{fnTestFunction3} website '{4'}" fnTestFunction3=(fn this.testFunction 2.2 "{3}")}}>
        {{format-message "test"}}
      </span>`
  })
})
