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
  return message;
}

export default function getSomething(someArg) {

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

  return message;
}
