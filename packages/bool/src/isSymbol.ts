/**
 * 检查 `value` 是否是 `symbol` 类型
 *
 * @example
 * ```ts
 * const key = Symbol('key')
 * const key1 = 'key1'
 *
 * isSymbol(key)
 * // => true
 * isSymbol(key1)
 * // => false
 * ```
 */
export function isSymbol(value: unknown): value is symbol {
	return typeof value === 'symbol'
}
