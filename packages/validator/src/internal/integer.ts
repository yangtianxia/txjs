import { isInteger } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const integer: ValidationRuleFunc = (value) => {
	return isInteger(value)
}
