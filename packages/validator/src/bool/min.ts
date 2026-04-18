import type { RuleFn } from '../types'

export const min: RuleFn = (value, param) => {
  return value >= param
}
