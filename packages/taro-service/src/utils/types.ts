export interface IPaths {
    /**
     * 当前命令执行的目录，如果是 build 命令则为当前项目路径
     */
    appPath: string
    /**
     * 当前项目配置目录，如果 init 命令，则没有此路径
     */
    configPath: string
    /**
     * 当前项目源码路径
     */
    sourcePath: string
    /**
     * 当前项目输出代码路径
     */
    outputPath: string
    /**
     * 当前项目所用的 node_modules 路径
     */
    nodeModulesPath: string
  }
  