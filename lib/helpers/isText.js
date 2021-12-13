const isExcludedNode = require('./isExcludedNode');
const iterateChildren = require('./iterateChildren');
const allowedTextElements = require('./allowedTextElements');

module.exports = function isText(node) {
  if (node.type === 'TextNode' || node.tag === 'br') {
    return true;
  }

  //allow only allowed text elements
  if (!allowedTextElements.includes(node.tag) ||
    (node.modifiers && node.modifiers.length)) {
    return false;
  }

  //exclude special nodes
  if (isExcludedNode(node)) {
    return false;
  }


  let children = Array.from(iterateChildren(node));
  let everyText = children.every(n => isText(n));
  return everyText;
}