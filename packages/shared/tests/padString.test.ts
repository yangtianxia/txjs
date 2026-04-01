import { padString } from '../src/padString'

describe('padString', () => {
  test('prepends value at index 0', () => {
    expect(padString('txjs', '-', 0)).toBe('-txjs')
    expect(padString('abc', '-', 0)).toBe('-abc')
  })

  test('inserts value at specified index', () => {
    expect(padString('txjs', '-', 2)).toBe('tx-js')
    expect(padString('abc', '-', 1)).toBe('a-bc')
  })

  test('handles negative index (inserts from end)', () => {
    expect(padString('abc', '-', -1)).toBe('ab-c')
  })

  test('handles index beyond string length', () => {
    expect(padString('abc', '-', 10)).toBe('abc-')
  })
})
