/**
 * 检查 `value` 是否是 `null` 类型
 *
 * @example
 * ```ts
 * isNull(void 0)
 * // => false
 * isNull(null)
 * // => true
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null
}
