// ██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗
// ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗
// ██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝
// ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝
// ██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║
// ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝

import type webpack from 'webpack'
import {type DevOptions} from '../../extensionDev'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {isUsingReact} from '../options/react'
import {isUsingPreact} from '../options/preact'

export default function reloadPlugins(projectPath: string, {mode}: DevOptions) {
  return {
    constructor: {name: 'ReloadPlugins'},
    apply: (compiler: webpack.Compiler) => {
      if (mode !== 'development') return

      if (isUsingReact(projectPath) || isUsingPreact(projectPath)) {
        new ReactRefreshPlugin().apply(compiler)
      }
    }
  }
}
