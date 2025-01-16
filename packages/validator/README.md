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
- messages： 验证器配置，使用 `createValidation` 初始化

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

## 基础示例

```ts
import validator from '@txjs/validator/instance'

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

## 自定义

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
  name: {
    label: '用户名',
    required: true,
    name: true
  },
  phone: {
    label: '手机号',
    required: true,
    telephone: true
  },
  sex: {
    label: '性别',
    required: 'select'
  }
})
```
