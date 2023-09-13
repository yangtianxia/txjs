import { is } from './is'

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
export function isFunction<T>(value: T): value is T extends Function ? T : never {
  return is(value, 'Function')
}