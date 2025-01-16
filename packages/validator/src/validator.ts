import { omit, toArray } from '@txjs/shared'
import {
	isPlainObject,
	isNil,
	isNonEmptyString,
	isString,
	isFunction,
	notNil,
	isPromise
} from '@txjs/bool'

import { Message, type MessageObject } from './message'
import {
	Validation,
	type ValidationObject,
	type ValidationRule
} from './validation'
import {
	throwError,
	printWarn,
	formatTpl,
	formatTplByValue
} from './utils'
import type {
	ExtractProp,
	ExtractPropOf,
	InferPropType,
	BaseTrigger,
	FieldType
} from './types'

type ErrorPhase = 'pre' | 'sync'

export interface CustomValidatorFn {
	(value: any, rule: any): Promise<void> | void
}

interface CustomValidatorRule<Trigger, Custom> {
	/** 触发事件 */
	trigger?: Trigger
	/** 自定义验证函数 */
	validator: Custom
}

type ValidatorRuleValue<Value, Template> =
	Value extends boolean
		? Template | { value?: Value }
		: { value: Value }

type ValidatorRuleOption<Value, Template, Trigger> = ValidatorRuleValue<Value, Template> | {
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
		| ValidatorRuleOption<InferPropType<ExtractProp<VO[K], 'type'>>, ExtractPropOf<MO, K>, Trigger>
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

type ReturnRuleType<Trigger, Custom, MsgType> = {
	type?: FieldType
	trigger?: Trigger
	rule?: string
	message?: MsgType
	validator: Custom
}

export class Validator<
	Trigger extends BaseTrigger,
	CustomFn extends CustomValidatorFn,
	MsgType extends string,
	VO extends ValidationObject<Trigger>,
	MO extends MessageObject
> {
	#trigger = 'blur'as Trigger
	#errorPhase = 'pre' as ErrorPhase
	#locale: string
	#validation: Validation<VO>
	#messages: Record<string, Message<MO>>

	constructor (config: {
		/** 全局默认触发事件 */
		trigger?: Trigger
		/** 错误生成阶段 */
		errorPhase?: ErrorPhase
		/** 默认语言配置 */
		locale: string
		/** 验证器配置 */
		validation: Validation<VO>
		/** 消息配置 */
		messages: Record<string, Message<MO>>
	}) {
		if (config.trigger) {
			this.#trigger = config.trigger
		}
		if (config.errorPhase) {
			this.#errorPhase = config.errorPhase
		}
		this.#locale = config.locale
		this.#validation = config.validation
		this.#messages = config.messages
	}

	get trigger() {
		return this.#trigger
	}

	get errorPhase() {
		return this.#errorPhase
	}

	get locale() {
		return this.#locale
	}

	get validation() {
		return this.#validation
	}

	get messages() {
		return this.#messages
	}

	get message() {
		return this.messages[this.locale] || {}
	}

	setTrigger(value: Trigger) {
		this.#trigger = value
	}

	setLocale(locale: string) {
		if (locale in this.messages) {
			this.#locale = locale
		} else {
			printWarn(`"${locale}" locale does not exist.`)
		}
	}

	schema<T extends object>(config: ValidatorRules<T, Trigger, CustomFn, VO, MO>) {
		const rules = {} as Record<keyof T, ReturnRuleType<Trigger, CustomFn, MsgType>[]>
		for (const key in config) {
			rules[key] = this.#generate(key, config[key] || {})
		}
		return rules
	}

	#generate<K>(key: K, rule: ValidatorRule<Trigger, CustomFn, VO, MO>) {
		if (!isPlainObject(rule)) {
			throwError(`"${key}" the value of a must be an object.`)
		}

		const rules = [] as ReturnRuleType<Trigger, CustomFn, MsgType>[]
		const rest = omit(rule, [
			'type',
			'label',
			'trigger',
			'custom'
		])
		const {
			custom,
			label = '',
			type = 'string' as const
		} = rule

		for (const name in rest) {
			if (!this.validation.hasItem(name)) {
				printWarn(`"${name}" rule does not exist. Will be skipped.`)
				continue
			}

			const validation = this.#validation.getItem(name)
			const params = rest[name as keyof typeof rest]
			const isBoolType = validation.type === Boolean

			let value = undefined as any
			let message = ''
			let template = 'default'
			let trigger = rule.trigger || validation.trigger

			if (isBoolType && isString(params)) {
				value = true
				template = params
			} else if (isPlainObject(params)) {
				const {
					value: optValue,
					message: optMessage,
					trigger: optTrigger,
					template: optTpl,
				} = params

				if (optTrigger) {
					trigger = optTrigger
				}

				if (notNil(optValue)) {
					value = optValue
				} else if (isBoolType) {
					value = true
				} else {
					throwError(`"${name}" rule 'value' cannot be empty.`)
				}

				if (isNonEmptyString(optMessage)) {
					message = optMessage
				} else if (optTpl) {
					template = optTpl
				}
			} else {
				value = params
			}

			const messageCallback = () => {
				return this.#formatMessage({
					name,
					label,
					template,
					message,
					param: value
				})
			}

			rules.push(
				this.#convert(
					name,
					rule,
					validation,
					{
						type,
						trigger,
						param: value,
						message: this.errorPhase === 'pre'
							? messageCallback()
							: messageCallback
					}
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
				rules.push(
					this.#convertCustom(
						`${key}-i`,
						rule,
						validator,
						{
							type,
							label,
							trigger
						}
					)
				)
			}
		}

		return rules
	}

	#formatMessage(options: {
		name: string
		param: any
		label: string
		message: string
		template: string
	}) {
		const {
			name,
			param,
			label,
			message,
			template
		} = options
		if (isNonEmptyString(message)) {
			return formatTpl({ label, message, param })
		} else if (template) {
			const messages = toArray(this.message.getItem(name, template))
			if (label) {
				messages.splice(1, 1, label)
			}
			return formatTpl({
				param,
				message: messages[0],
				label: messages[1]
			})
		} else {
			printWarn(`"${name}" rule 'template' value does not exist.`)
		}
		return ''
	}

	#convert(
		name: string,
		rule: Omit<ValidatorRule<Trigger, CustomFn, VO, MO>, 'type' | 'label' | 'trigger' | 'custom'>,
		validation: ValidationRule<Trigger>,
		partial: {
			param: any
			type?: FieldType
			trigger?: Trigger
			message: string | (() => string)
		}
	): ReturnRuleType<Trigger, CustomFn, MsgType> {
		const {
			param,
			type,
			message
		} = partial
		const validators = toArray(validation.validator)
		return {
			type,
			rule: name,
			trigger: partial.trigger || this.trigger,
			validator: ((_, value) => {
				return new Promise<void>((resolve, reject) => {
					if ((isNil(rule.required) && !isNonEmptyString(value)) || param === false) {
						resolve()
					} else if (!validators.every((validator) => validator(value, param, type))) {
						reject(new Error(formatTplByValue(isFunction(message) ? message() : message, value)))
					} else {
						resolve()
					}
				})
			}) as CustomFn
		}
	}

	#convertCustom(
		name: string,
		rule: Omit<ValidatorRule<Trigger, CustomFn, VO, MO>, 'type' | 'label' | 'trigger' | 'custom'>,
		validator: CustomFn,
		partial: {
			type?: FieldType
			label: string
			trigger?: Trigger
		}
	): ReturnRuleType<Trigger, CustomFn, MsgType>  {
		return {
			rule: name,
			type: partial.type,
			trigger: partial.trigger || this.trigger,
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
										label: partial.label,
										message: error.message
									})
									reject(new Error(formatTplByValue(message, value)))
								})
						} else {
							resolve()
						}
					}
				})
			}) as CustomFn
		}
	}
}
