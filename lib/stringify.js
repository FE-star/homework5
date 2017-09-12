module.exports = function(ast, indent = 2) {
    // deafult to 2
    // indent = indent || 2
    const rules = ast.stylesheet.rules
    let result = ''
    var curLine = 1
    var curCou
        // console.log('rule', rules);
    rules.forEach(function(element, index, array) {

        let rule = start(element.position.start) + element.selectors.join(' ') + ' {';

        let declarationsArr = joinDeclarations(element.position, element.declarations, indent);

    });

    //拼接开始
    function start(start) {
        var str = ''
        str += linefeed(curLine, start.line)
        str += space(1, start.line)
        return str
    }
    //拼接结束
    function close() {

    }


    function joinDeclarations(position, declarations, indent) {
        let startLine = position.start + 1;
        let endLine = position.end - 1;


        let declarationArr = []
        declarations.forEach(function(declaration, index, arr) {
            declarationArr.push(joinDeclaration(startLine, endLine, declaration))
        })


    }
    //
    function linefeed(start, end) {
        let str = '';
        for (let n = 0; n < end - start; n++) {
            str += '\n';
        }
        return str;
    }

    function space(start, end) {
        let str = '';
        for (let i = 0; i < end - start; i++) {
            str += ' '
        }
        return str;
    }

    function joinDeclaration(startLine, endLine, declaration) {
        var str = ''
        if (!declaration.length) return '';
        // console.log(declaration);


    }




    // TODO
}