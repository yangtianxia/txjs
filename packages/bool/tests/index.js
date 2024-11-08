const bool = require('../dist/index.cjs.js')

console.log(bool.isArray([]))

console.log(bool.isEqual(12, 1))
console.log(bool.isEqual(false, true))
console.log(bool.isEqual([], []))
console.log(bool.isEqual([0, {}, []], [0, {}, []]))
console.log(bool.isEqual({}, {}))
console.log(bool.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }))
console.log(bool.isEqual(new Date('2013-09-06'), new Date('2023-09-06')))
console.log(bool.isEqual(new Date('2013-09-06'), new Date('2013-09-06')))
console.log(bool.isEqual(/^\s+/, /^\s+/))
console.log(bool.isEqual(/^\s+/, /^\S+/))