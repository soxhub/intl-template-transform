const excludedVariables = [
  "className",
  "dom",
  "componentName",
  "match",
  "css",
  "file_picker_types",
  "locationStyle",
  "badgeClass",
  "badgeStatus",
  "routeClassName",
  "fontApply",
  "style",
  "tdClass",
  "font",
  "fontFamily"
];

module.exports = function (path) {
  return excludedVariables.some(excludedName => {
    if (['ObjectProperty', 'ClassProperty'].includes(path.node.type) && path.node.key?.name === excludedName) {
      return true;
    }

    if (path.node.type === 'VariableDeclarator' && path.node.id?.name === excludedName) {
      return true;
    }

    if (path.node.type === 'AssignmentExpression' && (path.node.left?.name === excludedName || path.node.left?.property?.name === excludedName)) {
      return true;
    }
  });

}