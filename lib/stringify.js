module.exports = function (ast, indent) {
    // deafult to 2
    indent = indent || 2
    // TODO


    if (!ast) {
        throw new Error('请输入值')
    } else {
        let res = '';
        if (ast.type === 'stylesheet' && ast.stylesheet && ast.stylesheet.rules) {
            for (let i = 0, arr = ast.stylesheet.rules; i < arr.length; i++ ) {
                res += handlerData(arr[i])
            }
            return res
        }
    }
    /**
     * 判断是charset 还是rule类型，分类型判断
     * @param data
     * @returns {string}
     */
    function handlerData(data) {
        let str = ''
        if(data.type === 'charset') {
            str = `@charset ${data.charset};${'\n'}${'\n'}`
        } else if (data.type === 'rule') {
            str = handlerRule(data)

        }
        return str
    }

    /**
     * 当type是rule时处理
     * @param data 需要处理的值
     * @returns {string} 返回 color: red
     */
    function handlerRule(data) {
        let str = `${data.selectors.join()} {${'\n'}`
        for (let i = 0, len = data.declarations.length; i < len; i++) {
            str += `${space()}${data.declarations[i].property}: ${data.declarations[i].value};${'\n'}`
        }
        str += `}`
        return str
    }

    /**
     * 生成空格
     * @returns {string}
     */
    function space() {
        let space = ''
        for (let i = 0; i < indent; i++) {
            space += ' '
        }
        return space
    }
}

