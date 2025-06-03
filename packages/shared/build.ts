import { batchBuilder } from '../../scripts/build'

batchBuilder([
  {
    root: true,
    iife: true,
    globalName: 'TShared',
    name: 'index',
    filepath: 'index.ts',
  },
  {
    name: 'noop',
    filepath: 'noop.ts',
  },
  {
    name: 'omit',
    filepath: 'omit.ts',
  },
  {
    name: 'padStr',
    filepath: 'padStr.ts',
  },
  {
    name: 'padString',
    filepath: 'padString.ts',
  },
  {
    name: 'padZero',
    filepath: 'padZero.ts',
  },
  {
    name: 'pick',
    filepath: 'pick.ts',
  },
  {
    name: 'toArray',
    filepath: 'toArray.ts',
  },
  {
    name: 'interceptor',
    filepath: 'interceptor.ts',
  },
  {
    name: 'interceptorAll',
    filepath: 'interceptorAll.ts',
  },
  {
    name: 'camelize',
    filepath: 'camelize.ts',
  },
  {
    name: 'clamp',
    filepath: 'noop.ts',
  },
  {
    name: 'shallowMerge',
    filepath: 'noop.ts',
  },
  {
    name: 'cloneDeep',
    filepath: 'noop.ts',
  },
  {
    name: 'toFixed',
    filepath: 'noop.ts',
  },
  {
    name: 'chunk',
    filepath: 'noop.ts',
  },
  {
    name: 'camelToKebab',
    filepath: 'noop.ts',
  },
])
