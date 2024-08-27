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
      const pkg = JSON.parse(temp)
      if (pkg.dependencies) {
        external.push(...Object.keys(pkg.dependencies))
      }
      if (pkg.peerDependencies) {
        external.push(...Object.keys(pkg.peerDependencies))
      }
    } catch (err) {
      console.log('Build error:', pkg, err)
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