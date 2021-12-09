import * as webpack from 'webpack'

import { IBuildConfig } from './utils/types'
import { getSassLoaderOption } from '@tarojs/runner-utils'

export const makeConfig = async (buildConfig: IBuildConfig) => {
  const sassLoaderOption = await getSassLoaderOption(buildConfig)
  return {
    ...buildConfig,
    sassLoaderOption
  }
}

// stats 精确控制 bundle 信息的显示
export default async function build (appPath: string, config: IBuildConfig): Promise<webpack.Stats> {
  const mode = config.mode

  const newConfig = await makeConfig(config)
  console.log(mode, newConfig, appPath)

  return new Promise<webpack.Stats>((resolve, reject) => {
    async (err: Error, stats: webpack.Stats) => {
      if (err || stats.hasErrors()) {
        return reject(err)
      }
      resolve(stats)
    }
  })
}
