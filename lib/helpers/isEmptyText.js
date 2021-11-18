const isExcludedNode = require('./isExcludedNode');
const iterateChildren = require('./iterateChildren');
const allowedTextElements = require('./allowedTextElements');
// function return true for node if there is no text to translate. 
module.exports = function isEmptyText(node) {
    // TextNode is empty when there are only white space or &nbsp or there are no characters; 
    let isEmptyTextNode = node.type === 'TextNode' && (node.chars.match(/^\s*(&nbsp;)*\s*$/) || node.chars.match(/^[^a-zA-Z]+$/));

    if (isEmptyTextNode || node.tag === 'br' || node.type === 'MustacheStatement') {
        return true;
    }

    //allow only allowed text elements
    if (!allowedTextElements.includes(node.tag) ||
        (node.modifiers && node.modifiers.length)) {// ||
        return false;
    }

    //exclude special nodes
    if (isExcludedNode(node)) {
        return false;
    }

    let children = Array.from(iterateChildren(node));
    let emptyOrStatement = children.every(n => isEmptyText(n));
    return emptyOrStatement;
}