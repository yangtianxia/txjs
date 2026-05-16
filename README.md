# avero

A lightweight form validation library with multi-rule support and flexible extension.

## Install

```bash
npm install avero
# or
pnpm add avero
```

## Usage

```ts
import { Validator, createValidation, createMessage } from 'avero'
import defaults from 'avero/defaults'
import zhCN from 'avero/locale/zhCN'
import enUS from 'avero/locale/enUS'

const locale = localStorage.getItem('locale') || 'zhCN'

const validator = new Validator({
  locale,
  errorPhase: 'sync',
  validation: createValidation(defaults, {
    name: {
      type: Boolean,
      validator: (value) => value.length >= 2 && value.length <= 5,
    },
  }),
  messages: {
    zhCN: createMessage(zhCN, {
      name: { default: '[0]长度必须在 2 到 5 之间' },
    }),
    enUS: createMessage(enUS, {
      name: { default: '[0] length must be between 2 and 5' },
    }),
  },
})

const rules = validator.schema({
  username: { label: '用户名', required: true },
  telephone: { label: '手机号码', required: true, telephone: true },
  code: { label: '验证码', required: true, maxlength: 6 },
})
```

## Built-in Rules

`absoluteUrl` · `contains` · `email` · `httpUrl` · `integer` · `number` ·
`landline` · `max` · `min` · `range` · `maxlength` · `minlength` · `rangelength` ·
`noscript` · `required` · `telephone`

## CDN

```html
<script src="https://unpkg.com/avero/dist/index.min.js"></script>
```

## License

MIT
