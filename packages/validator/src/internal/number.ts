import { isNumeric } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const number: ValidationRuleFunc = (value) => {
	return isNumeric(value)
}
