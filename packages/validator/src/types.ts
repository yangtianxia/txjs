type TriggerType = 'change' | 'blur'

export type BaseTrigger = TriggerType | TriggerType[]

export type FieldType =
	| 'string'
	| 'number'
	| 'boolean'
	| 'method'
	| 'regexp'
	| 'integer'
	| 'float'
	| 'array'
	| 'object'
	| 'enum'
	| 'date'
	| 'url'
	| 'hex'
	| 'email'

export type ExtractProp<T, K> =
	K extends keyof T
		? T[K]
		: never

export type ExtractPropOf<T, K> =
	K extends keyof T
		? keyof T[K]
		: never

type PropConstructor<T = any> =
	| { new (...args: any[]): T & object }
	| { (): T }

export type PropType<T> = PropConstructor<T> | PropConstructor<T>[]

type Prop<T = any> = PropType<T>

export type InferPropType<P> =
	P extends Prop<infer T>
		? unknown extends T
			? any
			: T
		: any
