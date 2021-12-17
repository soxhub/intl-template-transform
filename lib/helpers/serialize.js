const iterateChildren = require('./iterateChildren');
const convertToKey = require('./convertToKey');
const templateRecast = require('ember-template-recast');

module.exports = function serialize(node) {
    if (node.type === 'StringLiteral') {
        return {
            text: node.value.replace(/\}/g, '\'}').replace(/\{/g, '\'{'),
            values: {}
        };
    } else if (node.type === 'TextNode') {
        return {
            text: node.chars.replace(/\s+/g, ' ').replace(/\}/g, '\'}').replace(/\{/g, '\'{'),
            values: {}
        };
    } else if (node.type === 'MustacheStatement') {
        let ast = templateRecast.parse('');
        ast.body.push(node);
        let key = convertToKey(templateRecast.print(ast));
        return {
            text: '{' + key + '}',
            values: {
                [key]: node
            }
        };
    } else if (node.tag === 'br') {
        return {
            text: '<br />',
            values: {}
        };
    }

    let serializedAttributes = { text: '', values: {} };
    if (node.attributes?.length) {
        node.attributes.forEach(a => {
            let r = serialize(a.value);
            serializedAttributes.text += ` ${a.name}='${r.text}'`;
            serializedAttributes.values = { ...serializedAttributes.values, ...r.values };
        });
    }

    let result = {
        text: (node.type === 'ElementNode' ? `<${node.tag}${serializedAttributes.text}>` : ``),
        values: serializedAttributes.values
    }
    for (let subNode of iterateChildren(node)) {
        let res = serialize(subNode, false);

        result.text += res.text;
        result.values = { ...result.values, ...res.values };
    }
    result.text += (node.type === 'ElementNode' ? `</${node.tag}>` : ``);
    return result;
}