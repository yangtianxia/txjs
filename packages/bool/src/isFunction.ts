/**
 * 检查 `value` 是否是 `function` 类型
 *
 * @example
 * ```ts
 * const func = () => {}
 *
 * isFunction(func)
 * // => true
 * isFunction(null)
 * // => false
 * ```
 */
export function isFunction(
  value: unknown
): value is (...args: any[]) => unknown {
  return typeof value === 'function'
}
