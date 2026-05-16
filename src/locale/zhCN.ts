export default {
  required: {
    default: '请输入[0]',
    select: '请选择[0]',
    upload: '请上传[0]',
  },
  number: {
    default: '[0]必须是数字',
  },
  integer: {
    default: '[0]必须是整数',
  },
  contains: {
    default: '[0]必须包含{0}',
  },
  minlength: {
    default: '[0]长度不能少于{0}个字符',
  },
  maxlength: {
    default: '[0]长度不能超过{0}个字符',
  },
  rangelength: {
    default: '[0]长度必须在{0}到{1}之间',
  },
  min: {
    default: '[0]不能小于{0}',
  },
  max: {
    default: '[0]不能大于{0}',
  },
  range: {
    default: '[0]必须在{0}到{1}之间',
  },
  noscript: {
    default: '不允许包含HTML标签',
  },
  email: {
    default: ['[0]格式无效', '邮箱'],
  },
  telephone: {
    default: ['[0]格式无效', '手机号码'],
  },
  landline: {
    default: ['[0]格式无效', '座机号码'],
  },
  httpUrl: {
    default: ['[0]格式无效', 'HTTP网址'],
  },
  absoluteUrl: {
    default: ['[0]格式无效', '网址'],
  },
}
