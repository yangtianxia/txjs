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
export function isFunction(value: unknown): value is (...args: any) => any
export function isFunction<T>(value: T): value is T extends Function ? T : never {
  return typeof value === 'function'
}
