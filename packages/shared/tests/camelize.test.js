const camelize = require('../dist/camelize').default

describe('camelize test', () => {
  test('camelize(\'tx-js\')', () => {
    expect(camelize('tx-js')).toBe('txJs')
  })

  test('camelize(\'Hello-World\')', () => {
    expect(camelize('Hello-World')).toBe('HelloWorld')
  })

  test('camelize()', () => {
    expect(camelize()).toBe('')
  })
})