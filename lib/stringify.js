module.exports = function (ast, indent) {

  function addSpace(str, whiteSpaceCount, where) {
    where = where || 'left'
    if (typeof (str) !== 'string') {
      str = str.toString()
    }

    let space = ''
    for (let index = 0; index < whiteSpaceCount; index++) {
      space += ' '
    }

    return where === 'left' ? space + str : str + space
  }

  // deafult to 2
  indent = indent || 2
  // TODO

  let result = []
  let rules = []

  function add2Result(pos, content) {
    result[pos.line - 1] = addSpace(content, (pos.column - 1))
  }

  // 字符化属性
  function stringDeclaration(dec) {
    const pos = dec.position.start
    const content = dec.property + ': ' + dec.value + ';'
    add2Result(pos, content)
  }

  // 遍历declarations
  function stringDeclarations(declarations) {
    for (let index = 0; index < declarations.length; index++) {
      let dec = declarations[index];
      stringDeclaration(dec)
    }
  }

  // 字符化选择器对象
  function stringSelector(sel) {
    const startPos = sel.position.start
    const startContent = sel.selectors.join('') + ' {'
    add2Result(startPos, startContent)

    stringDeclarations(sel.declarations)

    const endPos = sel.position.end
    const endContent = '}'
    add2Result(endPos, endContent)
  }

  // 字符化字符集
  function stringCharset(charset) {
    let pos = charset.position.start
    let content = `@charset ${charset.charset};`
    add2Result(pos, content)
  }

  function stringRules() {
    for (let index = 0; index < rules.length; index++) {
      let rule = rules[index];
      switch (rule.type) {
        case 'rule':
          stringSelector(rule)
          break
        case 'charset':
          stringCharset(rule)
          break
      }
    }
  }

  function stringify() {
    try {
      rules = ast.stylesheet.rules

      if (!rules) {
        throw new Error('对象格式不正确')
      }
    } catch (ex) {
      throw ex
    }

    stringRules()

    return result.join('\r\n')
  }

  return stringify()
}