import { createValidation } from './validation'
import { createMessage } from './message'
import { Validator } from './validator'

import defaults from './defaults'
import zhCN from './locale/zhCN'

const instance = new Validator({
	validation: createValidation(defaults),
	locale: 'zhCN',
	messages: {
		zhCN: createMessage(zhCN)
	}
})

export default instance
