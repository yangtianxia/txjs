import { defineConfig } from 'tsup'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const srcFiles = readdirSync(resolve(__dirname, 'src'))
  .filter((f) => f.endsWith('.ts'))
  .map((f) => `src/${f}`)

const external = ['@txjs/bool', 'shallow-clone']

export default defineConfig([
  {
    entry: srcFiles,
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    treeshake: true,
    external,
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.mjs' : '.cjs',
    }),
  },
  // IIFE bundles all deps for standalone CDN use
  {
    entry: { index: 'src/index.ts' },
    format: ['iife'],
    globalName: 'txjs_shared',
    minify: true,
    outExtension: () => ({ js: '.min.js' }),
    dts: false,
  },
])
