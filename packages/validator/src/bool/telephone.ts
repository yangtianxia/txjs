import { isPhone } from '@txjs/bool'
import type { RuleFn } from '../types'

export const telephone: RuleFn = (value) => {
  return isPhone(value)
}
