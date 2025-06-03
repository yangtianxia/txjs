import { is } from './is'

/**
 * 检查 `value` 是否是 `async function` 类型
 *
 * @example
 * ```ts
 * const func = async () => {}
 * const func1 = () => {}
 *
 * isAsyncFunction(func)
 * // => true
 * isAsyncFunction(func1)
 * // => false
 * isAsyncFunction(null)
 * // => false
 * ```
 */
export function isAsyncFunction(
  value: unknown
): value is (...args: any[]) => unknown {
  return is(value, 'AsyncFunction')
}
