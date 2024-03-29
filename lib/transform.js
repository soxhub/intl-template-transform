const {
  serialize,
  replace,
  iterateGroups,
  serializeGroup,
  getPositionalParamsToTranslate,
  getArgumentsToTranslate,
} = require('./helpers');

function translatePositionalParams(node, noBareStringsExcludes) {
  let positionalParams = getPositionalParamsToTranslate(node);
  for (let p of positionalParams) {
    if (p.type === 'StringLiteral') {
      let ser = serialize(p);
      if (!noBareStringsExcludes.includes(ser.text)) {
        replace([{ node: p, parent: node.params }], ser, true);
      }
    }
  }
}

module.exports = function (noBareStringsExcludes = []) {
  return function (env) {
    let { builders: b } = env.syntax;
    let fileName = env.filePath || '';

    if (fileName.includes('audit-frequencies/page/edit.hbs')) {
      //exclude specific file;
      return {};
    }

    return {
      //replace texts
      Template(node) {
        let groups = Array.from(iterateGroups(node));
        for (let g of groups) {
          let s = serializeGroup(g);
          if (!noBareStringsExcludes.includes(s.text)) {
            replace(g, s);
          }
        }
      },
      //replace attributes
      AttrNode(node) {
        if (
          ['display', 'placeholder', 'alt', 'title', 'aria-label'].includes(
            node.name
          ) &&
          ['TextNode', 'ConcatStatement'].includes(node.value.type)
        ) {
          let ser = serialize(node.value);

          if (ser.text && !noBareStringsExcludes.includes(ser.text)) {
            let newNode = replace([{ node: node, parent: node }], ser);
            let a = b.attr(node.name, newNode, node.loc);
            return a;
          }
        }
      },
      MustacheStatement: function (node) {
        translatePositionalParams(node, noBareStringsExcludes);
      },
      SubExpression: function (node) {
        translatePositionalParams(node, noBareStringsExcludes);
      },
      ElementModifierStatement: function (node) {
        translatePositionalParams(node, noBareStringsExcludes);
      },
      ElementNode(node) {
        let argumentsToTranslate = getArgumentsToTranslate(node);
        for (let a of argumentsToTranslate) {
          if (
            a.value.type === 'TextNode' ||
            a.value.type === 'ConcatStatement'
          ) {
            let ser = serialize(a.value);
            if (ser.text && !noBareStringsExcludes.includes(ser.text)) {
              let tHelper = replace(
                [{ node: a, parent: undefined }],
                ser,
                false
              );
              let index = node.attributes.indexOf(a);
              let loc = node.attributes[index].loc;
              node.attributes[index] = b.attr(a.name, tHelper, loc);
            }
          }
        }
      },
    };
  };
};
