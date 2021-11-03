
function unvantedFirstOrLastNode(node) {
    if (node.tag === 'br' || (isEmptyText(node) && !isStatement(node))) {
        return true;
    } else {
        return false;
    }
}

function isExcludedNode(node) {
    if ((node.tag === 'i' && node.attributes.find(a => a.name === 'class' && a.value?.chars?.indexOf('auditboard-icons') !== -1)) ||
        (node.tag === 'span' && node.attributes.find(a => a.name === 'class' && a.value?.chars?.indexOf('clearfix') !== -1))
    ) {
        return true;
    }
    return false;
}

function* iterateChildren(node) {
    if (isExcludedNode(node)) {
        return;
    }
    switch (node.type) {
        case 'MustacheCommentStatement':
        case 'MustacheStatement':
        case 'ContentStatement':
        case 'CommentStatement':
        case 'TextNode':
            break;
        case 'AttrNode':
            yield node.value;
            break;
        case 'Block':
        case 'Template':
            if (node.body) {
                for (let child of node.body) {
                    yield child;
                }
            }
            break;
        case 'BlockStatement':
            yield node.program;
            if (node.inverse) {
                yield node.inverse;
            }
            break;
        case 'ElementNode':
            if (node.children) {
                for (let child of node.children) {
                    yield child;
                }
            }
            break;
        case 'ConcatStatement':
            for (let child of node.parts) {
                yield child
            }
            break;
        default:
            throw new Error(`node.type ${node.type} not implemented`);
    }
}

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

// function return true for node if there is no text to translate. 
function isEmptyText(node) {
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

const allowedTextElements = ['i', 'em', 'b', 'strong', 'bold', 'span', 'a', 'code', 'br'];
function isStatement(node) {
    if (node.type === 'MustacheStatement') {
        return true;
    }

    if (!allowedTextElements.includes(node.tag) ||
        (node.modifiers && node.modifiers.length)) {// ||
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

function isText(node) {
    if (node.type === 'TextNode' || node.tag === 'br' || node.type === 'MustacheStatement') {
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
    let everyText = children.every(n => isText(n));
    return everyText;
}

function checksFirstLastStatement(group) {
    let thereIsText = group.find(i => !isEmptyText(i.node));

    if (thereIsText) {
        while (group.length) {
            let isStatementFirst = unvantedFirstOrLastNode(group[0].node);
            if (isStatementFirst) {
                group.shift();
            } else {
                break;
            }
        }
        while (group.length) {
            let isStatementLast = unvantedFirstOrLastNode(group[group.length - 1].node);
            if (isStatementLast) {
                group.pop();
            } else {
                break;
            }
        }
        return group;
    }

    return [];
}

function* iterateGroups(node) {
    let group = [];
    for (let subNode of iterateChildren(node)) {
        if (isText(subNode) || isEmptyText(subNode)) {
            group.push({
                node: subNode,
                parent: node
            });
        } else {
            group = checksFirstLastStatement(group);
            if ((group.length === 1 && group[0].node.type === 'TextNode') || group.length > 1) {
                yield group;
                group = [];
                for (let r of iterateGroups(subNode)) {
                    yield r;
                }
            } else if (group.length === 1) {
                for (let r of iterateGroups(group[0].node)) {
                    yield r;
                }
                group = [];
            } else {
                for (let r of iterateGroups(subNode)) {
                    yield r;
                }
            }

        }
    }
    group = checksFirstLastStatement(group);
    if ((group.length === 1 && group[0].node.type === 'TextNode') || group.length > 1) {
        yield group;
        group = [];
    } else if (group.length === 1) {
        for (let r of iterateGroups(group[0].node)) {
            yield r;
        }
    }
}

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

function serialize(node) {
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

function serializeGroup(group) {
    let res = group.map(g => serialize(g.node)).reduce((r, serialized) => {
        r.text += serialized.text;
        r.values = { ...r.values, ...serialized.values };
        return r;
    }, { text: '', values: {} });
    return res;
}

function replace(group, serialized, isInsideStatement) {
    let params = Object.keys(serialized.values).map(key => {
        let subExpr = JSON.parse(JSON.stringify(serialized.values[key]));
        subExpr.type = 'SubExpression';
        return {
            type: 'HashPair',
            key: key,
            value: (subExpr.params.length ? subExpr : subExpr.path)
        };
    });
    if ((serialized.text.includes('>') || serialized.text.includes('<')) ? true : false) {
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
            original: 't',
            this: false,
            data: false,
            parts: ["t"]
        },
        params: [{
            type: 'StringLiteral',
            value: serialized.text.trim()
        }],
        hash: {
            type: 'Hash',
            pairs: params
        },
        escaped: true,//,
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

module.exports = {
    iterateChildren,
    iterateGroups,
    serializeGroup,
    replace,
    serialize
};