// import * as webpack from 'webpack'

import { IBuildConfig } from './utils/types'
import { getSassLoaderOption } from '@tarojs/runner-utils'
import buildConf from './webpack/build.conf'
export const makeConfig = async (buildConfig: IBuildConfig) => {
  const sassLoaderOption = await getSassLoaderOption(buildConfig)
  return {
    ...buildConfig,
    sassLoaderOption
  }
}

/**
 * stats 精确控制 bundle 信息的显示
 * 此函数 通过项目路径 及 webpack 配置 输出 bundle
 *
 * @param appPath 项目路径
 * @param config  项目配置
 * @return 输出bundle
 */

export default async function build (appPath:string, config: IBuildConfig) {
  //拿到环境信息
  const mode = config.mode

  // 组合sassLoader
  const newConfig = await makeConfig(config)

  // 构建webpack 配置文件
  const webpackChain = buildConf(appPath, mode, newConfig)
  console.log(webpackChain)

  // webpack config
  // const webpackConfig: webpack.Configuration = webpackChain.toConfig()

  return new Promise((resolve, reject) => {
    const callback = async (err:Error) => {
      reject(err)
    }
    console.log(callback)

    return resolve(1)
  })
}
