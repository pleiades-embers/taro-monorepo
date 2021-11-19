import { EventEmitter } from 'events';
import { IProjectConfig, PluginItem } from '@tarojs/taro/types/compile';
import Config from './Config';
import * as path from 'path';
import { createDebug, NODE_MODULES,recursiveFindNodeModules } from '@tarojs/helper';
import * as helper from '@tarojs/helper';

import { IPaths } from './utils/types';

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
    // this.initPresetsAndPlugins();
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
      nodeModulesPath:recursiveFindNodeModules(path.join(this.appPath,NODE_MODULES))
    } as IPaths;
    if (this.config.isInitSuccess) {
      Object.assign(this.paths, {
        configPath: this.config.configPath,
        sourcePath: path.join(
          this.appPath,
          this.initialConfig.sourcePath as string
        ),
        outputPath: path.join(
          this.appPath,
          this.initialConfig.outputPath as string
        )
      });
    }
    this.debugger(`initPaths:${JSON.stringify(this.paths, null, 2)}`);
  }
  initHelper() {
    this.helper = helper;
    this.debugger('initHelper');
  }

  initPresetsAndPlugins() {}
}
