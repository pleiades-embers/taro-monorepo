import Plugin from '../Plugin';
import { IPluginContext } from '../../types/index';

describe('config', () => {
  let id = '插件id';
  let path = '';
  let ctx: IPluginContext;
  const pluginCtx = new Plugin({ id, path, ctx });

  pluginCtx.registerCommand({
    name: 'config',
    optionsMap: {
      '--json': '以 JSON 形式输出'
    },
    synopsisList: [
      'taro config set <key> <value>',
      'taro config get <key>',
      'taro config delete <key>',
      'taro config list [--json]'
    ],
    async fn(opts) {
      console.log(opts);
    }
  });

  describe('plugin init', () => {
    it('should', () => {});
  });
});
