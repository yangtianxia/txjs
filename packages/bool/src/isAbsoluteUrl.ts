import { isString } from './isString'

// https://github.com/sindresorhus/is-absolute-url

// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/

// Windows paths like `c:\`
const WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\/

/**
 * 检查 `value` 是否是 `url`
 *
 * @example
 * ```ts
 * isAbsoluteUrl('https://www.example.com')
 * // => true
 * isHttpUrl('www.example.com')
 * // => false
 * ```
 */
export function isAbsoluteUrl(value: unknown) {
	if (!isString(value)) {
		return false
	}
	if (WINDOWS_PATH_REGEX.test(value)) {
		return false
	}
	return ABSOLUTE_URL_REGEX.test(value)
}
