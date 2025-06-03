const { isNonEmptyObject } = require('../dist/isNonEmptyObject')

describe('isNonEmptyObject test', () => {
  test(`isNonEmptyObject({})`, () => {
    expect(isNonEmptyObject({})).toBe(false)
  })

  test(`isNonEmptyObject({a: 'text1'})`, () => {
    expect(isNonEmptyObject({ a: 'text1' })).toBe(true)
  })
})
