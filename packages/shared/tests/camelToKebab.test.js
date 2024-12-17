const { camelToKebab } = require('../dist/camelToKebab')

describe('camelToKebab test', () => {
  test(`camelToKebab('TxJs')`, () => {
    expect(camelToKebab('TxJs')).toBe('tx-js')
  })

  test(`camelToKebab('helloWorld')`, () => {
    expect(camelToKebab('helloWorld')).toBe('hello-world')
  })
})