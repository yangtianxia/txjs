import { isArray, notNil, isString } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const required: ValidationRuleFunc = (value, param, type) => {
	if (type === 'array') {
		return isArray(value) && value.length > 0
	}
	if (isString(value)) {
		return value.trim().length > 0
	}
	return notNil(value)
}
