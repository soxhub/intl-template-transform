const iterateChildren = require('./iterateChildren');
const convertToKey = require('./convertToKey');
const templateRecast = require('ember-template-recast');
const pluralize = require("pluralize");

function serializePluralize(node) {
  if (node.params.length === 2) {
    const text = node.params[1].value;
    const withoutCount = node.hash.pairs.find((p) => p.key === "without-count")
      ?.value.value;
    const zeroText = (withoutCount ? "" : "no ") + pluralize(text, 0);
    const oneText = (withoutCount ? "" : "one ") + pluralize(text, 1);
    const otherText = (withoutCount ? "" : "# ") + pluralize(text, 2);
    return {
      text: `{count, plural, =0 {${zeroText}} =1 {${oneText}} other {${otherText}}}`,
      values: {
        count: {
          type: "MustacheStatement",
          path: node.params[0],
          params: [],
          hash: {
            pairs: [],
          },
        },
      },
    };
  }
  return {
    text: "",
    values: {},
  };
}

module.exports = function serialize(node) {
    if (node.type === 'StringLiteral') {
        return {
            text: node.value.replace(/\}/g, '\'}').replace(/'/g,"''").replace(/\{/g, '\'{'),
            values: {}
        };
    } else if (node.type === 'TextNode') {
        return {
            text: node.chars.replace(/\s+/g, ' ').replace(/'/g,"''").replace(/\}/g, '\'}').replace(/\{/g, '\'{'),
            values: {}
        };
    } else if (node.type === 'MustacheStatement') {
      if (node.path.original === "pluralize") {
        return serializePluralize(node);
      } else {
        let ast = templateRecast.parse('');
        ast.body.push(node);
        let key = convertToKey(templateRecast.print(ast));
        return {
            text: '{' + key + '}',
            values: {
                [key]: node
            }
        };
      }
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