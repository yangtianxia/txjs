# @txjs/validator

一个轻量级表单数据验证工具库，支持多规则校验、灵活扩展，可用于前端表单数据验证。

## 使用 npm

```javascript
npm i @txjs/validator
```

## 使用 pnpm

```javascript
pnpm add @txjs/validator
```

## 使用 yarn

```javascript
yarn add @txjs/validator
```

## Validator 参数

- trigger: 全局默认触发事件
- errorPhase: 错误生成阶段
- locale: 默认语言配置
- validation： 验证器配置，使用 `createValidation` 初始化
- messages： 错误提示配置，使用 `createMessage` 初始化

## 内置验证方法

- absoluteUrl
- contains
- email
- httpUrl
- integer
- number
- landline
- max
- min
- range
- maxlength
- minlength
- rangelength
- noscript
- required
- telephone

## 使用示例

```ts
import { Validator, createValidation, createMessage } from '@txjs/validator'
import defaults from '@txjs/validator/defaults'
import zhCN from '@txjs/validator/locale/zhCN'
import enUS from '@txjs/validator/locale/enUS'

// 自定义验证
const validator = new Validator({
  locale,
  errorPhase: 'sync',
  validation: createValidation(defaults, {
    name: {
      type: Boolean,
      validator: (value) => {
        return value.length >= 2 && value.length <= 5
      }
    }
  }),
  messages: {
    zhCN: createMessage(zhCN, {
      name: {
        default: '[0]长度必须大于等于2，且小于等于5'
      }
    }),
    enUS: createMessage(enUS, {
      name: {
        default: '[0] The length must be greater than or equal to 2 and less than or equal to 5'
      }
    })
  }
})

const rules = validator.schema({
  username: {
    label: '用户名',
    required: true
  },
  password: {
    label: '登录密码',
    required: true
  },
  telephone: {
    label: '手机号码',
    required: true,
    telephone: true
  },
  code: {
    label: '短信验证码',
    required: true,
    maxlength: 6
  }
})
```
