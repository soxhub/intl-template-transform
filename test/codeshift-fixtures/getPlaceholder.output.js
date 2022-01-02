function test(intl) {
  let message = intl.formatMessage({
    defaultMessage: 'Hello {obj_name}',
  }, {
    obj_name: get(obj, 'name'),
  });
}