import * as path from 'path'

//检查包是否未绝对路径
const isNpmPkg: (name: string) => boolean = (name) => !/^(\.|\/)/.test(name)

function getPLuginPath(pluginPath: string) {
  if (isNpmPkg(pluginPath) || path.isAbsolute(pluginPath)) return pluginPath
  throw new Error('plugin 和 presets 配置必须为绝对路径或者包名')
}

describe('init', () => {
  it('run', () => {
    console.log(getPLuginPath('bao'), '🤮')
  })
})
