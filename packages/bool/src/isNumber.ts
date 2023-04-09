/**
 * 检查 `value` 是否是 `number` 类型，值不能为 `NaN`
 *
 * @example
 * ```ts
 * isNumber(3)
 * // => true
 * isNumber(3.1415)
 * // => true
 * isNumber('3.1415926')
 * // => false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

