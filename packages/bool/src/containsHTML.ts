import { isString } from './isString'

const HTML_REGEX = /<([a-zA-Z][a-zA-Z0-9]*)(\s+[a-zA-Z-]+(\s*=\s*(".*?"|'.*?'|[^"'<>]+))?)*\s*\/?>|<\/[a-zA-Z][a-zA-Z0-9]*>/

/**
 * 检查 `value` 是否是包含 `HTML`
 *
 * @example
 * ```ts
 * containsHTML('<div>Test</div>')
 * // => true
 * containsHTML('<img src='image.jpg' />')
 * // => true
 * containsHTML('</>')
 * // => false
 * containsHTML('1 < 2 && 3 > 4')
 * // => false
 * ```
 */
export function containsHTML(value: unknown): value is string {
	return isString(value) && HTML_REGEX.test(value)
}
