import { isArray } from './isArray'

/**
 * 检查两个值是否相等
 *
 * @example
 * ```ts
 * isEqual(true, false)
 * // => false
 *  isEqual(false, false)
 * // => true
 * isEqual('0', '1')
 * // => false
 * isEqual([], [])
 * // => true
 * isEqual([0, {}], [1, {}])
 * // => false
 * isEqual({}, {})
 * // => true
 * isEqual(new Date('2013-06-12'), new Date('2023-06-12'))
 * // => false
 * isEqual(new Date('2023-06-12'), new Date('2023-06-12'))
 * // => true
 * isEqual(/^\s+/, /^\s+/)
 * // => true
 * isEqual(/^\s+/, /^\S+/)
 * // => false
 * ```
 */
export function isEqual(value: any, other: any, seen = new WeakMap()) {
	if (value === other) {
		return true
	}

	if (typeof value !== 'object' || typeof other !== 'object') {
		return false
	}

	if (value instanceof Date && other instanceof Date) {
		return value.getTime() === other.getTime()
	}

	if (value instanceof RegExp && other instanceof RegExp) {
		return value.toString() === other.toString()
	}

	if (seen.has(value)) {
		return seen.get(value) === other
	}

	seen.set(value, other)

	if (isArray(value) && isArray(other)) {
		if (value.length !== other.length) {
			return false
		}

		for (let i = 0, len = value.length; i < len; i++) {
			if (!isEqual(value[i], other[i], seen)) {
				return false
			}
		}

		return true
	}

	const valueKeys = Object.keys(value)
	const otherKeys = Object.keys(value)

	if (valueKeys.length !== otherKeys.length) {
		return false
	}

	for (const key in valueKeys) {
		if (!other.hasOwnProperty(key) || !isEqual(value[key], other[value], seen)) {
			return false
		}
	}

	return true
}