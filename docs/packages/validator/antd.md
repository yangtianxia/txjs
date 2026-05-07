# AntdValidator

适配 [Ant Design Vue](https://antdv.com/) 和 [Ant Design](https://ant.design/) 的表单验证适配器。

## 导入

```ts
import { AntdValidator } from '@txjs/validator/antd'
// 或
import { AntdValidator } from '@txjs/validator'
```

## 规则格式

`AntdValidator.schema()` 输出每个字段的规则数组，每条规则的类型为：

```ts
type AntdRule = {
  type?: string         // 字段类型（'string' | 'array' 等）
  rule?: string         // 规则名称
  trigger?: string | string[]  // 触发时机（'blur' | 'change' 等）
  message?: string | (() => string)  // 错误消息
  validator: (rule: any, value: any) => Promise<void>
}
```

`validator` 函数遵循 Ant Design 的规则格式：校验通过时 `resolve()`，失败时 `reject(new Error(message))`。

## 完整示例

```ts
import { AntdValidator } from '@txjs/validator/antd'
import defaultRules from '@txjs/validator/rules'
import zhCN from '@txjs/validator/locale/zhCN'
import enUS from '@txjs/validator/locale/enUS'

const validator = new AntdValidator({
  locale: 'zhCN',
  locales: { zhCN, enUS },
  rules: defaultRules,
  errorPhase: 'sync',  // 支持运行时切换语言
})

interface FormData {
  phone: string
  age: number
  sex: string
  tags: number[]
}

const schema = validator.schema<FormData>({
  phone: {
    label: '手机号',
    rules: ['required', 'telephone'],
  },
  age: {
    label: '年龄',
    rules: [
      { rule: 'min', value: 18 },
      { rule: 'max', value: 60 },
    ],
  },
  sex: {
    label: '性别',
    rules: [{ rule: 'required', template: 'select' }],
  },
  tags: {
    type: 'array',
    label: '兴趣爱好',
    rules: [
      {
        validator: (value: number[]) => {
          if (!value.length) throw new Error('请至少选择一项')
        },
      },
    ],
  },
})
```

## 在 Ant Design Vue 中使用

```vue
<template>
  <a-form :model="form" :rules="schema">
    <a-form-item name="phone" label="手机号">
      <a-input v-model:value="form.phone" />
    </a-form-item>
    <a-form-item name="age" label="年龄">
      <a-input-number v-model:value="form.age" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AntdValidator } from '@txjs/validator/antd'
import defaultRules from '@txjs/validator/rules'
import zhCN from '@txjs/validator/locale/zhCN'

const validator = new AntdValidator({
  locale: 'zhCN',
  locales: { zhCN },
  rules: defaultRules,
  errorPhase: 'sync',
})

const form = reactive({ phone: '', age: 0 })

const schema = validator.schema({
  phone: { label: '手机号', rules: ['required', 'telephone'] },
  age: { label: '年龄', rules: [{ rule: 'min', value: 18 }] },
})
</script>
```

## 生成规则的结构

以上面的 `schema.phone` 为例，生成的规则数组为：

```ts
// schema.phone[0]（required 规则）
{
  type: 'string',
  rule: 'required',
  trigger: ['change', 'blur'],
  message: () => '请输入手机号',       // errorPhase:'sync' 时是 getter
  validator: (_, value) => Promise<void>
  // value=''          → rejects Error('请输入手机号')
  // value='13800...'  → resolves
}

// schema.phone[1]（telephone 规则）
{
  type: 'string',
  rule: 'telephone',
  trigger: 'blur',
  message: () => '手机号格式无效',
  validator: (_, value) => Promise<void>
  // value='123'         → rejects Error('手机号格式无效')
  // value='13800138000' → resolves
}
```

## 切换语言

```ts
// errorPhase:'sync' 时，切换语言后同一个 rule 对象的消息自动更新
validator.setLocale('enUS')

// 不需要重新调用 schema()，下次 validator() 触发时消息已是英文
await schema.phone[0].validator({}, '')
// → rejects: Error('Please enter phone')
```

`errorPhase: 'pre'`（默认）时，消息在 `schema()` 时已固定为静态字符串，切换语言后需重新调用 `schema()` 才能更新。

## 自定义 validator

```ts
const schema = validator.schema({
  password: {
    label: '密码',
    rules: [
      {
        validator: async (value: string) => {
          const result = await checkPasswordStrength(value)
          if (!result.ok) {
            throw new Error(result.message)
          }
        },
      },
    ],
  },
})
```

自定义函数签名 `(value: any) => void | Promise<void>`：
- 同步抛出 `Error` → 校验失败，错误消息为 `Error.message`
- 返回 `rejected Promise` → 校验失败
- 正常返回 / `resolved Promise` → 校验通过

> 注意：自定义 validator 和规则定义中的 `validator` 签名不同。schema 中的 `validator` 只接收 `value`，不接收 `rule` 对象。
