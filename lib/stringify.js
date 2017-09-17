module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // ruleArr stores all the css json
  var ruleArr = []
  // endQ stores how many rules not ended yet
  var endQ = []

  function stringify () {
    const rules = ast.stylesheet.rules
    rules.forEach(rule => {
      addRule(rule)
    })
    // console.log(ruleArr)
    return generateStr()
  }

  function generateStr () {
    let output = ''
    let indentArr
    ruleArr.forEach(rule => {
      // deal with indent and start location
      indentArr = []
      indentArr.length = (rule.position.start.column - 1) / 2 * indent
      indentArr.fill(' ')
      output += indentArr.join('')
      // deal with different types of rules
      switch (rule.type) {
        case 'rule':
          output += `${rule.selectors.join(' ')} {\r\n`
          endQ.push({
            end: rule.position.end
          })
          break
        case 'declaration':
          output += `${rule.property}: ${rule.value};\r\n`
          break
        default:
          output += `@import ${rule.type} ${rule[rule.type]}`
          break
      }

      // deal with end of rule and output new line, which is a '}' only
      if (endQ.length && rule.position.end.line + 1 === endQ[endQ.length - 1].end.line) {
        indentArr = []
        indentArr.length = (endQ[endQ.length - 1].end.column - '}'.length - 1) / 2 * indent
        indentArr.fill(' ')
        output += indentArr.join('')
        output += '}\r\n'
        endQ.pop()
      }
    })
    return output
  }

  function addRule (rule) {
    if (rule && rule.type === 'rule') {
      ruleArr.push({
        type: 'rule',
        selectors: rule.selectors,
        position: rule.position
      })
      addDeclarations(rule.declarations)
    } else {
      addImport(rule)
    }
  }

  function addDeclarations (declarations) {
    // console.log(declarations)
    declarations.forEach(declaration => {
      ruleArr.push(declaration)
    })
  }

  function addImport (importObj) {
    // console.log(importObj)
    ruleArr.push(importObj)
  }

  return stringify()
}
