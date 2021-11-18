const isExcludedNode = require('./isExcludedNode');
const iterateChildren = require('./iterateChildren');
const isText = require('./isText');
const allowedTextElements = require('./allowedTextElements');

module.exports = function isStatement(node) {
    if (node.type === 'MustacheStatement') {
        return true;
    }

    if (!allowedTextElements.includes(node.tag) ||
        (node.modifiers && node.modifiers.length)) {
        return false;
    }

    //exclude special nodes
    if (isExcludedNode(node)) {
        return false;
    }

    let children = Array.from(iterateChildren(node));
    let everyTextOrMustache = children.every(ch => isText(ch) || isStatement(ch));
    let atLeastOneMustache = children.find(ch => isStatement(ch));
    return everyTextOrMustache && atLeastOneMustache;
}
