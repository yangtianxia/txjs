const { isNonVirtualPhone } = require('../dist/isNonVirtualPhone')

describe('isNonVirtualPhone test', () => {
  test(`isNonVirtualPhone('13566667777')`, () => {
    expect(isNonVirtualPhone('13566667777')).toBe(true)
  })

  test(`isNonVirtualPhone('17012345678')`, () => {
    expect(isNonVirtualPhone('17012345678')).toBe(false)
  })

  test(`isNonVirtualPhone('17712345678')`, () => {
    expect(isNonVirtualPhone('17712345678')).toBe(false)
  })

  test(`isNonVirtualPhone('19012345678')`, () => {
    expect(isNonVirtualPhone('19012345678')).toBe(false)
  })

  test(`isNonVirtualPhone('13987654321')`, () => {
    expect(isNonVirtualPhone('13987654321')).toBe(true)
  })
})