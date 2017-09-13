module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // TODO

  function addIndent(str) {
    for( var j = 0;j < indent; j++) {
      str += ' '
    }
    return str
  }

  function handleSingleRule(str, rule) {
    switch(rule.type) {
      case 'charset':
        str += ('@charset ' + rule.charset +';\r\n\r\n')
        return str
      break;
      case 'rule':
        str += (rule.selectors.join('') + ' '+'{\r\n');
        return handleDeclarations(str, rule.declarations)
    }
  }

  function handleDeclarations(str, declarations) {
    for(var i = 0;i < declarations.length;i ++) {
      str = addIndent(str)
      str += `${declarations[i].property}: ${declarations[i].value};\r\n`
    }
    str += '}'
    return str
  }

  let result = '';
  if( ast.type == 'stylesheet' && ast.stylesheet && ast.stylesheet.rules) {
    let rules = ast.stylesheet.rules;
    for(var i = 0; i < rules.length; i++ ) {
      result = handleSingleRule(result, rules[i])
    }
    return result
  }
}