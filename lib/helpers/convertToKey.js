const camelCase = require('lodash.camelcase');

function underscore(text) {
  return text?.toString().replace(/[^a-zA-Z0-9{}@]/g, '_').replace(/@/g, '').replace(/{/g, '').replace(/}/g, '').replace(/this_/g, '').replace(/_+/g, '_').replace(/_$/, '').replace(/get_?/g, '') ?? '';
}

module.exports = function convertToKey(text) {
  let wordParts = underscore(text).split("_");

  if (wordParts.length < 3) {
    return camelCase(`${wordParts}`);
  }

  let first = wordParts[0];
  let second = wordParts[1];
  let last = wordParts[wordParts.length - 1];

  return camelCase(`${first} ${second} ${last}`);
}
