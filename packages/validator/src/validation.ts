import { ValidationSchema } from './schema'
import type { PropType } from './validator'
import { absoluteUrl } from './internal/absoluteUrl'
import { contains } from './internal/contains'
import { required } from './internal/required'
import { email } from './internal/email'
import { httpUrl } from './internal/httpUrl'
import { integer } from './internal/integer'
import { landline } from './internal/landline'
import { max } from './internal/max'
import { maxlength } from './internal/maxlength'
import { min } from './internal/min'
import { minlength } from './internal/minlength'
import { noscript } from './internal/noscript'
import { number } from './internal/number'
import { range } from './internal/range'
import { rangelength } from './internal/rangelength'
import { telephone } from './internal/telephone'

const validation = new ValidationSchema({
	absoluteUrl: {
		type: Boolean,
		trigger: 'blur',
		validator: absoluteUrl
	},
	contains: {
		type: null as unknown as PropType<any>,
		validator: contains
	},
	email: {
		type: Boolean,
		trigger: 'blur',
		validator: email
	},
	httpUrl: {
		type: Boolean,
		trigger: 'blur',
		validator: httpUrl
	},
	integer: {
		type: Boolean,
		validator: integer
	},
	landline: {
		type: Boolean,
		trigger: 'blur',
		validator: landline
	},
	max: {
		type: Number,
		validator: max
	},
	maxlength: {
		type: Number,
		validator: maxlength
	},
	min: {
		type: Number,
		validator: min
	},
	minlength: {
		type: Number,
		validator: minlength
	},
	noscript: {
		type: Boolean,
		trigger: 'blur',
		validator: noscript
	},
	number: {
		type: Boolean,
		validator: number
	},
	range: {
		type: Array as PropType<number[]>,
		validator: range
	},
	rangelength: {
		type: Array as PropType<number[]>,
		validator: rangelength
	},
	required: {
		type: Boolean,
		trigger: ['change', 'blur'],
		validator: required
	},
	telephone: {
		type: Boolean,
		trigger: 'blur',
		validator: telephone
	}
})

export default validation
