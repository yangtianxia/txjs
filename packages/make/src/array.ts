export function makeArray<T>(): T[] | undefined
export function makeArray<T>(defaultArr: T[]): T[]
export function makeArray<T>(defaultArr: T[] | undefined = void 0) {
  return defaultArr
}
