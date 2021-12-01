import { PluginItem } from '@tarojs/taro/types/compile'
import * as path from 'path'
import { merge } from 'lodash'
import * as resolve from 'resolve'
import { PluginType } from './constants'
import chalk from 'chalk'
import { IPlugin } from './types'
import { getModuleDefaultExport } from '@tarojs/helper'

//检查包是否未绝对路径
export const isNpmPkg: (name: string) => boolean = (name) => !/^(\.|\/)/.test(name)

export function getPLuginPath(pluginPath: string) {
  if (isNpmPkg(pluginPath) || path.isAbsolute(pluginPath)) return pluginPath
  throw new Error('plugin 和 presets 配置必须为绝对路径或者包名')
}

export function convertPluginsToObject(items: PluginItem[]) {
  return () => {
    const obj = {}
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (typeof item === 'string') {
          const name = getPLuginPath(item)
          obj[name] = null
        } else if (Array.isArray(item)) {
          const name = getPLuginPath(item[0])
          obj[name] = item[1]
        }
      })
    }
    return obj
  }
}

export function mergePlugins(dist: PluginItem[], src: PluginItem[]) {
  return () => {
    const srcObj = convertPluginsToObject(src)()
    const distObj = convertPluginsToObject(dist)()
    return merge(srcObj, distObj)
  }
}

export function resolvePresetsOrPlugins(root: string, args, type: PluginType): IPlugin[] {
  return Object.keys(args).map((item) => {
    let fPath
    try {
      fPath = resolve.sync(item, {
        basedir: root,
        extensions: ['.js', '.ts'],
      })
    } catch (err) {
      if (args[item]?.backup) {
        // 如果项目中没有，可以使用 CLI 中的插件
        fPath = args[item].backup
      } else {
        console.log(chalk.red(`找不到依赖 "${item}"，请先在项目中安装`))
        process.exit(1)
      }
    }

    return {
      id: fPath,
      path: fPath,
      type,
      opts: args[item] || [],
      apply() {
        return getModuleDefaultExport(require(fPath))
      },
    }
  })
}
