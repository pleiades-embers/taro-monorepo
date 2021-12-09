import * as path from 'path'
import Kernel from '../Kernel'
import Plugin from '../Plugin'

describe('init', () => {
  const preset = path.resolve(__dirname, './__mocks__', 'presets.ts')
  const kernel = new Kernel({
    appPath: '',
    presets: [path.resolve(__dirname, './__mocks__', 'presets.ts')]
  })
  const methods = new Map()
  const pluginCtx = new Plugin({ id: preset, path: preset, ctx: kernel })
  const p = new Proxy(pluginCtx, {
    get: (target, name: string) => {
      if (methods.has(name)) {
        console.log(methods.get(name))
      }
      return target[name]
    }
  })
  console.log(p)

  it('run', () => {
    expect(p).toBe(p)
  })
})
