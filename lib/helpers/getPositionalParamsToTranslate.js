const positionalToTranslate = [
  {
    name: 'page-title',
    params: [0],
  },
  {
    name: 'attr-label',
    params: [1],
  },
  {
    name: 'tooltip',
    params: [0],
  },
];

module.exports = function getPositionalParamsToTranslate(node) {
  let items = positionalToTranslate.filter(
    (c) => c.name === node.path?.original
  );
  if (items.length) {
    let positionalToTranslate = node.params.filter((p, i) =>
      items.find((c) => c.params.includes(i))
    );
    return positionalToTranslate;
  }

  return [];
};
