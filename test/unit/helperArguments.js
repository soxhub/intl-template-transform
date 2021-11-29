const testCase = require('../helpers/test-case');

describe('Helper Arguments', function () {
    testCase({
        name: 'Helper Arguments',
        input: `<span title="{{fn this.testFunction 2.2}} website">
        test
      </span>`,
        output: `<span title={{t "{fn_testFunction_2_2} website" fn_testFunction_2_2=(fn this.testFunction 2.2)}}>
        {{t "test"}}
      </span>`
    })
})
