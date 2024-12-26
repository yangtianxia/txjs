import extend from 'extend'
import type { BaseTrigger, FieldType } from './types'

type MessageType = string | string[]

interface BaseMessage {
	default: MessageType
}

type MessageOption = Record<string, MessageType> & BaseMessage

type MessageObject = Record<string, MessageOption>

interface BaseMessageLocale {
	zhCN: MessageObject
	enUS: MessageObject
}

export type MessageLocaleObject = Record<string, MessageObject> & BaseMessageLocale

type ExtractKey<T, K> = K extends keyof T ? keyof T[K] : never

export class MessageSchema<T extends MessageLocaleObject> {
	#defaults: T
	#locale: keyof T

	constructor (config: T, locale: keyof T) {
		this.#locale = locale
		this.#defaults = config
	}

	get value() {
		return this.#defaults
	}

	get locale() {
		return this.#locale
	}

	get messages() {
		return this.#defaults[this.#locale]
	}

	setLocale<L extends keyof T>(locale: L) {
		this.#locale = locale
	}

	getMessage<K>(name: K): MessageOption
	getMessage<L extends keyof T, K extends ExtractKey<T, L>>(name: K): T[keyof T][K]
	getMessage<L extends keyof T>(name: ExtractKey<T, L>): any {
		return this.messages[name]
	}

	static merged<U extends MessageLocaleObject, V extends MessageLocaleObject>(target: MessageSchema<U>, source: MessageSchema<V>) {
		return new MessageSchema<U & V>(extend(true, target.value, source.value), source.locale)
	}
}

export type ValidationRuleFunc = (value: any, param?: any, type?: FieldType) => boolean

export interface ValidationRule<Trigger> {
	type: any
	trigger?: Trigger
	validator: ValidationRuleFunc | ValidationRuleFunc[]
}

export type ValidationObject<Trigger> = Record<string, ValidationRule<Trigger>>

export class ValidationSchema<T extends ValidationObject<BaseTrigger>> {
	#defaults: T

	constructor (rules: T) {
		this.#defaults = rules
	}

	get value() {
		return this.#defaults
	}

	getItem<K extends keyof T>(name: K) {
		return this.#defaults[name]
	}

	static merged<U extends ValidationObject<BaseTrigger>, V extends ValidationObject<BaseTrigger>>(target: ValidationSchema<U>, source: ValidationSchema<V>) {
		return new ValidationSchema<U & V>(extend(true, target.value, source.value))
	}
}
