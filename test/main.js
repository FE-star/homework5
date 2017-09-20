const stringify = require('../lib/stringify')

const a = require('./source/a.json')
console.log(stringify(a))

const indent = require('./source/indent.json')
console.log(stringify(indent, 4))