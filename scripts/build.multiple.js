const { build, finish } = require('./build.base')

/**
 * bundleMultiple
 * @param {Array<Record<string, any>>} entry 
 */
function bundleMultiple(entry) {
  const files = []
  const external = entry.map((item) => `*/${item.filename}`)
  entry
    .reduce(
      (promise, options) =>
        promise.then(() => {
          if (!options.root) {
            options.external = external
            files.push(options.filename)
          }
          return build(options)
        }),
      Promise.resolve()
    )
    .then(() => {
      finish(`files { ${files.join(' , ')} }`)
    })
}

module.exports = bundleMultiple