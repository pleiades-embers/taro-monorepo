import { Kernel } from '@tarojs/service'
import CLI from '../cli'
jest.mock("@tarojs/service")

// const MockedKernel = Kernel as unknown as jest.Mock<Kernel>
const APP_PATH = '/a/b/c'
function setProcessArgv (cmd: string) {  
    //@ts-ignore
    process.argv = [null, ...cmd.split(' ')]
}

describe("inspect",()=>{
    let cli:CLI

    beforeAll(() => {
        cli = new CLI(APP_PATH)
        cli.run()
    })
   

    describe("build",()=>{
        // const baseOpts={
        //     _:[
        //         'build'
        //     ],
        //     options:{
        //         platform:undefined,
        //         isWatch:false,
        //         env:undefined,
        //         blended:false,
        //     },
        //     isHelp:false
        // }

        it('should make configs',()=>{
            // const platform = 'weapp'
            setProcessArgv('taro build --type weapp --watch --port 8080')
        })

    })

})

