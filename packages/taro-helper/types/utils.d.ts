import { processTypeEnum } from './constants';
export declare const JS_EXT: string[];
export declare const TS_EXT: string[];
export declare const SCRIPT_EXT: string[];
export declare function resolveMainFilePath(p: string, ext?: string[]): string;
export declare function resolveScriptPath(p: string): string;
export declare const getModuleDefaultExport: (exports: any) => any;
export declare function recursiveFindNodeModules(filePath: string): string;
