/**
 * 检查 `value` 是否是 `boolean` 类型
 *
 * @example
 * ```ts
 * isBoolean(true)
 * // => true
 * isBoolean(false)
 * // => true
 * isBoolean(123)
 * // => false
 * ```
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}
