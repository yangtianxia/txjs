import type { ValidationRuleFunc } from '../validation'

export const max: ValidationRuleFunc = (value, param) => {
	return value <= param
}
