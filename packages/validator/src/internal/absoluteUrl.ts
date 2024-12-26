import { isAbsoluteUrl } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const absoluteUrl: ValidationRuleFunc = (value) => {
	return isAbsoluteUrl(value)
}
