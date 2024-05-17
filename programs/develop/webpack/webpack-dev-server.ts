// ██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗
// ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗
// ██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝
// ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝
// ██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║
// ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝

import path from 'path'
import type WebpackDevServer from 'webpack-dev-server'
import type {DevOptions} from '../extensionDev'
import {getOverlay, getPublicFolderPath} from './config/userOptions'
import {isUsingReact} from './options/react'
import {isUsingVue} from './options/vue'

export default function devServerConfig(
  projectPath: string,
  {port}: DevOptions
): WebpackDevServer.Configuration {
  return {
    host: '127.0.0.1',
    allowedHosts: 'all',
    static: getPublicFolderPath(projectPath),
    compress: true,
    devMiddleware: {
      writeToDisk: true
    },
    // liveReload: true,
    // WARN: for some reason, adding HTML as a watch file
    // causes content_scripts to do a full reload instead of a hot reload
    // when using React or Vue.
    watchFiles:
      isUsingReact(projectPath) || isUsingVue(projectPath)
        ? undefined
        : [path.join(projectPath, '**/*.html')],
    client: {
      // Allows to set log level in the browser, e.g. before reloading,
      // before an error or when Hot Module Replacement is enabled.
      logging: process.env.EXTENSION_ENV === 'development' ? 'error' : 'none',
      // Prints compilation progress in percentage in the browser.
      progress: false,
      // Shows a full-screen overlay in the browser
      // when there are compiler errors or warnings.
      overlay: getOverlay()
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 'auto',
    // WARN: Setting TRUE here causes the content_script
    // entry of a react extension to be reloaded infinitely.
    hot: 'only'
  }
}
