import { forEachObject } from '../src/forEachObject'

describe('forEachObject', () => {
  test('iterates over object keys and values', () => {
    const obj = { a: 1, b: 2 }
    const keys: string[] = []
    const values: number[] = []

    forEachObject(obj, (key, value) => {
      keys.push(key)
      values.push(value)
    })

    expect(keys).toEqual(['a', 'b'])
    expect(values).toEqual([1, 2])
  })

  test('iterates over empty object', () => {
    const obj = {}
    const calls: string[] = []

    forEachObject(obj, (key) => {
      calls.push(key)
    })

    expect(calls).toEqual([])
  })

  test('iterates over object with various value types', () => {
    const obj = { a: 1, b: 'hello', c: true, d: null }
    const entries: [string, any][] = []

    forEachObject(obj, (key, value) => {
      entries.push([key, value])
    })

    expect(entries).toEqual([
      ['a', 1],
      ['b', 'hello'],
      ['c', true],
      ['d', null],
    ])
  })
})
