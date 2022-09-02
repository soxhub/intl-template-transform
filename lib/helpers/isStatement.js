const isExcludedNode = require('./isExcludedNode');
const iterateChildren = require('./iterateChildren');
const isText = require('./isText');
const allowedTextElements = require('./allowedTextElements');

const curlyComponents = [
  'link-to',
  'input',
  'zendesk-link',
  'clean-audit-field',
  'convert-audit-value',
];
module.exports = function isStatement(node) {
  if (curlyComponents.includes(node.path?.original)) {
    return false;
  }

  if (node.type === 'MustacheStatement') {
    return true;
  }

  if (
    !allowedTextElements.includes(node.tag) ||
    (node.modifiers && node.modifiers.length)
  ) {
    return false;
  }

  //exclude special nodes
  if (isExcludedNode(node)) {
    return false;
  }

  let children = Array.from(iterateChildren(node));
  let everyTextOrMustache = children.every(
    (ch) => isText(ch) || isStatement(ch)
  );
  let atLeastOneMustache = children.find((ch) => isStatement(ch));
  return everyTextOrMustache && atLeastOneMustache;
};
