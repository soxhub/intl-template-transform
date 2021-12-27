function test(intl) {
  let message = intl.formatMessage('Hello {obj_name}', {
    obj_name: get(obj, 'name'),
  });
}
