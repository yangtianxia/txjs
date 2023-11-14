export function makeArray<T extends any>(): T[] | undefined
export function makeArray<T extends any>(defaultArr: T[]): T[]
export function makeArray<T extends any>(defaultArr: T[] | undefined = void 0) {
  return defaultArr
}
