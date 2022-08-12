function test(intl) {
  let message = intl.formatMessage({
    defaultMessage: 'Hello {objName}',
  }, {
    objName: get(obj, 'name'),
  });
}
