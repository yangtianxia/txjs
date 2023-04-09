const minimist = require('minimist')
const shell = require('shelljs')

const ciArgs = minimist(process.argv.slice(2), {
  boolean: 'watch'
})

if (shell.exec('shx rm -rf dist').code !== 0) {
  shell.echo('failed to delete "dist" folder.')
  shell.exit(0)
}

if (shell.exec(`rollup --config ../../rollup.config.js ${ciArgs.watch ? '-w' : ''}`).code !== 0) {
  shell.echo('"rollupjs" run build failed.')
  shell.exit(0)
}