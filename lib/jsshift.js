const babylon = require('@babel/parser');
const convertToKey = require('./helpers/convertToKey');
const isExcludedFunctionCall = require('./helpers/isExcludedFunctionCall');

function isText(text) {
  if (!text || !text.match) {
    return false;
  }

  //exclude specific texts
  if (text.includes('text-center')) {
    return false;
  }

  if (text.match(/rgb\(.*\)/)) {
    return false;
  }

  //Allow html formatting with b, strong, span and br
  let tmp = text.replace(/e\.g\./g, '').replace(/\.\.\./g, '.').replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/<span>/g, '').replace(/<\/span>/g, '').replace(/<br *\/?>/g, ' ');

  //remove words with - and then check if it is english text (effectiely remove css classes)
  tmp = tmp.replace(/ *[a-z0-9]+-[a-z0-9]+ */g, '');

  //text is not empty
  if (tmp.match(/^\s*$/)) {
    return false;
  }

  //only allowed characters
  if (!tmp.match(/^[a-zA-Z0-9 ,.?!\-():"'/+&#]+$/)) {
    return false;
  }

  //if there is no space, then word must start with capital letter
  if (!tmp.includes(' ')) {
    if (['OpsAudit'].includes(tmp)) {
      return true;
    }
    //it is one word
    if (!(tmp.match(/^[A-Z][a-z]/))) {
      //must start with capital letter followed by small letter
      return false;
    }

    if (tmp.match(/[a-z][A-Z]/)) {
      //camel case
      return false;
    }
  }

  //must contains alphanumeric
  if (!tmp.match(/[a-z]+/)) {
    return false;
  }

  //comma followed with space
  if (tmp.match(/,[^ ]/g)) {
    return false;
  }

  //dot can be followed only with space
  if (tmp.match(/\)[^ ]/g)) {
    return false;
  }
  if (tmp.match(/[^ ]\([^s]/g)) {
    return false;
  }
  if (tmp.match(/\.[^ )"]/g)) {
    return false;
  }
  if (tmp.match(/\?[^ )"]/g)) {
    return false;
  }
  if (tmp.match(/![^ )"]/g)) {
    return false;
  }

  return true;
}

function isTemplateTextToTranslate(node) {
  let canBeTranslated = node.type === 'TemplateLiteral' && node.quasis.find(te => isText(te.value.raw));
  return canBeTranslated;
}

function findParent(path, condition) {
  if (condition(path)) {
    if (path.parent) {
      const trueParent = findParent(path.parent, condition);
      if (trueParent) {
        return trueParent;
      }
    }
    return path;
  } else {
    if (path.parent) {
      return findParent(path.parent, condition);
    }
  }
}

function findClassBody(path) {
  let isExtend = p => p.node.type === 'ClassBody';
  return findParent(path, isExtend);
}

function findFunctionDeclaration(path) {
  let isExtend = p => ['ArrowFunctionExpression', 'FunctionDeclaration', 'FunctionExpression'].includes(p.node.type);
  return findParent(path, isExtend);
}

function findExtendCallExpression(path) {
  let isExtend = p => p.node.type === 'CallExpression' && p.node.callee?.property?.name === 'extend' &&
    p.node.arguments.length && p.node.arguments[p.node.arguments.length - 1].type === 'ObjectExpression';
  return findParent(path, isExtend);
}

function getServiceImport(j, ast) {
  let importNode;
  ast.find(j.ImportDeclaration).forEach(id => {
    if (id.node.source.value === '@ember/service') {
      importNode = id.node;
    }
  });

  if (importNode) {
    let spec = importNode.specifiers.find(is => is.imported?.name === 'inject');
    if (spec) {
      return spec.local?.name ?? 'inject';
    } else {
      //insert specifier
      importNode.specifiers.push(j.importSpecifier(j.identifier('inject'), j.identifier('service')));
    }
  } else {
    //insert import
    const body = ast.find(j.Program).get('body');
    const newImport = j.importDeclaration([j.importSpecifier(j.identifier('inject'), j.identifier('service'))], j.literal('@ember/service'));
    body.get(0).insertBefore(newImport);
  }
  return 'service';
}

function getComputedImport(j, ast) {
  let importNodes = [];
  ast.find(j.ImportDeclaration).forEach(id => {
    if (id.node.source.value === '@ember/object') {
      importNodes.push(id.node);
    }
  });
  if (importNodes.length) {
    let spec;
    importNodes.forEach(ino => {
      const spe = ino.specifiers.find(is => is.imported?.name === 'computed')
      if (spe) {
        spec = spe;
      }
    });
    if (spec) {
      return spec.local?.name || 'computed';
    } else {
      //insert specifier
      importNodes[0].specifiers.push(j.importSpecifier(j.identifier('computed')));
    }
  } else {
    //insert import
    const body = ast.find(j.Program).get('body');
    const newImport = j.importDeclaration([j.importSpecifier(j.identifier('computed'))], j.literal('@ember/object'));
    body.get(0).insertBefore(newImport);
  }
  return 'computed';
}

function addIntlService(j, ast, path) {
  if (path.node.arguments[path.node.arguments.length - 1].properties.find(p => p.key?.name === 'intl')) {
    return;
  }

  const localServiceImport = getServiceImport(j, ast);
  let service = j.callExpression(j.identifier(localServiceImport), [j.literal("intl")]);
  const newProp = j.property('init', j.identifier('intl'), service);
  path.node.arguments[path.node.arguments.length - 1].properties.unshift(newProp);
}

function addIntlServiceToClass(j, ast, path) {
  if (path.node.body.find(p => p.key?.name === 'intl')) {
    return;
  }

  const localServiceImport = getServiceImport(j, ast);
  const newProp = j.classProperty(j.identifier('intl'), null, null, false);
  newProp.decorators = [j.decorator(j.identifier(localServiceImport))];
  path.node.body.unshift(newProp);
}

const parserOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'asyncGenerators',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    'decorators-legacy',
    'doExpressions',
    'dynamicImport',
    'exportDefaultFrom',
    'exportExtensions',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importMeta',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    ['pipelineOperator', { proposal: 'minimal' }],
    'throwExpressions',
  ],
};

function createFormatMessageExpression(j, node, excludeThis) {
  let text = '';
  let properties = [];
  if (node.value) {
    text = node.value;
  } else {
    for (let i = 0; i < node.expressions.length; i++) {
      let key = convertToKey(j(node.expressions[i]).toSource());
      text += node.quasis[i].value.raw + `{${key}}`;
      properties.push(j.property('init', j.identifier(key), node.expressions[i]));
    }
    text += node.quasis[node.quasis.length - 1].value.raw;
  }

  let member;
  if (excludeThis) {
    member = j.memberExpression(j.identifier('intl'), j.identifier('formatMessage'), false);
  } else {
    member = j.memberExpression(j.memberExpression(j.thisExpression(), j.identifier('intl'), false), j.identifier('formatMessage'), false);
  }

  const args = [
    j.objectExpression([
      j.property('init', j.identifier('defaultMessage'), j.literal(text))
    ])
  ];

  if (properties.length) {
    args.push(
      j.objectExpression(properties)
    );
  }

  return j.callExpression(member, args)
}

function replaceText(j, path, excludeThis) {
  j(path).replaceWith(
    createFormatMessageExpression(j, path.node, excludeThis)
  );
}

function reformatToComputed(j, propertyPath, ast) {
  let computedBody = j.blockStatement([
    j.returnStatement(propertyPath.node.value)
  ]);

  const newExpression = j.callExpression(j.identifier(getComputedImport(j, ast)), [
    j.functionExpression(j.identifier(''), [], computedBody, false, false)
  ]);

  propertyPath.node.value = newExpression;
  // j(path).replaceWith(newExpression);
}

function shouldBeComputedProperty(callExpressionPath, path) {
  const propertyNode = path.node;
  const isObjectProperty = p => p.type === 'ObjectProperty';
  const isActionsHash = p => p.key?.name === 'actions';
  const isCallExpression = p => p.value?.type === 'CallExpression';
  const isFunctionExpression = p => p.value?.type === 'FunctionExpression';
  const isArrowFunctionExpression = p => p.value?.type === 'ArrowFunctionExpression';

  const shouldBeComputed = callExpressionPath.node.arguments?.some(a =>
    a.properties?.some(p => p === propertyNode && isObjectProperty(p) && !isActionsHash(p) && !isCallExpression(p) && !isFunctionExpression(p) && !isArrowFunctionExpression(p))
  ) ?? false;

  if (shouldBeComputed) {
    return path;
  } else if (path.parent) {
    return shouldBeComputedProperty(callExpressionPath, path.parent);
  }
}

function insertIntlToFunction(j, funcDec) {
  if (funcDec.node.params.find(p => p.name === 'intl') ||
    funcDec.node.body.body.find(vd => vd.declarations?.[0]?.id?.name === 'intl')) {
    return false;
  }

  if (funcDec.node.params.find(p => p.name === 'container')) {
    funcDec.node.body.body.unshift(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier('intl'),
          j.callExpression(
            j.memberExpression(
              j.identifier('container'),
              j.identifier('lookup')
            ),
            [j.literal('service:intl')]
          )
        )
      ])
    );
    return false;
  } else {
    return true;
  }
}

