import type { RuleFn } from '../types'

export const minlength: RuleFn = (value, param) => {
  return value.length >= param
}
