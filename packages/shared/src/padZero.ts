/**
 * padZero
 *
 * @example
 * ```ts
 * padZero(1)
 * // => 01
 * padZero(5)
 * // => 05
 * padZero(10)
 * // => 10
 * padZero(1, 3)
 * // => 001
 * ```
 */
export function padZero(value: number | string, len = 2) {
  let tempValue = value.toString()
  while (tempValue.length < len) {
    tempValue = '0' + tempValue
  }
  return tempValue
}
