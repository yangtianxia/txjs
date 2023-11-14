/**
 * 检查 `value` 是否是 `string` 类型
 *
 * @example
 * ```ts
 * isString('')
 * // => true
 * isString(1)
 * // => false
 * isString(false)
 * // => false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
