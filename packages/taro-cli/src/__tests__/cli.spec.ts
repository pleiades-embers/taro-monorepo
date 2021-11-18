import { Kernel } from '@tarojs/service'
import CLI from '../cli'
jest.mock("@tarojs/service")

const MockedKernel = Kernel as unknown as jest.Mock<Kernel>
const APP_PATH = '/a/b/c'
function setProcessArgv (cmd: string) {  
    //@ts-ignore
    process.argv = [null, ...cmd.split(' ')]
}

describe("inspect",()=>{
    let cli:CLI

    beforeAll(() => {
        cli = new CLI(APP_PATH)
    })
    beforeEach(() => {
        MockedKernel.mockClear()
        process.argv = []
        delete process.env.NODE_ENV
        delete process.env.TARO_ENV
      })
    
      afterEach(() => {
        MockedKernel.mockClear()
        process.argv = []
        delete process.env.NODE_ENV
        delete process.env.TARO_ENV
      })

    describe("build",()=>{
        const baseOpts={
            _:[
                'build'
            ],
            options:{
                platform:undefined,
                isWatch:false,
                env:undefined,
                blended:false,
            },
            isHelp:false
        }

        it('should make configs',()=>{
            const platform = 'weapp'
            setProcessArgv('taro build --type weapp --watch --port 8080')
            cli.run()
            const ins=MockedKernel.mock.instances[0]

            // 构建配置 options
            const opts = Object.assign({}, baseOpts)
            opts.options = Object.assign({}, baseOpts.options, {
                platform,
                isWatch: true,
                port: 8080,
                deviceType: undefined,
                resetCache: false,
                qr: false
            })

            // expect(ins.run).toHaveBeenCalledWith({
            //     name: 'build',
            //     opts: Object.assign({}, baseOpts, {
            //       platform: 'plugin',
            //       plugin: 'weapp'
            //     })
            // })
            
        })

    })

})

