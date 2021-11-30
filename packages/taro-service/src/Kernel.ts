import { EventEmitter } from 'events'
import { IProjectConfig, PluginItem } from '@tarojs/taro/types/compile'
import { AsyncSeriesWaterfallHook } from 'tapable'
import { merge } from 'lodash'
import Config from './Config'
import * as path from 'path'
import { createBabelRegister, createDebug, NODE_MODULES, recursiveFindNodeModules } from '@tarojs/helper'
import * as helper from '@tarojs/helper'

import { ICommand, IHook, IPaths, IPlatform, IPlugin, IPluginsObject, IPreset } from './utils/types'
import { convertPluginsToObject, mergePlugins, resolvePresetsOrPlugins } from './utils'
import { IS_ADD_HOOK, IS_EVENT_HOOK, IS_MODIFY_HOOK, PluginType } from './utils/constants'
import Plugin from './Plugin'
interface IKernelOptions {
  appPath: string
  presets?: PluginItem[]
  plugins?: PluginItem[]
}

export default class Kernel extends EventEmitter {
  appPath: string
  isWatch: boolean
  isProduction: boolean
  optsPresets: PluginItem[] | void
  optsPlugins: PluginItem[] | void
  config: Config
  initialConfig: IProjectConfig
  paths: IPaths
  extraPlugins: IPluginsObject
  hooks: Map<string, IHook[]>
  commands: Map<string, ICommand>
  platforms: Map<string, IPlatform>
  plugins: Map<string, IPlugin>
  helper: any
  runOpts: any
  debugger: any
  methods: Map<string, ((...args: any[]) => void)[]>

  constructor (options: IKernelOptions) {
    super()
    this.debugger = createDebug('Taro:Kernel')
    this.appPath = options.appPath || process.cwd()
    this.optsPresets = options.presets
    this.optsPlugins = options.plugins
    this.commands = new Map()
    this.hooks = new Map()
    this.methods = new Map()
    this.initHelper()
  }

  async init () {
    this.debugger('init')
    // 初始化配置
    this.initConfig()
    this.initPaths()
    this.initPresetsAndPlugins()
    await this.applyPlugins('onReady')
  }

  // 初始化配置
  initConfig () {
    this.config = new Config({
      appPath: this.appPath
    })
    this.initialConfig = this.config.initialConfig
    this.debugger('initConfig', this.initialConfig)
  }

  initPaths () {
    this.paths = {
      appPath: this.appPath,
      nodeModulesPath: recursiveFindNodeModules(path.join(this.appPath, NODE_MODULES))
    } as IPaths
    if (this.config.isInitSuccess) {
      Object.assign(this.paths, {
        configPath: this.config.configPath,
        sourcePath: path.join(this.appPath, this.initialConfig.sourceRoot as string),
        outputPath: path.join(this.appPath, this.initialConfig.outputRoot as string)
      })
    }
    this.debugger(`initPaths:${JSON.stringify(this.paths, null, 2)}`)
  }

  initHelper () {
    this.helper = helper
    this.debugger('initHelper')
  }

  initPresetsAndPlugins () {
    const initialConfig = this.initialConfig
    const allConfigPresets = mergePlugins(this.optsPresets || [], initialConfig.presets || [])()
    const allConfigPlugins = mergePlugins(this.optsPlugins || [], initialConfig.plugins || [])()
    this.debugger('initPresetsAndPlugins', allConfigPresets, allConfigPlugins)
    process.env.NODE_ENV !== 'test' &&
      createBabelRegister({
        only: [...Object.keys(allConfigPresets), ...Object.keys(allConfigPlugins)]
      })
    this.plugins = new Map()
    this.extraPlugins = {}
    this.resolvePresets(allConfigPresets)
    this.resolvePlugins(allConfigPlugins)
  }

  resolvePlugins (plugins) {
    plugins = merge(this.extraPlugins, plugins)
    const allPlugins = resolvePresetsOrPlugins(this.appPath, plugins, PluginType.Plugin)

    while (allPlugins.length) {
      this.initPlugin(allPlugins.shift()!)
    }
    this.extraPlugins = {}
  }

  initPlugin (plugin: IPlugin) {
    const { id, path, opts, apply } = plugin
    const pluginCtx = this.initPluginCtx({ id, path, ctx: this })
    this.debugger('initPlugin', plugin)
    this.registerPlugin(plugin)
    apply()(pluginCtx, opts)
  }

