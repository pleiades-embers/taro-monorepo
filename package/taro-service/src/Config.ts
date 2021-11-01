import { IProjectConfig } from "@tarojs/taro/types/compile";



interface IConfigOptions {
  appPath:string
}

export default class Config {
  appPath: string;
  configPath: string;
  initialConfig: IProjectConfig;

  constructor(opts:IConfigOptions) {
      this.appPath=opts.appPath
      this.init()
  }

  init(){
    // this.configPat
  }

}


