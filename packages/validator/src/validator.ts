import { isPlainObject, isNil, isNonEmptyString, isFunction, notNil, isPromise } from '@txjs/bool'
import { omit, toArray } from '@txjs/shared'
import { MessageSchema, ValidationSchema, type MessageLocaleObject, type ValidationObject, type ValidationRule } from './schema'
import { throwError, printWarn, formatTpl, formatTplByValue } from './utils'
import type { BaseTrigger, FieldType } from './types'

import messageSchema from './message'
import validationSchema from './validation'

type ExtractProp<T, K> = K extends keyof T ? T[K] : never

type PropConstructor<T = any> =
	| { new (...args: any[]): T & object }
	| { (): T }

export type PropType<T> = PropConstructor<T> | PropConstructor<T>[]

type Prop<T = any> = PropType<T>

type InferPropType<P> =
	P extends Prop<infer T>
		? unknown extends T
			? any
			: T
		: any

interface CustomValidatorRule<Trigger, Custom> {
	/** 触发事件 */
	trigger?: Trigger
	/** 自定义验证函数 */
	validator: Custom
}

export interface CustomValidatorFunc {
	(value: any, rule: any): Promise<void> | void
}

type ValidatorRuleValue<T> =
	T extends boolean
		? { value?: T }
		: { value: T }

type ValidatorRuleOption<Value, Template, Trigger> = ValidatorRuleValue<Value> & {
	/** 触发事件 */
	trigger?: Trigger
	/** 消息模版 */
	template?: Template
	/** 消息文本 */
	message?: string
}

type ExtractValidatorRules<Trigger, VO, MO> = {
	[K in keyof VO]:
		| InferPropType<ExtractProp<VO[K], 'type'>>
		| ValidatorRuleOption<InferPropType<ExtractProp<VO[K], 'type'>>, keyof ExtractProp<MO, K>, Trigger>
}

type ValidatorRule<Trigger, Custom, VO, MO> = Partial<ExtractValidatorRules<Trigger, VO, MO>> & {
	/** 数据类型 */
	type?: FieldType
	/** 标签文本 */
	label?: string
	/** 触发事件 */
	trigger?: Trigger
	/** 自定义函数 */
	custom?:
		| CustomValidatorRule<Trigger, Custom>
		| CustomValidatorRule<Trigger, Custom>[]
}

type ValidatorRules<T, Trigger, Custom, VO, MO> = Partial<Record<keyof T, ValidatorRule<Trigger, Custom, VO, MO>>>

type ReturnRuleType<Trigger, Custom, MessageType> = {
	type?: FieldType
	trigger?: Trigger
	rule?: string
	message?: MessageType
	validator: Custom
}

export class Validator<
	Trigger extends BaseTrigger,
	Custom extends CustomValidatorFunc,
	MessageType extends string,
	VO extends ValidationObject<Trigger>,
	MO extends MessageLocaleObject
