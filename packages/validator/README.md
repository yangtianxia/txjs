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

## 基础示例

```ts
import { Validator } from '@txjs/validator'

const validator = new Validator({
  message: Validator.message,
  validation: Validator.validation
})

const rules = validator.schema({
  name: {
    label: '用户名',
    required: true
  },
  phone: {
    label: '手机号',
    required: true,
    telephone: true
  },
  sex: {
    label: '性别',
    required: {
      tpl: 'select'
    }
  }
})
```

## 自定义规则

```ts
import { Validator, ValidationSchema, MessageSchema } from '@txjs/validator'

// 自定义验证
const customValidation = new ValidationSchem({
  name: {
    type: Boolean,
    validator: (value) => {
      return value.length >= 2 && value.length <= 5
    }
  }
})

// 自定义消息
const customMessage = new MessageSchema({
  zhCN: {
    name: {
      default: '[0]长度必须大于等于2，且小于等于5'
    }
  }
}, 'zhCN')

const validation = ValidationSchema.merged(Validator.validation, customValidation)

const message = MessageSchema.merged(Validator.message, customMessage)

const validator = new Validator({ validation, message })

const rules = validator.schema({
  name: {
    label: '用户名',
    required: true,
    name: true
  }
})
```

## 内置验证

+ absoluteUrl
+ contains
+ email
+ httpUrl
+ integer
+ number
+ landline
+ max
+ min
+ range
+ maxlength
+ minlength
+ rangelength
+ noscript
+ required
+ telephone
