import { cpSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const outputDir = join(root, 'pages-dist')

const frontends = [
  { name: 'index', output: '' },
  { name: 'plomyk-pamieci', output: 'plomyk-pamieci' },
  { name: 'czyste-pietro', output: 'czyste-pietro' },
  { name: 'odplamieni', output: 'odplamieni' },
  { name: 'pod-cisnieniem', output: 'wodapodcisnieniem' },
  { name: 'expert-pathway', output: 'imperialacademy' }
]

const runNpm = (args, cwd) => {
  if (process.platform === 'win32') {
    execFileSync('cmd', ['/c', 'npm', ...args], { cwd, stdio: 'inherit' })
    return
  }

  execFileSync('npm', args, { cwd, stdio: 'inherit' })
}

rmSync(outputDir, { force: true, recursive: true })

for (const frontend of frontends) {
  const cwd = join(root, 'frontends', frontend.name)
  const dist = join(cwd, 'dist')
  const target = frontend.output ? join(outputDir, frontend.output) : outputDir

  runNpm(['ci'], cwd)
  runNpm(['run', 'build'], cwd)

  if (!existsSync(dist)) {
    throw new Error(`Missing dist directory for ${frontend.name}`)
  }

  cpSync(dist, target, { recursive: true })
}
