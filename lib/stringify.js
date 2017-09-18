module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // rulesArr stores all the css json
  var rulesArr = []

  function stringify () {
    const rules = ast.stylesheet.rules
    rules.forEach(rule => {
      addRule(rule)
    })
    // console.log(rulesArr)
    rulesArr.sort((ruleA, ruleB) => {
      return ruleA.position.start.line - ruleB.position.start.line
    })
    return generateStr()
  }

  function uniformStr (char, length) {
    if (!length) return ''
    var strArr = []
    strArr.length = length
    strArr.fill(char)
    return strArr.join('')
  }

  function generateStr () {
    let output = ''
    let returnStr
    rulesArr.forEach((rule, idx) => {
      // deal with indent and start location
      // calculate number of returns
      if (idx < rulesArr.length - 1) {
        returnStr = uniformStr('\n', rulesArr[idx + 1].position.start.line - rule.position.start.line)
      } else {
        returnStr = ''
      }

      // calculate indent length
      output += uniformStr(' ', (rule.position.start.column - 1) / 2 * indent)
      // deal with different types of rules
      switch (rule.type) {
        case 'rule':
          output += `${rule.selectors.join(' ')} {${returnStr}`
          break
        case 'declaration':
          output += `${rule.property}: ${rule.value};${returnStr}`
          break
        case 'ruleEnd':
          output += `}${returnStr}`
          break
        default:
          output += `@${rule.type} ${rule[rule.type]};${returnStr}`
          break
      }
    })
    // console.log(output)
    return output
  }

  function addRule (rule) {
    if (rule && rule.type === 'rule') {
      rulesArr.push({
        type: 'rule',
        selectors: rule.selectors,
        position: rule.position
      })
      rulesArr.push({
        type: 'ruleEnd',
        position: {
          start: {
            line: rule.position.end.line,
            column: rule.position.end.column - 1
          }
        }
      })
      addDeclarations(rule.declarations)
    } else {
      addImport(rule)
    }
  }

  function addDeclarations (declarations) {
    // console.log(declarations)
    declarations.forEach(declaration => {
      rulesArr.push(declaration)
    })
  }

  function addImport (importObj) {
    // console.log(importObj)
    rulesArr.push(importObj)
  }

  return stringify()
}
