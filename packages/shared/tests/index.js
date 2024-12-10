const shared = require('../dist/index.cjs')

const arr = [{
  a: 1
}, {
  b: [{
    c: 1
  }]
}]

const arr1 = shared.cloneDeep(arr)

arr1[1].x = 6

arr[1].b[0].c = 5

console.log(JSON.stringify(arr))
console.log(JSON.stringify(arr1))

console.log(shared.padStr('abc', '-', 1))
console.log(shared.padStr('abc', '-', 2))
console.log(shared.padStr('abc', '-', 3))
console.log(shared.padStr('abc', '-', 0))
console.log(shared.padStr('abc', '-', -1))

console.log(shared.camelToKebab('TxJs'))
console.log(shared.camelToKebab('HelloWorld'))