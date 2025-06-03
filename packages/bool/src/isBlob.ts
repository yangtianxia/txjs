import { is } from './is'

/**
 * 检查 `value` 是否是 `blob` 类型
 *
 * @example
 * ```ts
 * isBlob(new Blob(['111']))
 * // => true
 * isBlob(new File(['111'], '1.txt'))
 * // => false
 * isBlob(null)
 * // => false
 * isBlob('123')
 * // => false
 * ```
 */
export function isBlob(value: unknown): value is Blob {
  return is(value, 'Blob')
}
