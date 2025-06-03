/**
 * 检查 `value` 不是 `null` 或 `undefined` 类型
 *
 * @example
 * ```ts
 * notNil(void 0)
 * // => false
 * notNil(null)
 * // => false
 * notNil('hello world')
 * // => true
 * notNil(123)
 * // => true
 * ```
 */
export function notNil<T>(
  value: T
): value is T extends null | undefined ? never : T {
  return value != null
}
