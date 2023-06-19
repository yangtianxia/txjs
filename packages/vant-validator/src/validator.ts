import BaseValidator, { formatTpl, type ValidatorConfigObject, type Rule, type ValidatorRule, type ValidatorConfig, type CustomValidatorFunction } from '@txjs/validator'
import { ref, type Ref } from 'vue'
import { toArray } from '@txjs/shared'
import { isNil, isValidString, isFunction, isArray, isPlainObject } from '@txjs/bool'

type TriggerText = 'onChange' | 'onBlur'

export type BaseTrigger = TriggerText | TriggerText[]

export class Validator<Trigger = BaseTrigger, Message = Ref<Error | undefined>> extends BaseValidator<Trigger,	Message> {
	constructor (config?: ValidatorConfigObject<Trigger>) {
		super(config)
	}

	trigger(values: any): Trigger {
		values = toArray(values)
		return values.map((trigger: string) => {
			switch (trigger) {
				case 'change':
					return 'onChange'
				case 'blur':
					return 'blur'
			}
		})
	}

	transform(
		ruleName: string,
		{
			value,
			label,
			trigger,
			rule,
			tpl
		}: {
			value: any;
			label?: string | undefined;
			trigger: Trigger;
			rule: Omit<Rule<Trigger>, 'label' | 'trigger' | 'custom'>;
			tpl: {
				type: string;
				value?: string | undefined
			}
		},
		plan: ValidatorConfig<Trigger>
	): ValidatorRule<Trigger, any>{
		const message = ref<Error>()
		trigger = this.trigger(trigger)
		return {
			ruleName,
			trigger,
			message,
			validator: ($$$value) => {
				return new Promise((resolve) => {
					message.value = undefined
					// 忽略不是必须项且不是有效值
					// 忽略值为false
					if ((isNil(rule.required) && !isValidString($$$value)) || $$$value === false) {
						resolve(true)
					} else {
						if (
							(isFunction(plan.preset) && !plan.preset($$$value, value, tpl.type)) ||
							(isArray(plan.preset) && !plan.preset.every((preset) => preset($$$value, value, tpl.type)))
						) {
							message.value =	new Error(
								formatTpl(
									tpl.value || (isPlainObject(plan.tpl) ? plan.tpl[tpl.type] : plan.tpl),
									plan.inject ? $$$value : value,
									label
								)
							)
							resolve(false)
						} else {
							resolve(true)
						}
					}
				})
			}
		}
	}

	tranformCustom(
		ruleName: string,
		validator: CustomValidatorFunction,
		{
			label,
			trigger,
			rule
		}: {
			label?: string | undefined;
			trigger: Trigger;
			rule: Omit<Rule<Trigger>, 'label' | 'trigger' | 'custom'>
		}
	): ValidatorRule<Trigger, any> {
		const message = ref<Error>()
		trigger = this.trigger(trigger)
		return {
			ruleName,
			trigger,
			message,
			validator: (_, $$$value) => {
				return new Promise((resolve) => {
					message.value = undefined
					if (isNil(rule.required) && !isValidString($$$value)) {
						resolve(true)
					} else {
						validator($$$value, _)
							.then(() => {
								resolve(true)
							})
							.catch((err: Error) => {
								message.value = new Error(
									formatTpl(err.message, undefined, label)
								)
								resolve(false)
							})
					}
				})
			}
		}
	}
}