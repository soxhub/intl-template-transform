const serialize = require('./serialize');

module.exports = function serializeGroup(group) {
  let res = group
    .map((g) => serialize(g.node))
    .reduce(
      (r, serialized) => {
        r.text += serialized.text;
        r.values = { ...r.values, ...serialized.values };
        return r;
      },
      { text: '', values: {} }
    );
  return res;
};
