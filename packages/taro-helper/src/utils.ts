import * as fs from 'fs-extra';
import * as path from 'path';
import * as findWorkspaceRoot from 'find-yarn-workspace-root';
import chalk from 'chalk';

import { processTypeEnum, processTypeMap } from './constants';

export const JS_EXT: string[] = ['.js', '.jsx'];
export const TS_EXT: string[] = ['.ts', '.tsx'];
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
      if (
        fs.existsSync(`${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`)
      ) {
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

// 默认导出兼容获取
export const getModuleDefaultExport = (exports) =>
  exports.__esModule ? exports.default : exports;

export function printLog(
  type: processTypeEnum,
  tag: string,
  filePath?: string
) {
  const typeShow = processTypeMap[type];
  const tagLen = tag.replace(/[\u0391-\uFFE5]/g, 'aa').length;
  const tagFormatLen = 8;
  if (tagLen < tagFormatLen) {
    const rightPadding = new Array(tagFormatLen - tagLen + 1).join(' ');
    tag += rightPadding;
  }
  const padding = '';
  filePath = filePath || '';
  if (typeof typeShow.color === 'string') {
    console.log(
      chalk[typeShow.color](typeShow.name),
      padding,
      tag,
      padding,
      filePath
    );
  }else {
    console.log(typeShow.color(typeShow.name),padding,tag,padding,filePath);
  }
}

export function recursiveFindNodeModules(
  filePath: string,
  lastFindPath?: string
): string {
  const dirname = path.dirname(filePath);
  const workspaceRoot = findWorkspaceRoot(dirname);
  const nodeModules = path.join(workspaceRoot || dirname, 'node_modules');
  if (fs.existsSync(nodeModules)) {
    return nodeModules;
  }
  if (dirname.split(path.sep).length <= 1) {
    printLog(processTypeEnum.ERROR,`在${dirname}目录下`,'为找到')
    return nodeModules;
  }
  return recursiveFindNodeModules(dirname, filePath);
}
