

module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  let result = [], rules = []
  // TODO
  function repeat(str, times){
    return new Array(1 + times).join(str);
  }
  function combineLine(property, value, startColumn, endColumn) {
    //left spaces length
    let lLen = startColumn - 1
    //middle spaces length
    let mLen = endColumn - startColumn - property.length - value.length
    let lSpace = lLen? repeat(' ', lLen/2*indent) : ''
    let mSpace = mLen? repeat(' ', mLen) : ''
    return `${lSpace}${property}${mSpace}${value};`

  }
  function parseRule(rule){
    const {selectors, declarations, position} = rule
    const {start, end} = position
    const selectorStr = selectors.join('')

    if (start.line === end.line && !declarations.length) {
      result[start.line] = `${selectorStr} {}`
    } else if(start.line !== end.line && declarations.length) {

      result[start.line] = `${selectorStr} {`
      result[end.line] = '}'
      declarations.forEach(declaration=> parseDeclaration(declaration, result, indent))
    } 

  }

  function parseCharsetImport(rule) {
    const {type, position} = rule
    const {start, end} = position
    const value = rule[type]
    result[start.line] = combineLine('@' + type, value, start.column, end.column)
  }
  function parseDeclaration(declaration){
    const {property, value, position} = declaration
    const {start, end} = position
    result[start.line] = combineLine(property + ':', value, start.column, end.column)
  }
  function parseRules() {
    rules.forEach((rule)=>{
      const {type} = rule
      switch(type)
      {
        case 'rule':
          parseRule(rule)
          break
        case 'charset':
        case 'import':
          parseCharsetImport(rule)
          break
        default:
          break
      }
    })
  }
  function stringify() {
    try{
      rules = ast.stylesheet.rules
      if (!rules) {
        throw Error('invalid ast')
      }
    } catch(err) {
      throw err
    }
    parseRules()
    //line column start from 1, 1 
    result.splice(0, 2)
    return result.join('\n')
  }
  return stringify()
}