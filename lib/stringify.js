const os = require("os")
module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  let result = ''
  let platform = 'win32'
  // TODO

  function setPlatform(){
    platform = os.platform()
  }

  function indent(number){
    return new Array(number).fill(" ").join("")
  }

  function newline(){
    return platform === "win32" ? "\r\n" : "\n"
  }

  function rule(rule){
    if(!rule || rule.type !== "rule") return
    const selectors = rule.selectors.join(' ')
    result += selectors + ' {' + newline()
    const declarations = rule.declarations && rule.declarations.forEach(declaration => {
      result += indent(2) + declaration.property + ':' + indent(1) + declaration.value + ';' + newline()
    })
    // 这不对，总感觉最后要加一个newline()
    result += '}'
  }

  function css(){
    const rules = ast && ast.stylesheet && ast.stylesheet.rules
    if(!rules || !Array.isArray(rules)) return
    setPlatform()
    rules.forEach(rule)
    return result
  }

  return css()
}