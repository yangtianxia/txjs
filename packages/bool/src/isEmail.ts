import { isString } from './isString'

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/

/**
 * 检查 `value` 是否是 `email` 格式
 *
 * @example
 * ```ts
 * isEmail('example@gmail.com')
 * // => true
 * isEmail('example.com')
 * // => false
 * ```
 */
export function isEmail(value: unknown) {
  return isString(value) && value.length <= 320 && EMAIL_REGEX.test(value)
}
