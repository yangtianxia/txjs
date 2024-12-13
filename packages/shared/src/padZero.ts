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
export default function padZero(value: number | string, len = 2) {
	value = value.toString()
  while (value.length < len) {
    value = '0' + value
  }
  return value
}
