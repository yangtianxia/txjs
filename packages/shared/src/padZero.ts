const reg = /^[0-9]$/

/**
 * 数值 `value` 小于 `10`, 则前置补充 `0` 字符
 *
 * @example
 * ```ts
 * padZero(1)
 * // => 01
 * padZero(5)
 * // => 05
 * padZero(10)
 * // => 10
 * ```
 */
export function padZero(value: number | string) {
	value = value.toString()

	if (reg.test(value)) {
		return `0${value}`
	}

	return value
}