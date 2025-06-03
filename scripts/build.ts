import path from 'path'
import * as fs from 'fs-extra'
import minimist from 'minimist'
import { build, context, type BuildOptions, type Plugin } from 'esbuild'

interface BundleOptions {
  root?: boolean
  iife?: boolean
  globalName?: string
  name: string
  filepath: string
  outDir?: string
  external?: string[]
}

enum ENUM_FORMAT {
  ESM = 'esm',
  CJS = 'cjs',
  IIFE = 'iife',
}

function getExt(format: ENUM_FORMAT) {
  switch (format) {
    case ENUM_FORMAT.ESM:
      return '.mjs'
    case ENUM_FORMAT.CJS:
    case ENUM_FORMAT.IIFE:
    default:
      return '.js'
  }
}

function logger(outfile: string) {
  console.log('✅ Build finished', outfile)
}

const pkgPath = path.resolve(process.cwd(), 'package.json')

const ciArgs = minimist(process.argv.slice(2), {
  boolean: ['w', 't'],
})

async function bundle(format: ENUM_FORMAT, options: BundleOptions) {
  const iife = format === ENUM_FORMAT.IIFE
  const external = [] as string[]
  const ext = getExt(format)

  let outfile = 'dist/'

  if (options.outDir) {
    outfile = path.join(outfile, options.outDir)
  }

  if (options.root) {
    outfile = path.join(outfile, `${options.name}.${format}${ext}`)
  } else if (iife) {
    outfile = path.join(outfile, `${options.name}.min${ext}`)
  } else {
    outfile = path.join(outfile, `${options.name}${ext}`)
  }

  const finish = () => {
    if (options.root || iife) {
      logger(outfile)
    }
  }

  if (!ciArgs.t) {
    if (options.external) {
      external.push(...options.external)
    }
    const { dependencies, peerDependencies } = fs.readJSONSync(pkgPath)
    const ignoreDependencies = Object.assign({}, dependencies, peerDependencies)
    if (ignoreDependencies) {
      external.push(...Object.keys(ignoreDependencies))
    }
  }

  const buildOptions: BuildOptions = {
    format,
    outfile,
    bundle: true,
    charset: 'utf8',
    platform: 'browser',
    legalComments: 'inline',
    target: ['chrome58'],
    entryPoints: [path.join('./src/', options.filepath)],
  }

  if (iife) {
    buildOptions.minify = iife
    buildOptions.globalName = options.globalName
  } else {
    buildOptions.external = external
  }

  if (ciArgs.w) {
    const loggerPlugin: Plugin = {
      name: 'loggerPlugin',
      setup(build) {
        build.onEnd(finish)
      },
    }
    const ctx = await context({
      ...buildOptions,
      plugins: [loggerPlugin],
    })
    await ctx.watch()
  } else {
    await build(buildOptions)
    finish()
  }
}

export async function builder(options: BundleOptions) {
  const { iife, root, ...rest } = options
  if (iife) {
    await bundle(ENUM_FORMAT.IIFE, { ...rest, iife })
  }
  await bundle(ENUM_FORMAT.ESM, { ...rest, root })
  await bundle(ENUM_FORMAT.CJS, { ...rest, root })
}

export async function batchBuilder(entry: BundleOptions[]) {
  const external = entry.map((el) => `*/${el.name}`)
  for (let i = 0, len = entry.length; i < len; i++) {
    const item = entry[i]
    if (!item.root) {
      item.external = external
    }
    await builder(item)
  }
}
