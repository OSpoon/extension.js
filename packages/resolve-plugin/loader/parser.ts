// import template from '@babel/template'
import * as t from '@babel/types'

export function resolvePropertyArg(path: any, resolverFunctionName: string) {
  if (path.node.arguments.length === 0) return

  const arg = path.node.arguments[0]
  path.node.arguments[0] = t.callExpression(
    t.identifier(resolverFunctionName),
    [arg]
  )
}

export function resolveStringArg(path: any, api: string) {
  if (path.node.arguments.length === 0) return

  if (api === 'chrome.devtools.panels.create') {
    // Wrap the entire object for the specific arguments
    path.node.arguments[1] = t.callExpression(t.identifier('r.resolveString'), [
      path.node.arguments[1]
    ])
    path.node.arguments[2] = t.callExpression(t.identifier('r.resolveString'), [
      path.node.arguments[2]
    ])
  } else if (api === 'chrome.runtime.getURL') {
    console.log('chama ', path.node.arguments[0])
    if (path.node.arguments[0].value === '/_favicon/') {
      return
    }
    // Wrap the entire object for the single argument
    path.node.arguments[0] = t.callExpression(t.identifier('r.resolveString'), [
      path.node.arguments[0]
    ])
  }
}