import { IBuildConfig } from '../../utils/types'
import * as path from 'path'
import baseConfig from './config'
import { merge } from 'webpack-merge'
import * as helper from '@tarojs/helper'
import build from '../../index'

export async function compile (app: string, customConfig: Partial<IBuildConfig> = {}) {
  //目录
  const appPath = path.resolve(__dirname, '../fixtures', app)

  //变更node 进程为当前得工作目录
  process.chdir(appPath)
  //入口 根据目录找到入口路径
  const entryFilePath = helper.resolveMainFilePath(path.join(appPath, customConfig.sourceRoot || 'src', 'app'))

  //自定义webpackChain
  //   const customChain = customConfig.webpackChain

  // customConfig.webpackChain = (chain, _webpack, RARSE_AST_TYPE) => {
  //   const webpack = jest.requireActual('webpack')
  //   console.log(chain, webpack, RARSE_AST_TYPE, 'webpackChain')
  // }

  // if (!customConfig.buildAdapter) {
  //   // const program = new Weapp({ helper } as any, {})
  // }
  // //组装 webpack 配置
  const webpackConfig = {
    mode: 'production',
    enableSourceMap: false,
    entry: {
      app: [entryFilePath]
    },
    framework: 'react',
    terser: {
      enable: true,
      config: {
        compress: false,
        mangle: false,
        extractComments: false,
        output: {
          comments: false,
          beautify: true
        }
      }
    },
    buildAdapter: 'weapp'
  }
  //TODO 类型需要修正
  const config: IBuildConfig|any = merge([baseConfig, webpackConfig, customConfig])

  const stats = await build(appPath, config)
  return { stats, config }
}
