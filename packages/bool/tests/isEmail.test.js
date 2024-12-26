const { isEmail } = require('../dist/isEmail')

describe('isEmail test', () => {
  test(`isEmail('example@gmail.com')`, () => {
    expect(isEmail('example@gmail.com')).toBe(true)
  })

  test(`isEmail('example.com')`, () => {
    expect(isEmail('example.com')).toBe(false)
  })
})