let parser = {
  parse(code) {
    return babylon.parse(code, parserOptions);
  },
};


function createTransform(j, ast, onSomethingChanged) {
  return (path) => {
    const isPropertyName = path.parent.node.type === 'ObjectProperty' && path.parent.node.key === path.node;
    const isSwitchCase = path.parent.node.type === 'SwitchCase';

    const isBinaryExpression = path.parent.node.type === 'BinaryExpression';

    const isResizablehandlers = path.parent.node.type === 'ClassProperty' && path.parent.node.key?.name === 'resizableHandles';
    const isErrorHeader = path.parent.node.type === 'ObjectProperty' && path.parent.node.key?.name === 'header' &&
      path.parent?.parent?.parent?.node?.callee?.property?.name === 'error';
    const isFormatMessage = path.parent.node.type === 'ObjectProperty' && path.parent.node.key?.name === 'defaultMessage' &&
      path.parent?.parent?.parent?.node?.callee?.property?.name === 'formatMessage';

    const isClassNames = path.parent?.parent?.node?.key?.name === 'classNames';

    const isError = path.parent?.node?.callee?.name === 'Error';
    const isFirstArgToFind = path.parent.node.type === 'CallExpression' && path.parent.node.callee?.property?.name === 'find';

    if ((isTemplateTextToTranslate(path.node) || isText(path.node.value)) && !isPropertyName && !isSwitchCase && !isBinaryExpression &&
      !isResizablehandlers &&
      !isErrorHeader && !isFirstArgToFind && !isClassNames && !isError && !isFormatMessage && !isExcludedFunctionCall(path.parent)
    ) {
      let extend = findExtendCallExpression(path);
      if (extend) {
        const propertyPath = shouldBeComputedProperty(extend, path.parent);
        if (propertyPath) {
          addIntlService(j, ast, extend);
          replaceText(j, path);
          reformatToComputed(j, propertyPath, ast)
        } else {
          addIntlService(j, ast, extend);
          replaceText(j, path);
        }
        onSomethingChanged();
      } else {
        let classBody = findClassBody(path);
        if (classBody) {
          addIntlServiceToClass(j, ast, classBody);
          replaceText(j, path);
          onSomethingChanged();
        } else {
          let funcDec = findFunctionDeclaration(path);
          if (funcDec) {
            // text inside function; Add intl as first argument to that function
            const argumentsChanged = insertIntlToFunction(j, funcDec);
            if (!argumentsChanged) {
              replaceText(j, path, true);
              onSomethingChanged();
            }
          }
        }
      }
    }

  }
}

function transformer(file, api) {
  const j = api.jscodeshift;
  let ast = j(file.source);
  let somethingChanged = false

  const replacedTexts = ast
    .find(j.Literal)
    .forEach(createTransform(j, ast, () => somethingChanged = true))
    .toSource({
      quote: 'single',
      trailingComma: true,
      useTabs: true,
      reuseWhitespace: false
    });

  const ast2 = j(replacedTexts);
  const newSource = ast2
    .find(j.TemplateLiteral)
    .forEach(createTransform(j, ast2, () => somethingChanged = true))
    .toSource({
      quote: 'single',
      trailingComma: true,
      useTabs: true,
      reuseWhitespace: false
    });

  if (somethingChanged) {
    return newSource;
  }

}

module.exports = transformer;
module.exports.parser = parser;