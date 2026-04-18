import type { RuleFn } from '../types'
import { minlength } from './minlength'
import { maxlength } from './maxlength'

export const rangelength: RuleFn = (value, param) => {
  return minlength(value, param[0]) && maxlength(value, param[1])
}
