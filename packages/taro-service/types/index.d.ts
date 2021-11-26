import { ICommand } from "../src/utils/types";

export declare interface IPluginContext {
  /**
   * 获取当前执行命令所带的参数
   */
  runOpts: any;
  /**
   * 注册一个自定义命令
   */
  registerCommand: (command: ICommand) => void;
}
