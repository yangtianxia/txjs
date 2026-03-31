import path from 'path'
import fs from 'fs-extra'
import minimist from 'minimist'
import { build, context, type BuildOptions, type Plugin } from 'esbuild'
import logger, { type EntryLog } from './logger'

interface BundleOptions {
  root?: boolean
  iife?: boolean
  globalName?: string
  name: string
  filepath: string
  rootDir?: string
  outDir?: string
  external?: string[]
}

interface BundleResult {
  outfile: string
  format: ENUM_FORMAT
  size: number
}

enum ENUM_FORMAT {
  ESM = 'esm',
  CJS = 'cjs',
  IIFE = 'iife',
}

function resolve(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}

function fileSize(dir: string): number {
  const stat = fs.statSync(resolve(dir))
  return stat.size
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

const buildJson = resolve('build.json')

const pkgPath = resolve('package.json')

const ciArgs = minimist(process.argv.slice(2), {
  string: ['target', 'platform', 'copy'],
  boolean: ['w', 't'],
})

const output = 'dist/'

const platform = ciArgs.platform || 'browser'

const target = ciArgs.target?.split(',') || ['chrome85', 'es2015']

const copy = ciArgs.copy?.split(',') || []

function bundle(options: BundleOptions, format: ENUM_FORMAT) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<BundleResult>(async (resolve, reject) => {
    try {
      const iife = format === ENUM_FORMAT.IIFE
      const ext = getExt(format)

      let outfile = output

      if (options.outDir) {
        outfile = path.join(outfile, options.outDir)
      }

      if (iife) {
        outfile = path.join(outfile, `${options.name}.min${ext}`)
      } else if (options.root) {
        outfile = path.join(outfile, `${options.name}.${format}${ext}`)
      } else {
        outfile = path.join(outfile, `${options.name}${ext}`)
      }

      const finish = () =>
        resolve({
          outfile,
          format,
          size: fileSize(outfile),
        })

      const rootDir = options.rootDir || './src/'

      const buildOptions: BuildOptions = {
        format,
        outfile,
        platform,
        target,
        bundle: true,
        charset: 'utf8',
        entryPoints: [path.join(rootDir, options.filepath)],
      }

      if (iife) {
        buildOptions.minify = true
        buildOptions.globalName = options.globalName
      } else if (!ciArgs.t) {
        buildOptions.external ??= []

        if (options.external) {
          buildOptions.external.push(...options.external)
        }

        const { dependencies, peerDependencies } = fs.readJSONSync(pkgPath)
        const ignoreDependencies = Object.assign(
          {},
          dependencies,
          peerDependencies
        )
        if (ignoreDependencies) {
          buildOptions.external.push(...Object.keys(ignoreDependencies))
        }
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
    } catch (error) {
      reject(error)
    }
  })
}

async function main() {
  logger.info('Start building...')

  if (!fs.existsSync(buildJson)) {
    logger.error('Build failed: Missing configuration file.')
    return
  }

  const entry: BundleOptions[] = []
  const temp = fs.readJSONSync(buildJson)

  if (Array.isArray(temp)) {
    entry.push(...temp)
  } else {
    entry.push(temp)
  }

  const external = entry.map((el) => `*/${el.name}`)
  const entryLog: EntryLog[] = []

  for (let i = 0, len = entry.length; i < len; i++) {
    const item = entry[i]

    if (!item.root) {
      item.external = external
    }

    const tasks: Promise<BundleResult>[] = [
      bundle(item, ENUM_FORMAT.ESM),
      bundle(item, ENUM_FORMAT.CJS),
    ]

    if (item.iife) {
      tasks.push(bundle(item, ENUM_FORMAT.IIFE))
    }

    try {
      const results = await Promise.all(tasks)
      entryLog.push({
        name: item.name,
        files: results,
      })
    } catch (error) {
      logger.error(`Build failed: ${error}`)
    }
  }

  for (let i = 0, len = copy.length; i < len; i++) {
    const filename = copy[i]
    const filepath = resolve(`./src/${filename}`)
    if (fs.pathExistsSync(filepath)) {
      await fs.copy(filepath, resolve(output, filename), {
        overwrite: true,
      })
    }
  }

  logger.summary(entryLog)

  logger.success('Finished build.')
}

main()
