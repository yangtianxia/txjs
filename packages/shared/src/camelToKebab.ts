const RE = /([a-z])([A-Z])/g

/**
 * camelToKebab
 *
 * @example
 * ```ts
 * camelToKebab('TxJs')
 * // => tx-js
 * camelToKebab('helloWorld')
 * // => hello-world
 * ```
 */
export function camelToKebab(input = '') {
  return input.replace(RE, '$1-$2').toLowerCase()
}
