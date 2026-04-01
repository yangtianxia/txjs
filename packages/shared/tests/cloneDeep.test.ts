import { cloneDeep } from '../src/cloneDeep'

describe('cloneDeep', () => {
  test('clones arrays', () => {
    const original = [1, 2, 3]
    const cloned = cloneDeep(original)
    expect(cloned).toEqual([1, 2, 3])
    expect(cloned).not.toBe(original)
  })

  test('clones objects', () => {
    const original = { a: 1, b: 2 }
    const cloned = cloneDeep(original)
    expect(cloned).toEqual({ a: 1, b: 2 })
    expect(cloned).not.toBe(original)
  })

  test('performs deep clone of nested structures', () => {
    const original = { a: { b: { c: 1 } }, arr: [1, [2, 3]] }
    const cloned = cloneDeep(original)
    expect(cloned).toEqual({ a: { b: { c: 1 } }, arr: [1, [2, 3]] })
    expect(cloned).not.toBe(original)
    expect(cloned.a).not.toBe(original.a)
    expect(cloned.arr).not.toBe(original.arr)
    expect(cloned.arr[1]).not.toBe(original.arr[1])
  })

  test('clones arrays with different value types', () => {
    const original = [1, 'string', true, null, undefined, { a: 1 }]
    const cloned = cloneDeep(original)
    expect(cloned).toEqual([1, 'string', true, null, undefined, { a: 1 }])
    expect(cloned).not.toBe(original)
    expect(cloned[5]).not.toBe(original[5])
  })

  test('handles empty array', () => {
    expect(cloneDeep([])).toEqual([])
  })

  test('handles empty object', () => {
    expect(cloneDeep({})).toEqual({})
  })

  test('preserves object prototype', () => {
    class MyClass {
      a = 1
      constructor() {}
    }
    const original = new MyClass()
    const cloned = cloneDeep(original)
    expect(cloned.a).toBe(1)
    expect(cloned).not.toBe(original)
  })
})
