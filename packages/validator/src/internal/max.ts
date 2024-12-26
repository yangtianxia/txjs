import type { ValidationRuleFunc } from '../schema'

export const max: ValidationRuleFunc = (value, param) => {
	return value <= param
}
