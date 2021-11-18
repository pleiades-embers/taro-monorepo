import createBabelRegister from './babelRegister';
import * as utils from './utils';
import createDebug from 'debug';

declare interface helper {
  createDebug: createDebug.Debug;
  createBabelRegister: typeof createBabelRegister;
  resolveMainFilePath(p: string, ext?: string[]): string;
  resolveScriptPath(p: string): string;
  JS_EXT: string[];
  TS_EXT: string[];
  SCRIPT_EXT: string[];
  getModuleDefaultExport: (exports: any) => any;
  recursiveFindNodeModules(filePath: string): string;
  NODE_MODULES: "node_modules";
}
declare const helper: helper;
// @ts-ignore
export = helper;
