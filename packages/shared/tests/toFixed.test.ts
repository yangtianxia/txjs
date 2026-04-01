import { toFixed } from '../src/toFixed'

describe('toFixed', () => {
  test('returns integer by default', () => {
    expect(toFixed(3.1415926)).toBe(3)
    expect(toFixed(100)).toBe(100)
  })

  test('returns number with specified precision', () => {
    expect(toFixed(3.1415926, 2)).toBe(3.14)
    expect(toFixed(3.1415926, 4)).toBe(3.1415)
    expect(toFixed(3.1415926, 0)).toBe(3)
  })

  test('handles rounding', () => {
    expect(toFixed(3.145, 2)).toBe(3.14)
    expect(toFixed(3.145, 1)).toBe(3.1)
  })

  test('handles large numbers', () => {
    expect(toFixed(123456.789, 2)).toBe(123456.78)
  })

  test('handles small numbers', () => {
    expect(toFixed(0.001, 2)).toBe(0)
    expect(toFixed(0.005, 2)).toBe(0)
  })
})
