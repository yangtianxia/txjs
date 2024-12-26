const { isNumeric } = require('../dist/isNumeric')

describe('isEmail test', () => {
  test(`isNumeric(3)`, () => {
    expect(isNumeric(3)).toBe(true)
  })

  test(`isNumeric('3.1415926')`, () => {
    expect(isNumeric('3.1415926')).toBe(true)
  })

  test(`isNumeric('0')`, () => {
    expect(isNumeric('0')).toBe(true)
  })

  test(`isNumeric('-1')`, () => {
    expect(isNumeric('-1')).toBe(true)
  })

  test(`isNumeric('-99.99')`, () => {
    expect(isNumeric('-99.99')).toBe(true)
  })
})