let indentStr = (n) => {
    let res = ""
    for (let i = 0; i < n; i++) res += " "
    return res
}

let getStylesheet = (ss, indentSpace, indentModule) => {
    //console.log(ss)
    let res = ""
    const rules = ss.rules
    for (i in rules) {
        let rule = rules[i]
            //console.log(rule.type)
        if (rule.type == "charset") res += getCharSet(rule)
        if (rule.type == "rule") {
            if (res.length > 0) res += "\r\n"
            res += getRule(rule, indentSpace, indentModule)
        }
    }
    return res
}

let getCharSet = (rule) => {
    return "@" + rule.type + " " + rule[rule.type] + ";\r\n"
}

let getRule = (rule, indentSpace, indentModule) => {
    let res = indentSpace + getSelectors(rule.selectors) + " {\r\n" + getDeclarations(rule.declarations, indentSpace + indentModule, indentModule) + "}"
    return res
}

let getSelectors = (selectors) => {
    return selectors[0]
}

let getDeclarations = (declarations, indentSpace, indentModule) => {
    let res = ""
    for (i in declarations) {
        if (declarations[i].type == "declaration") res += (indentSpace + getDeclaration(declarations[i]))
    }
    return res
}

let getDeclaration = (declaration) => {
    return declaration.property + ": " + declaration.value + ";\r\n"
}

module.exports = function(ast, indent) {
    // deafult to 2
    indent = indent || 2
        // TODO
    const indentModule = indentStr(indent)

    if (ast.type == "stylesheet") return getStylesheet(ast[ast.type], "", indentModule)
}