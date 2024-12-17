/**
 * camelize
 *
 * @example
 * ```ts
 * camelize('tx-js')
 * // => txJs
 * camelize('Hello-World')
 * // => HelloWorld
 * ```
 */
export function camelize(value = '') {
  return value.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}
