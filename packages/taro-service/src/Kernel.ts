import { EventEmitter } from 'events';
import { IProjectConfig, PluginItem } from '@tarojs/taro/types/compile';
import { AsyncSeriesWaterfallHook } from 'tapable';
import Config from './Config';
import * as path from 'path';
import {
  createBabelRegister,
  createDebug,
  NODE_MODULES,
  recursiveFindNodeModules
} from '@tarojs/helper';
import * as helper from '@tarojs/helper';

import {
  ICommand,
  IHook,
  IPaths,
  IPlatform,
  IPlugin,
  IPreset
} from './utils/types';
import { mergePlugins, resolvePresetsOrPlugins } from './utils';
import { PluginType } from './utils/constants';

interface IKernelOptions {
  appPath: string;
  presets?: PluginItem[];
  plugins?: PluginItem[];
}

export default class Kernel extends EventEmitter {
  appPath: string;
  isWatch: boolean;
  isProduction: boolean;
  optsPresets: PluginItem[] | void;
  optsPlugins: PluginItem[] | void;
  config: Config;
  initialConfig: IProjectConfig;
  paths: IPaths;
  extraPlugins: IPlugin[];
  hooks: Map<string, IHook[]>;
  commands: Map<string, ICommand>;
  platforms: Map<string, IPlatform>;
  plugins: Map<string, string>;
  helper: any;
  runOpts: any;
  debugger: Function;

  constructor(options: IKernelOptions) {
    super();
    this.debugger = createDebug('Taro:Kernel');
    this.appPath = options.appPath || process.cwd();
    this.optsPresets = options.presets;
    this.optsPlugins = options.plugins;
    this.commands = new Map();
    this.hooks = new Map();
    this.initHelper();
  }
  init() {
    this.debugger('init');
    // 初始化配置
    this.initConfig();
    this.initPaths();
    this.initPresetsAndPlugins();
  }

  initConfig() {
    this.config = new Config({
      appPath: this.appPath
    });
    this.initialConfig = this.config.initialConfig;
    this.debugger('initConfig', this.initialConfig);
  }

  initPaths() {
    this.paths = {
      appPath: this.appPath,
      nodeModulesPath: recursiveFindNodeModules(
        path.join(this.appPath, NODE_MODULES)
      )
    } as IPaths;
    if (this.config.isInitSuccess) {
      Object.assign(this.paths, {
        configPath: this.config.configPath,
        sourcePath: path.join(
          this.appPath,
          this.initialConfig.sourceRoot as string
        ),
        outputPath: path.join(
          this.appPath,
          this.initialConfig.outputRoot as string
        )
      });
    }
    this.debugger(`initPaths:${JSON.stringify(this.paths, null, 2)}`);
  }
  initHelper() {
    this.helper = helper;
    this.debugger('initHelper');
  }

  initPresetsAndPlugins() {
    const initialConfig = this.initialConfig;
    const allConfigPresets = mergePlugins(
      this.optsPresets || [],
      initialConfig.presets || []
    )();
    const allConfigPlugins = mergePlugins(
      this.optsPlugins || [],
      initialConfig.plugins || []
    )();
    this.debugger('initPresetsAndPlugins', allConfigPresets, allConfigPlugins);
    process.env.NODE_ENV !== 'test' &&
      createBabelRegister({
        only: [
          ...Object.keys(allConfigPresets),
          ...Object.keys(allConfigPlugins)
        ]
      });
    this.plugins = new Map();
    this.extraPlugins = [];
    this.resolvePresets(allConfigPresets);
  }

  resolvePresets(presets) {
    const allPresets = resolvePresetsOrPlugins(
      this.appPath,
      presets,
      PluginType.Preset
    );

    while (allPresets.length) {
      this.initPreset(allPresets.shift()!);
    }
  }
  initPreset(preset: IPreset) {
    this.debugger('initPreset', preset);
    const { id, path, opts, apply } = preset;
    const pluginCtx = this.initPluginCtx({ id, path, ctx: this });
  }
  initPluginCtx({ id, path, ctx }: { id: string; path: string; ctx: Kernel }) {
    
  }

  setRunOpts(opts) {
    this.runOpts = opts;
  }
  async run(args: string | { command: string; opts?: any }) {
    let command;
    let opts;
    if (typeof args === 'string') {
      command = args;
    } else {
      command = args.command;
      opts = args.opts;
    }
    this.debugger('command:run');
    this.debugger(`command:run:name:${command}`);
    this.debugger('command:runOpts');
    this.debugger(`command:runOpts:${JSON.stringify(opts, null, 2)}`);
    this.setRunOpts(opts);
    await this.init();
    this.debugger('command:onStart');
    await this.applyPlugins('onStart');
    console.log(this.commands.has(command), '💥');

    if (!this.commands.has(command)) {
      throw new Error(`${command} 命令不存在`);
    }
    if (opts?.isHelp) {
      console.log(command, '💥');
    }

    await this.applyPlugins({
      name: 'modifyRunnerOpts',
      opts: {
        opts: opts?.config
      }
    });
    await this.applyPlugins({
      name: command,
      opts
    });
  }

  async applyPlugins(
    args: string | { name: string; initialVal?: any; opts?: any }
  ) {
    let name;
    let initialVal;
    let opts;
    if (typeof args === 'string') {
      name = args;
    } else {
      name = args.name;
      initialVal = args.initialVal;
      opts = args.opts;
    }
    this.debugger('applyPlugins');
    this.debugger(`applyPlugins:name:${name}`);
    this.debugger(`applyPlugins:initialVal:${initialVal}`);
    this.debugger(`applyPlugins:opts:${opts}`);
    if (typeof name !== 'string') {
      throw new Error('调用失败, 未传入正确的名称');
    }
    const hooks = this.hooks.get(name) || [];

    const waterfall = new AsyncSeriesWaterfallHook(['arg']);
    if (hooks.length) {
    }
    return await waterfall.promise(initialVal);
  }
}
