const testCase = require('../helpers/test-case');

describe('Translate pluralize', function () {
  testCase({
    name: 'pluralize should be translated with counts',
    input: `
    Reopen {{pluralize this.selectedCount "Task" without-count=false}}
    `,
    output: `
    {{format-message "Reopen {count, plural, =0 {no Tasks} =1 {# Task} other {# Tasks}}" count=this.selectedCount}}
    `,
  });

  testCase({
    name: 'pluralize should be translated with counts, when no parameter',
    input: `
    Reopen {{pluralize this.selectedCount "Task"}}
    `,
    output: `
    {{format-message "Reopen {count, plural, =0 {no Tasks} =1 {# Task} other {# Tasks}}" count=this.selectedCount}}
    `,
  });

  testCase({
    name: 'pluralize should be translated without counts',
    input: `
    Reopen {{pluralize this.selectedCount "Task" without-count=true}}
    `,
    output: `
    {{format-message "Reopen {count, plural, =0 {Tasks} =1 {Task} other {Tasks}}" count=this.selectedCount}}
    `,
  });
});
