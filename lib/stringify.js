const os = require("os")
module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  let result = ''
  let platform = 'win32'
  // TODO

  const resolveMethods = {
    resolveCharset(rule){
      if(!rule || rule.type !== "charset") return
      const charset = rule.charset
      result += `@charset ${charset};` + newline() + newline()  
    },
  
    resolveRule(rule){
      if(!rule || rule.type !== "rule") return
      const selectors = rule.selectors.join(' ')
      result += selectors + ' {' + newline()
      const declarations = rule.declarations && rule.declarations.forEach(declaration => {
        result += toIndent() + declaration.property + ':' + whitespace(1) + declaration.value + ';' + newline()
      })
      result += '}'
    }
  }

  function setPlatform(){
    platform = os.platform()
  }

  function toIndent(){
    return whitespace(indent)
  }

  function whitespace(number){
    return new Array(number).fill(" ").join("")
  }

  function newline(){
    return platform === "win32" ? "\r\n" : "\n"
  }

  function upperFirst(str){
    if(typeof str !== "string")  return
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }

  function resolveRules(rules){
    if(!rules || !Array.isArray(rules)) return
    rules.forEach(rule => {
      resolveMethods['resolve' + upperFirst(rule.type)](rule)
    })
  }

  function css(){
    const rules = ast && ast.stylesheet && ast.stylesheet.rules
    if(!rules) return
    setPlatform()
    resolveRules(rules)  
    return result
  }

  return css()
}