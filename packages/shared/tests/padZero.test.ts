import { padZero } from '../src/padZero'

describe('padZero', () => {
  test('pads single digit numbers by default', () => {
    expect(padZero(1)).toBe('01')
    expect(padZero(5)).toBe('05')
    expect(padZero(9)).toBe('09')
  })

  test('does not pad double digit numbers by default', () => {
    expect(padZero(10)).toBe('10')
    expect(padZero(99)).toBe('99')
  })

  test('pads to specified length', () => {
    expect(padZero(1, 3)).toBe('001')
    expect(padZero(1, 4)).toBe('0001')
    expect(padZero(10, 3)).toBe('010')
    expect(padZero(10, 4)).toBe('0010')
  })

  test('handles string numbers', () => {
    expect(padZero('1')).toBe('01')
    expect(padZero('5', 3)).toBe('005')
  })

  test('handles zero', () => {
    expect(padZero(0)).toBe('00')
    expect(padZero(0, 3)).toBe('000')
  })
})
