import { defineConfig } from 'tsup'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const srcFiles = readdirSync(resolve(__dirname, 'src'))
  .filter((f) => f.endsWith('.ts'))
  .map((f) => `src/${f}`)

export default defineConfig([
  {
    entry: srcFiles,
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    treeshake: true,
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.mjs' : '.cjs',
    }),
  },
  {
    entry: { index: 'src/index.ts' },
    format: ['iife'],
    globalName: 'txjs_bool',
    minify: true,
    outExtension: () => ({ js: '.min.js' }),
    dts: false,
  },
])
