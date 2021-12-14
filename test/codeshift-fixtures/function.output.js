function getSomething1(someArg, intl) {
  let message = intl.formatMessage({
    defaultMessage: 'Nice Message',
  });
  return message;
}

function getSomething2(someArg, container) {
  const intl = container.lookup('service:intl');
  let message = intl.formatMessage({
    defaultMessage: 'Nice Message',
  });
  let message2 = intl.formatMessage({
    defaultMessage: 'Nice Message',
  });
  let message3 = "transform: translate3d(-";
  let message4 = $("html, body");
  console.log('Nice Message in console');
  aaa.on('Nice Message');
  aaa.indexOf('Nice Message');
  pluralize('Nice Message');
  aaa.format('Nice Message');
  assert('Nice Message');
  console.warn('Nice Message');
  console.error('Nice Message');
  aaa.css('some css');
  return message;
}

export default function getSomething(someArg) {
<<<<<<< HEAD

  //TODO: intl-template-transform function must have parameter intl, container, owner or intl can be defined inside function.
  let message = "Nice Message";

  //TODO: intl-template-transform function must have parameter intl, container, owner or intl can be defined inside function.
  let message2 = "Nice Message";

  //TODO: intl-template-transform function must have parameter intl, container, owner or intl can be defined inside function.
  let message3 = [
    "Ugly Message",
  ];

  //TODO: intl-template-transform function must have parameter intl, container, owner or intl can be defined inside function.
  let message4 = {
    message: "Ugly Message",
  };

  //TODO: intl-template-transform function must have parameter intl, container, owner or intl can be defined inside function.
  return "Nice Message";
}

function getSomething3(someArg, owner) {
  const intl = owner.lookup('service:intl');
  let message = intl.formatMessage({
    defaultMessage: 'Nice Message',
  });
=======
  let //intl-template-transform TODO: function must have parameter intl, container, owner or intl can be defined inside function.
    message = "Nice Message";
  let //intl-template-transform TODO: function must have parameter intl, container, owner or intl can be defined inside function.
    message2 = "Nice Message";
>>>>>>> 2371367 (Added comments to text that cannot be replaced. Translate texts inside Mixin. Get intl from owner.)
  return message;
}
