import { EventEmitter } from 'events';
import { IProjectConfig, PluginItem } from '@tarojs/taro/types/compile';
import Config from './Config';
import * as path from 'path';
import {
  createBabelRegister,
  createDebug,
  NODE_MODULES,
  recursiveFindNodeModules
} from '@tarojs/helper';
import * as helper from '@tarojs/helper';

import { ICommand, IHook, IPaths, IPlatform, IPlugin, IPreset } from './utils/types';
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
  hooks: Map<string, IHook[]>
  commands: Map<string, ICommand>
  platforms: Map<string, IPlatform>
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
    // const pluginCtx = new Plugin({id,path,ctx})
  }
}
