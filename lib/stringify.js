module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // TODO


  function toindent(indent) {
    return (indent < 0) ? "" : new Array(indent + 1).join(' ')
  }
  /**
   * 组装 选择器
   */
  function toselector(arr) {
    if (arr && arr.length !== 0) {
      let _str = arr.join(', ')
      return `${_str} `
    }
  }
  /**
   * 声明组装
   */
  function todeclarations(arr) {
    if (arr && arr.length !== 0) {
      let dec = []
      arr.map(i => {
        const {
          str,
          start,
          end
        } = todeclaration(i)
        const _indent = toindent(indent)
        let _str = `${_indent}${str}`
        dec.push(_str)
      })
      return dec.join('\n')
    }
  }
  /**
   * 单个声明处理
   */
  function todeclaration(o) {
    const {
      property,
      value,
      position
    } = o
    const {
      start,
      end
    } = position
    let str = ''
    str = `${property}: ${value};`
    return {
      str,
      start,
      end
    }
  }
  /**
   * 单个规则处理
   */
  function praserule(rule) {
    if (rule.type === 'rule' && rule.hasOwnProperty('selectors')) {
      const {
        selectors,
        declarations
      } = rule
      const _selector = toselector(selectors)
      const _declarations = todeclarations(declarations)
      return `${_selector}{${'\n'}${_declarations}${'\n'}}`
    }
    if (rule.type === 'charset' && rule.hasOwnProperty('charset')) {
      const {
        charset
      } = rule
      return `@charset ${charset};`
    }
  }

  /**
   * 拆解组装样式
   */
  function prasestylesheet(o) {
    if (o.type === 'stylesheet' && o.hasOwnProperty('stylesheet')) {
      const rules = o.stylesheet.rules
      let _rules = []
      rules.map(rule => {
        let _rule = praserule(rule)
        _rules.push(_rule)
      })
      return _rules.join('\n')
    }
  }

  return prasestylesheet(ast)
}