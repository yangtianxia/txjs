import type { ValidatorRules, ValidatorRule as _ValidatorRule } from '@txjs/validator'
import type { Ref } from 'vue'
import { Validator, type BaseTrigger } from './validator'

const instance = new Validator()

const validator = Object.assign(
	(options: ValidatorRules<BaseTrigger>) => instance.init(options),
	instance
)

instance.$trigger = 'onChange'

export type ValidatorRule = _ValidatorRule<BaseTrigger, Ref<Error>>

export { validator }
export default Validator