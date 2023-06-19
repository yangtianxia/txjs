import { Validator, type ValidatorRules, type BaseTrigger } from './validator'
import { extend } from './shared/extend'

const instance = new Validator<BaseTrigger, string>()

const validator = Object.assign(
	(options: ValidatorRules<BaseTrigger>) => instance.init(options),
	instance
)

extend(validator, instance, Validator.prototype)

export type {
	ValidatorConfigObject,
	RuleType,
	ValidatorConfig,
	DefaultsValidatorRules,
	CustomValidatorRules,
	Rule,
	BaseTrigger,
	ValidatorRules,
	ValidatorRule,
	CustomValidatorFunction
} from './validator'

export * from './shared/formatTpl'
export * from './shared/extend'

export { validator }
export default Validator