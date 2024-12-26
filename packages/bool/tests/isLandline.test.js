const { isLandline } = require('../dist/isLandline')

describe('isLandline test', () => {
  test(`isLandline('13215666')`, () => {
    expect(isLandline('13215666')).toBe(false)
  })

  test(`isLandline('0592-5966633')`, () => {
    expect(isLandline('0592-5966633')).toBe(true)
  })

  test(`isLandline('0592-5966633-123')`, () => {
    expect(isLandline('0592-5966633-123')).toBe(true)
  })
})