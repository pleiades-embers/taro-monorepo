import { IProjectBaseConfig, IMiniAppConfig } from '@tarojs/taro/types/compile'

export interface IFileType {
  // 样式文件后缀
  style: string
  // 脚本文件后缀
  script: string
  // 模板文件后缀
  templ: string
  // 配置文件后缀
  config: string
  // 【可选】渲染层脚本文件后缀，如微信小程序的 wxs，支付宝小程序的 sjs
  xs?: string
}

export type Func = (...args: any[]) => any

export interface IBuildConfig extends IProjectBaseConfig, IMiniAppConfig {
  isWatch: boolean
  mode: 'production' | 'development'
  port?: number
  buildAdapter: string
  nodeModulesPath: string
  quickappJSON: any
  isBuildPlugin: boolean
  isBuildQuickapp: boolean
  isSupportRecursive: boolean
  fileType: IFileType
  isSupportXS: boolean
  globalObject: string
  modifyWebpackChain: Func
  modifyBuildAssets: Func
  modifyMiniConfigs: Func
  modifyComponentConfig: Func
  onCompilerMake: Func
  onParseCreateElement: Func
  onWebpackChainReady: Func
  onBuildFinish: Func
  framework: string
  baseLevel: number
  runtimePath?: string | string[]
  taroComponentsPath?: string
  blended?: boolean
  isBuildNativeComp?: boolean
  prerender?: any
  template: any
}

export interface IOption {
  [key: string]: any
}
