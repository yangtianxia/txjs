import { isInteger } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const integer: ValidationRuleFunc = (value) => {
	return isInteger(value)
}
