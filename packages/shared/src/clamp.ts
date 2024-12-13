/**
 * clamp
 *
 * @example
 * ```ts
 * clamp(2, 10, 99)
 * // => 10
 * clamp(100, 10, 99)
 * // => 99
 * ```
 */
export default function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max)
}
