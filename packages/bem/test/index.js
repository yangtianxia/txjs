const BEM = require('../dist/index.cjs')

BEM.config({
  debugger: true
})

const [nameTest, bemTest] = BEM('test')

const [name, bem] = BEM('test-less', {
  sp1: 'sp1_klpds',
  sp2: 'sp2_jdljf'
})

console.log(bemTest())

console.log(bem())