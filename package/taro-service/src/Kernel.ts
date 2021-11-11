import { EventEmitter } from 'events';
import { PluginItem } from '@tarojs/taro/types/compile';

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
  plugins: Map<string, string>;
  helper: any;
  runOpts: any;
  debugger: Function;

  constructor(options: IKernelOptions) {
    super();
    // this.debugger = (value) => {};
    this.appPath = options.appPath || process.cwd();
    this.optsPresets = options.presets;
    this.optsPlugins = options.plugins;
    this.initHelper();
  }
  init() {
    this.initConfig();
    this.initPaths();
    this.initPresetsAndPlugins();
  }

  initConfig() {}

  initPaths() {}

  initPresetsAndPlugins() {}

  initHelper() {
    this.debugger('initHelper');
  }
}
