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
	| 'any'
