import { shallowMerge } from '../src/shallowMerge'

describe('shallowMerge', () => {
  test('merges objects', () => {
    const target = { a: 1 }
    const source = { b: 2 }
    expect(shallowMerge(target, source)).toEqual({ a: 1, b: 2 })
  })

  test('source properties override target properties', () => {
    const target = { a: 1, b: 2 }
    const source = { b: 3, c: 4 }
    expect(shallowMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 })
  })

  test('returns the target object', () => {
    const target = { a: 1 }
    const source = { b: 2 }
    const result = shallowMerge(target, source)
    expect(result).toBe(target)
  })

  test('merges multiple objects', () => {
    const target = { a: 1 }
    const source1 = { b: 2 }
    const source2 = { c: 3 }
    expect(shallowMerge(target, source1, source2)).toEqual({ a: 1, b: 2, c: 3 })
  })
})
