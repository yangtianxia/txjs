const shell = require('shelljs')
const minimist = require('minimist')
const { build, context } = require('esbuild')

const ciArgs = minimist(process.argv.slice(2), {
  string: ['target', 'platform'],
  boolean: ['w', 't']
})

const filePath = `${process.cwd()}/package.json`
const outDir = 'dist'

function finish2(outfile) {
  console.log('✅ Build finished: ', outfile)
}

async function bundle(format, options = {}) {
  const external = []
  const ext = format === 'esm' ? '.mjs' : '.js'
  let outfile = `${outDir}/`
  if (options.root) {
    outfile += `${options.filename}.${format}${ext}`
  } else {
    outfile += `${options.filename}${ext}`
  }
  const finish = () => {
    if (options.root) finish2(outfile)
  }

  if (!ciArgs.t && options.external) {
    external.push(...options.external)
  }

  if (!ciArgs.t && shell.test('-e', filePath)) {
    const temp = shell.cat(filePath)
    const { dependencies, peerDependencies } = JSON.parse(temp)
    const ignoreDependencies = Object.assign({}, dependencies, peerDependencies)
    if (ignoreDependencies) {
      external.push(...Object.keys(ignoreDependencies))
    }
  }

  const buildOptions = {
    format,
    outfile,
    external,
    bundle: true,
    target: ['chrome85'],
    charset: 'utf8',
    entryPoints: [`./src/${options.filename}.ts`]
  }

  if (ciArgs.target) {
    buildOptions.target = ciArgs.target
  }

  if (ciArgs.platform) {
    buildOptions.platform = ciArgs.platform
  }

  if (ciArgs.w) {
    const loggerPlugin = {
      name: 'loggerPlugin',
      setup(build) {
        build.onEnd(finish)
      }
    }
    const ctx = await context({
      ...buildOptions,
      plugins: [loggerPlugin]
    })
    await ctx.watch()
  } else {
    await build(buildOptions)
    finish()
  }
}

async function build2(options = {}) {
  await bundle('esm', options)
  await bundle('cjs', options)
}

module.exports = {
  bundle,
  finish: finish2,
  build: build2
}

