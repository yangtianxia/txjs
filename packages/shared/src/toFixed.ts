/**
 * toFixed
 *
 * @example
 * ```ts
 * toFixed(100)
 * // => 100
 * toFixed(100, 2)
 * // => 100
 * toFixed(3.1415926)
 * // => 3
 * toFixed(3.1415926, 2)
 * // => 3.14
 * ```
 */
export function toFixed(num: number, precision = 0) {
  const multiplier = Math.pow(10, precision)
  const wholeNum = Math.floor(num * multiplier)
  return wholeNum / multiplier
}
