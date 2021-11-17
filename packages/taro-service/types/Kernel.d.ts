/// <reference types="node" />
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
    constructor(options: IKernelOptions);
    init(): void;
    initConfig(): void;
    initPaths(): void;
    initPresetsAndPlugins(): void;
    initHelper(): void;
}
export {};
