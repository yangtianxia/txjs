import { isString } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

const RIST_TAGS_REGEX =
  /<(script|iframe|embed|object|link|style|applet|meta|form|img|audio|video|input|button|svg|base|textarea|a|marquee)[\s\S]*?>[\s\S]*?<\/\1>|<(script|iframe|embed|object|link|style|applet|meta|form|img|audio|video|input|button|svg|base|textarea|a|marquee)\b[^>]*?>|on\w+="[^"]*"|on\w+='[^']*'/i

export const noscript: ValidationRuleFunc = (value) => {
  if (!isString(value)) {
    return true
  }
  return !RIST_TAGS_REGEX.test(value)
}