  resolvePresets (presets) {
    const allPresets = resolvePresetsOrPlugins(this.appPath, presets, PluginType.Preset)

    while (allPresets.length) {
      this.initPreset(allPresets.shift()!)
    }
  }

  initPreset (preset: IPreset) {
    this.debugger('initPreset', preset)
    const { id, path, opts, apply } = preset
    const pluginCtx = this.initPluginCtx({ id, path, ctx: this })
    const { presets, plugins } = apply()(pluginCtx, opts) || {}
    this.registerPlugin(preset)
    if (Array.isArray(presets)) {
      const _presets = resolvePresetsOrPlugins(this.appPath, convertPluginsToObject(presets)(), PluginType.Preset)
      while (_presets.length) {
        this.initPreset(_presets.shift()!)
      }
    }
    if (Array.isArray(plugins)) {
      this.extraPlugins = merge(this.extraPlugins, convertPluginsToObject(plugins)())
    }
  }

  registerPlugin (plugin: IPlugin) {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`插件 ${plugin.id} 已被注册`)
    }
    this.plugins.set(plugin.id, plugin)
  }

  initPluginCtx ({ id, path, ctx }: { id: string; path: string; ctx: Kernel }) {
    const pluginCtx = new Plugin({ id, path, ctx })
    const internalMethods = ['onReady', 'onStart']

    const kernelApis = [
      'appPath',
      'plugins',
      'platforms',
      'paths',
      'helper',
      'runOpts',
      'initialConfig',
      'applyPlugins'
    ]
    internalMethods.forEach((name) => {
      if (!this.methods.has(name)) {
        pluginCtx.registerMethod(name)
      }
    })
    return new Proxy(pluginCtx, {
      get: (target, name: string) => {
        if (this.methods.has(name)) {
          const methods = this.methods.get(name)
          if (Array.isArray(methods)) {
            return (...arg) => {
              methods.forEach((item) => {
                item.apply(this, arg)
              })
            }
          }
          return methods
        }
        if (kernelApis.includes(name)) {
          return typeof this[name] === 'function' ? this[name].bind(this) : this[name]
        }
        return target[name]
      }
    })
  }

  setRunOpts (opts) {
    this.runOpts = opts
  }

  async run (args: string | { name: string; opts?: any }) {
    let name
    let opts
    if (typeof args === 'string') {
      name = args
    } else {
      name = args.name
      opts = args.opts
    }
    this.debugger('command:run')
    this.debugger(`command:run:name:${name}`)
    this.debugger('command:runOpts')
    this.debugger(`command:runOpts:${JSON.stringify(opts, null, 2)}`)
    this.setRunOpts(opts)
    await this.init()
    this.debugger('command:onStart')
    await this.applyPlugins('onStart')
    if (!this.commands.has(name)) {
      throw new Error(`${name} 命令不存在`)
    }
    if (opts?.isHelp) {
      console.log(name, '💥')
    }

    await this.applyPlugins({
      name: 'modifyRunnerOpts',
      opts: {
        opts: opts?.config
      }
    })
    await this.applyPlugins({
      name,
      opts
    })
  }

  async applyPlugins (args: string | { name: string; initialVal?: any; opts?: any }) {
    let name
    let initialVal
    let opts
    if (typeof args === 'string') {
      name = args
    } else {
      name = args.name
      initialVal = args.initialVal
      opts = args.opts
    }
    this.debugger('applyPlugins')
    this.debugger(`applyPlugins:name:${name}`)
    this.debugger(`applyPlugins:initialVal:${initialVal}`)
    this.debugger(`applyPlugins:opts:${opts}`)
    if (typeof name !== 'string') {
      throw new Error('调用失败, 未传入正确的名称')
    }
    const hooks = this.hooks.get(name) || []
    const waterfall = new AsyncSeriesWaterfallHook(['arg'])
    if (hooks.length) {
      const resArr: any[] = []
      for (const hook of hooks) {
        waterfall.tapPromise(
          {
            name: hook.plugin!,
            stage: hook.stage || 0,
            before: hook.before
          },
          async (arg) => {
            const res = await hook.fn(opts, arg)
            if (IS_MODIFY_HOOK.test(name) && IS_EVENT_HOOK.test(name)) {
              return res
            }
            if (IS_ADD_HOOK.test(name)) {
              resArr.push(res)
              return resArr
            }
            return null
          }
        )
      }
    }
    return await waterfall.promise(initialVal)
  }
}
