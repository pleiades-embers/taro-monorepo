import * as path from "path";
import * as fs from "fs-extra";
import { merge } from "lodash";
import { IProjectConfig } from "@tarojs/taro/types/compile";
import {
  resolveScriptPath,
  createBabelRegister,
  getModuleDefaultExport,
} from "@tarojs/helper";

import { CONFIG_DIR_NAME, DEFAULT_CONFIG_FILE } from "./utils/constants";

interface IConfigOptions {
  appPath: string;
}

export default class Config {
  appPath: string;
  configPath: string;
  initialConfig: IProjectConfig;
  isInitSuccess: boolean;
  constructor(opts: IConfigOptions) {
    this.appPath = opts.appPath;
    this.init();
  }

  init() {
    this.configPath = resolveScriptPath(
      path.join(this.appPath, CONFIG_DIR_NAME, DEFAULT_CONFIG_FILE)
    );
    // 判断路径中的文件是否存在
    if (!fs.existsSync(this.configPath)) {
      this.initialConfig = {};
      this.isInitSuccess = false;
    } else {
      createBabelRegister({
        only: [
          (filePath) =>
            filePath.indexOf(path.join(this.appPath, CONFIG_DIR_NAME)) >= 0,
        ],
      });
      try {
        this.initialConfig = getModuleDefaultExport(require(this.configPath))(
          merge
        );
        this.isInitSuccess = true;
      } catch (err) {
        this.initialConfig = {};
        this.isInitSuccess = false;
        console.log(err);
      }
    }
  }
}
