import { isString } from './isString'

const HTTP_URL_REGEX = /^(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()!@:%_+.~#?&//=]*))$/

/**
 * 检查 `value` 是否是以 `http` 或 `https` 开头的url
 *
 * @example
 * ```ts
 * isHttpUrl('https://www.example.com')
 * // => true
 * isHttpUrl('www.example.com')
 * // => false
 * isHttpUrl('foo/bar')
 * // => false
 * ```
 */
export function isHttpUrl(value: unknown): value is string {
	return isString(value) && HTTP_URL_REGEX.test(value)
}
