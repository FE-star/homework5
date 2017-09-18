module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // rulesArr stores all the css json
  var rulesArr = []
  // endQ stores how many rules not ended yet
  var endQ = []

  function stringify () {
    const rules = ast.stylesheet.rules
    rules.forEach(rule => {
      addRule(rule)
    })
    // console.log(rulesArr)
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
      // calculate number of return
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
          endQ.push({
            end: rule.position.end
          })
          break
        case 'declaration':
          output += `${rule.property}: ${rule.value};${returnStr}`
          break
        default:
          output += `@${rule.type} ${rule[rule.type]};${returnStr}`
          break
      }

      // deal with end of rule and output new line, which is a '}' only
      if (endQ.length && rule.position.end.line + 1 === endQ[endQ.length - 1].end.line) {
        if (idx === rulesArr.length - 1) {
          // end of rules, add a return
          output += '\n'
        }
        output += uniformStr(' ', (endQ[endQ.length - 1].end.column - '}'.length - 1) / 2 * indent)
        output += '}' + (idx === rulesArr.length - 1 ? '' : '\n')
        endQ.pop()
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