> {
	#validationSchema: ValidationSchema<VO>
	#messageSchema: MessageSchema<MO>
	#defaultTrigger: Trigger

	constructor (config: {
		/** 全局默认触发事件 */
		trigger?: Trigger
		/** 验证器配置 */
		validationSchema: ValidationSchema<VO>
		/** 消息配置 */
		messageSchema: MessageSchema<MO>
		/** 语言 */
		locale?: keyof MO
	}) {
		const {
			messageSchema,
			validationSchema,
			locale,
			trigger = 'blur' as Trigger,
		} = config
		if (locale) {
			messageSchema.setLocale(locale)
		}
		this.#defaultTrigger = trigger
		this.#messageSchema = messageSchema
		this.#validationSchema = validationSchema
	}

	static messageSchema = messageSchema

	static validationSchema = validationSchema

	get currentLocale() {
		return this.#messageSchema.locale
	}

	hasValidator(name: string) {
		return !!this.#validationSchema.getItem(name)
	}

	hasMessage(name: string) {
		return !!this.#messageSchema.getMessage(name)
	}

	setTrigger(value: Trigger) {
		this.#defaultTrigger = value
	}

	setLocale(locale: keyof MO) {
		this.#messageSchema.setLocale(locale)
	}

	schema<T extends object>(config: ValidatorRules<T, Trigger, Custom, VO, MO>) {
		const rules = {} as Record<keyof T, ReturnRuleType<Trigger, Custom, MessageType>[]>
		for (const key in config) {
			rules[key] = this.#generate(key, config[key] || {})
		}
		return rules
	}

	#generate<K>(key: K, rule: ValidatorRule<Trigger, Custom, VO, MO>) {
		if (!isPlainObject(rule)) {
			throwError(`"${key}" the value of a must be an object.`)
		}

		const ruleList = [] as ReturnRuleType<Trigger, Custom, MessageType>[]
		const rest = omit(rule, [
			'type',
			'label',
			'trigger',
			'custom'
		])

		const { custom, label = '', type = 'string' as const } = rule

		for (const name in rest) {
			if (!this.hasValidator(name)) {
				printWarn(`"${name}" rule does not exist. Will be skipped.`)
				continue
			}

			const validation = this.#validationSchema.getItem(name)
			const ruleOption = rest[name as keyof typeof rest]
			const option = {
				param: ruleOption,
				trigger: rule.trigger || validation.trigger,
				template: 'default',
				message: ''
			}

			if (isPlainObject(ruleOption)) {
				const {
					value,
					trigger,
					template,
					message,
				} = ruleOption

				if (trigger) {
					option.trigger = trigger
				}

				if (notNil(value)) {
					option.param = value
				} else if (validation.type === Boolean) {
					option.param = true as any
				} else {
					throwError(`"${name}" rule 'value' cannot be empty.`)
				}

				if (isNonEmptyString(message)) {
					option.message = message
				} else if (template) {
					option.template = template
				}
			}

			ruleList.push(
				this.convert(
					name,
					rule,
					validation,
					{ type, label, ...option }
				)
			)
		}

		if (custom) {
			const customs = toArray(custom)
			for (let i = 0, len = customs.length; i < len; i++) {
				const { trigger, validator } = customs[i]
				if (!isFunction(validator)) {
					throwError(`"${key}" 'custom${[i]}.validator' value must be a function.`)
				}
				ruleList.push(
					this.convertCustom(
						`${key}-i`,
						rule,
						validator,
						{ type, label, trigger }
					)
				)
			}
		}

		return ruleList
	}

	convert(
		name: string,
		rule: Omit<ValidatorRule<Trigger, Custom, VO, MO>, 'type' | 'label' | 'trigger' | 'custom'>,
		validation: ValidationRule<Trigger>,
		other: {
			type?: FieldType
			label?: string
			param: any
			trigger?: Trigger
			template: string
			message: string
		}
	): ReturnRuleType<Trigger, Custom, MessageType> {
		const {
			type,
			label,
			param,
			trigger,
			template
		} = other
		const validators = toArray(validation.validator)
		return {
			type,
			rule: name,
			trigger: trigger || this.#defaultTrigger,
			validator: ((_, value) => {
				return new Promise<void>((resolve, reject) => {
					if ((isNil(rule.required) && !isNonEmptyString(value)) || param === false) {
						resolve()
					} else if (!validators.every((validator) => validator(value, param, type))) {
						let message = other.message
						if (isNonEmptyString(message)) {
							message = formatTpl({ label, message, param })
						} else if (template) {
							const messages = toArray(this.#messageSchema.getMessage(name)[template])
							if (label) {
								messages.splice(1, 1, label)
							}
							message = formatTpl({
								param,
								message: messages[0],
								label: messages[1]
							})
						} else {
							printWarn(`"${name}" rule 'tpl' value does not exist.`)
						}
						reject(new Error(formatTplByValue(message, value)))
					} else {
						resolve()
					}
				})
			}) as Custom
		}
	}

	convertCustom(
		name: string,
		rule: Omit<ValidatorRule<Trigger, Custom, VO, MO>, 'type' | 'label' | 'trigger' | 'custom'>,
		validator: Custom,
		{
			type,
			label,
			trigger
		}: {
			type?: FieldType
			label: string
			trigger?: Trigger
		}
	): ReturnRuleType<Trigger, Custom, MessageType>  {
		return {
			type,
			rule: name,
			trigger: trigger || this.#defaultTrigger,
			validator: ((_, value) => {
				return new Promise<void>((resolve, reject) => {
					if (isNil(rule.required) && !isNonEmptyString(value)) {
						resolve()
					} else {
						const promify = validator(_, value)
						if (isPromise(promify)) {
							promify
								.then(resolve)
								.catch((error: Error) => {
									const message = formatTpl({
										label,
										message: error.message
									})
									reject(new Error(formatTplByValue(message, value)))
								})
						} else {
							resolve()
						}
					}
				})
			}) as Custom
		}
	}
}
