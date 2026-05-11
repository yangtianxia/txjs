# @txjs/bem

BEM 类名生成工具，支持 CSS Modules。

## 安装

```bash
pnpm add @txjs/bem
```

## 基础用法

```ts
import { BEM } from '@txjs/bem'

const [name, bem] = BEM('button')

name             // 'button'
bem()            // 'button'
bem('text')      // 'button__text'
```

`BEM()` 返回 `[块名, 类名生成函数]`，生成函数接受元素名和修饰符。

## 修饰符

修饰符支持**数组**和**对象**两种写法：

```ts
// 数组：列出要激活的修饰符
bem('item', ['active', 'selected'])
// => 'button__item button__item--active button__item--selected'

// 对象：值为 true 才生效
bem('item', { active: true, disabled: false })
// => 'button__item button__item--active'

// 省略元素名，直接给块加修饰符
bem({ primary: true })
// => 'button button--primary'
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
```

渲染结果：

```html
<nav class="menu">
  <ul class="menu__list">
    <li class="menu__item menu__item--active">
      <a class="menu__link">首页</a>
    </li>
  </ul>
</nav>
```

## CSS Modules 模式

传入样式对象，类名自动映射为哈希值：

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

`name` 始终返回原始块名，`bem()` 返回哈希后的类名。

## BEM.config()

设置找不到映射时的回退行为：

```ts
BEM.config({ mode: 'match' | 'always' })
```

| 模式 | 找不到映射时 |
|------|------------|
| `match`（默认） | 返回空字符串 |
| `always` | 返回原始 BEM 类名 |

```ts
const [, bem] = BEM('button', {})

bem('text')  // => ''（match 模式）

BEM.config({ mode: 'always' })
bem('text')  // => 'button__text'
```

## API

```ts
function BEM(name: string): [string, BemFunction]
function BEM(name: string, cls: Record<string, string>): [string, BemFunction]

type Mods = string | string[] | Record<string, boolean>
type BemFunction = (element?: string | Mods, mods?: Mods) => string
```
