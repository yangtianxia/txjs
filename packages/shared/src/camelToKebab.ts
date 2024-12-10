/**
 * camelToKebab
 *
 * @example
 * ```ts
 * camelToKebab('TxJs')
 * // => tx-js
 * camelToKebab('HelloWorld')
 * // => hello-world
 * ```
 */
export function camelToKebab(input = '') {
	return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
