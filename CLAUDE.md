# TxJS Monorepo

## 项目结构

```
txjs/
├── packages/
│   ├── bool/       # @txjs/bool   数据类型校验
│   ├── bem/        # @txjs/bem    BEM CSS 类名生成
│   ├── shared/     # @txjs/shared 通用工具函数
│   └── types/      # @txjs/types  纯类型定义（无构建）
├── jest.config.ts    # Jest 根配置（所有包共用）
└── package.json      # 工作区根（node >=18.12 <21，pnpm 9.x）
```

## 依赖关系

```
shared → bool
bem    → bool
```

跨包依赖使用 `workspace:*` 协议。

## 常用命令

```bash
pnpm build                      # 构建所有包
pnpm --filter @txjs/bool build  # 构建单个包
pnpm test                       # 测试所有包
pnpm --filter @txjs/bool test   # 测试单个包
```

## 测试

- 测试文件：`packages/<name>/tests/*.test.ts`
- 统一使用根目录 `jest.config.ts`，**无需先构建**
- `moduleNameMapper` 将 `@txjs/*` 直接映射到对应包的 `src/`，绕过 `dist/`

```ts
// jest.config.ts 中的映射
'^@txjs/bool(.*)$':   '<rootDir>/packages/bool/src$1'
'^@txjs/shared(.*)$': '<rootDir>/packages/shared/src$1'
'^@txjs/bem(.*)$':    '<rootDir>/packages/bem/src$1'
```

## 构建

### 工具

使用 **tsup**（基于 esbuild），每个包根目录有 `tsup.config.ts`。

### 流程

每个包执行 `pnpm build` → `tsup`，一步完成类型声明 + ESM + CJS + IIFE 输出。

### 构建产物

```
dist/index.d.ts     # TypeScript 声明
dist/index.mjs      # ES Module（主入口，re-export 全部）
dist/index.cjs      # CommonJS
dist/index.min.js   # IIFE 压缩版（CDN 用途）

# bool / shared 额外输出（每个函数独立文件，支持子路径导入）
dist/isEmail.d.ts
dist/isEmail.mjs
dist/isEmail.cjs
...
```

### 子路径导入

`@txjs/bool` 和 `@txjs/shared` 支持两种导入方式：

```ts
// 从主入口导入（bundler tree-shaking）
import { isEmail } from '@txjs/bool'

// 子路径直接导入（无需 bundler tree-shaking）
import { isEmail } from '@txjs/bool/isEmail'
```

`types` 包无构建产物，直接发布 `index.d.ts`。
