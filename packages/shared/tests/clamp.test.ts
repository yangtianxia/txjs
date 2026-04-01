import { clamp } from '../src/clamp'

describe('clamp', () => {
  test('returns value when within range', () => {
    expect(clamp(50, 10, 99)).toBe(50)
    expect(clamp(10, 10, 99)).toBe(10)
    expect(clamp(99, 10, 99)).toBe(99)
  })

  test('clamps value below minimum', () => {
    expect(clamp(2, 10, 99)).toBe(10)
    expect(clamp(-50, 10, 99)).toBe(10)
    expect(clamp(0, 10, 99)).toBe(10)
  })

  test('clamps value above maximum', () => {
    expect(clamp(100, 10, 99)).toBe(99)
    expect(clamp(1000, 10, 99)).toBe(99)
  })

  test('works with decimal values', () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5)
    expect(clamp(-0.5, 0, 10)).toBe(0)
    expect(clamp(10.5, 0, 10)).toBe(10)
  })

  test('works with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(-15, -10, -1)).toBe(-10)
    expect(clamp(5, -10, -1)).toBe(-1)
  })
})
