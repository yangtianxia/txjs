import { containsHTML } from '../src/containsHTML'

describe('containsHTML', () => {
  describe('valid HTML strings', () => {
    test('basic tags', () => {
      expect(containsHTML('<div>Test</div>')).toBe(true)
      expect(containsHTML('<span>Content</span>')).toBe(true)
      expect(containsHTML('<p>Paragraph</p>')).toBe(true)
    })

    test('self-closing tags', () => {
      expect(containsHTML('<img src="image.jpg" />')).toBe(true)
      expect(containsHTML('<br />')).toBe(true)
      expect(containsHTML('<input type="text" />')).toBe(true)
    })

    test('tags with attributes', () => {
      expect(containsHTML('<img src="image.jpg" alt="test" />')).toBe(true)
      expect(containsHTML('<a href="https://example.com">Link</a>')).toBe(true)
    })

    test('nested tags', () => {
      expect(containsHTML('<div><span>Nested</span></div>')).toBe(true)
    })
  })

  describe('strings that look like HTML but are not', () => {
    test('incomplete tags', () => {
      expect(containsHTML('</>')).toBe(false)
      expect(containsHTML('<')).toBe(false)
      expect(containsHTML('>')).toBe(false)
    })

    test('comparison operators', () => {
      expect(containsHTML('1 < 2 && 3 > 4')).toBe(false)
      expect(containsHTML('a < b')).toBe(false)
      expect(containsHTML('x > y')).toBe(false)
    })

    test('angle brackets in text', () => {
      expect(containsHTML('3 < 5')).toBe(false)
      expect(containsHTML('10 > 5')).toBe(false)
    })
  })

  describe('non-string types', () => {
    test('returns false for non-string inputs', () => {
      expect(containsHTML(null)).toBe(false)
      expect(containsHTML(undefined)).toBe(false)
      expect(containsHTML(123)).toBe(false)
      expect(containsHTML({})).toBe(false)
      expect(containsHTML([])).toBe(false)
    })
  })

  describe('empty strings', () => {
    test('empty string returns false', () => {
      expect(containsHTML('')).toBe(false)
    })
  })
})
