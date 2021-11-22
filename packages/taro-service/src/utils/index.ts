import { PluginItem } from '@tarojs/taro/types/compile';
import * as path from 'path' 
import { merge } from 'lodash';

export const isNpmPkg: (name: string) => boolean = (name) =>
  !/^(\.|\/)/.test(name);

export function getPLuginPath(pluginPath: string) {
    if(isNpmPkg(pluginPath)||path.isAbsolute(pluginPath)) return pluginPath;
    throw new Error('plugin 和 presets 配置必须为绝对路径包名')
}

export function convertPluginsToObject(items: PluginItem[]) {
  return () => {
    const obj = {};
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (typeof item === 'string') {
          const name = getPLuginPath(item);
          obj[name]=null          
        }else if(Array.isArray(item)){
            const name=getPLuginPath(item[0])
            obj[name]=item[1]
        }
      });
    }
    return obj;
  };
}

export function mergePlugins(dist: PluginItem[], src: PluginItem[]) {
  return () => {
    const srcObj = convertPluginsToObject(src)();
    const distObj = convertPluginsToObject(dist)();
    return merge(srcObj, distObj);
  };
}