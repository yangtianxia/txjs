const { isBlob } = require('../dist/isBlob')

describe('isBlob test', () => {
  test(`isBlob(new Blob(['111']))`, () => {
    expect(isBlob(new Blob(['111']))).toBe(true)
  })

  test(`isBlob(new File(['111'], '1.txt'))`, () => {
    expect(isBlob(new File(['111'], '1.txt'))).toBe(false)
  })

  test(`isBlob(null)`, () => {
    expect(isBlob(null)).toBe(false)
  })

  test(`isBlob('123')`, () => {
    expect(isBlob('123')).toBe(false)
  })

  test(`isBlob({})`, () => {
    expect(isBlob({})).toBe(false)
  })
})
