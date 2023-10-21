export function makeArray<T = any>(): T[] | undefined
export function makeArray<T = any>(defaultArr: T[]): T[]
export function makeArray<T = any>(defaultArr?: T[]) {
  return defaultArr
}