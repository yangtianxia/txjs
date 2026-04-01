import { isPromise } from '../src/isPromise'

describe('isPromise', () => {
  test('returns true for promises', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  test('returns false for non-promises', () => {
    expect(isPromise(() => {})).toBe(false)
    expect(isPromise({})).toBe(false)
    expect(isPromise([])).toBe(false)
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
  })
})
