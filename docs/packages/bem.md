# @txjs/bem

遵循 [BEM 规范](https://en.bem.info/methodology/quick-start/) 的 CSS 类名生成工具，支持普通模式和 CSS Modules 模式。

## 安装

```bash
pnpm add @txjs/bem
```

## 导入

```ts
import { BEM } from '@txjs/bem'
```

## 基础用法

```ts
const [name, bem] = BEM('button')

name          // => 'button'
bem()         // => 'button'
bem('text')   // => 'button__text'

bem(['primary'])
// => 'button button--primary'

bem('text', ['small'])
// => 'button__text button__text--small'

bem('body', { safearea: true, disabled: false })
// => 'button__body button__body--safearea'
```

## 修饰符格式

`bem` 的第二个参数支持数组或对象两种形式：

```ts
// 数组：直接指定修饰符名
bem('item', ['active', 'selected'])
// => 'button__item button__item--active button__item--selected'

// 对象：布尔值决定是否添加修饰符
bem('item', { active: true, disabled: false })
// => 'button__item button__item--active'
```

## CSS Modules 模式

传入 CSS Modules 的类名映射对象，自动将 BEM 名称转换为哈希化类名：

```ts
import { BEM } from '@txjs/bem'
import styles from './Button.module.less'

const [name, bem] = BEM('button', styles)

bem()              // => 'button_abc123'（哈希化类名）
bem('text')        // => 'button__text_def456'
bem('text', ['small'])
// => 'button__text_def456 button__text--small_ghi789'
```

## 全局配置

通过 `BEM.config` 设置 CSS Modules 的匹配模式：

| 模式 | 说明 |
|------|------|
| `match`（默认） | 找不到映射时返回空字符串 |
| `always` | 找不到映射时返回原始 BEM 名称 |

```ts
BEM.config({ mode: 'always' })
```

## 在 Vue/React 中使用

```tsx
const [, bem] = BEM('menu')

// <nav class="menu">
//   <ul class="menu__list">
//     <li class="menu__item menu__item--active">...</li>
//   </ul>
// </nav>
<nav class={bem()}>
  <ul class={bem('list')}>
    <li class={bem('item', { active: true })}>...</li>
  </ul>
</nav>
```
