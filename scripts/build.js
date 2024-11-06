const shell = require('shelljs')
const minimist = require('minimist')
const { build, context } = require('esbuild')

const ciArgs = minimist(process.argv.slice(2), {
  string: ['target', 'platform'],
  boolean: ['w']
})

const filePath = `${process.cwd()}/package.json`

async function bundle(format) {
  const external = []
  const ext = format === 'esm' ? '.mjs' : '.js'
  const outfile = `dist/index.${format}${ext}`
  const finish = () => console.log('✅ Build finished: ', outfile)

  if (shell.test('-e', filePath)) {
    const temp = shell.cat(filePath)
    const { dependencies, peerDependencies } = JSON.parse(temp)
    const ignoreDependencies = Object.assign({}, dependencies, peerDependencies)

    if (ignoreDependencies) {
      external.push(...Object.keys(ignoreDependencies))
    }
  }

  const options = {
    format,
    outfile,
    external,
    bundle: true,
    target: ['chrome85'],
    charset: 'utf8',
    entryPoints: ['./src/index.ts']
  }

  if (ciArgs.target) {
    options.target = ciArgs.target
  }

  if (ciArgs.platform) {
    options.platform = ciArgs.platform
  }

  if (ciArgs.w) {
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