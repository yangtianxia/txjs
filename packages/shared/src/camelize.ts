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
export default function camelize(value = '') {
  return value.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}
