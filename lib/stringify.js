module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2;
  let indentStr = getIndentStr(indent),
      styles = ""
  if(ast.type == "stylesheet"){
    styles=getRulesStr(ast.stylesheet.rules, indentStr)
  }
  return styles
}
function getIndentStr ( indent ) {
  let indentStr
  for(let i=0; i<indent; i++){
    indentStr += " "
  }
  return indentStr
}

function getRulesStr ( rules, indentStr ) {
  let styles = ""
  rules.forEach((rule)=>{
    if ( rule.type == "rule") {
      styles += getRuleStr(rule, indentStr) + "\n"
    }
  })

  return styles
}

function getRuleStr ( rule, indentStr ) {
  let RuleStr = ""
  RuleStr += rule.selectors + " {" + getDeclarationsStr(rule.declarations, indentStr) + "\n" + "}";
  return RuleStr
}

function getDeclarationsStr( declarations, indentStr ) {
  let declarationsStr = ""
  declarations.forEach((declaration)=>{
    declarationsStr += "\n" + indentStr + getDeclarationStr(declaration)
  })
  return declarationsStr
}

function getDeclarationStr ( declaration ) {
  let declarationStr = ""
  if(declaration.type == "declaration"){
    declarationStr += declaration.property+ ": " + declaration.value + ";"
  }
  return declarationStr
}