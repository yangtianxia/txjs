import type { BaseTrigger, PropType } from './types'
import { absoluteUrl } from './bool/absoluteUrl'
import { contains } from './bool/contains'
import { required } from './bool/required'
import { email } from './bool/email'
import { httpUrl } from './bool/httpUrl'
import { integer } from './bool/integer'
import { landline } from './bool/landline'
import { max } from './bool/max'
import { maxlength } from './bool/maxlength'
import { min } from './bool/min'
import { minlength } from './bool/minlength'
import { noscript } from './bool/noscript'
import { number } from './bool/number'
import { range } from './bool/range'
import { rangelength } from './bool/rangelength'
import { telephone } from './bool/telephone'

export default {
  absoluteUrl: {
    type: Boolean,
    trigger: 'blur' as BaseTrigger,
    validator: absoluteUrl,
  },
  contains: {
    type: null as unknown as PropType<any>,
    validator: contains,
  },
  email: {
    type: Boolean,
    trigger: 'blur' as BaseTrigger,
    validator: email,
  },
  httpUrl: {
    type: Boolean,
    trigger: 'blur' as BaseTrigger,
    validator: httpUrl,
  },
  integer: {
    type: Boolean,
    validator: integer,
  },
  landline: {
    type: Boolean,
    trigger: 'blur' as BaseTrigger,
    validator: landline,
  },
  max: {
    type: Number,
    validator: max,
  },
  maxlength: {
    type: Number,
    validator: maxlength,
  },
  min: {
    type: Number,
    validator: min,
  },
  minlength: {
    type: Number,
    validator: minlength,
  },
  noscript: {
    type: Boolean,
    trigger: 'blur' as BaseTrigger,
    validator: noscript,
  },
  number: {
    type: Boolean,
    validator: number,
  },
  range: {
    type: Array as PropType<number[]>,
    validator: range,
  },
  rangelength: {
    type: Array as PropType<number[]>,
    validator: rangelength,
  },
  required: {
    type: Boolean,
    trigger: ['change', 'blur'] as BaseTrigger,
    validator: required,
  },
  telephone: {
    type: Boolean,
    trigger: 'blur' as BaseTrigger,
    validator: telephone,
  },
}
