const { is } = require('../dist/is')

describe('is test', () => {
  test(`is(new Array(), 'Array')`, () => {
    expect(is(new Array(), 'Array')).toBe(true)
  })

  test(`is({}, 'Object')`, () => {
    expect(is({}, 'Object')).toBe(true)
  })

  test(`is(1, 'Number')`, () => {
    expect(is(1, 'Number')).toBe(true)
  })

  test(`is(undefined, 'Undefined')`, () => {
    expect(is(undefined, 'Undefined')).toBe(true)
  })

  test(`is(null, 'Null')`, () => {
    expect(is(null, 'Null')).toBe(true)
  })

  test(`is(Symbol('key'), 'Symbol')`, () => {
    expect(is(Symbol('key'), 'Symbol')).toBe(true)
  })
})