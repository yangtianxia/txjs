import type { RuleFn } from '../types'
import { min } from './min'
import { max } from './max'

export const range: RuleFn = (value, param) => {
  return min(value, param[0]) && max(value, param[1])
}
