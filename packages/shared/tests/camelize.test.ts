import { camelize } from '../src/camelize'

describe('camelize', () => {
  test('converts kebab-case', () => {
    expect(camelize('tx-js')).toBe('txJs')
    expect(camelize('hello-world')).toBe('helloWorld')
  })

  test('converts snake_case', () => {
    expect(camelize('a_bc')).toBe('aBc')
    expect(camelize('hello_world')).toBe('helloWorld')
  })

  test('converts mixed case', () => {
    expect(camelize('Hello-World')).toBe('HelloWorld')
  })

  test('handles empty string', () => {
    expect(camelize('')).toBe('')
  })

  test('handles single character', () => {
    expect(camelize('a')).toBe('a')
  })

  test('handles string with only delimiters', () => {
    expect(camelize('---')).toBe('---')
  })

  test('handles consecutive delimiters', () => {
    expect(camelize('hello--world')).toBe('hello-World')
  })
})
