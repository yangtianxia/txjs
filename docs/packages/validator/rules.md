# 内置规则

`@txjs/validator` 内置 16 条常用规则，通过 `@txjs/validator/rules` 导入。

```ts
import defaultRules from '@txjs/validator/rules'
```

## 规则列表

| 规则名 | 类型 | 参数 | 默认 trigger | 说明 |
|--------|------|------|-------------|------|
| `required` | Boolean | — | `['change', 'blur']` | 必填 |
| `telephone` | Boolean | — | `blur` | 中国手机号 |
| `landline` | Boolean | — | `blur` | 座机号码 |
| `email` | Boolean | — | `blur` | 邮箱格式 |
| `httpUrl` | Boolean | — | `blur` | HTTP/HTTPS URL |
| `absoluteUrl` | Boolean | — | `blur` | 绝对 URL |
| `number` | Boolean | — | — | 必须是数字 |
| `integer` | Boolean | — | — | 必须是整数 |
| `noscript` | Boolean | — | — | 不允许包含 HTML 标签 |
| `contains` | 参数 | `string` | — | 必须包含指定字符串 |
| `min` | Number | `number` | — | 最小值 |
| `max` | Number | `number` | — | 最大值 |
| `range` | Number | `[number, number]` | — | 值范围 |
| `minlength` | Number | `number` | — | 最小字符长度 |
| `maxlength` | Number | `number` | — | 最大字符长度 |
| `rangelength` | Number | `[number, number]` | — | 字符长度范围 |

> 无 trigger 的规则继承字段级 trigger 或全局默认 trigger（`'blur'`）。

## 规则详解

### required

必填验证。对 `string` 类型字段检查是否为空字符串或空白；对 `array` 类型字段检查数组是否为空。

```ts
// 字符串字段
rules: ['required']

// 数组字段
{ type: 'array', rules: ['required'] }
```

`required` 规则还支持多种 locale 模板，通过 `template` 选择：

| template | zhCN 消息 |
|----------|-----------|
| `default`（默认） | 请输入[0] |
| `select` | 请选择[0] |
| `upload` | 请上传[0] |

```ts
rules: [{ rule: 'required', template: 'select' }]
// label='性别' → '请选择性别'
```

### telephone / landline / email / httpUrl / absoluteUrl

格式校验，Boolean 类型规则（不需要 `value` 参数），直接用字符串简写：

```ts
rules: ['telephone']
rules: ['email']
rules: ['httpUrl']
```

这类规则的 locale 消息使用数组格式，包含内置标签：

```ts
// zhCN.telephone.default = ['[0]格式无效', '手机号码']
// label='手机号'  → '手机号格式无效'
// label=''       → '手机号码格式无效'（使用内置标签）
```

### number / integer / noscript

```ts
rules: ['number']    // 值必须是数字
rules: ['integer']   // 值必须是整数
rules: ['noscript']  // 值不能包含 HTML 标签
```

### min / max

数值范围限制，需传 `value` 参数：

```ts
rules: [
  { rule: 'min', value: 18 },   // 不能小于 18
  { rule: 'max', value: 60 },   // 不能大于 60
]
```

### range

数值范围（同时限制上下限），`value` 为二元组 `[min, max]`：

```ts
rules: [{ rule: 'range', value: [1, 5] }]
// label='评分', value=[1,5] → '评分必须在1到5之间'
```

### minlength / maxlength

字符长度限制：

```ts
rules: [
  { rule: 'minlength', value: 6 },    // 不能少于 6 个字符
  { rule: 'maxlength', value: 100 },  // 不能超过 100 个字符
]
```

### rangelength

字符长度范围：

```ts
rules: [{ rule: 'rangelength', value: [6, 20] }]
// '密码长度必须在6到20之间'
```

### contains

包含指定子字符串：

```ts
rules: [{ rule: 'contains', value: '@' }]
// label='内容', value='@' → '内容必须包含@'
```

## 空值跳过机制

当字段 `rules` 中**没有** `required` 规则时，所有其他规则在值为空时自动跳过（不触发报错）。
当字段包含 `required` 时，空值会被 `required` 规则捕获，其他规则也不跳过空值。

```ts
// 无 required → telephone 对空值跳过（直接通过）
rules: ['telephone']

// 有 required → telephone 对空值不跳过（空值也会走 telephone 校验）
rules: ['required', 'telephone']
```

这个行为在 AntdValidator 中通过 `isEmptyFieldValue` 判断实现，
在 VantValidator 中通过 `validateEmpty` 字段交给 Vant 原生处理。
