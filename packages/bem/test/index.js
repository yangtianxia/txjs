const BEM = require('../dist/index.cjs')

BEM.config({
  debugger: true,
  prefixer: {
    page: 'pages',
    comp: 'comps'
  }
})

const [nameTest, bemTest] = BEM('test')

const [name, bem] = BEM('test-less', {})

console.log(nameTest)
console.log(bemTest())

console.log(name)
console.log(bem())