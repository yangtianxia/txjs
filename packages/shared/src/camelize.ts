/**
 * 字符串驼峰式
 *
 * @example
 * ```ts
 * camelize('-a-b-c')
 * // => ABC
 * camelize('a-b')
 * // => aB
 * ```
 */
export function camelize(value = '') {
  return value.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}