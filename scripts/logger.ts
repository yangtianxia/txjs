import kleur from 'kleur'

export type EntryLog = {
  name: string
  files: { format: string; size: number }[]
}

function timestamp() {
  return kleur.gray(new Date().toLocaleTimeString('en-US', { hour12: false }))
}

function formatSize(bytes: number) {
  return kleur.gray(`${(bytes / 1024).toFixed(2)} kB`)
}

function log(message: string) {
  console.log(`${timestamp()} ${message}`)
}

function logger(outfile: string, bytes?: number) {
  const size = bytes != null ? ` ${formatSize(bytes)}` : ''
  const file = `${kleur.green(outfile)}${size}`
  log(file)
}

function logSummary(entries: EntryLog[]) {
  const nameWidth = Math.max(...entries.map((e) => e.name.length)) + 2
  const fileWidth = 12

  console.log()
  console.log(
    `${timestamp()} ${kleur.green('✅')} ${kleur.bold(`Built ${kleur.cyan(String(entries.length))} entries`)}`
  )
  console.log()

  for (const entry of entries) {
    const sizes = entry.files
      .map(
        (f) =>
          `${kleur.gray(f.format)} ${kleur.cyan(formatSize(f.size).padStart(fileWidth))}`
      )
      .join(kleur.gray('  │  '))
    console.log(`  ${entry.name.padEnd(nameWidth)} ${sizes}`)
  }
  console.log()
}

logger.info = (message: string) => log(message)
logger.warn = (message: string) => log(kleur.yellow(message))
logger.error = (message: string) => log(kleur.red(message))
logger.success = (message: string) => log(kleur.green(message))
logger.summary = (entries: EntryLog[]) => logSummary(entries)

export default logger
