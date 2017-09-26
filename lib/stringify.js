module.exports = function(ast, indent = 2) {
    // deafult to 2
    // indent = indent || 2
    const rules = ast.stylesheet.rules
    let result = ''


    function blockStart() {
        result += ' {\n'
    }

    function blockEnd() {
        result += '}';
    }

    function indentSpace() {
        return new Array(indent).fill(' ', 0, indent).join('');
    }

    function fitDeclaration(element) {
        let i = 0;
        result += element.selectors.join(' ');

        blockStart();
        element.declarations.forEach(function(item) {
            declaration(item);
        })
        blockEnd();

    }

    function declaration(dec) {
        result += indentSpace() + dec.property + ': ' + dec.value + ';\n'
    }

    function fileDeclaration(fileDec) {
        result += '@' + fileDec.type + ' ' + fileDec[fileDec.type] + ';\n'
    }

    function spliteRule() {
        rules.forEach(function(element) {
            if (element.type !== 'rule') {
                fileDeclaration(element)
                return;
            }

            fitDeclaration(element);
        });
        return result;
    }



    return spliteRule();

}