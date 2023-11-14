import { is } from './is'

/**
 * 检查 `value` 是否是 `array`
 *
 * @example
 * ```ts
 * isArray(new Array())
 * // => true
 * isArray([1,2,3])
 * // => true
 * isArray(null)
 * // => false
 * ```
 */
export function isArray<T>(value: T): value is T extends Array<any> ? T : never {
	return 'isArray' in Array ? Array.isArray(value) : is(value, 'Array')
}
