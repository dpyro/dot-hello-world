// http://mochajs.org/

require('mocha')

const assert = require('assert')
const helloworld = require('../dist/index')

describe('#str', function () {
  it('should return a string with hello world', function () {
    const target = helloworld.str.toLowerCase()
    assert(target.includes('hello') && target.includes('world'))
  })
})
