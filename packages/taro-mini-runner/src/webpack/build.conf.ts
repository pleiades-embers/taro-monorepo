import { IBuildConfig } from '../utils/types'
import { PLATFORMS, taroJsComponents } from '@tarojs/helper'
import { componentConfig } from '../template/component'
import { getCopyWebpackPlugin } from './chain'

export default (appPath: string, mode, config: Partial<IBuildConfig>): any => {
  console.log(appPath, mode, config)
  const {
    buildAdapter = PLATFORMS.WEAPP,
    alias = {},
    // entry = {},
    // output = {},
    // fileType = {
    //   style: '.wxss',
    //   config: '.json',
    //   script: '.js',
    //   templ: '.wxml'
    // }
    taroComponentsPath,
    env = {}
  } = config
  // build 时修改 组件配置
  config.modifyComponentConfig?.(componentConfig, config)

  const { copy } = config
  const plugin:any = []
  if (copy) {
    plugin.copyWebpackPlugin = getCopyWebpackPlugin({ copy, appPath })
  }

  alias[taroJsComponents + '$'] = taroComponentsPath || `${taroJsComponents}/mini`

  //缓存 环境信息
  env.TARO_ENV = JSON.stringify(buildAdapter)
}
