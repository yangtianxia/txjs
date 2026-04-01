import { camelToKebab } from '../src/camelToKebab'

describe('camelToKebab', () => {
  test('converts camelCase', () => {
    expect(camelToKebab('TxJs')).toBe('tx-js')
    expect(camelToKebab('helloWorld')).toBe('hello-world')
  })

  test('converts PascalCase', () => {
    expect(camelToKebab('HelloWorld')).toBe('hello-world')
  })

  test('converts already kebab-case', () => {
    expect(camelToKebab('hello-world')).toBe('hello-world')
  })

  test('handles empty string', () => {
    expect(camelToKebab('')).toBe('')
  })

  test('handles single word', () => {
    expect(camelToKebab('hello')).toBe('hello')
  })

  test('handles consecutive uppercase', () => {
    expect(camelToKebab('XMLParser')).toBe('xmlparser')
  })
})
