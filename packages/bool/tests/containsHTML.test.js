const { containsHTML } = require('../dist/containsHTML')

describe('containsHTML test', () => {
  test(`containsHTML('<div>Test</div>')`, () => {
    expect(containsHTML('<div>Test</div>')).toBe(true)
  })

  test(`containsHTML('<img src='image.jpg' />')`, () => {
    expect(containsHTML(`<img src='image.jpg' />`)).toBe(true)
  })

  test(`containsHTML('</>')`, () => {
    expect(containsHTML('</>')).toBe(false)
  })

  test(`containsHTML('1 < 2 && 3 > 4')`, () => {
    expect(containsHTML('1 < 2 && 3 > 4')).toBe(false)
  })
})