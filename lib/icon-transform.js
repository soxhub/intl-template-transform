function descExist(node, parentNode) {
  let children = [];
  if (parentNode.type === 'Template') {
    children = parentNode.body;
  } else if (parentNode.type === 'ElementNode') {
    children = parentNode.children;
  }

  const index = children.indexOf(node);
  if (children[index - 1].type === 'MustacheCommentStatement') {
    return true;
  }

  if (
    children[index - 2] &&
    children[index - 2].type === 'MustacheCommentStatement'
  ) {
    return true;
  }

  return false;
}

function createComment(comment) {
  return {
    type: 'MustacheCommentStatement',
    value: comment,
  };
}
function createText(text) {
  return {
    type: 'TextNode',
    chars: text,
  };
}

function isAuditboardIcon(node) {
  return (
    node.tag === 'i' &&
    node.attributes.find(
      (a) =>
        a.name === 'class' &&
        a.value.chars.split(' ').includes('auditboard-icons')
    )
  );
}

module.exports = function () {
  let lastLoc = null;
  return {
    ElementNode(node, path) {
      if (
        isAuditboardIcon(node) &&
        lastLoc != node.loc &&
        !descExist(node, path.parent.node)
      ) {
        lastLoc = node.loc;
        return [
          createComment(' template-lint-disable no-bare-strings '),
          createText('\n'),
          createComment(' TODO: non translatable icon '),
          createText('\n'),
          node,
        ];
      }
    },
  };
};
