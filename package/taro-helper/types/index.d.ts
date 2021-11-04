import createBabelRegister from "./babelRegister";
export declare const helper: {
    createBabelRegister: typeof createBabelRegister;
    resolveMainFilePath(p: string, ext?: string[]): string;
    resolveScriptPath(p: string): string;
    JS_EXT: string[];
    TS_EXT: string[];
    SCRIPT_EXT: string[];
};
export = helper;
