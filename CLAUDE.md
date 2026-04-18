# TxJS Monorepo

## 协作规范

- **提交消息不得包含任何 AI 工具的特征信息**（session 链接、署名等），与普通人工提交保持一致

## 项目结构

```
txjs/
├── packages/
│   ├── bool/       # @txjs/bool      数据类型校验
│   ├── bem/        # @txjs/bem       BEM CSS 类名生成
│   ├── shared/     # @txjs/shared    通用工具函数
│   ├── types/      # @txjs/types     纯类型定义（无构建）
│   └── validator/  # @txjs/validator 表单验证
├── scripts/build.ts  # esbuild 构建脚本
├── jest.config.ts    # Jest 根配置（所有包共用）
└── package.json      # 工作区根（node >=18.12 <21，pnpm 9.x）
```

## 依赖关系

```
validator → shared → bool
bem       → bool
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

### 流程

每个包执行：`clean → lint → build:types（tsc）→ build:bundle（esbuild）`

### build.json

每个包根目录的 `build.json` 控制 esbuild 入口，可以是单个对象或数组：

```jsonc
// 单入口（bool、shared）
{ "root": true, "iife": true, "name": "index", "filepath": "index.ts", "globalName": "txjs_bool" }

// 多入口（validator）
[
  { "root": true, "iife": true, "name": "index", "filepath": "index.ts", "globalName": "txjs_validator" },
  { "name": "defaults", "filepath": "defaults.ts", ... },
  { "name": "zhCN", "filepath": "locale/zhCN.ts", "outDir": "locale", ... }
]
```

**字段说明：**
- `root: true` — 主入口，输出 `{name}.esm.mjs` / `{name}.cjs.js`
- 非 root 入口 — 输出 `{name}.mjs` / `{name}.js`，并将其他入口标记为 external
- `iife: true` — 额外输出 `{name}.min.js`（压缩 IIFE）
- `outDir` — 输出到 `dist/{outDir}/` 子目录
- 无 `build.json` 时（如 bem）— 回退为默认值 `{ root: true, name: 'index', filepath: 'index.ts' }`

### 构建产物

```
dist/index.d.ts        # TypeScript 声明（tsc 生成）
dist/index.esm.mjs     # ES Module
dist/index.cjs.js      # CommonJS
dist/index.min.js      # IIFE 压缩版（iife: true 时生成）
```

`types` 包无构建产物，直接发布 `index.d.ts`。
