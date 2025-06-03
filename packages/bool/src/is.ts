const ø = Object.create(Object.prototype)

export function toString(value: unknown): string {
  return ø.toString.call(value).slice(8, -1)
}

/**
 * 验证 `value` 值类型
 *
 * @example
 * ```ts
 * is(new Array(), 'Array')
 * // => true
 * is({}, 'Object')
 * // => true
 * is(1, 'Number')
 * // => true
 * is(undefined, 'Undefined')
 * // => true
 * is(null, 'Null')
 * // => true
 * is(Symbol('key'), 'Symbol')
 * // => true
 * ```
 */
export function is<T = boolean>(value: unknown, type: string): value is T {
  return toString(value) === type
}
