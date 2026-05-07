# VantValidator

适配 [Vant 4](https://vant-ui.github.io/vant/) 的表单验证适配器。

## 导入

```ts
import { VantValidator } from '@txjs/validator/vant'
// 或
import { VantValidator } from '@txjs/validator'
```

## 规则格式

`VantValidator.schema()` 输出每个字段的规则数组，每条规则的类型对齐 Vant 4 的 `FieldRule`：

```ts
type VantRule = {
  trigger?: string | string[]    // 触发时机（'onBlur' | 'onChange'）
  validateEmpty?: boolean         // false = 空值时 Vant 跳过该规则
  message?: string | ((value: any, rule: VantRule) => string)  // 错误消息
  validator?: (value: any, rule: VantRule) => boolean | string | Promise<boolean | string>
}
```

## trigger 映射

Vant 使用带 `on` 前缀的触发事件名，VantValidator 自动完成映射：

| 输入 | 输出 |
|------|------|
| `'blur'` | `'onBlur'` |
| `'change'` | `'onChange'` |
| `['change', 'blur']` | `['onChange', 'onBlur']` |

## validateEmpty

VantValidator 通过 `validateEmpty` 字段将空值跳过逻辑交给 Vant 原生处理：

| 字段是否有 `required` 规则 | `validateEmpty` 值 | 效果 |
|--------------------------|-------------------|------|
| 否 | `false` | Vant 自动跳过空值校验 |
| 是 | `true` | Vant 对所有规则（含空值）执行校验 |

## 完整示例

```ts
import { VantValidator } from '@txjs/validator/vant'
import defaultRules from '@txjs/validator/rules'
import zhCN from '@txjs/validator/locale/zhCN'
import enUS from '@txjs/validator/locale/enUS'

const validator = new VantValidator({
  locale: 'zhCN',
  locales: { zhCN, enUS },
  rules: defaultRules,
  errorPhase: 'sync',
})

interface FormData {
  phone: string
  age: number
  tags: number[]
}

const schema = validator.schema<FormData>({
  phone: {
    label: '手机号',
    rules: ['required', 'telephone'],
  },
  age: {
    label: '年龄',
    rules: [{ rule: 'min', value: 18 }],
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

## 在 Vant 中使用

```vue
<template>
  <van-form ref="formRef">
    <van-field
      v-model="form.phone"
      name="phone"
      label="手机号"
      :rules="schema.phone"
    />
    <van-field
      v-model="form.age"
      name="age"
      label="年龄"
      :rules="schema.age"
    />
  </van-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VantValidator } from '@txjs/validator/vant'
import defaultRules from '@txjs/validator/rules'
import zhCN from '@txjs/validator/locale/zhCN'

const validator = new VantValidator({
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

以上面的 `schema.phone` 为例：

```ts
// schema.phone[0]（required 规则）
{
  trigger: ['onChange', 'onBlur'],
  validateEmpty: true,              // 有 required，不跳过空值
  message: (_value, _rule) => '请输入手机号',   // errorPhase:'sync' 时是函数
  validator: (value) => boolean
  // value=''          → false
  // value='13800...'  → true
}

// schema.phone[1]（telephone 规则）
{
  trigger: 'onBlur',
  validateEmpty: true,
  message: (_value, _rule) => '手机号格式无效',
  validator: (value) => boolean
  // value='123'         → false
  // value='13800138000' → true
}

// schema.age[0]（min 规则，无 required）
{
  trigger: 'onBlur',
  validateEmpty: false,             // 无 required，空值时 Vant 自动跳过
  message: (_value, _rule) => '年龄不能小于18',
  validator: (value) => boolean
  // value=17 → false
  // value=18 → true
}
```

## 错误消息格式

- **内置规则**（required、telephone 等）：消息在 `rule.message` 字段上，validator 返回 `true/false`
- **自定义 validator**：validator 返回 `true`（通过）或错误字符串（失败），无 `message` 字段

```ts
// schema.tags[0]（自定义规则）
{
  trigger: 'onBlur',
  validateEmpty: false,
  validator: (value) => boolean | string
  // value=[]  → '请至少选择一项'  （字符串表示失败）
  // value=[1] → true
}
```

## 切换语言

```ts
// errorPhase:'sync' 时，message 是函数，每次调用时从当前 locale 取值
validator.setLocale('enUS')

const msg = schema.phone[0].message('', schema.phone[0])
// → 'Please enter phone'（无需重新生成 schema）
```

## message 类型与 errorPhase

| `errorPhase` | `message` 类型 | 说明 |
|-------------|---------------|------|
| `'sync'`（推荐） | `(value, rule) => string` | 每次调用时从当前 locale 动态取值 |
| `'pre'` | `string` | schema 生成时已固定，切换语言无效 |
