const iterateChildren = require('./iterateChildren');

function replaceChildren(node, newChildren) {
    switch (node.type) {
        case 'AttrNode':
            node.value = newChildren[0];
            break;
        case 'Block':
        case 'Template':
            node.body = newChildren;
            break;
        case 'ElementNode':
            node.children = newChildren
            break;
        default:
            throw new Error(`node.type ${node.type} not implemented`);
    }
}

module.exports = function replace(group, serialized, isInsideStatement) {
    let params = Object.keys(serialized.values).map(key => {
        let subExpr = JSON.parse(JSON.stringify(serialized.values[key]));
        subExpr.type = 'SubExpression';
        return {
            type: 'HashPair',
            key: key,
            value: (subExpr.params.length ? subExpr : subExpr.path)
        };
    });
    if ((serialized.text.includes('>') || serialized.text.includes('<') || serialized.text.includes('&nbsp;') || serialized.text.includes('&mdash;') || serialized.text.includes('&middot;')) ? true : false) {
        params.push({
            type: 'HashPair',
            key: 'htmlSafe',
            value: { type: 'BooleanLiteral', value: true }
        });
    }
    let newNodes = [{
        type: (isInsideStatement ? 'SubExpression' : 'MustacheStatement'),
        path: {
            type: 'PathExpression',
            original: 'format-message',
            this: false,
            data: false,
            parts: ["format-message"]
        },
        params: [{
            type: 'StringLiteral',
            value: serialized.text.trim()
        }],
        hash: {
            type: 'Hash',
            pairs: params
        },
        escaped: true,
        strip: {
            open: false,
            close: false,
        }
    }];

    if (group[0].node.type === 'AttrNode') {
        return newNodes[0];
    }

    let newLineAtStart = group[0].node.type === 'TextNode' && group[0].node.chars.match(/^(\s+)/);
    if (newLineAtStart) {
        newNodes.unshift({
            type: 'TextNode',
            chars: newLineAtStart[1],
        });
    }
    let newLineAtEnd = group[group.length - 1].node.type === 'TextNode' && group[group.length - 1].node.chars.match(/(\s+)$/);
    if (newLineAtEnd) {
        newNodes.push({
            type: 'TextNode',
            chars: newLineAtEnd[1],
        });
    }

    let children = [];
    let parent = group[0].parent;

    if (Array.isArray(parent)) {
        children = parent;
    } else {
        children = Array.from(iterateChildren(parent));
    }

    let minIndex = children.indexOf(group[0].node);
    let maxIndex = children.indexOf(group[group.length - 1].node);
    children.splice(minIndex, maxIndex - minIndex + 1, ...newNodes);
    if (!Array.isArray(parent)) {
        replaceChildren(parent, children);
    }
}