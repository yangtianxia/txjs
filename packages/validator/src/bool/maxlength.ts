import type { RuleFn } from '../types'

export const maxlength: RuleFn = (value, param) => {
  return value.length <= param
}
