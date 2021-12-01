import * as path from 'path'
import Kernel from '../Kernel'
import Plugin from '../Plugin'
const preset = path.resolve(__dirname, './__mocks__', 'presets.ts')
const kernel = new Kernel({
  appPath: '',
  presets: [path.resolve(__dirname, './__mocks__', 'presets.ts')]
})
const p = new Proxy(new Plugin({ id: preset, path: preset, ctx: kernel }), {})
console.log(p)

// const kernelApis = [
//   'appPath',
//   'plugins',
//   'platforms',
//   'paths',
//   'helper',
//   'runOpts',
//   'initialConfig',
//   'applyPlugins'
// ]

// function initPluginCtx () {
//   return new Proxy(pluginCtx, {
//     get: (target, name: string) => {
//       if (this.methods.has(name)) {
//         const methods = this.methods.get(name)
//         if (Array.isArray(methods)) {
//           return (...arg) => {
//             methods.forEach((item) => {
//               item.apply(this, arg)
//             })
//           }
//         }
//         return methods
//       }
//       if (kernelApis.includes(name)) {
//         return typeof this[name] === 'function'
//           ? this[name].bind(this)
//           : this[name]
//       }
//       return target[name]
//     }
//   })
// }
// initPluginCtx()
