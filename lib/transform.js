const { serialize, replace, iterateGroups, serializeGroup, getPositionalParamsToTranslate } = require('./helpers');

function translatePositionalParams(node) {
    let positionalParams = getPositionalParamsToTranslate(node);
    for (let p of positionalParams) {
        if (p.type === 'StringLiteral') {
            let ser = serialize(p);
            replace([{ node: p, parent: node.params }], ser, true);
        }
    }
}

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
        MustacheStatement: translatePositionalParams,
        SubExpression: translatePositionalParams,
        ElementModifierStatement: translatePositionalParams,
    };
};
