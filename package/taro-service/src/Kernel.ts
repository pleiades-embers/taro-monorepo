
import { EventEmitter } from "events";
import {PluginItem} from "@tarojs/taro/types/compile"

export default class Kernel extends EventEmitter{
    appPath:string
    isWatch:boolean
    isProduction:boolean
    optsPresets:PluginItem[] | void
}

