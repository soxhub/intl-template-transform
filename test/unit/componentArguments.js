const testCase = require('../helpers/test-case');

describe('Component arguments', function () {
  testCase({
    name: 'simple text',
    input: `
    <Datatables::DatatableColumn @label='Hello World' />
    `,
    output: `
    <Datatables::DatatableColumn @label={{t "Hello World"}} />
    `
  });

  testCase({
    name: 'concatenated text',
    input: `
    <Datatables::DatatableColumn 
    @label='Hello World {{this.val}}' 
    @second='hello' />
    `,
    output: `
    <Datatables::DatatableColumn 
    @label={{t "Hello World {this_val}" this_val=this.val}} 
    @second='hello' />
    `
  });
});