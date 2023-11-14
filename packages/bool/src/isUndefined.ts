/**
 * 检查 `value` 是否是 `undefined` 类型
 *
 * @example
 * ```ts
 * isUndefined(void 0)
 * // => true
 * isUndefined(null)
 * // => false
 * ```
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}
