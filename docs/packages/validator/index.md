# @txjs/validator

表单验证库，内置 16 条常用规则，支持 Antd 和 Vant 两种 UI 框架适配器，支持多语言切换。

## 安装

```bash
pnpm add @txjs/validator
```

## 架构

```
BaseValidator          ← 抽象基类，包含 schema 生成逻辑
├── AntdValidator      ← Ant Design / antd-vue 适配器
└── VantValidator      ← Vant 4 适配器
```

两个适配器输出的规则格式不同，但 schema 定义方式完全相同。

## 快速开始

```ts
import { AntdValidator } from '@txjs/validator/antd'
import defaultRules from '@txjs/validator/rules'
import zhCN from '@txjs/validator/locale/zhCN'
import enUS from '@txjs/validator/locale/enUS'

const validator = new AntdValidator({
  locale: 'zhCN',
  locales: { zhCN, enUS },
  rules: defaultRules,
})

const schema = validator.schema({
  phone: {
    label: '手机号',
    rules: ['required', 'telephone'],
  },
  age: {
    label: '年龄',
    rules: [{ rule: 'min', value: 18 }],
  },
})
```

## 构造函数参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `locale` | `string` | 是 | 当前语言 key，需在 `locales` 中存在 |
| `locales` | `Record<string, LocaleMessages>` | 是 | 所有语言的消息映射 |
| `rules` | `RuleDefMap` | 是 | 规则定义集合，通常使用内置的 `defaultRules` |
| `trigger` | `'blur' \| 'change' \| string[]` | 否 | 全局默认触发时机，默认 `'blur'` |
| `errorPhase` | `'pre' \| 'sync'` | 否 | 消息生成时机，默认 `'pre'` |

### errorPhase

| 值 | 说明 |
|----|------|
| `'pre'` | schema 生成时计算消息（静态字符串），切换语言后需重新调用 `schema()` |
| `'sync'` | 校验执行时计算消息（getter 函数），切换语言后立即生效，无需重新生成 schema |

推荐在需要运行时切换语言的场景使用 `errorPhase: 'sync'`。

## schema() 方法

```ts
validator.schema<FormData>({
  fieldName: {
    label: '字段标签',   // 替换消息中的 [0] 占位符
    type: 'string',     // 字段类型，影响空值判断，默认 'string'
    trigger: 'blur',    // 该字段所有规则的默认触发时机
    rules: [...]        // 规则列表（见下方）
  }
})
```

### 规则列表格式

**字符串简写**（Boolean 类型规则）：

```ts
rules: ['required', 'telephone']
```

**对象形式**（带参数的规则）：

```ts
rules: [
  { rule: 'min', value: 18 },
  { rule: 'maxlength', value: 100 },
  { rule: 'required', template: 'select' },        // 使用 locale 的 select 模板
  { rule: 'required', message: '请输入自定义消息' }, // 直接覆盖消息文本
  { rule: 'telephone', trigger: 'blur' },           // 覆盖该规则的触发时机
]
```

**自定义 validator 函数**：

```ts
rules: [
  {
    validator: (value) => {
      if (!value.length) throw new Error('请至少选择一项')
    },
  },
]
```

自定义函数通过抛出 `Error` 或返回 `rejected Promise` 表示校验失败，正常返回（或 `resolved Promise`）表示通过。

### trigger 优先级

规则级 `trigger` > 字段级 `trigger` > 规则定义中的 `trigger` > 全局默认 `trigger`

## setLocale()

运行时切换语言：

```ts
validator.setLocale('enUS')
```

传入不存在的 locale key 时会打印警告，不切换。

## 消息模板语法

locale 文件中的消息模板支持两种占位符：

| 占位符 | 替换内容 |
|--------|---------|
| `[0]` | 字段的 `label` |
| `{0}`, `{1}` | 规则参数（`value`）的第一、第二个值 |

数组格式的模板 `['[0]格式无效', '手机号码']`：
- `[0]` 是消息模板
- `[1]` 是内置标签（当字段未设置 `label` 时使用）

**示例：**

```
zhCN.required.default = '请输入[0]'
label = '手机号'  →  '请输入手机号'

zhCN.min.default = '[0]不能小于{0}'
label = '年龄', value = 18  →  '年龄不能小于18'

zhCN.telephone.default = ['[0]格式无效', '手机号码']
label = ''  →  '手机号码格式无效'（使用内置标签）
label = '手机号'  →  '手机号格式无效'（label 覆盖内置标签）
```

## 自定义 locale

```ts
import zhCN from '@txjs/validator/locale/zhCN'

const myLocale = {
  ...zhCN,
  required: {
    ...zhCN.required,
    upload: '请上传[0]文件',
  },
  // 新增自定义规则的消息
  myRule: {
    default: '[0]不符合要求',
  },
}

const validator = new AntdValidator({
  locale: 'zhCN',
  locales: { zhCN: myLocale },
  rules: { ...defaultRules, myRule: { type: Boolean, validator: myFn } },
})
```

## 扩展规则

在 `rules` 中追加自定义规则定义：

```ts
import defaultRules from '@txjs/validator/rules'
import type { RuleDefMap } from '@txjs/validator'

const myRules = {
  ...defaultRules,
  idCard: {
    type: Boolean,
    trigger: 'blur',
    validator: (value: string) => /^\d{17}[\dXx]$/.test(value),
  },
} satisfies RuleDefMap

const validator = new AntdValidator({
  rules: myRules,
  // ...
})
```

然后在 locale 中补充对应消息：

```ts
const zhCN = {
  ...baseZhCN,
  idCard: { default: '[0]格式无效' },
}
```
