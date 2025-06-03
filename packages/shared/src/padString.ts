/**
 * padString
 *
 * @example
 * ```ts
 * padString('txjs', '-', 2)
 * // => tx-js
 * padString('abc', '-', 0)
 * // => -abc
 * padString('abc', '-', -1)
 * // => ab-c
 * ```
 */
export function padString(text: string, value: string, index = 0) {
  return index === 0
    ? `${value}${text}`
    : `${text.slice(0, index)}${value}${text.slice(index)}`
}
