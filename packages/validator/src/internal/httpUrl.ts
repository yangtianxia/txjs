import { isHttpUrl } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const httpUrl: ValidationRuleFunc = (value) => {
	return isHttpUrl(value)
}
