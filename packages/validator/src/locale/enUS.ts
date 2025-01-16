export default {
	required: {
		default: 'Please enter [0]',
		select: 'Please select [0]',
		upload: 'Please upload [0]'
	},
	number: {
		default: '[0] must be a number'
	},
	integer: {
		default: '[0] must be an integer'
	},
	contains: {
		default: '[0] must contain {0}'
	},
	minlength: {
		default: '[0] cannot be shorter than {0} characters'
	},
	maxlength: {
		default: '[0] cannot be longer than {0} characters'
	},
	rangelength: {
		default: '[0] must be between {0} and {1} characters long'
	},
	min: {
		default: '[0] cannot be less than {0}'
	},
	max: {
		default: '[0] cannot be greater than {0}'
	},
	range: {
		default: '[0] must be between {0} and {1}'
	},
	noscript: {
		default: 'HTML tags are not allowed'
	},
	email: {
		default: ['The format of [0] is invalid', 'email']
	},
	telephone: {
		default: ['The format of [0] is invalid', 'phone number']
	},
	landline: {
		default: ['The format of [0] is invalid', 'landline']
	},
	httpUrl: {
		default: ['The format of [0] is invalid', 'HTTP URL']
	},
	absoluteUrl: {
		default: ['The format of [0] is invalid', 'URL']
	}
}
