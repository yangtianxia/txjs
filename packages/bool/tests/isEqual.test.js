const { isEqual } = require('../dist/isEqual')

describe('isEqual test', () => {
  test('isEqual(true, false)', () => {
    expect(isEqual(true, false)).toBe(false)
  })

  test('isEqual(false, false)', () => {
    expect(isEqual(false, false)).toBe(true)
  })

  test(`isEqual('0', '1')`, () => {
    expect(isEqual('0', '1')).toBe(false)
  })

  test('isEqual([], [])', () => {
    expect(isEqual([], [])).toBe(true)
  })

  test('isEqual([0, {}], [1, {}])', () => {
    expect(isEqual([0, {}], [1, {}])).toBe(false)
  })

  test('isEqual({}, {})', () => {
    expect(isEqual({}, {})).toBe(true)
  })

  test(`isEqual(new Date('2013-06-12'), new Date('2023-06-12'))`, () => {
    expect(isEqual(new Date('2013-06-12'), new Date('2023-06-12'))).toBe(false)
  })

  test(`isEqual(new Date('2023-06-12'), new Date('2023-06-12'))`, () => {
    expect(isEqual(new Date('2023-06-12'), new Date('2023-06-12'))).toBe(true)
  })

  test('isEqual(/^\s+/, /^\s+/)', () => {
    expect(isEqual(/^\s+/, /^\s+/)).toBe(true)
  })

  test('isEqual(/^\s+/, /^\S+/)', () => {
    expect(isEqual(/^\s+/, /^\S+/)).toBe(false)
  })
})