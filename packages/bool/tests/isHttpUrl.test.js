const { isHttpUrl } = require('../dist/isHttpUrl')

describe('isHttpUrl test', () => {
  test(`isHttpUrl('https://www.example.com')`, () => {
    expect(isHttpUrl('https://www.example.com')).toBe(true)
  })

  test(`isHttpUrl('www.example.com')`, () => {
    expect(isHttpUrl('www.example.com')).toBe(false)
  })

  test(`isHttpUrl('foo/bar')`, () => {
    expect(isHttpUrl('foo/bar')).toBe(false)
  })
})