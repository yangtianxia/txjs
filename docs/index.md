---
layout: home

hero:
  name: TxJS
  text: TypeScript 工具库
  tagline: 轻量、强类型、开箱即用
  actions:
    - theme: brand
      text: 开始使用
      link: /packages/bool
    - theme: alt
      text: GitHub
      link: https://github.com/yangtianxia/txjs

features:
  - icon: 🔍
    title: '@txjs/bool'
    details: 类型判断与格式校验。isPhone、isEmail、isNil 等，全部带 TypeScript 类型收窄。
    link: /packages/bool
    linkText: 查看文档
  - icon: 🎨
    title: '@txjs/bem'
    details: BEM 类名生成，支持 CSS Modules 映射，一行代码搞定组件样式命名。
    link: /packages/bem
    linkText: 查看文档
  - icon: 🛠️
    title: '@txjs/shared'
    details: 日常工具函数：深拷贝、omit/pick、拦截器、数组分片、字符串转换等。
    link: /packages/shared
    linkText: 查看文档
  - icon: 📐
    title: '@txjs/types'
    details: 纯类型定义，无运行时代码。Numeric、Interceptor、Writeable 等常用工具类型。
    link: /packages/types
    linkText: 查看文档
---

## 安装

各包独立发布，按需安装：

```bash
pnpm add @txjs/bool
pnpm add @txjs/bem
pnpm add @txjs/shared
pnpm add @txjs/types
```

## 子路径导入

`@txjs/bool` 和 `@txjs/shared` 支持按函数单独导入，适合对包体积敏感的场景：

```ts
import { isEmail } from '@txjs/bool'          // 整包导入（bundler tree-shaking）
import { isEmail } from '@txjs/bool/isEmail'   // 子路径直接导入
```
