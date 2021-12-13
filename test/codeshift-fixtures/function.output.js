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
  let message = "Nice Message";
  let message2 = "Nice Message";
  return message;
}