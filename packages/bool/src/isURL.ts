import { isNil } from './isNil'

const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

/**
 * 检查 `value` 是否是网址URL
 *
 * @example
 * ```ts
 * isURL('https://www.example.com')
 * // => true
 * isURL('www.example.com')
 * // => false
 * ```
 */
export function isURL(value: any): value is string {
	if (isNil(value)) {
		return false
	}

	return reg.test(value)
}