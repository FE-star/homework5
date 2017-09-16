module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // TODO

  /**
   * 匹配区块开始
   */
  function open() {
    return '{'
  }

  /**
   * 匹配区块结束
   */
  function close() {
    return '}'
  }


  function indentNum() {
    let str = ''
    str += '\\r'
    for(var i = indent;i>0;i--){
      str += '\\s'
    }
    return str
  }

  function selector(rule) {
    return rule.selectors[0]
  }
  
  function declarations(rule) {
    let str = ''
    var space = indentNum()
    if(rule.type == 'rule'){
      str += selector(rule) +  open()
      rule.declarations.map((d)=>{
        str += `${space}${d.property}: ${d.value};`
      })
      str += close()
    }else{
      str += `@${rule.type}\\s${rule.charset}\\r`
    }
    return str
  }
  
  function rules() {
    let node = ''
    let text = ast.stylesheet.rules.map((rule)=>{
      let decs = declarations(rule)
      return node += decs
    })
    return text[0]
  }
  
  function stringify() {
    return rules()
  }

  return stringify()

}