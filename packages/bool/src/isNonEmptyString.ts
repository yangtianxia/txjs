/**
 * 检查 `value` 是否是长度不为0 `string` 类型
 *
 * @example
 * ```ts
 * isNoEmptyString(null)
 * // => false
 * isNoEmptyString('')
 * // => false
 * isNoEmptyString('hello world')
 * // => true
 * ```
 */
export function isNoEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}
