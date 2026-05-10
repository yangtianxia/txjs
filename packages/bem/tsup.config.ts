import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    external: ['@txjs/bool'],
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.mjs' : '.cjs',
    }),
  },
  {
    entry: { index: 'src/index.ts' },
    format: ['iife'],
    globalName: 'txjs_bem',
    minify: true,
    outExtension: () => ({ js: '.min.js' }),
    dts: false,
  },
])
