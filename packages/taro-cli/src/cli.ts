// import * as path from "path";
import * as minimist from "minimist";

// import { Kernel } from "@tarojs/service";

export default class CLI {
  appPath: string;

  constructor(appPath: string) {
    this.appPath = appPath || process.cwd();
  }

  run() {
    this.parseArgs();
  }

  parseArgs() {
    const args = minimist(process.argv.slice(2), {
      alias: {
        version: ["v"],
        help: ["h"],
        port: ["p"],
        resetCache: ["reset-cache"],
      },
      boolean: ["version", "help"],
    });
    // 文件名称
    const _ = args._;
    const command = _[0];
    if (command) {
      // const kernel = new Kernel({
      //   appPath: this.appPath,
      //   presets: [path.resolve(__dirname, ".", "presets", "index.js")],
      // });
    }
  }
}
