module.exports = function(ast, indent = 2) {
    // deafult to 2
    // indent = indent || 2
    const rules = ast.stylesheet.rules
    let result = ''
   
        // console.log('rule', rules);
    
  

    function blockStart() {
      result += '{/n'
    }

    function blockEnd () {
      result += '}'
    }
    
    function indentSpacing () {
        return new Array(indent).fill(' ', 0, indent).join('');
    }

    function declarations(declarationsArray) {
        declarationsArray.forEach(function(dec, index, array) {
            declaration(dec);
        })
    }
    

    function declaration (dec) {
      result += indentSpacing() + dec.property + ':' + dec.value + ';/n';
    }

    function fileDeclaration(fileDec) {
      result += '@' + fileDec.type + '' + fileDec[fileDec.type] + ';/n'
    }

    function splitRule() {
      rules.forEach(function (element, index, array) {
        if (element.type !== 'rule') {
            fileDeclaration(element)
            return ;
        }
        result += element.selectors.join(' ');
        blockStart();
        let declarationsArr = declarations(element.declarations);
        blockEnd();
      });
    }

    splitRule();

    console.log(result);

    return result;
    
}