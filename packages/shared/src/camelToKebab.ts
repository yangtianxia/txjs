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
export default function camelToKebab(input = '') {
	return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
