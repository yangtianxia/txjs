import { isBlob } from '../src/isBlob'

describe('isBlob', () => {
  test('detects Blob objects', () => {
    expect(isBlob(new Blob(['111']))).toBe(true)
    expect(isBlob(new Blob(['test content']))).toBe(true)
    expect(isBlob(new Blob([], { type: 'image/png' }))).toBe(true)
  })

  test('rejects File objects', () => {
    expect(isBlob(new File(['111'], '1.txt'))).toBe(false)
    expect(isBlob(new File([], 'image.png', { type: 'image/png' }))).toBe(false)
  })

  test('rejects null', () => {
    expect(isBlob(null)).toBe(false)
  })

  test('rejects primitives', () => {
    expect(isBlob('123')).toBe(false)
    expect(isBlob(123)).toBe(false)
    expect(isBlob(true)).toBe(false)
    expect(isBlob(Symbol('test'))).toBe(false)
  })

  test('rejects objects', () => {
    expect(isBlob({})).toBe(false)
    expect(isBlob([])).toBe(false)
    expect(isBlob(new Date())).toBe(false)
  })

  test('rejects undefined', () => {
    expect(isBlob(undefined)).toBe(false)
  })
})
