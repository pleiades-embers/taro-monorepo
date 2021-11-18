import { EventEmitter } from 'events';
import { IProjectConfig, PluginItem } from '@tarojs/taro/types/compile';
import Config from './Config';
import { createDebug } from '@tarojs/helper';
import * as helper from "@tarojs/helper"

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
    this.debugger('init')
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
    this.debugger('initConfig',this.initialConfig)
  }

  initPaths() {
    // this.paths={
    //   appPath: this.appPath,
    //   nodeModulesPath:
    // }
  }

  initPresetsAndPlugins() {}

  initHelper() {
    this.helper=helper
    this.debugger('initHelper');
  }
}
