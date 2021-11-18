const isExcludedNode = require('./isExcludedNode');

//function iterate children where translation can be discovered.
//not implemented: translations can be discovered in some MustacheStatement like concat
module.exports = function* iterateChildren(node) {
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