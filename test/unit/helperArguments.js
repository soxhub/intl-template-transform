const testCase = require('../helpers/test-case');

describe('Helper Arguments', function () {
  testCase({
    name: 'Helper Arguments',
    input: `<span title="{{fn this.testFunction 2.2 '{3}'}} website {4}">
        test
      </span>`,
    output: `<span title={{format-message "{fn_testFunction_2_2_3} website '{4'}" fn_testFunction_2_2_3=(fn this.testFunction 2.2 '{3}')}}>
        {{format-message "test"}}
      </span>`
  })
})
