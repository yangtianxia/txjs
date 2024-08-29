const shell = require('shelljs')
const { build, context } = require('esbuild')

const filePath = `${process.cwd()}/package.json`

async function bundle(format) {
  const external = []
  const ext = format === 'esm' ? '.mjs' : '.js'
  const outfile = `dist/index.${format}${ext}`
  const finish = () => console.log('Build finished:', outfile)

  if (shell.test('-e', filePath)) {
    const temp = shell.cat(filePath)
    try {
      const { dependencies, peerDependencies } = JSON.parse(temp)
      if (dependencies) {
        external.push(...Object.keys(dependencies))
      }
      if (peerDependencies) {
        external.push(...Object.keys(peerDependencies))
      }
    } catch (err) {
      console.log('Build error:', err)
    }
  }

  const options = {
    format,
    bundle: true,
    target: ['chrome53'],
    outfile,
    charset: 'utf8',
    external,
    entryPoints: ['./src/index.ts']
  }

  if (process.argv.includes('-w')) {
    const loggerPlugin = {
      name: 'loggerPlugin',
      setup(build) {
        build.onEnd(finish)
      }
    }
    const ctx = await context({
      ...options,
      plugins: [loggerPlugin]
    })
    await ctx.watch()
  } else {
    await build(options)
    finish()
  }
}

bundle('esm')
bundle('cjs')