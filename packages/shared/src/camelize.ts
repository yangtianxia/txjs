const RE = /[-_](\w)/g

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
  return value.replace(RE, (_, c) => c.toUpperCase())
}
