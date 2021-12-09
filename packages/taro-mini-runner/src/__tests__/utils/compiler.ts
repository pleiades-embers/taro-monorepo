import { IBuildConfig } from '../../utils/types'
import * as path from 'path'
import * as helper from '@tarojs/helper'
export async function compile (app: string, customConfig: Partial<IBuildConfig> = {}) {
  //目录
  const appPath = path.resolve(__dirname, '../fixtures', app)

  //变更node 进程为当前得工作目录
  process.chdir(appPath)
  //入口
  const entryFilePath = helper.resolveMainFilePath(path.join(appPath, customConfig.sourceRoot || 'src', 'app'))
  console.log(entryFilePath)
}

(async () => {
  await compile('react', {
    buildAdapter: 'alipay'
  })
})()
