// import * as path from 'path'
import * as minimist from 'minimist'

// import {Kernel} from "@tarojs/service"

export default class CLI {
    appPath:string

    constructor(appPath:string) {
        this.appPath=appPath||process.cwd()
    }

    run(){
        this.parseArgs()
    }

    parseArgs(){
        const args= minimist(process.argv.slice(2),{
            
        })
        console.log(args)
    }
}
