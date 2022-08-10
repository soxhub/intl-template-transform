const testCase = require("../helpers/test-case");

describe("Exclude labelPosition argument", function () {
  testCase({
    name: "labelPosition shouldn't be translated",
    input: `
    <LunaForm::LunaFormGroup @labelPosition="horizontal" @name="Description" class="flex-3" as |formGroup|>
    </LunaForm::LunaFormGroup>
    `,
    output: `
    <LunaForm::LunaFormGroup @labelPosition="horizontal" @name={{format-message "Description"}} class="flex-3" as |formGroup|>
    </LunaForm::LunaFormGroup>
    `,
  });
});
