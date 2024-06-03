// ██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗
// ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗
// ██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝
// ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝
// ██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║
// ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝

import path from 'path'
import fs from 'fs'
import {bold, blue, cyan} from '@colors/colors/safe'

let userMessageDelivered = false

export function isUsingPreact(projectDir: string) {
  const packageJsonPath = path.join(projectDir, 'package.json')
  const manifestJsonPath = path.join(projectDir, 'manifest.json')
  const manifest = require(manifestJsonPath)

  if (!fs.existsSync(packageJsonPath)) {
    return false
  }

  const packageJson = require(packageJsonPath)
  const preactAsDevDep =
    packageJson.devDependencies && packageJson.devDependencies.preact
  const preactAsDep =
    packageJson.dependencies && packageJson.dependencies.preact

  // This message is shown for each JS loader we have, so we only want to show it once.
  if (preactAsDevDep || preactAsDep) {
    if (!userMessageDelivered) {
      console.log(
        bold(
          `🧩 Extension.js ${blue('►►►')} ${manifest.name} (v${manifest.version}) `
        ) + `is using ${bold(cyan('Preact'))}.`
      )

      userMessageDelivered = true
    }
  }

  return preactAsDevDep || preactAsDep
}
