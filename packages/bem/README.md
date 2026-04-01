# @txjs/bem

CSS 命名函数库，遵循 [BEM 规范](https://en.bem.info/methodology/quick-start/)，支持普通模式和 CSS Modules 模式。

## 安装

```bash
# npm
npm i @txjs/bem

# pnpm
pnpm add @txjs/bem

# yarn
yarn add @txjs/bem
```

## 导入方式

```ts
import { BEM } from '@txjs/bem'
```

## 基本概念

BEM（Block Element Modifier）是一种 CSS 命名方法论：

- **Block（块）**：独立的页面组件，如 `header`、`menu`
- **Element（元素）**：块的子部分，如 `menu__item`、`header__logo`
- **Modifier（修饰符）**：块的变体，如 `menu--active`、`button--disabled`

## 基础用法

```ts
const [name, bem] = BEM('home')

name
// => 'home'

bem()
// => 'home'

bem('container')
// => 'home__container'

bem('item', ['active', 'disabled'])
// => 'home__item home__item--active home__item--disabled'
```

---

## 函数签名

```ts
// 不使用 CSS Modules
function BEM(name: string): [string, (el?: Mods, mods?: Mods) => string]

// 使用 CSS Modules
function BEM(name: string, css: Record<string, string>): [string, (el?: Mods, mods?: Mods) => string]
```

### 参数

- `name` - 块名称
- `css` -（可选）CSS Modules 的类名映射对象

### 修饰符类型

`bem` 函数接受两种修饰符格式：

```ts
// 数组形式 - 直接指定修饰符名
bem('item', ['active', 'disabled'])

// 对象形式 - 根据值决定是否添加修饰符
bem('item', { active: true, disabled: false })
```

---

## 常规使用

```ts
import { BEM } from '@txjs/bem'

const [name, bem] = BEM('button')

// 获取块名
name
// => 'button'

// 无修饰符 - 返回块名
bem()
// => 'button'

// 字符串修饰符 - 作为块/元素添加
bem(['primary'])
// => 'button button--primary'

bem('text', ['small'])
// => 'button__text button__text--small'

// 对象修饰符 - 根据布尔值决定是否添加
bem('body', { safearea: true })
// => 'button__body button__body--safearea'

bem('body', { safearea: false })
// => 'button__body' (false 的修饰符被忽略)

// 组合使用
bem('item', ['active'])
// => 'button__item button__item--active'

bem('item', { active: true, loading: true })
// => 'button__item button__item--active button__item--loading'

// 空修饰符
bem([])
// => 'button'

bem('item', {})
// => 'button__item'
```

---

## CSS Modules 模式

配合 CSS Modules 使用，自动将 BEM 名称映射到哈希化的类名。

### 使用示例

```tsx
import { BEM } from '@txjs/bem'
import styles from './Button.module.less'

// styles 内容示例：
// {
//   button: 'button_abc123',
//   'button--primary': 'button--primary_def456',
//   button__text: 'button__text_ghi789',
//   'button__text--small': 'button__text--small_jkl012'
// }

const [name, bem] = BEM('button', styles)

// name 返回原始块名
name
// => 'button'

// bem() 返回哈希化的块类名
bem()
// => 'button_abc123'

// 自动查找对应的哈希化类名
bem('text')
// => 'button__text_ghi789'

bem('text', ['small'])
// => 'button__text_ghi789 button__text--small_jkl012'

bem(['primary'])
// => 'button_abc123 button--primary_def456'
```

### 在 React/Vue 中的使用

```tsx
import { BEM } from '@txjs/bem'
import styles from './Menu.module.less'

function Menu() {
  const [name, bem] = BEM('menu', styles)

  return (
    <nav className={bem()}>
      <ul className={bem('list')}>
        <li className={bem('item', { active: true })}>
          <a className={bem('link')} href="#">
            首页
          </a>
        </li>
        <li className={bem('item', { active: false })}>
          <a className={bem('link')} href="#">
            关于
          </a>
        </li>
      </ul>
    </nav>
  )
}

// 生成的类名：
// <nav class="menu_abc123">
//   <ul class="menu__list_def456">
//     <li class="menu__item_ghi789 menu__item--active_jkl012">
//       <a class="menu__link_mno345">首页</a>
//     </li>
//     <li class="menu__item_ghi789">
//       <a class="menu__link_mno345">关于</a>
//     </li>
//   </ul>
// </nav>
```

---

## 全局配置

通过 `BEM.config` 方法可以设置全局配置，影响所有 BEM 实例的行为。

```ts
BEM.config(options: { mode?: 'match' | 'always' }): void
```

### mode 选项

| 模式 | 说明 |
|------|------|
| `match`（默认） | 样式类名匹配不到时返回空字符串 |
| `always` | 样式类名匹配不到时返回原始 BEM 名称 |

### 使用示例

```ts
import { BEM } from '@txjs/bem'

// 默认模式 (match)
const [, bem] = BEM('button', {})
bem('text', ['small'])
// => '' (匹配不到时返回空)

// 切换到 always 模式
BEM.config({ mode: 'always' })
bem('text', ['small'])
// => 'button__text button__text--small'

// 恢复默认模式
BEM.config({ mode: 'match' })
```

---

## API 参考

### BEM(name)

创建 BEM 实例。

```ts
const [name, bem] = BEM('block')
```

### bem()

返回块名。

```ts
bem()
// => 'block'
```

### bem(modifiers)

使用修饰符数组或对象。

```ts
bem(['modifier'])
// => 'block block--modifier'

bem({ active: true, disabled: true })
// => 'block block--active block--disabled'
```

### bem(element)

使用元素。

```ts
bem('element')
// => 'block__element'
```

### bem(element, modifiers)

同时使用元素和修饰符。

```ts
bem('element', ['active'])
// => 'block__element block__element--active'

bem('element', { active: true })
// => 'block__element block__element--active'
```

---

## 常见问题

### Q: 为什么使用 BEM？

- **可预测性**：类名格式固定，易于理解和维护
- **作用域隔离**：避免样式冲突
- **语义化**：类名直接表达结构关系
- **CSS Modules 兼容**：天然支持哈希化类名

### Q: 如何处理动态修饰符？

```ts
const isActive = true
const isDisabled = false

bem('button', { active: isActive, disabled: isDisabled })
// => 'button__button button__button--active'
```

### Q: 如何组合多个修饰符？

```ts
bem('item', ['active', 'selected', 'highlighted'])
// => 'block__item block__item--active block__item--selected block__item--highlighted'
```

### Q: CSS Modules 中映射不存在会怎样？

在 `match` 模式下（默认），找不到映射时返回空字符串：

```ts
BEM.config({ mode: 'match' })
const [, bem] = BEM('button', { button: 'btn_xxx' })

bem('nonexistent')
// => ''

bem('nonexistent', ['missing'])
// => ''
```
