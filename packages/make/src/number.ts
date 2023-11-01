export function makeNumber(): number | undefined
export function makeNumber(defaultVal: number): number
export function makeNumber(defaultVal?: number) {
  return defaultVal
}

export function makeNumberMap<T = string[]>(keys: Array<keyof T>): Record<keyof T, number | undefined>
export function makeNumberMap<T = string[], U = number>(keys: Array<keyof T>, iteratee: (key: keyof T) => U): Record<keyof T, U>
export function makeNumberMap<T = string[], U = number | undefined>(keys: Array<keyof T>, iteratee?: (key: keyof T) => U) {
  const shallowCopy = [...keys]
	const obj = {} as Record<keyof T, U | undefined>

	while (shallowCopy.length) {
		const key = shallowCopy.pop()
		if (key) {
			obj[key] = iteratee ? iteratee(key) : void 0
		}
	}
	return obj
}