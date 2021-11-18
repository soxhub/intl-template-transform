const iterateChildren = require('./iterateChildren');

function convertToKey(text) {
    return text?.toString().replace(/[^a-zA-Z0-9{}@]/g, '_').replace(/@/g, 'at_').replace('{', '').replace('}', '') ?? '';
}

function mustacheToString(node, isMustache) {
    return (isMustache ? '{' : '') + [
        convertToKey(node.path.original),
        node.params.map(p => musToString(p)).join('_'),
        node.hash.pairs.map(p => musToString(p))
    ].filter(u => u.length).join('_') + (isMustache ? '}' : '');
}

function musToString(node) {
    switch (node.type) {
        case 'PathExpression':
            return convertToKey(node.original);
        case 'MustacheStatement':
            return mustacheToString(node, true);
        case 'SubExpression':
            return mustacheToString(node, false);
        case 'BooleanLiteral':
        case 'NumberLiteral':
        case 'StringLiteral':
            return convertToKey(node.value);
        case 'HashPair':
            return convertToKey(node.key) + '_' + musToString(node.value);
    }
}

module.exports = function serialize(node) {
    if (node.type === 'StringLiteral') {
        return {
            text: node.value,
            values: {}
        };
    } else if (node.type === 'TextNode') {
        return {
            text: node.chars.replace(/\s+/g, ' '),
            values: {}
        };
    } else if (node.type === 'MustacheStatement') {
        let key = musToString(node, true);
        return {
            text: key,
            values: {
                [convertToKey(key)]: node
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