import { defineConfig } from 'tsup'

const external = ['@txjs/bool', '@txjs/shared', 'extend']

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      defaults: 'src/defaults.ts',
      'locale/zhCN': 'src/locale/zhCN.ts',
      'locale/enUS': 'src/locale/enUS.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    external,
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.mjs' : '.cjs',
    }),
  },
  {
    entry: { index: 'src/index.ts' },
    format: ['iife'],
    globalName: 'avero',
    minify: true,
    outExtension: () => ({ js: '.min.js' }),
    dts: false,
  },
])
