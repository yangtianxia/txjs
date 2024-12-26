import { isPhone } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const telephone: ValidationRuleFunc = (value) => {
	return isPhone(value)
}
