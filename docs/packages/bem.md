# @txjs/bem

遵循 [BEM 规范](https://en.bem.info/methodology/quick-start/) 的 CSS 类名生成工具，支持普通模式和 CSS Modules 模式。

BEM（Block Element Modifier）是一种 CSS 命名方法论：
- **Block（块）**：独立的页面组件，如 `header`、`button`
- **Element（元素）**：块的子部分，用 `__` 连接，如 `button__text`
- **Modifier（修饰符）**：块或元素的变体，用 `--` 连接，如 `button--primary`

## 安装

```bash
pnpm add @txjs/bem
```

## 基础用法

```ts
import { BEM } from '@txjs/bem'

const [name, bem] = BEM('button')
```

`BEM()` 返回一个二元组：
- `name`：原始块名（字符串）
- `bem`：类名生成函数

```ts
name          // => 'button'

bem()                                    // => 'button'
bem('text')                              // => 'button__text'
bem(['primary'])                         // => 'button button--primary'
bem('text', ['small'])                   // => 'button__text button__text--small'
bem('body', { safearea: true })          // => 'button__body button__body--safearea'
bem('body', { safearea: true, disabled: false })  // => 'button__body button__body--safearea'
```

## bem() 函数签名

```ts
function bem(element?: string | Mods, mods?: Mods): string

type Mods = string[] | Record<string, boolean>
```

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `element` | `string` \| `Mods` | 元素名，或省略元素直接传修饰符 |
| `mods` | `Mods` | 修饰符，支持数组或对象形式 |

**修饰符格式：**

```ts
// 数组：列出要激活的修饰符名
bem('item', ['active', 'selected'])
// => 'button__item button__item--active button__item--selected'

// 对象：值为 true 的键作为修饰符，false 的忽略
bem('item', { active: true, disabled: false })
// => 'button__item button__item--active'
```

## CSS Modules 模式

向 `BEM()` 传入 CSS Modules 的样式对象，`bem()` 会自动将 BEM 类名映射为哈希化的类名：

```ts
import { BEM } from '@txjs/bem'
import styles from './Button.module.less'

// styles = {
//   'button': 'button_abc123',
//   'button--primary': 'button--primary_def456',
//   'button__text': 'button__text_ghi789',
// }

const [name, bem] = BEM('button', styles)

name               // => 'button'（始终返回原始块名）
bem()              // => 'button_abc123'
bem('text')        // => 'button__text_ghi789'
bem(['primary'])   // => 'button_abc123 button--primary_def456'
```

## BEM.config()

通过 `BEM.config` 设置 CSS Modules 的回退行为：

```ts
BEM.config(options: { mode?: 'match' | 'always' }): void
```

| 模式 | 说明 |
|------|------|
| `match`（默认） | 找不到映射时返回空字符串 |
| `always` | 找不到映射时返回原始 BEM 类名 |

```ts
const [, bem] = BEM('button', {})   // 空样式对象，所有类名都找不到映射

// match 模式（默认）
bem('text')                         // => ''

// 切换为 always 模式
BEM.config({ mode: 'always' })
bem('text')                         // => 'button__text'
```

## 在 Vue 中使用

```vue
<template>
  <nav :class="bem()">
    <ul :class="bem('list')">
      <li :class="bem('item', { active: isActive })">
        <a :class="bem('link')" href="#">首页</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { BEM } from '@txjs/bem'

const [, bem] = BEM('menu')
const isActive = true
</script>

<!-- 渲染结果：
<nav class="menu">
  <ul class="menu__list">
    <li class="menu__item menu__item--active">
      <a class="menu__link">首页</a>
    </li>
  </ul>
</nav>
-->
```

## 在 Vue 中使用 CSS Modules

```vue
<template>
  <button :class="bem()" @click="onClick">
    <span :class="bem('text', { small: isSmall })">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { BEM } from '@txjs/bem'
import styles from './Button.module.less'

const [, bem] = BEM('button', styles)
</script>
```
