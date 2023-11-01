export function makeString(): string | undefined
export function makeString<T>(defaultVal?: T): T
export function makeString<T>(defaultVal: string): string | T
export function makeString(defaultVal?: string) {
  return defaultVal
}

export function makeStringMap<T = string[]>(keys: Array<keyof T>): Record<keyof T, string | undefined>
export function makeStringMap<T = string[], U = string>(keys: Array<keyof T>, iteratee: (key: keyof T) => U): Record<keyof T, U>
export function makeStringMap<T = string[], U = string | undefined>(keys: Array<keyof T>, iteratee?: (key: keyof T) => U) {
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
