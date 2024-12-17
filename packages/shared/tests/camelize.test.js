const { camelize } = require('../dist/camelize')

describe('camelize test', () => {
  test(`camelize('tx-js')`, () => {
    expect(camelize('tx-js')).toBe('txJs')
  })

  test(`camelize('Hello-World')`, () => {
    expect(camelize('Hello-World')).toBe('HelloWorld')
  })

  test(`camelize('a_bc')`, () => {
    expect(camelize('a_bc')).toBe('aBc')
  })
})