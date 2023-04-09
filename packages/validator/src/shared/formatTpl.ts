import { toArray } from '@txjs/shared'
import { isNil, isUndefined } from '@txjs/bool'

/**
 * `formatTpl` 文本处理
 *
 * @example
 * ```ts
 * formatTpl('密码不能为空')
 * // => 密码不能为空
 * formatTpl('[0] 不能为空', null, '密码')
 * // => 密码不能为空
 * formatTpl('[0] 字符在 {0} 到 {1} 长度之间', [10, 20], '密码')
 * // => 密码字符在 10 到 20 长度之间
 * ```
 */
export const formatTpl = (tpl: string, value?: any, label?: string) => {
	if (isNil(label)) {
		label = ''
	}

  tpl = tpl.replace(/\s?\[0\]?\s?/g, label)

  if (isUndefined(value)) {
    return tpl
  }

  value = toArray(value)

  for (let i = 0, len = value.length; i < len; i++) {
    tpl = tpl.replace(new RegExp(`\\{${i}\\}`, 'g'), () => value[i])
  }

  return tpl
}