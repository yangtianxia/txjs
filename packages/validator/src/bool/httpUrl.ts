import { isHttpUrl } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const httpUrl: ValidationRuleFunc = (value) => {
	return isHttpUrl(value)
}
