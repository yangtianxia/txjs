import type { RuleFn } from '../types'

export const contains: RuleFn = (value, parma) => {
  return value.indexOf(parma) !== -1
}
