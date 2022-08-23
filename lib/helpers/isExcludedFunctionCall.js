const excludedFunctions = [
  ".on",
  ".indexOf",
  "$",
  ".format",
  "assert",
  "console.warn",
  "console.log",
  "console.error",
  ".css",
];

module.exports = function (path) {
  if (!path || path.node.type !== 'CallExpression') {
    return false;
  }

  return excludedFunctions.some(func => {
    const pathNames = func.split('.');
    let callee = path.node.callee;

    for (let i = pathNames.length - 1; i >= 0; i--) {
      let name = pathNames[i];
      if (!name) {
        continue;
      }

      let calleeName = (i == 0 ? callee?.name : callee?.property?.name);

      if (calleeName !== name) {
        return false;
      }

      callee = callee.object;
    }

    return true;
  });
}
