const clamp = require('../dist/clamp').default

describe('clamp test', () => {
  test('clamp(2, 10, 99)', () => {
    expect(clamp(2, 10, 99)).toBe(10)
  })

  test('clamp(100, 10, 99)', () => {
    expect(clamp(100, 10, 99)).toBe(99)
  })

  test('clamp(100, 10, 101)', () => {
    expect(clamp(100, 10, 101)).toBe(100)
  })
})