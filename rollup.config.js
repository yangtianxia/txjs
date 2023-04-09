import shell from 'shelljs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const filepath = `${process.cwd()}/package.json`
const external = []

if (shell.test('-e', filepath)) {
  const temp = shell.cat(filepath)
  try {
    const pkg = JSON.parse(temp)
    if (pkg.dependencies) {
      external.push(
        ...Object.keys(pkg.dependencies)
      )
    }
  } catch (e) {
    console.log(e)
  }
}

export default [
  {
    external,
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.esm.mjs',
        format: 'es'
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      typescript()
    ]
  },
  {
    input: './src/index.ts',
    plugins: [dts()],
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    }
  }
]