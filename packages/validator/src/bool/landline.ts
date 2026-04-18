import { isLandline } from '@txjs/bool'
import type { RuleFn } from '../types'

export const landline: RuleFn = (value) => {
  return isLandline(value)
}
