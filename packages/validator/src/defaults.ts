import {
	contains,
	max,
	maxlength,
	min,
	minlength,
	number,
	range,
	rangelength,
	required,
	xss,
	integer,
	telephone,
	email,
	landline,
	url
} from './shared/utils'

export default {
  required: {
    preset: [required],
    trigger: ['change', 'blur'],
    tpl: {
      default: '请输入 [0]',
      array: '请输入 [0]',
      select: '请选择 [0]'
    }
  },
  number: {
    preset: [number],
    tpl: '[0] 只能为数字'
  },
  digits: {
    preset: [integer],
    tpl: '[0] 只能输入数字'
  },
  contains: {
    preset: [contains],
    tpl: '[0] 必须包含 {0}'
  },
  minlength: {
    preset: [minlength],
    tpl: '[0] 不能少于 {0} 个字符'
  },
  maxlength: {
    preset: [maxlength],
    tpl: '[0] 不能多于 {0} 个字符'
  },
  rangelength: {
    preset: [rangelength],
    tpl: '[0] 字符在 {0} 到 {1} 长度之间'
  },
  min: {
    preset: [min],
    tpl: '[0] 不能小于 {0}'
  },
  max: {
    preset: [max],
    tpl: '[0] 不能大于 {0}'
  },
  range: {
    preset: [range],
    tpl: '[0] 范围在 {0} 到 {1} 之间'
  },
  xss: {
    preset: [xss],
    tpl: '内容不能包含HTML标签'
  },
  telephone: {
    inject: true,
    preset: [telephone],
    tpl: '{0} 为无效 [0]'
  },
  email: {
    preset: [email],
    trigger: 'blur',
    tpl: '请输入有效 [0]'
  },
  landline: {
    preset: [landline],
    trigger: 'blur',
    tpl: '{0} 为无效 [0]'
  },
	url: {
		preset: [url],
		trigger: 'blur',
		tpl: '请输入有效 [0]'
	}
}