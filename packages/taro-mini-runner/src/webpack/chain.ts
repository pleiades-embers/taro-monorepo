import { ICopyOptions } from '@tarojs/taro/types/compile'
import { IOption } from '../utils/types'
import CopyPlugin from 'copy-webpack-plugin'
import { partial } from 'lodash'
import path from 'path'

const getPlugin = (plugin:any, args:IOption[]) => {
  return {
    plugin, args
  }
}

export const getCopyWebpackPlugin = ({
  copy,
  appPath
}): {
  copy: ICopyOptions
  appPath: string
} => {
  const args = [
    copy.patterns.map(({ from, to, ...extra }) => {
      return {
        from,
        to: path.resolve(appPath, to),
        context: appPath,
        ...extra
      }
    }),
    copy.options
  ]

  return partial(getPlugin, CopyPlugin)(args)
}
