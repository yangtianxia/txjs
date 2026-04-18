import type { RuleFn } from '../types'

export const max: RuleFn = (value, param) => {
  return value <= param
}
