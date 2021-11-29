const { serialize, replace, iterateGroups, serializeGroup } = require('./helpers');

module.exports = function (env) {
    let { builders: b } = env.syntax;
    return {
        //replace texts
        Template(node) {
            let groups = Array.from(iterateGroups(node));
            for (let g of groups) {
                let s = serializeGroup(g);
                replace(g, s);
            }
        },
        //replace attributes
        AttrNode(node) {
            if (['display', 'placeholder', 'alt', 'title'].includes(node.name) && ['TextNode', 'ConcatStatement'].includes(node.value.type)) {
                let ser = serialize(node.value);
                if (ser.text) {
                    let newNode = replace([{ node: node, parent: node }], ser);
                    let a = b.attr(node.name, newNode, node.loc);
                    return a;
                }
            }
        },
        //replace {{page-title ""}}
        MustacheStatement(node) {
            if (node.path.original === 'page-title' && node.params.length && node.params[0].type === 'StringLiteral') {
                replace([{ node: node.params[0], parent: node.params }], {
                    text: node.params[0].value,
                    values: {}
                }, true);
            }
        }
    };
};
