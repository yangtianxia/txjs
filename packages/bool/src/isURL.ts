const URL_REGEX = /^(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()!@:%_+.~#?&//=]*))$/

/**
 * 检查 `value` 是否是网址URL
 *
 * @deprecated since version 1.1.0
 *
 * @example
 * ```ts
 * isURL('https://www.example.com')
 * // => true
 * isURL('www.example.com')
 * // => false
 * ```
 */
export function isURL(value: unknown): value is string {
	return typeof value === 'string' && URL_REGEX.test(value)
}
