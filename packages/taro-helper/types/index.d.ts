import createBabelRegister from './babelRegister';
import { processTypeEnum, IProcessTypeMap } from './constants';
import * as utils from './utils';
import chalk from 'chalk';
import createDebug from 'debug';

declare interface helper {
  createDebug: createDebug.Debug & {
    debug: createDebug.Debug;
    default: createDebug.Debug;
  };
  createBabelRegister: typeof createBabelRegister;
  resolveMainFilePath(p: string, ext?: string[]): string;
  resolveScriptPath(p: string): string;
  JS_EXT: string[];
  TS_EXT: string[];
  PLATFORMS: any;
  SCRIPT_EXT: string[];
  NODE_MODULES: 'node_modules';
  taroJsComponents: "@tarojs/components";
  getModuleDefaultExport: (exports: any) => any;
  recursiveFindNodeModules(filePath: string): string;
  addPlatforms(platform: string): void;
}
declare const helper: helper;
// @ts-ignore
export = helper;
