import { is } from './is'

/**
 * 检查 `value` 是否是 `object` 类型，不包含 `null`
 *
 * @example
 * ```ts
 * isPlainObject({})
 * // => true
 * isPlainObject(null)
 * // => false
 * isPlainObject(new Object())
 * // => true
 * ```
 */
export function isPlainObject<T>(value: T): value is T extends Record<any, any> ? T : never {
	return value !== null && is(value, 'Object')
}