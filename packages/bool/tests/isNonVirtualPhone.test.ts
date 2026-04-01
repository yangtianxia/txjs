import { isNonVirtualPhone } from '../src/isNonVirtualPhone'

describe('isNonVirtualPhone', () => {
  describe('valid non-virtual phone numbers', () => {
    test('China Mobile prefixes', () => {
      expect(isNonVirtualPhone('13566667777')).toBe(true)
      expect(isNonVirtualPhone('13612345678')).toBe(true)
      expect(isNonVirtualPhone('13712345678')).toBe(true)
      expect(isNonVirtualPhone('13812345678')).toBe(true)
      expect(isNonVirtualPhone('13912345678')).toBe(true)
    })

    test('China Unicom prefixes', () => {
      expect(isNonVirtualPhone('13012345678')).toBe(true)
      expect(isNonVirtualPhone('13112345678')).toBe(true)
      expect(isNonVirtualPhone('13212345678')).toBe(true)
      expect(isNonVirtualPhone('14512345678')).toBe(true)
      expect(isNonVirtualPhone('14612345678')).toBe(true)
    })

    test('China Telecom prefixes', () => {
      expect(isNonVirtualPhone('13312345678')).toBe(true)
      expect(isNonVirtualPhone('15312345678')).toBe(true)
      expect(isNonVirtualPhone('18012345678')).toBe(true)
      expect(isNonVirtualPhone('18912345678')).toBe(true)
      expect(isNonVirtualPhone('19912345678')).toBe(true)
    })
  })

  describe('virtual phone numbers (should return false)', () => {
    test('170 prefix', () => {
      expect(isNonVirtualPhone('17012345678')).toBe(false)
    })

    test('171 prefix', () => {
      expect(isNonVirtualPhone('17112345678')).toBe(false)
    })

    test('177 prefix', () => {
      expect(isNonVirtualPhone('17712345678')).toBe(false)
    })

    test('178 prefix', () => {
      expect(isNonVirtualPhone('17812345678')).toBe(false)
    })

    test('190 prefix', () => {
      expect(isNonVirtualPhone('19012345678')).toBe(false)
    })
  })

  describe('invalid inputs', () => {
    test('wrong length', () => {
      expect(isNonVirtualPhone('1356666777')).toBe(false) // too short
      expect(isNonVirtualPhone('135666677777')).toBe(false) // too long
    })

    test('wrong prefix', () => {
      expect(isNonVirtualPhone('13215666')).toBe(false) // too short
    })

    test('non-string types', () => {
      expect(isNonVirtualPhone(null)).toBe(false)
      expect(isNonVirtualPhone(undefined)).toBe(false)
      expect(isNonVirtualPhone(13566667777)).toBe(false)
      expect(isNonVirtualPhone({})).toBe(false)
    })
  })
})
