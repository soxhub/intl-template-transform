const isEmptyText = require('./isEmptyText');
const isStatement = require('./isStatement');
const isText = require('./isText');
const iterateChildren = require('./iterateChildren');

function unvantedFirstOrLastNode(node) {
  if (node.tag === 'br' || (isEmptyText(node) && !isStatement(node))) {
    return true;
  } else {
    return false;
  }
}

function checksFirstLastStatement(group) {
  let thereIsText = group.find((i) => !isEmptyText(i.node));

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
      let isStatementLast = unvantedFirstOrLastNode(
        group[group.length - 1].node
      );
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

module.exports = function* iterateGroups(node) {
  let group = [];
  for (let subNode of iterateChildren(node)) {
    if (isText(subNode) || isEmptyText(subNode)) {
      group.push({
        node: subNode,
        parent: node,
      });
    } else {
      group = checksFirstLastStatement(group);
      if (
        (group.length === 1 && group[0].node.type === 'TextNode') ||
        group.length > 1
      ) {
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
  if (
    (group.length === 1 && group[0].node.type === 'TextNode') ||
    group.length > 1
  ) {
    yield group;
    group = [];
  } else if (group.length === 1) {
    for (let r of iterateGroups(group[0].node)) {
      yield r;
    }
  }
};
