/**
 * 检查 `value` 是否是正整数，正则 `/^\d+$/`
 *
 * @example
 * ```ts
 * isInteger(10)
 * // => true
 * isInteger(3.1415926)
 * // => false
 * isInteger(0.1)
 * // => false
 * ```
 */
export function isInteger(value: any): value is number {
  return /^\d+$/.test(value)
}