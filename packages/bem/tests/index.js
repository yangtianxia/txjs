const BEM = require('../dist/index.cjs').default

BEM.config({
  mode: 'always',
  prefix: 'txjs'
})

const [nameTest, bemTest] = BEM('test')

const [name, bem] = BEM('test-less', {})

console.log(nameTest)
console.log(bemTest())
console.log(bemTest('header'))
console.log(bemTest('card-title'))

console.log(name)
console.log(bem())