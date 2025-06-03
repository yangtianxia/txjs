import { batchBuilder } from '../../scripts/build'

batchBuilder([
  {
    root: true,
    iife: true,
    globalName: 'TValidator',
    name: 'index',
    filepath: 'index.ts',
  },
  {
    name: 'defaults',
    iife: true,
    globalName: 'TValidatorDefaults',
    filepath: 'defaults.ts',
  },
  {
    name: 'zhCN',
    iife: true,
    globalName: 'TValidatorLocaleZhCN',
    filepath: 'locale/zhCN.ts',
    outDir: 'locale',
  },
  {
    name: 'enUS',
    iife: true,
    globalName: 'TValidatorLocaleEnUs',
    filepath: 'locale/enUS.ts',
    outDir: 'locale',
  },
])
