import * as fs from "fs-extra";
import * as path from "path";

export const JS_EXT: string[] = [".js", ".jsx"];
export const TS_EXT: string[] = [".ts", ".tsx"];
export const SCRIPT_EXT: string[] = JS_EXT.concat(TS_EXT);

export function resolveMainFilePath(p: string, ext = SCRIPT_EXT): string {
  const realPath = p;
  const taroEnv = process.env.TARO_ENV;

  for (let i = 0; i < ext.length; i++) {
    const item = ext[i];
    if (taroEnv) {
      if (fs.existsSync(`${p}.${taroEnv}${item}`)) {
        return `${p}.${taroEnv}${item}`;
      }
      if (fs.existsSync(`${p}.${path.sep}index.${taroEnv}${item}`)) {
        return `${p}${path.sep}index.${taroEnv}${item}`;
      }
      if (fs.existsSync(`${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`)) {
        return `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`;
      }
    }
    if (fs.existsSync(`${p}${item}`)) {
      return `${p}${item}`;
    }
    if (fs.existsSync(`${p}${path.sep}index${item}`)) {
      return `${p}${path.sep}index${item}`;
    }
  }
  return realPath;
}

export function resolveScriptPath(p: string): string {
  return resolveMainFilePath(p);
}
