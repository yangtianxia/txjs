/**
 * 检查 `value` 是否是 `undefined` 或 `null` 类型
 *
 * @example
 * ```ts
 * isNil(void 0)
 * // => true
 * isNil(null)
 * // => true
 * isNil('hello world')
 * // => false
 * isNil(123)
 * // => false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null
}
