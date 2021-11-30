import { IPluginContext } from '../../../types/index';
export default (ctx: IPluginContext) => {
  ctx.registerCommand({
    name: 'init',
    optionsMap: {
      '--name [name]': '项目名称',
      '--description [description]': '项目介绍',
      '--typescript': '使用TypeScript',
      '--template-source [templateSource]': '项目模板源',
      '--clone [clone]': '拉取远程模板时使用git clone',
      '--template [template]': '项目模板',
      '--css [css]': 'CSS预处理器(sass/less/stylus/none)',
      '-h, --help': 'output usage information'
    },
    async fn(){
      console.log('执行init'+'🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸🈸'); 
    }
  })
};
