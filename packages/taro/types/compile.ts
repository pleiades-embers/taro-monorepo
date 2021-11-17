export type PluginItem = string | [string, object];

export interface IDeviceRatio {
  [key: string]: number;
}

export type IOption = Record<string, any>;



export interface IProjectBaseConfig {
  date?: string;
  designWidth?: number;
  watcher?: any[];
  deviceRatio?: IDeviceRatio;
  sourceRoot?: string;
  outputRoot?: string;
  env?: IOption;
  alias?: IOption;
  defineConstants?: IOption;
//   copy?: ICopyOptions;
//   csso?: TogglableOptions;
//   terser?: TogglableOptions;
//   uglify?: TogglableOptions;
//   sass?: ISassOptions;
  plugins?: PluginItem[];
  presets?: PluginItem[];
  baseLevel?: number;
  framework?: string;
}



export interface IProjectConfig extends IProjectBaseConfig {
  ui?:{
    extraWatchFiles?:any[]
  }
  mini?:any
}