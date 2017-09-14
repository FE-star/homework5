const assert = require('assert')
const path = require('path')
const fs = require('fs')
const stringify = require('../lib/stringify')

describe('css stringify', function () {
  it('可以正确的 stringify 文件', function () {
    const a = require('./source/a.json')
    console.log('stringify(a)',stringify(a))
    assert(
      stringify(a),
      fs.readFileSync(path.join(__dirname, './expect/a.css'), 'utf-8')
    )
  })

  it('可以使用 indent', function () {
    const indent = require('./source/indent.json')
    assert(
      stringify(indent, 4),
      fs.readFileSync(path.join(__dirname, './expect/indent.css'), 'utf-8')
    )
  })
})