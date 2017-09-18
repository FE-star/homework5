module.exports = function (ast, indent) {
  // console.log('ast.type', ast.type)
  var rules = ast.stylesheet.rules
  // deafult to 2
  indent = indent || 2
  // TODO
  var output = ''
  // 判断传入的文件是否是标准的样式对象
  function vaildType() {
    if (ast.type !== 'stylesheet') {
      throw new Error('file is not css file')
    }
  }
  // 添加indent
  function addIndent() {
    for (let i = 0; i < indent; i++) {
      output += ' '
    }
  }
  // 解析key-value
  function declarations(declarations) {
    for (let declaration of declarations) {
      addIndent()
      let key = declaration.property
      let value = declaration.value
      output += key + ': ' + value + ';\n'
    }
    output += '}'
  }
  // 解析selector
  function selector(selectors) {
    for (let selector of selectors) {
      output += selector
    }
    output += ' {\n'
  }
  // 解析charset
  function charset(charset) {
    output += `@charset ${charset};\n\n`
  }
  // 解析import
  function include(include) {
    output += include
  }
  // 解析单个css
  function stylesheet(rule) {
    if (rule.type === 'rule') {
      selector(rule.selectors)
      declarations(rule.declarations)
    } else if (rule.type === 'import') {
      include(rule.import)
    } else if (rule.type === 'charset') {
      charset(rule.charset)
    }
  }
  // 解析css声明
  function stylesheets() {
    // console.log('rules', rules)
    for (let rule of rules) {
      stylesheet(rule)
    }
    return output
  }
  // 组装css文件
  function css() {
    vaildType()
    return stylesheets()
  }
  return css()
}